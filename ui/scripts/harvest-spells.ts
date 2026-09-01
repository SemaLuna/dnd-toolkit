// @ts-ignore
import fs from 'node:fs/promises';
// @ts-ignore
import path from 'node:path';

// @ts-ignore
const scriptDirectory = import.meta.dirname as string;
const spellDirectory = path.resolve(
  path.dirname(scriptDirectory),
  'public/srd/spells',
);

const baseURL = 'https://www.dnd5eapi.co';
const makeRequest = async function (url: string) {
  const response = await fetch(baseURL + url);
  return await response.json();
};

const supportedKeys = [
  'index',
  'name',
  'desc',
  'higher_level',
  'range',
  'components',
  'ritual',
  'duration',
  'concentration',
  'casting_time',
  'level',
  'attack_type',
  'damage',
  'school',
  'classes',
  'subclasses',
  'material',
  'dc',
  'area_of_effect',
  'heal_at_slot_level',
  // Ignored keys
  'url',
  'updated_at',
];

const processDetailedSpellResponse = function (
  spellResponse: DetailedSpellResponse,
) {
  const isCantrip = spellResponse.level === 0;
  const baseDamage = isCantrip
    ? spellResponse.damage?.damage_at_character_level?.['1']
    : spellResponse.damage?.damage_at_slot_level?.[spellResponse.level];
  const baseHeal = spellResponse.heal_at_slot_level?.[spellResponse.level];
  const hasSavingThrow = spellResponse.dc !== undefined;
  // Some spells that do not deal damage, have a damage field but no damage_type, e.g. Sleep
  const dealsDamage = spellResponse.damage?.damage_type !== undefined;
  const hasAreaOfEffect = spellResponse.area_of_effect !== undefined;

  const response = {
    data: {
      type: 'spells',
      id: spellResponse.index,
      attributes: {
        name: spellResponse.name,
        description: spellResponse.desc,
        higherLevel: spellResponse.higher_level,
        range: spellResponse.range,
        components: spellResponse.components,
        ritual: spellResponse.ritual,
        duration: spellResponse.duration,
        concentration: spellResponse.concentration,
        castingTime: spellResponse.casting_time,
        level: spellResponse.level,
        attackType: spellResponse.attack_type,
        damageAtCharacterLevel: spellResponse.damage?.damage_at_character_level,
        areaOfEffect: !hasAreaOfEffect
          ? undefined
          : {
              type: spellResponse.area_of_effect?.type,
              size: spellResponse.area_of_effect?.size,
            },
        baseDamage,
        damageAtSlotLevel: spellResponse.damage?.damage_at_slot_level,
        baseHeal,
        healAtSlotLevel: spellResponse.heal_at_slot_level,
        material: spellResponse.material,
        effectOnSaveSuccess: spellResponse.dc?.dc_success,
      },
      relationships: {
        dc: !hasSavingThrow
          ? undefined
          : {
              data: {
                type: 'saving-throws',
                id: spellResponse.dc?.dc_type.index,
              },
            },
        damageType: !dealsDamage
          ? undefined
          : {
              data: {
                type: 'damage-types',
                id: spellResponse.damage?.damage_type?.index,
              },
            },
        school: {
          data: {
            type: 'magic-schools',
            id: spellResponse.school.index,
          },
        },
        classes: spellResponse.classes.map((classResponse) => {
          return { data: { type: 'classes', id: classResponse.index } };
        }),
        subclasses: spellResponse.subclasses.map((subClassResposne) => {
          return { data: { type: 'classes', id: subClassResposne.index } };
        }),
      },
    },
  };

  for (const key in spellResponse) {
    if (!supportedKeys.includes(key)) {
      console.log(`for spell: ${spellResponse.name} - unsupported key: ${key}`);
    }
  }

  return response;
};

type IndividualSpellResponse = {
  index: string;
  name: string;
  level: number;
  url: string;
};
type SpellResponse = { count: number; results: IndividualSpellResponse[] };

type DetailedSpellResponse = {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  ritual: boolean;
  material?: string;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  area_of_effect?: { type: string; size: number };
  heal_at_slot_level?: { [key: string]: string };
  damage?: {
    damage_type?: {
      index: string;
    };
    damage_at_character_level?: {
      [key: string]: string;
    };
    damage_at_slot_level?: {
      [key: string]: string;
    };
  };
  school: {
    index: string;
  };
  dc?: {
    dc_type: {
      index: string;
    };
    dc_success: string;
  };
  classes: { index: string }[];
  subclasses: { index: string }[];
};

const allSpells = (await makeRequest('/api/2014/spells')) as SpellResponse;

for (const spell of allSpells.results.filter(
  (spellResult) => spellResult.level > -1,
)) {
  const detailedSpellResponse = (await makeRequest(
    spell.url,
  )) as DetailedSpellResponse;

  try {
    const fileName = detailedSpellResponse.index;
    const content = processDetailedSpellResponse(detailedSpellResponse);
    await fs.writeFile(
      path.resolve(spellDirectory, fileName) + '.json',
      JSON.stringify(content),
    );
  } catch (err) {
    console.log(
      `While processing ${detailedSpellResponse.name} - error: ${err}`,
    );
  }
}

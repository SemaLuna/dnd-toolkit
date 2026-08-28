import { Type } from '@warp-drive/core/types/symbols';

type Components = 'V' | 'S' | 'M';

type Material = {
  description: string;
  cost?: number;
  consumedUponUse?: boolean;
};
type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type AttackType = 'ranged' | 'melee';
type SavingThrowType = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
type AreaOfEffect = { type: string; size: number };

export default interface Spell {
  [Type]: string;
  id: string;
  name: string;
  desc: string[];
  higherLevel?: string[];
  range: string;
  components: Components;
  material?: Material;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  castingTime: string;
  level: Level;
  attackType?: AttackType;
  // damageType?: string;  -relationship
  baseDamage?: string; //dmgpercharlvl or dmgperslotlvl
  // damageIncrement?: string;
  savingThrowType?: SavingThrowType;
  onSaveSuccess?: string;
  areaOfEffect?: AreaOfEffect;
  // school?: string; -relationship
  // upCastBoon?: string
  // uniqueRestriction?: string
}

import { Type } from '@warp-drive/core/types/symbols';

type SpellComponent = 'V' | 'S' | 'M';
type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// type AttackType = 'ranged' | 'melee';

export default interface Spell {
  [Type]: string;
  id: string;
  name: string;
  desc: string[];
  higherLevel: string[];
  range: string;
  areaOfEffect?: string;
  components: SpellComponent[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  castingTime: string;
  level: Level;
  // ASK JOSEEE
  // Damage per level or just base damage?
  // baseDamage?: string;
  // damageType?: string;
  // dc: string;
}

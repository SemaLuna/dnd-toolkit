import { Type } from '@warp-drive/core/types/symbols';

export default interface Spell {
  [Type]: string;
  id: string;
  name: string;
  desc: string[];
}

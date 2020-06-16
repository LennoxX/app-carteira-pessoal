import { Posicao } from './posicao.model';
import { ApplicationUser } from './../../core/models/usuario.model';
export class Carteira {
  constructor(
    public userId?: string,
    public posicoes?: Posicao[]
  ) {
    this.posicoes = new Array();
  }

  static fromJson(jsonData: any): Carteira {
    return Object.assign(new Carteira(), jsonData);
  }
}

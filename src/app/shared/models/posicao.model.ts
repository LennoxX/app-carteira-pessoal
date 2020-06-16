import { Ativo } from 'src/app/shared/models/ativo.model';
export class Posicao {
  constructor(
    public id?: string,
    public ativo?: Ativo,
    public quantidade?: number,
    public valorMedioCompra?: number,
    public userId?: string,
  ) {
  }

  static fromJson(jsonData: any): Posicao {
    return Object.assign(new Posicao(), jsonData);
  }
}

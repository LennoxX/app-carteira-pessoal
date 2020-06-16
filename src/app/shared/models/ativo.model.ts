
export class Ativo {
  constructor(
    public id?: string,
    public nome?: string,
    public tipo?: { label: string, value: string },
    public sigla?: string
  ) {
  }

  static fromJson(jsonData: any): Ativo {
    return Object.assign(new Ativo(), jsonData);
  }
}


export class Card {
  constructor(
    public sigla?: string,
    public maxima?: string,
    public minima?: string,
    public atual?: string,
    public variacaoRel?: string,
    public diaHora?: string
  ) {
  }

  static fromJson(jsonData: any): Card {
    return Object.assign(new Card(), jsonData);
  }
}


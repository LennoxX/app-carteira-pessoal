
export class ApplicationUser {
  constructor(
    public uid?: string,
    public email?: string,
    public displayName?: string,
    public photoURL?: string,
    public emailVerified?: boolean,
  ) {
  }

  static fromJson(jsonData: any): ApplicationUser {
    return Object.assign(new ApplicationUser(), jsonData);
  }
}

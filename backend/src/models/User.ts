export interface IUser {
  id?: number | undefined;
  first_name: string;
  last_name: string;
  uaa_email: string;
  password_hash: string;
  is_driver?: boolean | number | undefined;
  license_number?: string | null | undefined;
  created_at?: Date | undefined;
}

export class User implements IUser {
  public id?: number | undefined;
  public first_name: string;
  public last_name: string;
  public uaa_email: string;
  public password_hash: string;
  public is_driver: boolean | number;
  public license_number?: string | null | undefined;
  public created_at?: Date | undefined;

  constructor(data: IUser) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.uaa_email = data.uaa_email;
    this.password_hash = data.password_hash;
    this.is_driver = data.is_driver ?? false;
    this.license_number = data.license_number ?? null;
    this.created_at = data.created_at;
  }
}

export default User;
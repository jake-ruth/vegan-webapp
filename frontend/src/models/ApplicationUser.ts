export interface ApplicationUser {
  id?: number; //PK
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  uuid: string;
}

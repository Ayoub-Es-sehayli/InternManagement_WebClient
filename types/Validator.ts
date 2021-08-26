type Validator = {
  state: boolean;
  message: string;
};
export default Validator;

export type InfoValidators = {
  firstName: Validator;
  lastName: Validator;
  email: Validator;
  phone: Validator;
};
export type InternshipValidators = {
  dates: Validator;
  division: Validator;
  responsable: Validator;
};
export type AuthenticateValidators = {
  username: Validator;
  password: Validator;
};
export interface UserFormValidators {

  lastName: Validator;
  firstName: Validator;
  email: Validator;
}
export interface UserValidators extends UserFormValidators {
  role: Validator;
    password: Validator;
};
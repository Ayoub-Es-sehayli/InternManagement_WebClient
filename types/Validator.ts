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
  department: Validator;
};
export type AuthenticateValidators = {
  email: Validator;
  password: Validator;
};
export type UserValidators ={
    nom: Validator;
    prenom: Validator;
    email: Validator;
    role: Validator;
    password: Validator;
};
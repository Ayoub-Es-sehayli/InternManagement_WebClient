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

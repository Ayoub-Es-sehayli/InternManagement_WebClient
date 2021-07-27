import { eDocumentState } from "./eDocumentState"
import { eGender } from "./eGender";

type Intern = {
  id: number,
  gender: eGender,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  startDate: Date,
  endDate: Date,
  department: number,
  documents: eDocumentState[]
};

export default Intern;

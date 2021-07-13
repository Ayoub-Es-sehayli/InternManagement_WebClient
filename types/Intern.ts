import { eDocumentState } from "./eDocumentState";
import InternInformation from "./InternInformation";
import InternshipInformation from "./InternshipInformation";

type Intern = {
  info: InternInformation;
  internship: InternshipInformation;
  documents: eDocumentState[];
};

export default Intern;

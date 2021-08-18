import { eDocumentState } from "./eDocumentState";
import InternInformation from "./InternInformation";
import InternshipInformation from "./InternshipInformation";

type FormDto = {
  id: number;
  info: InternInformation;
  internship: InternshipInformation;
  documents: eDocumentState[];
};

export default FormDto;
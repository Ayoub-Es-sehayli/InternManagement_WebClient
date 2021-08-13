import eAttendanceAlarmState from "./eAttendanceAlarmState";
import eFileAlarmState from "./eFileAlarmState";
import { eInternState } from "./eInternState";

type InternListItem = {
  id: number,
  fullName: string,
  decision: string,
  division: string,
  state: eInternState,
  fileAlert: eFileAlarmState,
  absenceAlert: eAttendanceAlarmState
}

export default InternListItem;
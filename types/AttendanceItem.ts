import eAttendanceType from "@/types/eAttendanceType"
type AttendanceItem = {
  internId: number
  fullName: string
  dateTime: Date
  type: eAttendanceType
}

export default AttendanceItem
import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import AttendanceItem from "@/types/AttendanceItem";

@Module({
    name :"attendanceModule",
    stateFactory: true
})
export default class Attendance extends VuexModule{
    interns: AttendanceItem[] | null = null

    @Mutation
    setInterns(interns: AttendanceItem[]) {
      this.interns = interns
    }
}
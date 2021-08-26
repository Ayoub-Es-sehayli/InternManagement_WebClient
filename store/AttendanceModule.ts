import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import AttendanceItem from "@/types/AttendanceItem";
import { $axios } from "~/utils/api";

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

    @Action
    LoadAttendanceList()
    {
      return $axios
        .$get("/attendance")
        .then((data: AttendanceItem[]) => {
          this.context.commit("setInterns", data);
        })
    }

    @Action
    markEntered(punchInData: { internId: number; dateTime: Date; }) {
      return $axios
        .$put("/attendance", punchInData)
    }

    @Action
    markLeft(punchInData: { internId: number; dateTime: Date; }) {
      return $axios
        .$post("/attendance", punchInData)
    }
}
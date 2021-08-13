<template>
  <form action="" class="form-grid">
    <div class="stats">
      {{ countAbsent }} Absentée Aujourd'hui ( {{ interns.length }} Total )
    </div>
    <div class="intern">
      <b-autocomplete
        :data="interns"
        field="name"
        v-model="punchInData.fullName"
        @select="(option) => (punchInData.internId = option ? option.Id : -1)"
        expanded
        size="is-medium"
        icon="magnify"
        placeholder="Nom Stagiaire"
        clearable
        :loading="internsLoading"
      >
      </b-autocomplete>
    </div>
    <b-clockpicker
      size="is-medium"
      type="is-light"
      :min-time="minTime"
      :max-time="maxTime"
      hour-format="24"
      hours-label="Heures"
      minutes-label="Min"
      class="time"
      v-model="punchInData.dateTime"
    ></b-clockpicker>
    <b-button class="in" size="is-large" @click="showEnteredDialog()"
      >Entrée</b-button
    >
    <b-button class="out" size="is-large" @click="showLeftDialog()"
      >Sortie</b-button
    >
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DialogProgrammatic as Dialog } from "buefy";
import { getModule } from "vuex-module-decorators";
import { store } from "~/store";
import Ui from "~/store/ui";
import Attendance from "~/store/AttendanceModule";
import AttendanceItem from "@/types/AttendanceItem";
import eAttendanceType from "~/types/eAttendanceType";

type FormData = {
  internId: number;
  fullName: string;
  dateTime: Date;
};
@Component
export default class PunchIn extends Vue {
  uiModule!: Ui;
  attendanceModule!: Attendance;
  searchValue: String = "";
  interns: AttendanceItem[] = [];
  internsLoading: boolean = true;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  punchInData: FormData = {
    internId: -1,
    fullName: "",
    dateTime: new Date(),
  };
  created() {
    this.uiModule = getModule(Ui, store);
    this.attendanceModule = getModule(Attendance, store);
    this.uiModule.setTitle("Pointage");

    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(0);

    this.$axios
      .$get(process.env.BASE_URL + "/attendance")
      .then((data: AttendanceItem[]) => {
        this.attendanceModule.setInterns(data);
        this.interns = this.attendanceModule.interns!!;
        this.internsLoading = false;
      });
  }
  get countAbsent() {
    return this.interns.filter(
      (intern) => intern.type == eAttendanceType.Absent
    ).length;
  }
  showEnteredDialog() {
    Dialog.confirm({
      title: "Confirmation",
      message: "Êtes-vous sûre des informations saisis?",
      type: "is-success",
      onConfirm: () => this.markEntered(),
    });
  }
  showLeftDialog() {
    Dialog.confirm({
      title: "Confirmation",
      message: "Êtes-vous sûre des informations saisis?",
      type: "is-warning",
      onConfirm: () => this.markLeft(),
    });
  }
  findInternIndex() {
    return this.interns.findIndex(
      (intern) => intern.internId == this.punchInData.internId
    );
  }
  markEntered() {
    if (this.interns[this.findInternIndex()].type == eAttendanceType.Absent) {
      this.interns[this.findInternIndex()].type = eAttendanceType.Enter;
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire est présent déjà!",
      });
    }
  }
  markLeft() {
    if (this.interns[this.findInternIndex()].type == eAttendanceType.Enter) {
      this.interns[this.findInternIndex()].type != eAttendanceType.Exit;
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire n'est pas présent!",
      });
    }
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  column-gap: 20px;
  padding-top: 10%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80px 1fr 1fr;
  grid-template-areas:
    "stats   stats"
    "intern  time"
    "in      out";
}
.stats {
  grid-area: stats;
  justify-self: center;
  font-weight: 500;
  font-size: 25px;
}
.intern {
  grid-area: intern;
}

.time {
  grid-area: time;
}

.in {
  grid-area: in;
  color: white;
  background-color: #246530;
}

.out {
  grid-area: out;
  color: white;
  background-color: #e4353e;
}
</style>

<template>
  <form action="" class="form-grid">
    <div class="stats">
      {{ countAbsent }} Absentée Aujourd'hui ( {{ interns.length }} Total )
    </div>
    <div class="intern">
      <b-autocomplete
        :data="filteredInterns"
        v-model="filter"
        field="fullName"
        @select="
          (option) => (punchInData.internId = option ? option.internId : -1)
        "
        expanded
        size="is-medium"
        icon="magnify"
        placeholder="Nom Stagiaire"
        clearable
        :loading="internsLoading"
        keep-first
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
    <b-button
      class="in"
      size="is-large"
      @click="showEnteredDialog()"
      :disabled="!canEnter"
      :loading="saving"
      >Entrée</b-button
    >
    <b-button
      class="out"
      size="is-large"
      @click="showLeftDialog()"
      :disabled="!canExit"
      :loading="saving"
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
  dateTime: Date;
};
@Component
export default class PunchIn extends Vue {
  uiModule!: Ui;
  attendanceModule!: Attendance;
  searchValue: String = "";
  interns: AttendanceItem[] = [];
  internsLoading: boolean = true;
  saving: boolean = false;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  punchInData: FormData = {
    internId: -1,
    dateTime: new Date(),
  };
  filter: string = "";
  created() {
    this.uiModule = getModule(Ui, store);
    this.attendanceModule = getModule(Attendance, store);
    this.uiModule.setTitle("Pointage");

    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(0);

    this.attendanceModule
      .LoadAttendanceList()
      .then(() => {
        this.interns = this.attendanceModule.interns!!;
      })
      .catch((err) => {
        console.error(err);
        this.interns = [];
      });
    this.internsLoading = false;
  }
  get countAbsent() {
    return this.interns.filter(
      (intern) => intern.type == eAttendanceType.Absent
    ).length;
  }
  get filteredInterns() {
    return this.interns.filter((option) => {
      return (
        option.fullName
          .toString()
          .toLowerCase()
          .indexOf(this.filter.toLowerCase()) >= 0
      );
    });
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
    this.saving = true;
    if (this.canEnter) {
      this.attendanceModule
        .markEntered(this.punchInData)
        .then(() => {
          this.interns[this.findInternIndex()].type = eAttendanceType.Enter;
        })
        .catch((err) => {
          console.error(err);
          Dialog.alert({
            title: "Alerte",
            message: "Une erreur s'est produite",
          });
        });
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire est présent déjà!",
      });
    }
    this.saving = false;
  }
  markLeft() {
    this.saving = true;
    if (this.canExit) {
      this.attendanceModule
        .markLeft(this.punchInData)
        .then(() => {
          this.interns[this.findInternIndex()].type = eAttendanceType.Exit;
        })
        .catch((err) => {
          console.error(err);
          Dialog.alert({
            title: "Alerte",
            message: "Une erreur s'est produite",
          });
        });
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire n'est pas présent!",
      });
    }
    this.saving = false;
  }
  get canEnter() {
    return (
      this.findInternIndex() != -1 &&
      this.interns[this.findInternIndex()].type == eAttendanceType.Absent
    );
  }
  get canExit() {
    return (
      this.findInternIndex() != -1 &&
      this.interns[this.findInternIndex()].type == eAttendanceType.Enter
    );
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

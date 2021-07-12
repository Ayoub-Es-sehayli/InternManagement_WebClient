<template>
  <form action="" class="form-grid">
    <div class="stats">
      {{ countAbsent }} Absentée Aujourd'hui ({{ interns.length }} Total)
    </div>
    <b-select
      expanded
      size="is-medium"
      icon="account"
      class="intern"
      placeholder="Nom Stagiaire"
      v-model="punchInData.intern"
    >
      <option
        v-for="(intern, index) in interns"
        :key="intern.id"
        :value="index"
      >
        {{ intern.name }}
      </option>
    </b-select>
    <b-clockpicker
      size="is-medium"
      type="is-light"
      :min-time="minTime"
      :max-time="maxTime"
      hour-format="24"
      hours-label="Heures"
      minutes-label="Min"
      class="time"
      v-model="punchInData.time"
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
type Intern = {
  id: number;
  name: String;
  present: boolean;
  left: boolean;
};

type PunchInData = {
  intern: number;
  time: Date;
};
@Component
export default class PunchIn extends Vue {
  uiModule!: Ui;
  searchValue: String = "";
  interns: Intern[] = [];
  minTime: Date = new Date();
  maxTime: Date = new Date();
  punchInData: PunchInData = {
    intern: 0,
    time: new Date()
  };
  created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Pointage");
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(0);
    this.interns = [
      {
        id: 10,
        name: "Mohamed Hariss",
        present: false,
        left: false
      }
    ];
  }
  get filteredData() {
    return this.interns.filter(
      intern =>
        intern.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0
    );
  }
  get countAbsent() {
    return this.interns.filter(intern => !intern.present).length;
  }
  showEnteredDialog() {
    Dialog.confirm({
      title: "Confirmation",
      message: "Êtes-vous sûre des informations saisis?",
      type: "is-success",
      onConfirm: () => this.markEntered()
    });
  }
  showLeftDialog() {
    Dialog.confirm({
      title: "Confirmation",
      message: "Êtes-vous sûre des informations saisis?",
      type: "is-warning",
      onConfirm: () => this.markLeft()
    });
  }
  markEntered() {
    this.interns[this.punchInData.intern].present = true;
  }
  markLeft() {
    if (
      this.interns[this.punchInData.intern].present &&
      !this.interns[this.punchInData.intern].left
    ) {
      this.interns[this.punchInData.intern].left = true;
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire n'est pas présent"
      });
    }
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  column-gap: 20px;
  padding-top: 25%;
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
  font-size: 24px;
}
.intern {
  grid-area: intern;
  width: 300px;
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

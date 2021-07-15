<template>
  <form action="" class="form-grid">
    <div class="stats">
      {{ countAbsent }} Absentée Aujourd'hui ( {{ interns.length }} Total )
    </div>
    <div class="intern">
      <b-autocomplete
        :data="interns"
        field="name"
        v-model="punchInData.intern.name"
        @select="option => (punchInData.intern = option)"
        expanded
        size="is-medium"
        icon="magnify"
        placeholder="Nom Stagiaire"
        clearable
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
  intern: Intern;
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
    intern: { id: -1, name: "", present: false, left: false },
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
  findInternIndex() {
    return this.interns.findIndex(
      intern => intern.id == this.punchInData.intern.id
    );
  }
  markEntered() {
    if (!this.interns[this.findInternIndex()].present) {
      this.interns[this.findInternIndex()].present = true;
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire est présent déjà!"
      });
    }
  }
  markLeft() {
    if (
      this.interns[this.findInternIndex()].present &&
      !this.interns[this.findInternIndex()].left
    ) {
      this.interns[this.findInternIndex()].left = true;
    } else {
      Dialog.alert({
        title: "Alerte",
        message: "Ce Stagiaire n'est pas présent!"
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

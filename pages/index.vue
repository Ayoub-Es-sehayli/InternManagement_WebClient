<template>
  <div class="grid-view">
    <LatestInternsTable class="latest" :interns="latestInterns" />
    <FinishingInternsTable class="finishing" :interns="finishingInterns" />
    <AlarmingInternsTable class="alerts" :interns="alarmingInterns" />
    <GeneralStats class="stats" :stats="stats" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import Ui from "@/store/ui";
import LatestIntern from "~/types/LatestIntern";
import FinishingIntern from "~/types/FinishingIntern";
import AlarmingIntern from "~/types/AlarmingIntern";
import GeneralStatsModel from "~/types/GeneralStatsModel";

@Component
export default class Index extends Vue {
  uiModule!: Ui;
  latestInterns: LatestIntern[] = [
    {
      id: 1,
      fullName: "Mohamed Hariss",
      dateAdded: new Date()
    }
  ];
  finishingInterns: FinishingIntern[] = [
    {
      id: 2,
      fullName: "Abir Othmani",
      daysToFinish: 4
    }
  ];
  alarmingInterns: AlarmingIntern[] = [
    {
      id: 3,
      fullName: "Amin Driff",
      message: "Absence de 10 jours"
    }
  ];
  stats: GeneralStatsModel = { absentees: 1, readyToFinish: 3, total: 103 };

  created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Accueil");
  }
}
</script>

<style scoped>
.grid-view {
  display: grid;
  row-gap: 20px;
  column-gap: 30px;
  grid-template-columns: 600px 600px;
  grid-template-rows: 250px 250px;
  grid-template-areas:
    "latest  finishing"
    "alerts  stats";
}
.latest {
  grid-area: latest;
}
.finishing {
  grid-area: finishing;
}
.alerts {
  grid-area: alerts;
}
.stats {
  grid-area: stats;
}
</style>

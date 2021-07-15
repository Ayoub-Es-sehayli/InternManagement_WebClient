<template>
  <div class="stats-grid">
    <div class="absentees">{{ stats.absentees }} Absents Hier</div>
    <div class="ready">{{ stats.readyToFinish }} Prêts à finir</div>
    <hr class="sep" />
    <div class="total">{{ stats.total }} Total</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GeneralStatsModel from "@/types/GeneralStatsModel";
@Component
export default class GeneralStats extends Vue {
  @Prop()
  stats!: GeneralStatsModel;
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 20px 1fr;
  grid-template-areas:
    "absentees ready"
    "sep sep"
    "total total";
  column-gap: 30px;
  row-gap: 5px;
  font-size: 32px;
  font-weight: 500;
  justify-items: center;
}
.absentees {
  grid-area: absentees;
}
.ready {
  grid-area: ready;
}
.sep {
  grid-area: sep;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
}

.total {
  grid-area: total;
}
</style>

<template>
  <b-table :data="interns" per-page="5">
    <b-table-column field="fullName" label="Stagiaire" v-slot="props">{{
      props.row.fullName
    }}</b-table-column>
    <b-table-column field="daysToFinish" label="Période Restante" v-slot="props"
      >{{ props.row.daysToFinish }} jours</b-table-column
    >
    <b-table-column field="actions" label="Actions">
      <b-button type="is-info">
        <b-icon icon="information-outline"></b-icon>
      </b-button>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FinishingIntern from "@/types/FinishingIntern";
@Component
export default class FinishingInternsTable extends Vue {
  @Prop()
  interns!: FinishingIntern[];
}
</script>

<template>
  <b-table :data="interns" per-page="5">
    <b-table-column field="fullName" label="Stagiaire" v-slot="props">{{
      props.row.fullName
    }}</b-table-column>
    <b-table-column field="reason" label="Message d'Alerte" v-slot="props">{{
      props.row.reason
    }}</b-table-column>
    <b-table-column field="actions" label="Actions">
      <div>
        <b-button type="is-info">
          <b-icon icon="information-outline" class="action-btn"></b-icon>
        </b-button>
      </div>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AlarmingIntern from "@/types/AlarmingIntern";
@Component
export default class AlarmingInternsTable extends Vue {
  @Prop()
  interns!: AlarmingIntern[];
}
</script>
<style scoped></style>

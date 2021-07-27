<template>
  <b-table :data="interns">
    <b-table-column field="fullName" label="Stagiaire" v-slot="props">{{
      props.row.fullName
    }}</b-table-column>
    <b-table-column field="dateAdded" label="Date Ajouté" v-slot="props">{{
      props.row.dateAdded.toLocaleDateString("fr-FR")
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
import LatestIntern from "@/types/LatestIntern";

@Component
export default class Index extends Vue {
  @Prop()
  interns!: LatestIntern[];
}
</script>

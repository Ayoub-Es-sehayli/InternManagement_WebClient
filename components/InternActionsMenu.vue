<template>
  <div>
    <b-dropdown aria-role="list" position="is-bottom-left">
      <template #trigger>
        <slot name="trigger"></slot>
      </template>

      <b-dropdown-item aria-role="listitem" @click="showPrintModal"
        >Imprimer</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" @click="showDocumentModal"
        >Remplir Document</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem"
        >Reclamer au Staigaire</b-dropdown-item
      >
    </b-dropdown>
    <b-modal
      v-model="printModalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Sélectionner le document à imprimer"
      aria-modal
    >
      <template #default="props">
        <PrintForm @close="props.close" />
      </template>
    </b-modal>
    <b-modal
      v-model="documentModalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Remplir les details du document"
      aria-modal
    >
      <template #default="props">
        <DocumentForm @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class InternActionsMenu extends Vue {
  printModalVisible: boolean = false;
  documentModalVisible: boolean = false;

  showPrintModal() {
    this.printModalVisible = !this.printModalVisible;
  }

  showDocumentModal() {
    this.documentModalVisible = !this.documentModalVisible;
  }
}
</script>
<style scoped></style>

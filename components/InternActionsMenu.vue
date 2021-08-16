<template>
  <div>
    <b-dropdown aria-role="list" position="is-bottom-left">
      <template #trigger>
        <b-button type="is-warning">{{ btnText }}</b-button>
      </template>

      <b-dropdown-item
        aria-role="listitem"
        @click="showPrintModal"
        :disabled="!isEditable"
        >Imprimer</b-dropdown-item
      >
      <b-dropdown-item
        aria-role="listitem"
        @click="showDocumentModal"
        :disabled="!isEditable"
        >Remplir Document</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem"
        >Reclamer au Staigaire</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" :disabled="!isEditable"
        >Modifier ce stagiaire</b-dropdown-item
      >
    </b-dropdown>
    <b-modal
      v-model="printModalVisible"
      :state="state"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Sélectionner le document à imprimer"
      aria-modal
    >
      <template #default="props">
        <PrintForm @close="props.close" :id="idIntern" :state="state" />
      </template>
    </b-modal>
    <b-modal
      v-model="documentModalVisible"
      :state="state"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Remplir les details du document"
      aria-modal
    >
      <template #default="props">
        <DocumentForm
          @close="props.close"
          :id="idIntern"
          @changed="handleDocumentModalChanged()"
          :state="state"
        />
      </template>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { eInternState } from "~/types/eInternState";

@Component
export default class ContextDropdown extends Vue {
  @Prop()
  idIntern!: number;

  @Prop()
  btnText!: string;

  @Prop()
  state!: eInternState;

  printModalVisible: boolean = false;
  documentModalVisible: boolean = false;

  showPrintModal() {
    this.printModalVisible = !this.printModalVisible;
  }

  showDocumentModal() {
    this.documentModalVisible = !this.documentModalVisible;
  }
  handleDocumentModalChanged() {
    this.$emit("changed");
    this.documentModalVisible = false;
  }

  get isEditable(): boolean {
    switch (this.state) {
      case eInternState.FileClosed:
      case eInternState.Cancelled:
        return false;

      default:
        return true;
    }
  }
}
</script>
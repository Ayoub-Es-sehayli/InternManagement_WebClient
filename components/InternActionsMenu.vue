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
      >
        <div>
          <b-icon icon="printer" size="is-small"></b-icon>
          Imprimer
        </div>
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        @click="showDocumentModal"
        :disabled="!isEditable"
        ><div>
          <b-icon icon="file-document-edit" size="is-small"></b-icon> Remplir
          Document
        </div></b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem"
        ><div>
          <b-icon icon="email-alert" size="is-small"></b-icon>
          Reclamer au Staigaire
        </div></b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" :disabled="!isEditable"
        ><div>
          <b-icon icon="account-edit" size="is-small"></b-icon>
          <nuxt-link class="link" :to="'/InternForm/' + idIntern"
            >Modifier ce stagiaire</nuxt-link
          >
        </div></b-dropdown-item
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
        <PrintForm @close="props.close" :id="idIntern" :state="state" />
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

<style scoped>
.link {
  color: #0a0a0a;
}
</style>
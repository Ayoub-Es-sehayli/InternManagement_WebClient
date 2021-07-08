<template>
  <form action="" class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Imprimer un Document</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <b-radio v-model="selection" :native-value="0" name="document"
        >Decision</b-radio
      >
      <b-radio v-model="selection" :native-value="1" name="document"
        >Attestation</b-radio
      >
      <b-radio v-model="selection" :native-value="2" name="document"
        >Annulation</b-radio
      >
    </section>
    <footer class="modal-card-foot modal-actions">
      <b-button
        icon-left="cancel"
        label="Annuler"
        class="cancel-btn"
        @click="$emit('close')"
      />
      <b-button icon-left="printer" label="Imprimer" class="print-btn" />
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eDocuments } from "@/types/eDocuments";
@Component
export default class PrintForm extends Vue {
  selection: eDocuments = eDocuments.Decision;
}
</script>

<style>
.modal-actions {
  justify-content: right;
}

.print-btn {
  color: white;
  background-color: #246530;
}

.cancel-btn {
  color: white;
  background-color: #e4353e;
}
</style>

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
      <b-button
        icon-left="printer"
        label="Imprimer"
        class="print-btn"
        @click="printDocument()"
        :loading="printLoading"
      />
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eDocuments } from "@/types/eDocuments";
import printJS from "print-js";
const jade = require("jade");
@Component
export default class PrintForm extends Vue {
  @Prop()
  id!: number;
  selection: eDocuments = eDocuments.Decision;
  printLoading: boolean = false;
  public printDocument() {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    this.printLoading = true;
    switch (this.selection) {
      case eDocuments.Decision:
        this.$axios
          .$get(process.env.BASE_URL + "/print/decision/" + this.id)
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: data.currentYear,
              fullname: data.fullName,
              responsable: data.responsable,
              department: data.department,
              startDate: new Date(data.startDate).toLocaleDateString("fr-FR"),
              endDate: new Date(data.endDate).toLocaleDateString("fr-FR"),
            });
            printJS({ printable: html, type: "raw-html" });
          })
          .catch((error) => console.log(error))
          .finally(() => {
            this.printLoading = false;
          });
        break;

      case eDocuments.Attestation:
        this.$axios
          .$get(process.env.BASE_URL + "/print/attestation/" + this.id)
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: data.currentYear,
              fullname: data.fullName,
              location: data.location,
              startDate: new Date(data.startDate).toLocaleDateString("fr-FR"),
              endDate: new Date(data.endDate).toLocaleDateString("fr-FR"),
            });
            printJS({ printable: html, type: "raw-html" });
          })
          .catch((error) => console.log(error))
          .finally(() => {
            this.printLoading = false;
          });
        break;
      case eDocuments.Annulation:
        this.$axios
          .$get(process.env.BASE_URL + "/print/annulation/" + this.id)
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: data.currentYear,
              decisionDate: new Date(data.decisionDate).toLocaleDateString(
                "fr-FR"
              ),
              decisionCode: data.decisionCode,
              fullname: data.fullName,
              department: data.department,
              startDate: new Date(data.startDate).toLocaleDateString("fr-FR"),
              endDate: new Date(data.endDate).toLocaleDateString("fr-FR"),
              annulationDate: new Date(data.annulationDate).toLocaleDateString(
                "fr-FR"
              ),
            });
            printJS({ printable: html, type: "raw-html" });
          })
          .catch((error) => console.log(error))
          .finally(() => {
            this.printLoading = false;
          });
        break;
    }
  }
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

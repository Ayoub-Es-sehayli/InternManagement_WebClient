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
import { Component, Vue } from "vue-property-decorator";
import { eDocuments } from "@/types/eDocuments";
import printJS from "print-js";
const jade = require("jade");
@Component
export default class PrintForm extends Vue {
  selection: eDocuments = eDocuments.Decision;
  printLoading: boolean = false;
  public printDocument() {
    this.printLoading = true;
    switch (this.selection) {
      case eDocuments.Decision:
        this.$axios
          .$get(process.env.BASE_URL + "/print/decision/1")
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: 2021,
              fullname: "ahmed tazi",
              division: "Departement SI",
              startDate: "06/05/2021",
              endDate: "06/07/2021",
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
          .$get(process.env.BASE_URL + "/print/attestation/1")
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: 2021,
              fullname: "ahmed tazi",
              location: "al omrane rsk",
              startDate: "06/05/2021",
              endDate: "06/07/2021",
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
          .$get(process.env.BASE_URL + "/print/annulation/1")
          .then((data) => {
            let html = jade.render(data.template, {
              currentYear: 2021,
              decisionDate: "06/08/2021",
              fullname: "ahmed tazi",
              direction: "Rh",
              startDate: "06/05/2021",
              endDate: "06/07/2021",
              annulationDate: "01/06/2021",
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

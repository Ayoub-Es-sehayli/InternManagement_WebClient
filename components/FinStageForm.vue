<template>
  <form action="" class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Gérer les documents de fin stage</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <b-field grouped>
        <b-switch v-model="reportDto.exists" @input="toModel()"
          >Rapport</b-switch
        >
        <b-checkbox
          v-if="reportDto.exists"
          v-model="reportDto.valid"
          @input="toModel()"
          >{{ reportValidity() }}</b-checkbox
        >
      </b-field>
      <b-switch
        v-model="documents.evalutionForm"
        :false-value="missing"
        :true-value="submitted"
      >
        Fiche d'évaluation
      </b-switch>
    </section>
    <footer class="modal-card-foot modal-actions">
      <b-button
        icon-left="cancel"
        label="Annuler"
        class="cancel-btn"
        @click="$emit('close')"
      />
      <b-button icon-left="content-save" label="Sauvegarder" class="save-btn" />
    </footer>
  </form>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eDocumentState } from "~/types/eDocumentState";

type Documents = {
  report: eDocumentState;
  evalutionForm: eDocumentState;
};

type ReportDTO = {
  exists: boolean;
  valid: boolean;
};

@Component({
  name: "fin-stage-form",
})
export default class FinStageForm extends Vue {
  documents: Documents = {
    report: eDocumentState.Valid,
    evalutionForm: eDocumentState.Missing,
  };
  reportDto: ReportDTO = {
    exists: false,
    valid: false,
  };
  missing = eDocumentState.Missing;
  submitted = eDocumentState.Submitted;
  valid = eDocumentState.Valid;
  invalid = eDocumentState.Invalid;

  created() {
    this.toDto();
  }

  toDto() {
    if (this.documents.report == eDocumentState.Missing) {
      this.reportDto = {
        exists: false,
        valid: false,
      };
    } else if (this.documents.report == eDocumentState.Invalid) {
      this.reportDto = {
        exists: true,
        valid: false,
      };
    } else if (this.documents.report == eDocumentState.Valid) {
      this.reportDto = {
        exists: true,
        valid: true,
      };
    }
  }

  toModel() {
    if (this.reportDto.exists) {
      if (this.reportDto.valid) {
        this.documents.report = eDocumentState.Valid;
      } else {
        this.documents.report = eDocumentState.Invalid;
      }
    } else {
      this.documents.report = eDocumentState.Missing;
    }
  }

  reportValidity() {
    if (!this.reportDto.valid) {
      return "Invalid";
    }
    return "Valid";
  }
}
</script>
<style scoped>
.modal-actions {
  justify-content: right;
}

.save-btn {
  color: white;
  background-color: #246530;
}

.cancel-btn {
  color: white;
  background-color: #e4353e;
}
</style>

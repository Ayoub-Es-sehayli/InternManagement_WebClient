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
      <b-button
        icon-left="content-save"
        label="Sauvegarder"
        class="save-btn"
        :loading="saving"
        @click="save()"
      />
    </footer>
  </form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
  @Prop()
  viewModel!: eDocumentState[];

  @Prop()
  id!: number;

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

  saving: boolean = false;
  created() {
    if (this.viewModel) {
      this.documents.report = this.viewModel[4];
      this.documents.evalutionForm = this.viewModel[5];
    }
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
  toVM() {
    this.viewModel[4] = this.documents.report;
    this.viewModel[5] = this.documents.evalutionForm;
  }
  reportValidity() {
    if (!this.reportDto.valid) {
      return "Invalid";
    }
    return "Valid";
  }

  save() {
    this.saving = true;
    this.$axios
      .$put(
        process.env.BASE_URL + "/interns/documents/" + this.id,
        this.documents
      )
      .then((_) => {
        this.$buefy.toast.open(
          "Les Information ont étaient enregistrées avec succès!"
        );
        this.toVM();
      })
      .catch((err) => {
        console.log(err);
        this.$buefy.toast.open("Le sauvegarde a échoué.");
      })
      .finally(() => {
        this.saving = false;
      });
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

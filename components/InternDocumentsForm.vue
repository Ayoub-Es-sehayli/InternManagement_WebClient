<template>
  <div class="grid-form">
    <b-collapse class="demande card" animation="slide">
      <template #trigger>
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Demande</p>
        </div>
      </template>
      <div class="card-content demande-grid">
        <b-switch
          class="cv"
          v-model="documents[0]"
          :false-value="missing"
          :true-value="submitted"
          >CV</b-switch
        >
        <b-switch
          class="letter"
          v-model="documents[1]"
          :false-value="missing"
          :true-value="submitted"
          >Lettre de demande</b-switch
        >
        <b-switch
          class="insurance"
          v-model="documents[2]"
          :false-value="missing"
          :true-value="submitted"
          >Assurance</b-switch
        >
        <b-switch
          v-if="convention"
          class="convention"
          v-model="documents[3]"
          :false-value="missing"
          :true-value="submitted"
          >Convention</b-switch
        >
      </div>
    </b-collapse>
    <b-collapse v-if="isEdit" class="fin-stage card" animation="slide">
      <template #trigger>
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Fin Stage</p>
        </div>
      </template>
      <div class="card-content fin-stage-grid">
        <b-field grouped class="report">
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
          class="eval-form"
          v-model="documents[5]"
          :false-value="missing"
          :true-value="submitted"
        >
          Fiche d'évaluation
        </b-switch>
      </div>
    </b-collapse>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { eDocumentState } from "~/types/eDocumentState";
import ReportDTO from "@/types/ReportDto";

@Component
export default class InternDocumentsForm extends Vue {
  @Prop()
  convention!: boolean;

  @Prop()
  documents!: eDocumentState[];

  @Prop()
  isEdit!: boolean;

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
    if (this.documents[4] == eDocumentState.Missing) {
      this.reportDto = {
        exists: false,
        valid: false,
      };
    } else if (this.documents[4] == eDocumentState.Invalid) {
      this.reportDto = {
        exists: true,
        valid: false,
      };
    } else if (this.documents[4] == eDocumentState.Valid) {
      this.reportDto = {
        exists: true,
        valid: true,
      };
    }
  }

  toModel() {
    if (this.reportDto.exists) {
      if (this.reportDto.valid) {
        this.documents[4] = eDocumentState.Valid;
      } else {
        this.documents[4] = eDocumentState.Invalid;
      }
    } else {
      this.documents[4] = eDocumentState.Missing;
    }
  }

  reportValidity() {
    if (!this.reportDto.valid) {
      return "Invalid";
    }
    return "Valid";
  }

  get FinStageDocuments() {
    return [this.documents[4], this.documents[5]];
  }
}
</script>
<style scoped>
.grid-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "demande"
    "fin-stage";
}
.demande {
  grid-area: demande;
}
.demande-grid {
  display: grid;
  padding: 15px;
  column-gap: 20px;
  row-gap: 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "cv        letter"
    "insurance convention";
}

.fin-stage {
  grid-area: fin-stage;
  margin-top: 30px;
}
</style>

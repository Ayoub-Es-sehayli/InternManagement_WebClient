<template>
  <div class="info-grid">
    <div class="decision">
      <b-icon icon="paperclip"></b-icon> <strong>DOCH/DtRH</strong>
      {{ intern.codeDecision }}
    </div>
    <div class="date">
      <b-icon icon="calendar-text"></b-icon>
      <strong>De</strong> {{ intern.startDate.toLocaleDateString("fr-FR") }}
      <strong>à</strong>
      {{ intern.endDate.toLocaleDateString("fr-FR") }}<br />
      ({{ monthDiff(intern.startDate, intern.endDate) }} mois)
    </div>
    <div class="department">
      <b-icon icon="domain"></b-icon> {{ intern.department }}
    </div>
    <div class="contact-info">
      {{ intern.email }}<br />
      {{ intern.phone }}
    </div>
    <div class="state">
      <b-icon icon="account-box-outline"></b-icon
      >{{ uiModule.internStates[intern.state - 1] }}
    </div>
    <div class="dossier"><b-icon icon="inbox-multiple"></b-icon>Dossier</div>
    <div class="actions">
      <InternActionsMenu>
        <template #trigger>
          <b-button type="is-warning" icon-left="pencil" stretch>
            Options
          </b-button>
        </template>
      </InternActionsMenu>
    </div>
    <div>
      <b-datepicker
        :events="intern.absentDays"
        :min-date="intern.startDate"
        :max-date="intern.endDate"
      >
        <template #trigger>
          <b-button expanded class="absence-info"
            >Absenté {{ intern.absentDays.length }} jours</b-button
          >
        </template>
      </b-datepicker>
    </div>
    <div class="documents">
      <b-tooltip
        v-for="(document, index) in getInternDocumentList()"
        :key="document"
        :label="getDocumentTooltipLabel(intern.documents[index])"
      >
        <b-button
          expanded
          rounded
          :class="getDocumentClass(intern.documents[index])"
        >
          {{ document }}
        </b-button>
      </b-tooltip>
    </div>
    <b-button class="proceed-btn" @click="showEndModal()" expanded
      >Procèder à Fin de stage</b-button
    >
    <b-modal
      v-model="endModalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Gérer les documents de fin stage"
      aria-modal
    >
      <template #default="props">
        <FinStageForm @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";
import { eDocumentState } from "@/types/eDocumentState";
import { eInternState } from "@/types/eInternState";

type AbsentDays = {
  date: Date;
  type: String;
};
type Intern = {
  codeDecision: String;
  department: String;
  fullName: String;
  email: String;
  phone: String;
  startDate: Date;
  endDate: Date;
  documents: eDocumentState[];
  absentDays: AbsentDays[];
  state: eInternState;
};
@Component({
  name: "intern-info",
})
export default class InternInfo extends Vue {
  uiModule!: Ui;
  intern!: Intern;
  endModalVisible: boolean = false;

  created() {
    this.intern = {
      codeDecision: "1190/2021",
      department: "Direction Organisation et Capital Humain",
      fullName: "Mohamed Hariss",
      email: "mohamed.hariss@gmail.com",
      phone: "0670088893",
      startDate: new Date("7/1/2021"),
      endDate: new Date("8/10/2021"),
      documents: [
        eDocumentState.Submitted,
        eDocumentState.Submitted,
        eDocumentState.Missing,
        eDocumentState.Missing,
        eDocumentState.Invalid,
        eDocumentState.Submitted,
      ],
      absentDays: [
        { date: new Date("7/7/2021"), type: "is-danger" },
        { date: new Date("7/12/2021"), type: "is-danger" },
        { date: new Date("7/22/2021"), type: "is-danger" },
      ],
      state: eInternState.Started,
    };
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle(this.intern.fullName);
  }

  getDocumentClass(documentState: eDocumentState) {
    switch (documentState) {
      case eDocumentState.Missing:
        return "document document-danger";
      case eDocumentState.Valid:
      case eDocumentState.Submitted:
        return "document document-success";
      case eDocumentState.Invalid:
        return "document document-warning";
    }
  }

  getDocumentTooltipLabel(documentState: eDocumentState) {
    switch (documentState) {
      case eDocumentState.Missing:
        return this.uiModule.documentState[documentState];
      case eDocumentState.Valid:
        return this.uiModule.documentState[documentState];
      case eDocumentState.Submitted:
        return this.uiModule.documentState[documentState];
      case eDocumentState.Invalid:
        return this.uiModule.documentState[documentState];
    }
  }

  getInternDocumentList(): String[] {
    if (this.monthDiff(this.intern.startDate, this.intern.endDate) > 1) {
      return [
        "CV",
        "Lettre de demande",
        "Assurance",
        "Convention",
        "Rapport",
        "Fiche d'évaluation",
      ];
    }
    return [
      "CV",
      "Lettre de demande",
      "Assurance",
      "Rapport",
      "Fiche d'évaluation",
    ];
  }

  monthDiff(start: Date, end: Date) {
    var time = end.getTime() - start.getTime();

    var days = time / (1000 * 3600 * 24);

    return Math.round(days / 30);
  }

  showEndModal() {
    this.endModalVisible = !this.endModalVisible;
  }
}
</script>

<style scoped>
.info-grid {
  display: grid;
  margin-top: 50px;
  padding: 10px;
  align-self: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 15px;
  column-gap: 20px;
  font-size: 18px;
  grid-template-areas:
    "decision     state       actions"
    "contact-info date        department"
    "dossier      dossier     absence-info"
    "documents    documents   documents"
    "documents    documents   documents"
    ".  proceed-btn .";
}
.contact-info {
  grid-area: contact-info;
}
.documents {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-area: documents;
  column-gap: 20px;
}

.document {
  font-weight: 500;
}

.document-success {
  color: white;
  background-color: #246530;
}

.document-warning {
  color: #44342e;
  background-color: #fbc02d;
}

.document-danger {
  color: white;
  background-color: #e4353e;
}
.decision {
  grid-area: decision;
}
.date {
  grid-area: date;
  text-align: center;
}
.department {
  grid-area: department;
}
.state {
  grid-area: state;
}
.dossier {
  grid-area: dossier;
}
.proceed-btn {
  color: white;
  background-color: #246530;
  grid-area: proceed-btn;
  grid-column: 2 / 3;
}

.absence-info {
  color: black;
  background-color: #cecece;
  grid-area: absence-info;
}

.actions {
  justify-self: center;
  grid-area: actions;
}
</style>

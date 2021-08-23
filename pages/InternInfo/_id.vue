<template>
  <div class="info-grid">
    <div class="decision">
      <div v-if="!internLoading">
        <b-icon icon="paperclip"></b-icon> <strong>DOCH/DtRH</strong>
        {{ intern.decision }}
      </div>
      <b-skeleton size="is-large" :active="internLoading"></b-skeleton>
    </div>
    <div class="date">
      <div v-if="!internLoading">
        <b-icon icon="calendar-text"></b-icon>
        <strong>De</strong> {{ intern.startDate.toLocaleDateString("fr-FR") }}
        <strong>à</strong>
        {{ intern.endDate.toLocaleDateString("fr-FR") }}<br />
        ({{ monthDiff(intern.startDate, intern.endDate) }} mois)
      </div>
      <b-skeleton size="is-large" :active="internLoading"></b-skeleton>
    </div>
    <div class="division">
      <div v-if="!internLoading">
        <b-icon icon="domain"></b-icon> {{ intern.division }}
      </div>
      <b-skeleton size="is-large" :active="internLoading"></b-skeleton>
    </div>
    <div class="contact-info">
      <div v-if="!internLoading">
        {{ intern.email }}<br />
        {{ intern.phone }}
      </div>
      <b-skeleton size="is-large" :active="internLoading"></b-skeleton>
    </div>
    <div class="state">
      <div v-if="!internLoading">
        <b-icon icon="account-box-outline"></b-icon
        >{{ uiModule.internStates[intern.state - 1] }}
      </div>
    </div>
    <div class="dossier"><b-icon icon="inbox-multiple"></b-icon>Dossier</div>
    <div class="actions">
      <InternActionsMenu
        btn-text="Options"
        :id-intern="intern.id"
        :state="intern.state"
        @changed="LoadIntern()"
      />
    </div>
    <div>
      <div v-if="!internLoading">
        <b-datepicker
          indicators="bars"
          :unselectable-days-of-week="[0, 6]"
          :first-day-of-week="1"
          :events="intern.attendanceDays"
          :min-date="intern.startDate"
          :max-date="intern.endDate"
          locale="fr-FR"
        >
          <template #trigger>
            <b-button expanded class="absence-info"
              >Absenté {{ absenceCount }} jours</b-button
            >
          </template>
        </b-datepicker>
      </div>
      <b-skeleton size="is-large" :active="internLoading"></b-skeleton>
    </div>
    <div class="documents" v-if="!internLoading">
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
        <FinStageForm :view-model="intern.documents" @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import InternModule from "@/store/InternModule";
import { store } from "@/store/index";
import { eDocumentState } from "@/types/eDocumentState";
import { eInternState } from "@/types/eInternState";

type AttendanceDay = {
  date: Date;
  type: String;
};
type Intern = {
  id: number;
  fullName: String;
  decision: String;
  division: String;
  responsable: String;
  email: String;
  phone: String;
  startDate: Date;
  endDate: Date;
  documents: eDocumentState[];
  attendanceDays: AttendanceDay[];
  state: eInternState;
};
@Component({
  name: "intern-info",
})
export default class InternInfo extends Vue {
  uiModule!: Ui;
  intern: Intern = {
    id: -1,
    decision: "",
    division: "",
    fullName: "",
    email: "",
    phone: "",
    responsable: "",
    startDate: new Date(),
    endDate: new Date(),
    documents: [
      eDocumentState.Missing,
      eDocumentState.Missing,
      eDocumentState.Missing,
      eDocumentState.Missing,
      eDocumentState.Missing,
      eDocumentState.Missing,
    ],
    attendanceDays: [],
    state: -1,
  };
  endModalVisible: boolean = false;
  internLoading: boolean = true;

  created() {
    this.uiModule = getModule(Ui, store);
    this.LoadIntern();
  }
  LoadIntern() {
    if (this.$route.params.id) {
      this.$axios
        .$get(process.env.BASE_URL + "/interns/info/" + this.$route.params.id)
        .then((data: Intern) => {
          this.intern = data;
          this.intern.startDate = new Date(data.startDate);
          this.intern.endDate = new Date(data.endDate);
          this.intern.attendanceDays.forEach((day) => {
            day.date = new Date(day.date);
          });
          this.uiModule.setTitle(this.intern.fullName);
        })
        .finally(() => (this.internLoading = false));
    }
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
  get absenceCount() {
    return this.intern.attendanceDays.filter((day) => day.type == "is-danger")
      .length;
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
    "contact-info date        division"
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
.division {
  grid-area: division;
}
.state {
  grid-area: state;
  justify-self: center;
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

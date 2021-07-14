<template>
  <b-steps animated rounded class="form-steps">
    <b-step-item step="1" label="Information Personnels" clickable>
      <InternInfoForm :info="intern.info" :validators="infoValidator" />
    </b-step-item>
    <b-step-item step="2" label="Stage" clickable>
      <InternshipInfoForm
        :internship="intern.internship"
        :validators="internshipValidator"
      />
    </b-step-item>
    <b-step-item step="3" label="Documents" clickable>
      <InternDocumentsForm
        :isEdit="true"
        :documents="intern.documents"
        :convention="conventionVisible"
      />
    </b-step-item>

    <template #navigation="{previous, next}">
      <b-button
        icon-left="chevron-left"
        :disabled="previous.disabled"
        @click.prevent="previous.action"
        class="prev-btn"
      >
        Précedent
      </b-button>
      <b-button
        :icon-right="next.disabled ? 'account-plus' : 'chevron-right'"
        @click.prevent="nextAction(next)"
        class="next-btn"
      >
        {{ getNextLabel(next.disabled) }}
      </b-button>
    </template>
  </b-steps>
</template>

<script lang="ts">
import { DialogProgrammatic as Dialog } from "buefy";
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "~/store";
import Ui from "~/store/ui";
import { eGender } from "@/types/eGender";
import { eDocumentState } from "~/types/eDocumentState";
import Intern from "@/types/Intern";
import { InfoValidators, InternshipValidators } from "@/types/Validator";

@Component
export default class InternForm extends Vue {
  uiModule!: Ui;
  activeStep: number = 1;
  intern: Intern = {
    info: {
      gender: eGender.Male,
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    internship: {
      startDate: new Date(),
      endDate: new Date(),
      department: 1
    },
    documents: []
  };

  created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Fiche de Stagiaire");
    this.intern = {
      info: {
        gender: eGender.Male,
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      internship: {
        startDate: new Date(),
        endDate: new Date(),
        department: -1
      },
      documents: [
        eDocumentState.Submitted,
        eDocumentState.Missing,
        eDocumentState.Missing,
        eDocumentState.Missing,
        eDocumentState.Missing,
        eDocumentState.Submitted
      ]
    };
  }

  monthDiff(start: Date, end: Date) {
    var time = end.getTime() - start.getTime();

    var days = time / (1000 * 3600 * 24);

    return Math.round(days / 30);
  }

  get conventionVisible() {
    return (
      this.monthDiff(
        this.intern.internship.startDate,
        this.intern.internship.endDate
      ) > 1
    );
  }

  getNextLabel(isFinalStep: boolean) {
    return isFinalStep ? "Confirmer" : "Suivant";
  }
  nextAction(next: any) {
    if (!next.disabled) {
      next.action();
    } else {
      if (this.validate) {
        Dialog.confirm({
          title: "Confirmation",
          message: "Êtes-vous sûre des informations saisis?"

          // onConfirm: // TODO: Launch the Save process step
        });
      } else {
        // if (!this.internshipValidator.dates.state) {
        //   message += this.internshipValidator.dates.message + "<br/>";
        // }
        Dialog.alert({
          title: "Alertes",
          message: "Il y a des erreurs dans votre formulaire!",
          hasIcon: true,
          type: "is-danger"
        });
      }
    }
  }
  get lastNameValid() {
    return this.intern.info.lastName.length > 3;
  }
  get firstNameValid() {
    return this.intern.info.firstName.length > 3;
  }
  get emailValid() {
    return this.intern.info.email.length > 10;
  }
  get phoneValid() {
    return this.intern.info.phone.length >= 10;
  }
  get datesValid() {
    return this.intern.internship.endDate > this.intern.internship.startDate;
  }
  get departmentValid() {
    return this.intern.internship.department !== 0;
  }
  get documentsValid() {
    if (this.conventionVisible) {
      return (
        this.intern.documents[0] != eDocumentState.Missing &&
        this.intern.documents[1] != eDocumentState.Missing &&
        this.intern.documents[2] != eDocumentState.Missing
        // this.intern.documents[3] != eDocumentState.Missing
      );
    } else {
      return (
        this.intern.documents[0] != eDocumentState.Missing &&
        this.intern.documents[1] != eDocumentState.Missing &&
        this.intern.documents[2] != eDocumentState.Missing
      );
    }
  }
  get infoValidator(): InfoValidators {
    return {
      firstName: {
        state: this.firstNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères"
      },
      lastName: {
        state: this.lastNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères"
      },
      email: {
        state: this.emailValid,
        message: "Ce Champs doit comporter au moins 7 caractères"
      },
      phone: {
        state: this.phoneValid,
        message: "Ce Champs doit comporter au moins 10 caractères"
      }
    };
  }
  get internshipValidator(): InternshipValidators {
    return {
      dates: {
        state: this.datesValid,
        message:
          "La date de départ doit être antérieure à la date de fin de stage"
      },
      department: {
        state: this.departmentValid,
        message: "Une Entité doit être sélectionnée"
      }
    };
  }

  get validate() {
    return (
      this.lastNameValid &&
      this.firstNameValid &&
      this.emailValid &&
      this.phoneValid &&
      this.datesValid &&
      this.departmentValid &&
      this.documentsValid
    );
  }
}
</script>

<style scoped>
.form-steps {
  width: 70vw;
}
.prev-btn {
  color: #e4353e;
  border-color: #e4353e;
}
.next-btn {
  color: #246530;
  border-color: #246530;
}
</style>

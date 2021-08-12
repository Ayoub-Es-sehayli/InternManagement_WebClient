<template>
  <b-steps animated rounded class="form-steps">
    <b-step-item step="1" label="Information Personnels" clickable>
      <InternInfoForm :info="intern.info" :validators="infoValidator" />
    </b-step-item>
    <b-step-item step="2" label="Stage" clickable>
      <InternshipInfoForm
        :internship="intern.internship"
        :validators="internshipValidator"
        :departments="departments"
        :departments-loading="departmentsLoading"
      />
    </b-step-item>
    <b-step-item step="3" label="Documents" clickable>
      <InternDocumentsForm
        :isEdit="true"
        :documents="intern.documents"
        :convention="conventionVisible"
      />
    </b-step-item>

    <template #navigation="{ previous, next }">
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
import { InfoValidators, InternshipValidators } from "@/types/Validator";
import InternInformation from "~/types/InternInformation";
import InternshipInformation from "~/types/InternshipInformation";
import InternModule from "~/store/InternModule";
import Department from "@/types/Department";
type FormDto = {
  id: number;
  info: InternInformation;
  internship: InternshipInformation;
  documents: eDocumentState[];
};
@Component
export default class InternForm extends Vue {
  uiModule!: Ui;
  internModule!: InternModule;
  activeStep: number = 1;
  departments: Department[] = [];
  departmentsLoading: boolean = true;
  saving: boolean = false;
  intern: FormDto = {
    id: 0,
    info: {
      gender: eGender.Male,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    internship: {
      startDate: new Date(),
      endDate: new Date(),
      division: 1,
      responsable: "",
    },
    documents: [0, 0, 0, 0, 0, 0],
  };
  async created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Fiche de Stagiaire");
    this.internModule = getModule(InternModule, store);
    if (this.$route.params.id) {
      await this.internModule.LoadIntern(parseInt(this.$route.params.id));
      const currentIntern = this.internModule.currentIntern!!;
      this.intern = {
        id: currentIntern.id,
        info: {
          gender: currentIntern.gender,
          firstName: currentIntern.firstName,
          lastName: currentIntern.lastName,
          email: currentIntern.email,
          phone: currentIntern.phone,
        },
        internship: {
          startDate: currentIntern.startDate,
          endDate: currentIntern.endDate,
          division: currentIntern.divisionId,
          responsable: currentIntern.responsable,
        },
        documents: currentIntern.documents,
      };
    }

    this.$axios
      .$get(process.env.BASE_URL + "/ui/divisions")
      .then((data: Department[]) => {
        this.uiModule.setDepartments(data);
        this.departments = this.uiModule.departments!!;
        this.departmentsLoading = false;
      });
  }
  submitIntern() {
    this.saving = true;
    if (this.$route.params.id) {
      // TODO: PUT edit Intern
    } else {
      this.$axios
        .$post(process.env.BASE_URL + "/interns", {
          gender: this.intern.info.gender,
          firstName: this.intern.info.firstName,
          lastName: this.intern.info.lastName,
          email: this.intern.info.email,
          phone: this.intern.info.phone,
          startDate: this.intern.internship.startDate,
          endDate: this.intern.internship.endDate,
          divisionId: this.intern.internship.division,
          responsable: this.intern.internship.responsable,
          documents: this.intern.documents,
        })
        .catch((err) => {
          console.log(err);
          this.$buefy.toast.open({
            message: "Le sauvegarde du stagiaire a échoué",
            type: "is-danger",
            position: "is-bottom-right",
          });
        })
        .finally(() => {
          this.saving = false;
          this.$buefy.toast.open("Les informations sont enregistrées");
        });
    }
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
          message: "Êtes-vous sûre des informations saisis?",
          onConfirm: () => this.submitIntern(),
          // TODO: Launch the Save process step
        });
      } else {
        Dialog.alert({
          title: "Alertes",
          message: "Il y a des erreurs dans votre formulaire!",
          hasIcon: true,
          type: "is-danger",
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
  get divisionValid() {
    return this.intern.internship.division !== 0;
  }
  get responsableValid() {
    return this.intern.internship.responsable.length > 5;
  }
  get documentsValid() {
    if (this.conventionVisible) {
      return (
        this.intern.documents[0] != eDocumentState.Missing &&
        this.intern.documents[1] != eDocumentState.Missing &&
        this.intern.documents[2] != eDocumentState.Missing
        // this.documents[3] != eDocumentState.Missing
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
        message: "Ce Champs doit comporter au moins 3 caractères",
      },
      lastName: {
        state: this.lastNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères",
      },
      email: {
        state: this.emailValid,
        message: "Ce Champs doit comporter au moins 7 caractères",
      },
      phone: {
        state: this.phoneValid,
        message: "Ce Champs doit comporter au moins 10 caractères",
      },
    };
  }
  get internshipValidator(): InternshipValidators {
    return {
      dates: {
        state: this.datesValid,
        message:
          "La date de départ doit être antérieure à la date de fin de stage",
      },
      division: {
        state: this.divisionValid,
        message: "Une Entité doit être sélectionnée",
      },
      responsable: {
        state: this.responsableValid,
        message: "Un Reponsable doît accorder ce stage",
      },
    };
  }
  get validate() {
    return (
      this.lastNameValid &&
      this.firstNameValid &&
      this.emailValid &&
      this.phoneValid &&
      this.datesValid &&
      this.divisionValid &&
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

<template>
  <b-steps animated rounded class="form-steps">
    <b-step-item step="1" label="Information Personnels" clickable>
      <InternInfoForm
        :info="intern.info"
        :validators="infoValidator"
        :loading="internLoading"
      />
    </b-step-item>
    <b-step-item step="2" label="Stage" clickable>
      <InternshipInfoForm
        :internship="intern.internship"
        :validators="internshipValidator"
        :departments="departments"
        :departments-loading="departmentsLoading"
        :loading="internLoading"
      />
    </b-step-item>
    <b-step-item step="3" label="Documents" clickable>
      <InternDocumentsForm
        :isEdit="isEdit"
        :documents="intern.documents"
        :convention="conventionVisible"
        :loading="internLoading"
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
import InternModule from "~/store/InternModule";
import Department from "@/types/Department";
import Intern from "~/types/Intern";
import FormDto from "@/types/FormDto";

@Component
export default class InternForm extends Vue {
  uiModule!: Ui;
  internModule!: InternModule;
  activeStep: number = 1;
  departments: Department[] = [];
  departmentsLoading: boolean = true;
  internLoading: boolean = false;
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

    this.$axios
      .$get(process.env.BASE_URL + "/ui/divisions")
      .then((data: Department[]) => {
        this.uiModule.setDepartments(data);
        this.departments = this.uiModule.departments!!;
        this.departmentsLoading = false;
      });

    if (this.$route.params.id) {
      this.internLoading = true;
      this.$axios
        .$get(process.env.BASE_URL + "/interns/" + this.$route.params.id)
        .then((data: Intern) => {
          this.internModule.LoadIntern(data);
          this.intern = this.internModule.currentIntern!!;
        })
        .finally(() => {
          this.internLoading = false;
        });
    }
  }
  submitIntern() {
    this.saving = true;
    const payload = {
      id: -1,
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
    };
    let req: Promise<any> | null = null;
    if (this.$route.params.id) {
      payload.id = parseInt(this.$route.params.id);
      req = this.$axios.$put(
        process.env.BASE_URL + "/interns/" + this.$route.params.id,
        payload
      );
    } else {
      req = this.$axios.$post(process.env.BASE_URL + "/interns", payload);
    }
    req
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
        this.$router.push("/InternInfo/" + this.$route.params.id);
      });
  }
  monthDiff(start: Date, end: Date) {
    var time = end.getTime() - start.getTime();

    var days = time / (1000 * 3600 * 24);

    return Math.round(days / 30);
  }
  get conventionVisible() {
    return this.intern.internship
      ? this.monthDiff(
          this.intern.internship.startDate,
          this.intern.internship.endDate
        ) > 1
      : 0;
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
    return this.intern.info ? this.intern.info.lastName.length > 3 : true;
  }
  get firstNameValid() {
    return this.intern.info ? this.intern.info.firstName.length > 3 : true;
  }
  get emailValid() {
    return this.intern.info ? this.intern.info.email.length > 10 : true;
  }
  get phoneValid() {
    return this.intern.info ? this.intern.info.phone.length >= 10 : true;
  }
  get datesValid() {
    return this.intern.internship
      ? this.intern.internship.endDate > this.intern.internship.startDate
      : true;
  }
  get divisionValid() {
    return this.intern.internship
      ? this.intern.internship.division !== 0
      : true;
  }
  get responsableValid() {
    return this.intern.internship
      ? this.intern.internship.responsable.length > 5
      : true;
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

  get isEdit(): boolean {
    return Boolean(this.$route.params.id);
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

<template>
  <form class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Modifier les informations</p>
      <!-- <b-button type="button" class="close" @click="$emit('close')">X</b-button> -->
    </header>

    <section class="modal-card-body">
      <b-field
        label="Nom"
        :type="
          changedState.lastName ? getValidatorType(userValidators.lastName) : ''
        "
        :message="
          changedState.lastName
            ? getValidatorMessage(userValidators.lastName)
            : ''
        "
      >
        <b-input
          v-model="userModel.lastName"
          type="texte"
          placeholder="Nom"
          size="is-default"
          @blur="changedState.lastName = true"
          required
        >
        </b-input>
      </b-field>
      <b-field
        label="Prénom"
        :type="
          changedState.firstName
            ? getValidatorType(userValidators.firstName)
            : ''
        "
        :message="
          changedState.firstName
            ? getValidatorMessage(userValidators.firstName)
            : ''
        "
      >
        <b-input
          v-model="userModel.firstName"
          type="texte"
          placeholder="Prénom"
          size="is-default"
          @blur="changedState.firstName = true"
          required
        >
        </b-input>
      </b-field>
      <b-field
        label="Email"
        :type="changedState.email ? getValidatorType(userValidators.email) : ''"
        :message="
          changedState.email ? getValidatorMessage(userValidators.email) : ''
        "
      >
        <b-input
          placeholder="Entrez l'email"
          type="texte"
          size="is-default"
          icon="email"
          v-model="userModel.email"
          @blur="changedState.email = true"
          required
        >
        </b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot modal-card-actions">
      <div>
        <b-button class="save" @click="Save()">Enregistrer </b-button>

        <b-button class="cancel" size="is-default" @click="CloseModal()"
          >Annuler
        </b-button>
      </div>
    </footer>
  </form>
</template>



<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { DialogProgrammatic as Dialog } from "buefy";
import { store } from "@/store";
import UsersModule from "@/store/UsersModule";
import Validator, { UserFormValidators } from "@/types/Validator";
import UserUpdateDto from "@/types/UserUpdateDto";
type ChangedState = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};
@Component
export default class UserUpdateForm extends Vue {
  @Prop()
  id!: number;

  usersModule!: UsersModule;
  changedState: ChangedState = {
    firstName: false,
    lastName: false,
    email: false,
  };
  userModel: UserUpdateDto = {
    firstName: "",
    lastName: "",
    email: "",
  };

  loading: boolean = true;
  saving: boolean = false;
  created() {
    this.usersModule = getModule(UsersModule, store);
    this.loading = true;
  }
  mounted() {
    this.usersModule
      .GetUserForEdit(this.id)
      .then((data: UserUpdateDto) => {
        this.userModel = data;
      })
      .catch((err) => {
        console.error(err);
        Dialog.alert({
          title: "Erreur",
          message: "Une Error s'est produite",
          type: "is-danger",
        });
        this.CloseModal();
      });
    this.loading = false;
  }
  Save() {
    this.saving = true;
    this.$axios
      .$put("/users/" + this.id, this.userModel)
      .then(() => {
        this.$emit("changed");
        this.$emit("close");
      })
      .catch((err) => {
        console.error(err);
        Dialog.alert({
          title: "Erreur",
          message: "Une Error s'est produite",
          type: "is-danger",
        });
        this.CloseModal();
      });
    this.saving = false;
  }
  ClearForm() {
    this.userModel = {
      firstName: "",
      lastName: "",
      email: "",
    };
  }
  CloseModal() {
    this.ClearForm();
    this.$emit("close");
  }
  get lastNameValid() {
    return this.userModel.lastName.length >= 3;
  }
  get firstNameValid() {
    return this.userModel.firstName.length >= 3;
  }
  get EmailValid() {
    return this.userModel.email.length >= 10;
  }
  get userValidators(): UserFormValidators {
    return {
      lastName: {
        state: this.lastNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères",
      },
      firstName: {
        state: this.firstNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères",
      },
      email: {
        state: this.EmailValid,
        message: "Ce champs doit comporter au moins 10 caractères",
      },
    };
  }
  getValidatorType(validator: Validator) {
    if (!validator.state) {
      return "is-danger";
    }
    return "";
  }
  getValidatorMessage(validator: Validator) {
    if (!validator.state) {
      return validator.message;
    }
    return "";
  }
  get validate() {
    return this.lastNameValid && this.firstNameValid && this.EmailValid;
  }
}
</script>

<style scoped>
.save {
  color: white;
  background-color: #246530;
}

.cancel {
  color: white;
  background-color: #e4353e;
}
</style>



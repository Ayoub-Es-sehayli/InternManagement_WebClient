<template>
  <div class="grid-view">
    <section class="formulaire">
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
      <b-field
        grouped
        group-multiline
        label="Role"
        :type="changedState.role ? getValidatorType(userValidators.role) : ''"
        :message="
          changedState.role ? getValidatorMessage(userValidators.role) : ''
        "
      >
        <b-select
          v-model="userModel.role"
          @blur="changedState.role = true"
          :validation-message="getValidatorMessage(userValidators.role)"
          placeholder="Role"
        >
          <option :value="1">Administrateur</option>
          <option :value="2">Résponsable de l'assiduité</option>
        </b-select>
      </b-field>
      <b-field
        label="Mot de passe"
        :type="
          changedState.password ? getValidatorType(userValidators.password) : ''
        "
        :message="
          changedState.password
            ? getValidatorMessage(userValidators.password)
            : ''
        "
      >
        <b-input
          type="password"
          size="is-default"
          placeholder="Mot de passe"
          icon="lock"
          v-model="userModel.password"
          @blur="changedState.password = true"
          password-reveal
        >
        </b-input>
      </b-field>
      <b-field>
        <b-button @click="AddElement()" class="insert" size="is-default"
          >Ajouter</b-button
        >
      </b-field>
    </section>
    <section>
      <b-table :data="users" :loading="usersLoading">
        <b-table-column label="Nom Complet" field="fullName" v-slot="props">
          {{ props.row.fullName }}
        </b-table-column>
        <b-table-column label="Email" field="email" v-slot="props">
          {{ props.row.email }}</b-table-column
        >
        <b-table-column label="Action" field="actions">
          <template v-slot="props">
            <div class="actions">
              <b-button
                @click="showUpdateModal(props.row.id)"
                type="is-warning"
                label="modifier"
                >Modifier</b-button
              >
              <b-button @click="RemoveElement(props.row.id)" type="is-danger"
                >Supprimer</b-button
              >
            </div>
          </template>
        </b-table-column>
      </b-table>
    </section>

    <b-modal
      v-model="userUpdateModalVisible"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-label="Remplir les details d'utilisateur"
      aria-modal
    >
      <template #default="props">
        <UserUpdateform
          :id="selectedUser"
          @close="props.close"
          @changed="RefreshContent()" /></template
    ></b-modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DialogProgrammatic as Dialog } from "buefy";
import UserDto from "~/types/UserDto";
import UserModel from "@/types/UserModel";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";
import Validator, { UserValidators } from "~/types/Validator";
import UsersModule from "~/store/UsersModule";

type ChangedState = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  role: boolean;
  password: boolean;
};
@Component
export default class Users extends Vue {
  uiModule!: Ui;
  userModule!: UsersModule;
  userUpdateModalVisible: boolean = false;
  saving: boolean = false;
  usersLoading: boolean = true;
  userModel: UserModel = {
    firstName: "",
    lastName: "",
    email: "",
    role: -1,
    password: "",
  };
  changedState: ChangedState = {
    firstName: false,
    lastName: false,
    email: false,
    role: false,
    password: false,
  };
  users: UserDto[] = [];
  selectedUser!: number;
  created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Gestion des utilisateurs");

    this.userModule = getModule(UsersModule, store);
    this.userModule
      .LoadUsersList()
      .then(() => {
        this.RefreshContent();
      })
      .catch((err) => {
        console.error(err);
        Dialog.alert({
          message: "Le chargement des utilisateurs à échoué",
          type: "is-danger",
          title: "Erreur",
        });
      });
    this.usersLoading = false;
  }
  RefreshContent() {
    this.userModule
      .LoadUsersList()
      .then(() => (this.users = this.userModule.users!!));
  }
  //Button Ajouter
  AddElement() {
    if (this.validate) {
      this.userModule
        .AddUser(this.userModel)
        .then(() => {
          this.users = this.userModule.users!!;
          this.ResetForm();
        })
        .catch((err) => {
          Dialog.alert({
            title: "Alertes",
            message: "Le sauvgarde à échoué",
            type: "is-danger",
          });
          console.error(err);
        });
    } else {
      Dialog.alert({
        title: "Alertes",
        message: "Vous n'avez pas saisi toutes les informations",
        type: "is-danger",
      });
    }
  }
  //Button supprimer
  RemoveElement(id: number) {
    this.userModule.DeleteUser(id).then(() => {
      this.users = this.userModule.users!!;
    });
  }
  ResetForm() {
    this.userModel = {
      firstName: "",
      lastName: "",
      email: "",
      role: -1,
      password: "",
    };
    this.changedState = {
      firstName: false,
      lastName: false,
      email: false,
      role: false,
      password: false,
    };
  }
  //button modifier
  showUpdateModal(id: number) {
    this.selectedUser = id;
    this.userUpdateModalVisible = !this.userUpdateModalVisible;
  }
  //Validation
  get lastNameValid() {
    return this.userModel.lastName.length >= 3;
  }
  get firstNameValid() {
    return this.userModel.firstName.length >= 3;
  }
  get EmailValid() {
    return this.userModel.email.length >= 10;
  }
  get RoleValid() {
    return this.userModel.role !== -1;
  }
  get PasswordValid() {
    return this.userModel.password.length >= 6;
  }
  get userValidators(): UserValidators {
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
      role: {
        state: this.RoleValid,
        message: "Le Role doit être sélectionné",
      },
      password: {
        state: this.PasswordValid,
        message: "Ce champs doit comporter au moins 6 caractères",
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
    return (
      this.lastNameValid &&
      this.firstNameValid &&
      this.EmailValid &&
      this.RoleValid &&
      this.PasswordValid
    );
  }
}
</script>

<style scoped>
.grid-view {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1em;
}
.formulaire {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: repeat (5, 1fr);
  margin-top: 10px;
}
.insert {
  grid-area: insert;
  color: white;
  background-color: #246530;
}
</style>
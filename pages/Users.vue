<template>
  <div class="grid-view">
    <section class="formulaire">
      <b-field label="Nom"
               :type="changedState.nom ? getValidatorType(userValidators.nom) : ''"
               :message="changedState.nom ? getValidatorMessage(userValidators.nom) : ''">
        <b-input
          v-model="usermodel.nom"
          type="texte"
          placeholder="Nom"
          size="is-default"
          @blur="changedState.nom = true"
          required>
        </b-input>
      </b-field>
      <b-field label="Prénom"
               :type="changedState.prenom ? getValidatorType(userValidators.prenom) : ''"
               :message="changedState.prenom ? getValidatorMessage(userValidators.prenom) : ''">
        <b-input
          v-model="usermodel.prenom"
          type="texte"
          placeholder="Prénom"
          size="is-default"
          @blur="changedState.prenom = true"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Email"
               :type="changedState.email ? getValidatorType(userValidators.email) : ''"
               :message="changedState.email ? getValidatorMessage(userValidators.email) : ''">
        <b-input
          placeholder="Entrez l'email"
          type="texte"
          size="is-default"
          icon="email"
          v-model="usermodel.email"
          @blur="changedState.email = true"
          required>
        </b-input>
      </b-field>
      <b-field grouped group-multiline label="Role"
               :type="changedState.role ? getValidatorType(userValidators.role) : ''"
               :message="changedState.role ? getValidatorMessage(userValidators.role) : ''">
        <b-select v-model="usermodel.role"
                  @blur="changedState.role = true"
                  :validation-message="getValidatorMessage(userValidators.role)"
                  placeholder="Role">
          <option value="1">Administrateur</option>
          <option value="2">Résponsable de l'assiduité</option>
        </b-select>
      </b-field>
      <b-field label="Mot de passe"
               :type="changedState.password ? getValidatorType(userValidators.password) : ''"
               :message="changedState.password ? getValidatorMessage(userValidators.password) : ''">
        <b-input
          type="password"
          size="is-default"
          placeholder="Mot de passe"
          icon="lock"
          v-model="usermodel.password"
          @blur="changedState.password = true"
          password-reveal>
        </b-input>
      </b-field>
      <b-field>
        <b-button @click="AddElement()" 
                  class="insert" 
                  size="is-default"
        >Ajouter</b-button>
      </b-field>
    </section>
    <section>
      <b-table :data="users">
        <b-table-column label="Nom Complet" field="nom_complet" v-slot="props">
          {{ props.row.nom_complet }}
        </b-table-column>
        <b-table-column label="Email" field="email" v-slot="props">
          {{ props.row.email }}</b-table-column>
        <b-table-column label="Action" field="action" v-slot="props">
          <div>
            <div>
              <b-button
                @click="showUpdateModal()"
                type="is-warning"
                label="modifier"
                >Modifier</b-button>
              <b-modal
                v-model="userUpdateForm"
                has-modal-card
                trap-focus
                :destroy-on-hide="false"
                aria-role="modal"
                aria-label="modifier les information"
                aria-modal>
              <template #default="props">
                  <UserUpdateform @close="props.close"/>
              </template>
              </b-modal>
            </div>
            <b-button
              @click="RemoveElement(props.row.id)"
              type="is-danger"
              >Supprimer</b-button>
          </div>
        </b-table-column>
      </b-table>
    </section>
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
import Validator, { UserValidators } from "~/types/Validator"

type ChangedState ={
  nom : boolean;
  prenom : boolean;
  email: boolean;
  role: boolean;
  password: boolean;
};
@Component
export default class Users extends Vue {
  
  userUpdateForm : boolean = false;
  uiModule!: Ui;
  usermodel: UserModel = {
    nom: "",
    prenom: "",
    email: "",
    role: -1,
    password: "",
  };
  changedState : ChangedState ={
    nom : false,
    prenom : false,
    email: false,
    role: false,
    password: false
};
  users: UserDto[] = [
    {
      id: 1,
      nom_complet: "Mohammed Hajoui",
      email: "Mohammed Hajoui@gmail.com",
    },
    {
      id: 2,
      nom_complet: "Hafsa Farah",
      email: "Hafsa.farah@gmail.com",
    },
    {
      id: 3,
      nom_complet: "Mounya Moflih",
      email: "Mounya.moflih@gmail.com",
    },
    {
      id: 4,
      nom_complet: "Fati Ezzahra Meskaoui",
      email: "Fati.meskaoui@gmail.com",
    },
  ];
  created(){
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Gestion des utilisateurs");
  }
  //Button Ajouter
  AddElement() {
    if(this.validate){
    this.users.push({
      id: this.users.length+1,
      nom_complet: this.usermodel.prenom + "" + this.usermodel.nom,
      email: this.usermodel.email,
    });
    this.usermodel = {
      nom: "",
      prenom: "",
      email: "",
      role: -1,
      password: "",
    };
    this.changedState={
    nom : false,
    prenom : false,
    email: false,
    role: false,
    password: false
    };
    }
    else {
      Dialog.alert({
        title: "Alertes",
        message: "Vous n'avez pas saisi toutes les informations",
        type: "is-danger"
      });
    }
  }
  //Button supprimer
  RemoveElement(id: number) {
    this.users = this.users.filter((user: UserDto) => {
      return user.id !== id;
    });
  }
  //button modifier
  showUpdateModal() {
   this.userUpdateForm = !this.userUpdateForm;
  }
  //Validation
  get lastNameValid(){
    return this.usermodel.nom.length >= 3;
  }
  get firstNameValid(){
    return this.usermodel.prenom.length >= 3;
  }
  get EmailValid(){
    return this.usermodel.email.length >= 10;
  }
  get RoleValid(){
    return this.usermodel.role !== -1;
  }
  get PasswordValid(){
    return this.usermodel.password.length >= 6;
  }
  get userValidators(): UserValidators {
    return {
      nom: {
        state: this.lastNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères"
      }, 
      prenom: {
        state: this.firstNameValid,
        message: "Ce Champs doit comporter au moins 3 caractères"
      },
      email :{
        state: this.EmailValid,
        message: "Ce champs doit comporter au moins 10 caractères"
      },
      role :{
        state: this.RoleValid,
        message: "Le Role doit être sélectionné"
      },
      password :{
        state: this.PasswordValid,
        message:"Ce champs doit comporter au moins 6 caractères"
      }
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
  get validate(){
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
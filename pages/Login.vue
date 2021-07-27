<template>
  <section class="form">
    <b-field class="login" 
             label="Email"
             :type="changedState.email ? getValidatorType(authenticateValidator.email) : ''"
             :message="changedState.email ? getValidatorMessage(authenticateValidator.email) : ''">
      <b-input
        placeholder="Entrez l'email"
        v-model="user.email"
        type="email"
        size="is-default"
        icon="email"
        @blur="changedState.email = true"
        required>
      </b-input>
    </b-field>
    <b-field class="password" 
             label="Mot de passe"
             :type="changedState.password ? getValidatorType(authenticateValidator.password) : ''"
             :message="changedState.password ? getValidatorMessage(authenticateValidator.password) : ''">
      <b-input
        type="password"
        v-model="user.password"
        placeholder="Entrez le mot de passe"
        size="is-default"
        icon="lock"
        @blur="changedState.password = true"
        password-reveal>
      </b-input>
    </b-field>
    <b-field class="check">
      <b-checkbox v-model="user.remember_me" checked>Se souvenir de moi</b-checkbox>
    </b-field>
    <b-field>
      <b-button  class="confirmation" size="is-default" @click="Authenticate()">Confirmer</b-button>
    </b-field>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "@/types/User";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";
import Authentication from "@/store/Authentication";
import Validator, { AuthenticateValidators } from '@/types/Validator';

type ChangedState ={
  email: boolean;
  password: boolean;
};
@Component
export default class Login extends Vue {
  uiModule!: Ui;
  authenticationModule !: Authentication;
  user: User ={
    email :"",
    password:"",
    remember_me: false
  };
  changedState : ChangedState ={
    email :false,
    password: false
  };
  created(){
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Authentification");
    this.authenticationModule= getModule(Authentication,store);
  }
  Authenticate(){
    this.authenticationModule.Authenticate(this.user);
  }
  get EmailValid(){
    return this.user.email.length > 10;
  }
  get PasswordValid(){
    return this.user.password.length > 6;
  }
  get authenticateValidator (): AuthenticateValidators {
    return {
      email :{
        state: this.EmailValid,
        message: "Ce champs doit comporter au moins 10 caractères"
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
}
</script>
<style scoped>
.form {
  display: grid;
  grid-template-columns: 600px;
  grid-template-rows: repeat (4, 1fr);
  row-gap: 15px;
  margin-top: 50px;
}
.confirmation {
  grid-area: confirmation;
  color: white;
  background-color: #246530;
}
</style>


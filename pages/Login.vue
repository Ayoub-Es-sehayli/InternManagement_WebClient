<template>
  <section class="form">
    <b-field
      class="login"
      label="Email"
      :type="
        changedState.username
          ? getValidatorType(authenticateValidator.username)
          : ''
      "
      :message="
        changedState.username
          ? getValidatorMessage(authenticateValidator.username)
          : ''
      "
    >
      <b-input
        placeholder="Entrez l'email"
        v-model="user.username"
        type="email"
        size="is-default"
        icon="email"
        @blur="changedState.username = true"
        required
      >
      </b-input>
    </b-field>
    <b-field
      class="password"
      label="Mot de passe"
      :type="
        changedState.password
          ? getValidatorType(authenticateValidator.password)
          : ''
      "
      :message="
        changedState.password
          ? getValidatorMessage(authenticateValidator.password)
          : ''
      "
    >
      <b-input
        type="password"
        v-model="user.password"
        placeholder="Entrez le mot de passe"
        size="is-default"
        icon="lock"
        @blur="changedState.password = true"
        password-reveal
      >
      </b-input>
    </b-field>
    <b-field>
      <b-button class="confirmation" size="is-default" @click="Authenticate()"
        >Confirmer</b-button
      >
    </b-field>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "@/types/User";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";
// import Authentication from "@/store/Authentication";
import Validator, { AuthenticateValidators } from "@/types/Validator";
import eUserRole from "@/types/eUserRole";

type ChangedState = {
  username: boolean;
  password: boolean;
};
@Component
export default class Login extends Vue {
  uiModule!: Ui;
  // authenticationModule!: Authentication;
  user: User = {
    username: "",
    password: "",
  };
  changedState: ChangedState = {
    username: false,
    password: false,
  };
  created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Authentification");
  }
  async Authenticate() {
    if (!this.EmailValid || !this.PasswordValid) {
      this.$buefy.toast.open("Veuillez vérifier votre mail/mot de passe");
      return;
    }
    try {
      await this.$auth.loginWith("local", { data: this.user });
      // this.$auth.setUser(response?.data);
      console.log(this.$auth.user);

      switch (this.$auth.user as unknown as eUserRole) {
        case eUserRole.Admin:
          this.$router.push("/");
          break;
        case eUserRole.Supervisor:
          this.$router.push("/PunchIn");
          break;
      }
    } catch (err) {
      console.log(err);

      this.$buefy.toast.open("Veuillez vérifier votre mail/mot de passe");
    }
  }
  get EmailValid() {
    return this.user.username.length > 10;
  }
  get PasswordValid() {
    return this.user.password.length >= 6;
  }
  get authenticateValidator(): AuthenticateValidators {
    return {
      username: {
        state: this.EmailValid,
        message: "Ce champs doit comporter au moins 10 caractères",
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


<template>
  <section class="form">
    <b-field class="login" label="Nom d'utilisateur">
      <b-input
        placeholder="Entrez l'email"
        v-model="username"
        type="email"
        size="is-default"
        icon="email"
        required
      >
      </b-input>
    </b-field>

    <b-field class="password" label="Mot de passe">
      <b-input
        type="password"
        placeholder="Entrez le mot de passe"
        size="is-default"
        icon="lock"
        password-reveal
      >
      </b-input>
    </b-field>

    <b-field class="check">
      <b-checkbox checked>Se souvenir de moi</b-checkbox>
    </b-field>

    <b-field>
      <b-button  class="confirmation" size="is-default">Confirmer</b-button>
    </b-field>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "@/types/User";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";

@Component
export default class Login extends Vue {
  uiModule!: Ui;
  user!: User;

  created(){
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Authentication");
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


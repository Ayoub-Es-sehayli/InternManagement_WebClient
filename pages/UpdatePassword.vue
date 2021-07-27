<template>
    <section class="passwordForm">
        <b-field class="password" label="Ancien mot de passe">
      <b-input
        type="password"
        placeholder="Ancien mot de passe . . ."
        size="is-default"
        icon="lock"
        password-reveal
      >
      </b-input>
    </b-field>

    <b-field class="password" label="Le nouveau mot de passe">
      <b-input
        type="password"
        placeholder="Entrez le nouveau mot de passe"
        size="is-default"
        icon="lock"
        password-reveal
      >
      </b-input>
    </b-field>

    <b-field class="password" label="Confirmer le mot de passe">
      <b-input
        type="password"
        placeholder="Confirmez le mot de passe"
        size="is-default"
        icon="lock"
        password-reveal
      >
      </b-input>
    </b-field>

    <b-field>
      <b-button expanded class="sauvegarde" size="is-medium">Sauvegarder</b-button>
    </b-field>
    </section>
    
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import { store } from "@/store/index";

@Component
export default class Option extends Vue {
  uiModule!: Ui;

  created(){
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Changer le Mot de passe");
  }
}
</script>
<style scoped>
.passwordForm{
    display: grid;
    grid-template-columns: 600px;
    grid-template-rows: repeat (4, 1fr);
    row-gap: 15px;
    margin-top: 50px;
}
.sauvegarde{
    grid-area: sauvegarde;
    color: white;
    background-color: #246530;
}
</style>

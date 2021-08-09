<template>
  <section class="form">
    <b-field label="Nombre de Stagiaires par unité">
      <b-numberinput
        v-model="configurationModel.internsNumber"
        placeholder="1"
        :min="1"
        :editable="false"
        expanded
        controls-position="compact"
      >
      </b-numberinput>
    </b-field>
    <b-field label="Jours d'absence par semaine">
      <b-numberinput
        v-model="configurationModel.daysAbsence"
        placeholder="1"
        :min="1"
        :max="5"
        :editable="false"
        expanded
        controls-position="compact"
      >
      </b-numberinput>
    </b-field>
    <b-field>
      <nuxt-link to="/UpdatePassword"
        ><b-button expanded class="changerMotdePasse"
          >Changer le mot de passe</b-button
        ></nuxt-link
      >
    </b-field>
    <b-field>
      <b-button
        expanded
        class="sauvegarder"
        size="is-medium"
        @click="SaveConfiguration()"
        >Sauvegarder</b-button
      >
    </b-field>
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Ui from "@/store/ui";
import Configuration from "@/store/Configuration";
import { store } from "@/store/index";
import ConfigurationModel from "~/types/ConfigurationModel";

@Component
export default class Option extends Vue {
  uiModule!: Ui;
  configurationModule!: Configuration;
  configurationModel: ConfigurationModel = {
    internsNumber: 10,
    daysAbsence: 4,
  };
  async created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Paramètres");
    this.configurationModule = getModule(Configuration, store);
    await this.configurationModule.LoadConfiguration();
    this.configurationModel = this.configurationModule.configurationModel!!;
  }
  SaveConfiguration() {
    this.configurationModule.SaveConfiguration(this.configurationModel!!);
  }
}
</script>
<style scoped>
.form {
  display: grid;
  grid-template-columns: 400px;
  grid-template-rows: repeat (4, 1fr);
  row-gap: 15px;
  margin-top: 100px;
}
.changerMotdePasse {
  grid-area: changerMotdePasse;
  color: black;
  background-color: #ffc42c;
}
.sauvegarder {
  grid-area: sauvegarder;
  color: white;
  background-color: #246530;
}
</style>
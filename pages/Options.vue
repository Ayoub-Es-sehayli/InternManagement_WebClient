<template>
  <section class="form">
    <b-field label="Nombre de Stagiaires par unité">
      <b-numberinput
        v-model="configurationModel.nInterns"
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
        v-model="configurationModel.nAttendanceDays"
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
        :loading="saving"
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
import ConfigurationModel from "@/types/ConfigurationModel";

@Component
export default class Option extends Vue {
  uiModule!: Ui;
  configurationModule!: Configuration;
  configurationModel: ConfigurationModel = {
    nInterns: 10,
    nAttendanceDays: 4,
  };
  saving: boolean = false;
  async created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Paramètres");
    this.configurationModule = getModule(Configuration, store);
    this.$axios
      .$get(process.env.BASE_URL + "/preferences")
      .then((data: ConfigurationModel) => {
        this.configurationModel = data;
        this.configurationModule.SetConfiguration(data);
        this.configurationModel = this.configurationModule.configurationModel!!;
      });
  }
  SaveConfiguration() {
    this.saving = true;
    this.$axios
      .$put(process.env.BASE_URL + "/preferences", this.configurationModel)
      .then(() => {})
      .catch((err) => console.log(err))
      .finally(() => {
        this.saving = false;
      });
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
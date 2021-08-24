<template>
  <div class="page">
    <Navigation></Navigation>
    <div class="container">
      <div class="page-title">
        <h1 :v-text="title">{{ title }}</h1>
      </div>
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import Ui from "@/store/ui";
const uiModule = getModule(Ui, store);

@Component
export default class Default extends Vue {
  get title() {
    return uiModule.title;
  }
}
</script>

<style>
.page {
  display: grid;
  padding-bottom: 5px;
  column-gap: 16px;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto;
}

.container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70px auto;
}

.page-title {
  align-self: center;
  justify-self: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
.page-title > h1 {
  font-size: 38px;
  font-weight: 700;
}
</style>

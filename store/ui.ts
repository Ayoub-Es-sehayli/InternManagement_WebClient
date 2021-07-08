import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "uiModule",
  stateFactory: true
})
export default class Ui extends VuexModule {
  title: String = "Gestion des Stagiaires";

  @Mutation
  setTitle(value: String) {
    this.title = value;
  }
}

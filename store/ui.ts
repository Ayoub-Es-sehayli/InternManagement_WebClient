import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import Department from "@/types/Department";
@Module({
  name: "uiModule",
  stateFactory: true
})
export default class Ui extends VuexModule {
  title: String = "Gestion des Stagiaires";

  internStates: String[] = [
    "Demande Déposé",
    "Décision Signée",
    "Démarré son Stage",
    "Stage Finie",
    "Dossier Clôturé",
    "Stage Annulé"
  ];

  documentState: String[] = ["Absent", "Soumis", "Non Valide", "Valide"];
  departments: Department[] | null = null;

  @Mutation
  setDepartments(departments: Department[]) {
    this.departments = departments;
  }
  @Mutation
  setTitle(value: String) {
    this.title = value;
  }
}

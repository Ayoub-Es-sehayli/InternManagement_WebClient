import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import Intern from "~/types/Intern";
import { eDocumentState } from "~/types/eDocumentState";
import { eGender } from "~/types/eGender";
import { eInternState } from "~/types/eInternState";
import InternListItem from "~/types/InternListItem";
@Module({
  name: "internModule",
  stateFactory: true
})

export default class InternModule extends VuexModule {
  currentIntern: Intern | null = null;
  interns: InternListItem[] | null = null

  @Mutation
  SetCurrentIntern(intern: Intern) {
    this.currentIntern = intern;
  }


  @Mutation
  SetInterns(interns: InternListItem[]) {
    this.interns = interns;
  }
  @Mutation
  SetDecisionCode(intern: InternListItem){
    this.interns!![intern.id] = intern;
  }
  @Action
  LoadIntern(intern:Intern) {
    this.context.commit('SetCurrentIntern', intern)
    return {
      id: intern.id,
      info: {
        gender: intern.gender,
        firstName: intern.firstName,
        lastName: intern.lastName,
        email: intern.email,
        phone: intern.phone,
      },
      internship: {
        startDate: intern.startDate,
        endDate: intern.endDate,
        division: intern.divisionId,
        responsable: intern.responsable,
      },
      documents: intern.documents,
    };
  }

}
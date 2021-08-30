import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import Intern from "~/types/Intern";
import { eDocumentState } from "~/types/eDocumentState";
import { eGender } from "~/types/eGender";
import { eInternState } from "~/types/eInternState";
import InternListItem from "~/types/InternListItem";
import FormDto from "~/types/FormDto";
import { $axios } from "~/utils/api";
@Module({
  name: "internModule",
  stateFactory: true
})

export default class InternModule extends VuexModule {
  currentIntern: FormDto | null = null;
  interns: InternListItem[] | null = null

  @Mutation
  SetCurrentIntern(intern: FormDto) {
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
    this.context.commit('SetCurrentIntern', {
      id: intern.id,
      info: {
        gender: intern.gender,
        firstName: intern.firstName,
        lastName: intern.lastName,
        email: intern.email,
        phone: intern.phone,
      },
      internship: {
        startDate: new Date(intern.startDate),
        endDate: new Date(intern.endDate),
        division: intern.divisionId,
        responsable: intern.responsable,
      },
      documents: intern.documents,
    })
  }

  @Action
  LoadInterns()
  {
    return $axios.$get("/interns")
      .then((data: InternListItem[]) => {
        this.context.commit("SetInterns", data)
      })
  }
}
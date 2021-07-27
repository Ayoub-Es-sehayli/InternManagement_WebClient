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

  @Action
  LoadIntern(id: number) {
    const intern: Intern = {
      id: 1,
      gender: eGender.Male,
      firstName: "Ahmed",
      lastName: "Tazi",
      email: "Ahmed.tazi@gmail.com",
      phone: "0666666666",
      startDate: new Date("7/1/2021"),
      endDate: new Date("8/10/2021"),
      department: 1,
      documents: [
        eDocumentState.Submitted,
        eDocumentState.Submitted,
        eDocumentState.Missing,
        eDocumentState.Missing,
        eDocumentState.Valid,
        eDocumentState.Submitted
      ]
    }
    this.context.commit('SetCurrentIntern', intern)
  }

  @Action
  async LoadAllInterns() {
    const interns: InternListItem[] = [
      {
        id: 1,
        codeDecision: '1190/2020',
        departement: 'RH',
        fullName: 'Mohamed Hariss',
        state: eInternState.ApplicationFilled
      }
    ]
    this.context.commit('SetInterns', interns)
  }

}
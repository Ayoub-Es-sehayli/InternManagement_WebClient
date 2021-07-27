import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { eInternState } from "~/types/eInternState";
import InternListItem from "~/types/InternListItem";

@Module({
  name: "internModule",
  stateFactory: true
})
export default class InternModule extends VuexModule {
  interns: InternListItem[] | null = null

  @Mutation
  SetInterns(interns: InternListItem[])
  {
    this.interns = interns;
  }

  @Action
  async LoadAllInterns()
  {
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
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import CurrentUser from "~/types/CurrentUser";
import User from "~/types/User";

@Module({
    name :"authenticationModule",
    stateFactory: true
})
export default class Authentication extends VuexModule{
    currentUser : CurrentUser | null=null;
    @Action
    Authenticate(user : User){
        const currentUser : CurrentUser={
            nom_complet: "Fati",
            role: eUserRole.Admin
        }
        this.context.commit('SetUser',currentUser)
    }
    @Mutation
    SetUser(user :CurrentUser){
        this.currentUser=user;
    }
}
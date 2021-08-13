import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import ConfigurationModel from "~/types/ConfigurationModel";

@Module({
    name: "configurationModule",
    stateFactory: true
})
export default class Configuration extends VuexModule {
    configurationModel: ConfigurationModel | null = null;
    @Action
    LoadConfiguration() {
        const config: ConfigurationModel = {
            internsNumber: 10,
            daysAbsence: 4,
        }
        this.context.commit('SetConfiguration', config)
    }
    @Action
    SaveConfiguration(config: ConfigurationModel) {
        this.context.commit('SetConfiguration', config)
    }
    @Mutation
    SetConfiguration(config: ConfigurationModel) {
        this.configurationModel = config;
    }
}
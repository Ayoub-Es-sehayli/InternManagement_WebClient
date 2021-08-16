import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import ConfigurationModel from "@/types/ConfigurationModel";

@Module({
    name: "configurationModule",
    stateFactory: true
})
export default class Configuration extends VuexModule {
    configurationModel: ConfigurationModel | null = null;
    @Mutation
    SetConfiguration(config: ConfigurationModel) {
        this.configurationModel = config;
    }
}
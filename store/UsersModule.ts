import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import UserDto from "@/types/UserDto";
import { $axios } from "@/utils/api";
import UserModel from "@/types/UserModel";
import UserUpdateDto from "@/types/UserUpdateDto";

@Module({
  name: "usersModule",
  stateFactory: true
})
export default class UsersModule extends VuexModule {
  users: UserDto[] | null = null;

  @Mutation
  setUsers(users: UserDto[]){
    this.users = users;
  }

  @Action
  LoadUsersList() {
    return $axios.$get("/users")
      .then((data:UserDto[])=> {
        this.context.commit("setUsers", data)
      })
  }

  @Action
  AddUser(user: UserModel){
    return $axios.$post("/users", user)
      .then(() => this.LoadUsersList())
  }

  @Action
  GetUserForEdit(id: number): Promise<UserUpdateDto> {
    return $axios.$get("/users/" + id);
  }

  @Action
  DeleteUser(id: number) {
    return $axios.$delete("/users/"+id)
      .then(() => this.LoadUsersList())
  }
}
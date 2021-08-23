<template>
  <div class="grid-view">
    <b-field label="Sexe" class="gender">
      <b-radio v-model="info.gender" :native-value="1">Homme</b-radio>
      <b-radio v-model="info.gender" :native-value="2">Femme</b-radio>
    </b-field>
    <b-field
      label="Nom"
      class="lastname"
      :type="changedState.lastName ? getValidatorType(validators.lastName) : ''"
      :message="
        changedState.lastName ? getValidatorMessage(validators.lastName) : ''
      "
    >
      <p class="control">
        <span class="button is-static is-medium">
          {{ NamePrefix }}
        </span>
      </p>
      <b-input
        v-model="info.lastName"
        size="is-medium"
        expanded
        :loading="internLoading"
        @blur="changedState.lastName = true"
      ></b-input>
    </b-field>
    <b-field
      label="Prénom"
      class="firstname"
      :type="
        changedState.firstName ? getValidatorType(validators.firstName) : ''
      "
      :message="
        changedState.firstName ? getValidatorMessage(validators.firstName) : ''
      "
    >
      <b-input
        v-model="info.firstName"
        size="is-medium"
        :loading="internLoading"
        @blur="changedState.firstName = true"
      ></b-input>
    </b-field>
    <b-field
      label="Addresse Email"
      class="email"
      :type="changedState.email ? getValidatorType(validators.email) : ''"
      :message="changedState.email ? getValidatorMessage(validators.email) : ''"
    >
      <b-input
        v-model="info.email"
        icon="email"
        size="is-medium"
        :loading="internLoading"
        @blur="changedState.email = true"
      ></b-input>
    </b-field>
    <b-field
      label="Télephone"
      class="phone"
      :type="changedState.phone ? getValidatorType(validators.phone) : ''"
      :message="changedState.phone ? getValidatorMessage(validators.phone) : ''"
    >
      <b-input
        v-model="info.phone"
        icon="phone"
        size="is-medium"
        :loading="internLoading"
        @blur="changedState.phone = true"
      ></b-input>
    </b-field>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InternInformation from "@/types/InternInformation";
import { eGender } from "~/types/eGender";
import Validator, { InfoValidators } from "~/types/Validator";
type ChangedState = {
  lastName: boolean;
  firstName: boolean;
  email: boolean;
  phone: boolean;
};
@Component
export default class InternInfoForm extends Vue {
  @Prop()
  info!: InternInformation;

  @Prop()
  validators!: InfoValidators;

  @Prop()
  internLoading!: boolean;

  changedState: ChangedState = {
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
  };

  get NamePrefix() {
    if (this.info.gender === eGender.Male) {
      return "Mr.";
    } else if (this.info.gender === eGender.Female) {
      return "Mlle. / Mme";
    }
    return "";
  }
  getValidatorType(validator: Validator) {
    if (!validator.state) {
      return "is-danger";
    }
    return "";
  }
  getValidatorMessage(validator: Validator) {
    if (!validator.state) {
      return validator.message;
    }
    return "";
  }
}
</script>
<style scoped>
.grid-view {
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "gender ."
    "lastname  email"
    "firstname  phone";
}
.gender {
  grid-area: gender;
  display: grid;
  column-gap: 10px;
}
.firstname {
  grid-area: firstname;
}
.lastname {
  grid-area: lastname;
}
.email {
  grid-area: email;
}
.phone {
  grid-area: phone;
}
</style>

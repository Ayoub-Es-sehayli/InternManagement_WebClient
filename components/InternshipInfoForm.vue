<template>
  <div class="grid-view">
    <b-field
      class="start"
      label="Date Début"
      :type="changedState.startDate ? getValidatorType(validators.dates) : ''"
      :message="
        changedState.startDate ? getValidatorMessage(validators.dates) : ''
      "
    >
      <b-datepicker
        size="is-medium"
        v-model="internship.startDate"
        icon="calendar-today"
        trap-focus
        @blur="changedState.startDate = true"
      ></b-datepicker>
    </b-field>
    <b-field
      class="end"
      label="Date Fin"
      :type="changedState.endDate ? getValidatorType(validators.dates) : ''"
      :message="
        changedState.endDate ? getValidatorMessage(validators.dates) : ''
      "
    >
      <b-datepicker
        size="is-medium"
        v-model="internship.endDate"
        icon="calendar-today"
        trap-focus
        @blur="changedState.endDate = true"
      ></b-datepicker>
    </b-field>
    <b-field
      class="department"
      label="Entité"
      :type="
        changedState.department ? getValidatorType(validators.department) : ''
      "
      :message="
        changedState.department
          ? getValidatorMessage(validators.department)
          : ''
      "
    >
      <b-select
        size="is-medium"
        v-model="internship.department"
        @blur="changedState.department = true"
        :validation-message="getValidatorMessage(validators.department)"
      >
        <option>Direction Organisation et Capital Humain</option>
      </b-select>
    </b-field>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InternshipInformation from "~/types/InternshipInformation";
import Validator, { InternshipValidators } from "~/types/Validator";
type ChangedState = {
  startDate: boolean;
  endDate: boolean;
  department: boolean;
};
@Component
export default class InternshipInfoForm extends Vue {
  @Prop()
  internship!: InternshipInformation;

  @Prop()
  validators!: InternshipValidators;

  changedState: ChangedState = {
    startDate: false,
    endDate: false,
    department: false
  };
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
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "start-date end-date"
    "department department";
}
.start-date {
  grid-area: start-date;
}
.end-date {
  grid-area: end-date;
}
.department {
  grid-area: department;
  justify-self: center;
}
</style>

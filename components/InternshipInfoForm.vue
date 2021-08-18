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
        :unselectable-days-of-week="[0, 6]"
        :first-day-of-week="1"
        locale="fr-FR"
        icon="calendar-today"
        trap-focus
        @blur="changedState.startDate = true"
        :loading="internLoading"
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
        :unselectable-days-of-week="[0, 6]"
        :first-day-of-week="1"
        icon="calendar-today"
        locale="fr-FR"
        trap-focus
        @blur="changedState.endDate = true"
        :loading="internLoading"
      ></b-datepicker>
    </b-field>
    <b-field
      class="responsable"
      label="Responsable"
      :type="
        changedState.responsable ? getValidatorType(validators.responsable) : ''
      "
      :message="
        changedState.responsable
          ? getValidatorMessage(validators.responsable)
          : ''
      "
    >
      <b-input
        v-model="internship.responsable"
        size="is-medium"
        expanded
        @blur="changedState.responsable = true"
        :loading="internLoading"
      ></b-input>
    </b-field>
    <b-field
      class="department"
      label="Entité"
      :type="changedState.division ? getValidatorType(validators.division) : ''"
      :message="
        changedState.division ? getValidatorMessage(validators.division) : ''
      "
    >
      <b-select
        size="is-medium"
        v-model="internship.division"
        @blur="changedState.division = true"
        :validation-message="getValidatorMessage(validators.division)"
        :loading="departmentsLoading || internLoading"
        v-if="departments"
        expanded
      >
        <optgroup
          v-for="department in departments"
          :key="department.id"
          :label="department.name"
        >
          <option
            v-for="division in department.divisions"
            :key="division.id"
            :value="division.id"
          >
            {{ division.name }}
          </option>
        </optgroup>
      </b-select>
    </b-field>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InternshipInformation from "~/types/InternshipInformation";
import Validator, { InternshipValidators } from "~/types/Validator";
import Department from "@/types/Department";
type ChangedState = {
  startDate: boolean;
  endDate: boolean;
  division: boolean;
};
@Component
export default class InternshipInfoForm extends Vue {
  @Prop()
  internship!: InternshipInformation;

  @Prop()
  validators!: InternshipValidators;

  @Prop()
  departments!: Department[];

  @Prop()
  departmentsLoading!: boolean;

  @Prop()
  internLoading!: boolean;

  changedState: ChangedState = {
    startDate: false,
    endDate: false,
    division: false,
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
    "department responsable";
}
.start-date {
  grid-area: start-date;
}
.end-date {
  grid-area: end-date;
}
.department {
  grid-area: department;
}
.responsable {
  grid-area: responsable;
}
</style>

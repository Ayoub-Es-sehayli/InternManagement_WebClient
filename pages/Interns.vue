<template>
  <div>
    <b-table
      :data="interns"
      :row-class="getRowClass"
      paginated
      per-page="8"
      default-sort-direction="asc"
      :debounce-search="1000"
      :loading="internsLoading"
    >
      <b-table-column
        field="decision"
        label="Décision"
        v-slot="props"
        searchable
        >{{ props.row.decision }}</b-table-column
      >
      <b-table-column
        field="fullName"
        label="Stagiaire"
        v-slot="props"
        sortable
        searchable
        >{{ props.row.fullName }}</b-table-column
      >
      <b-table-column field="division" label="Entité" sortable searchable
        ><template v-slot="props">{{ props.row.division }}</template>
        <template #searchable="props">
          <b-select
            v-model="props.filters[props.column.field]"
            :loading="departmentsLoading"
            v-if="departments"
          >
            <option value="">Tous les Départments</option>
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
        </template></b-table-column
      >
      <b-table-column field="state" label="État" searchable>
        <template v-slot="props"
          >{{ internStates[props.row.state - 1] }}
        </template>
        <template #searchable="props">
          <b-select v-model="props.filters[props.column.field]">
            <option value="">Tous les Stagiaires</option>
            <option
              v-for="(state, index) in internStates"
              :key="index"
              :value="index + 1"
            >
              {{ state }}
            </option>
          </b-select>
        </template>
      </b-table-column>
      <b-table-column field="actions" label="Actions">
        <template v-slot="props">
          <div class="actions">
            <InternActionsMenu
              btn-text="..."
              :id-intern="props.row.id"
              :state="props.row.state"
              @changed="LoadInterns()"
            />
            <nuxt-link :to="'/InternInfo/' + props.row.id">
              <b-button type="is-info">
                <b-icon icon="information-outline" class="action-btn"></b-icon>
              </b-button>
            </nuxt-link>
          </div>
        </template>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { store } from "@/store/index";
import Ui from "@/store/ui";
import InternModule from "@/store/InternModule";
import { eInternState } from "@/types/eInternState";
import InternListItem from "@/types/InternListItem";
import Department from "~/types/Department";

@Component({
  name: "interns",
})
export default class Interns extends Vue {
  uiModule!: Ui;
  internModule!: InternModule;

  interns: InternListItem[] = [];
  internStates: String[] = [];
  internsLoading: boolean = true;

  departments: Department[] = [];
  departmentsLoading: boolean = true;

  public async created() {
    this.uiModule = getModule(Ui, store);
    this.uiModule.setTitle("Liste des Stagiaires");
    this.internStates = this.uiModule.internStates;

    this.internModule = getModule(InternModule, store);

    this.LoadDepartments();
    this.LoadInterns();
  }
  LoadDepartments() {
    this.$axios
      .$get(process.env.BASE_URL + "/ui/divisions")
      .then((data: Department[]) => {
        this.uiModule.setDepartments(data);
        this.departments = this.uiModule.departments!!;
        this.departmentsLoading = false;
      });
  }
  LoadInterns() {
    this.internsLoading = true;
    this.$axios
      .$get(process.env.BASE_URL + "/interns")
      .then((data: InternListItem[]) => {
        this.internModule.SetInterns(data);
        this.interns = this.internModule.interns!!;
        this.internsLoading = false;
      });
  }

  getRowClass(row: any, index: number) {
    var row_class = "";
    switch (row.state) {
      case eInternState.Cancelled:
        row_class = "is-danger";
        break;
      case eInternState.FileClosed:
        row_class = "is-success";
        break;
      case eInternState.Finished:
        // case eInternState.IncompleteFile:
        row_class = "is-warn";
        break;
      default:
        break;
    }
    return row_class;
  }
}
</script>

<style>
.action-btn {
  align-content: center;
}
td {
  font-size: 22px;
  text-align: baseline;
}
a.dropdown-item {
  font-size: 18px;
}

tr.is-danger {
  color: black;
  background-color: #ffcdd2;
}

tr.is-success {
  color: black;
  background-color: #76d688;
}

tr.is-warn {
  color: #44342e;
  background-color: #fff59d;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
}
</style>

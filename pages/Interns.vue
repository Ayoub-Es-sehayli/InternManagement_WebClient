<template>
  <div>
    <b-table
      :data="interns_list"
      :row-class="getRowClass"
      paginated
      per-page="8"
      default-sort-direction="asc"
      :debounce-search="1000"
    >
      <b-table-column
        field="codeDecision"
        label="Décision"
        v-slot="props"
        searchable
        >{{ props.row.codeDecision }}</b-table-column
      >
      <b-table-column
        field="fullName"
        label="Stagiaire"
        v-slot="props"
        sortable
        searchable
        >{{ props.row.fullName }}</b-table-column
      >
      <b-table-column
        field="department"
        label="Entité"
        v-slot="props"
        sortable
        >{{ props.row.department }}</b-table-column
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
        <div>
          <b-dropdown aria-role="list" position="is-bottom-left">
            <template #trigger>
              <b-button type="is-warning">...</b-button>
            </template>

            <b-dropdown-item aria-role="listitem" @click="showPrintModal"
              >Imprimer</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" @click="showDocumentModal"
              >Remplir Document</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem"
              >Reclamer au Staigaire</b-dropdown-item
            >
          </b-dropdown>
          <b-button type="is-info">
            <b-icon icon="information-outline" class="action-btn"></b-icon>
          </b-button>
        </div>
      </b-table-column>
    </b-table>
    <b-modal
      v-model="printModalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Sélectionner le document à imprimer"
      aria-modal
    >
      <template #default="props">
        <PrintForm @close="props.close" />
      </template>
    </b-modal>
    <b-modal
      v-model="documentModalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Remplir les details du document"
      aria-modal
    >
      <template #default="props">
        <DocumentForm @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { store } from "@/store/index";
import Ui from "@/store/ui";
import { eInternState } from "@/types/eInternState";
const uiModule = getModule(Ui, store);
@Component({
  name: "interns"
})
export default class Interns extends Vue {
  interns_list = [
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Cancelled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Cancelled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Cancelled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.ApplicationFilled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Cancelled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.IncompleteFile
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.IncompleteFile
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.IncompleteFile
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Cancelled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.ApplicationFilled
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.FileClosed
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.FileClosed
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Finished
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Khaoula Hassou",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1190/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    },
    {
      codeDecision: "1162/2020",
      fullName: "Mohamed Hariss",
      department: "Direction Organisation et Capital Humain",
      state: eInternState.Started
    }
  ];
  internStates: String[] = [];
  printModalVisible: boolean = false;
  documentModalVisible: boolean = false;

  public mounted() {
    uiModule.setTitle("Liste des Stagiaires");
    this.internStates = uiModule.internStates;
  }

  showPrintModal() {
    this.printModalVisible = !this.printModalVisible;
  }

  showDocumentModal() {
    this.documentModalVisible = !this.documentModalVisible;
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
      case eInternState.IncompleteFile:
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
</style>

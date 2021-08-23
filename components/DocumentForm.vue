<template>
  <form action="" class="modal-card document-form">
    <header class="modal-card-head">
      <p class="modal-card-title">Remplir un Document</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <div>
        <b-radio
          v-model="document.type"
          :native-value="0"
          name="document"
          :disabled="!canSetDecision"
          >Decision</b-radio
        >
        <b-radio
          v-model="document.type"
          :native-value="1"
          name="document"
          :disabled="!canSetAttestation"
          >Attestation</b-radio
        >
        <b-radio
          v-model="document.type"
          :native-value="2"
          name="document"
          :disabled="!canSetCancellation"
          >Annulation</b-radio
        >
      </div>
      <b-field label="Code">
        <b-input
          validation-message="Ce code est requis"
          v-model="document.code"
        >
        </b-input>
        <p class="control">
          <span class="button is-static">
            /{{ document.date.getFullYear() }}
          </span>
        </p>
      </b-field>

      <b-field label="Date">
        <b-datepicker
          validation-message="Le choix de la date est requis"
          icon="calendar-today"
          trap-focus
          v-model="document.date"
          :unselectable-days-of-week="[0, 6]"
          :first-day-of-week="1"
          :open-on-focus="true"
          @focus="setFullHeightClass"
          @blur="setNormalHeightClass"
        >
        </b-datepicker>
      </b-field>
    </section>
    <footer class="modal-card-foot modal-actions">
      <b-button
        icon-left="cancel"
        label="Annuler"
        class="cancel-btn"
        @click="$emit('close')"
      />
      <b-button
        icon-left="content-save"
        label="Sauvegarder"
        class="save-btn"
        @click="saveDocument()"
        :loading="saving"
      />
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eDocuments } from "@/types/eDocuments";
import InternModule from "@/store/InternModule";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store";
import DocumentViewModel from "@/types/DocumentViewModel";
import { eInternState } from "@/types/eInternState";

@Component
export default class DocumentForm extends Vue {
  internModule!: InternModule;
  @Prop()
  id!: number;

  @Prop()
  state!: eInternState;

  document: DocumentViewModel = {
    type: eDocuments.Decision,
    code: "",
    date: new Date(),
  };
  saving: boolean = false;
  created() {
    this.internModule = getModule(InternModule, store);
  }

  saveDocument() {
    this.saving = true;
    let documentType = "decision";
    switch (this.document.type) {
      case eDocuments.Decision:
        documentType = "decision";
        break;
      case eDocuments.Attestation:
        documentType = "attestation";
        break;
      case eDocuments.Annulation:
        documentType = "annulation";
        break;
    }
    this.$axios
      .$post(
        process.env.BASE_URL + "/interns/" + documentType + "/" + this.id,
        {
          internId: this.id,
          code: this.document.code,
          date: this.document.date,
        }
      )
      .then((_) => {
        this.$emit("changed");
        this.$buefy.toast.open("Les informations sont enregistrées");
      })
      .catch((err) => {
        console.log(err);
        this.$buefy.toast.open({
          message: "Le sauvegarde du document a échoué",
          type: "is-danger",
          position: "is-bottom-right",
        });
      })
      .finally(() => {
        this.saving = false;
      });
  }

  setFullHeightClass() {
    var el = document.querySelector(".modal-card.document-form");
    el?.classList.add("document-form-fullheight");
  }
  setNormalHeightClass() {
    var el = document.querySelector(".modal-card.document-form");
    el?.classList.remove("document-form-fullheight");
  }

  get canSetDecision(): boolean {
    switch (this.state) {
      case eInternState.ApplicationFilled:
      case eInternState.AssignedDecision:
      case eInternState.Started:
      case eInternState.Finished:
        return true;

      default:
        return false;
    }
  }

  get canSetAttestation(): boolean {
    switch (this.state) {
      case eInternState.Finished:
        return true;

      default:
        return false;
    }
  }

  get canSetCancellation(): boolean {
    switch (this.state) {
      case eInternState.AssignedDecision:
      case eInternState.Started:
      case eInternState.Finished:
        return true;

      default:
        return false;
    }
  }
}
</script>

<style>
.document-form {
  width: 500px;
}

.document-form-fullheight {
  width: 500px;
  height: 800px;
}

.modal-actions {
  justify-content: right;
}

.save-btn {
  color: white;
  background-color: #246530;
}

.cancel-btn {
  color: white;
  background-color: #e4353e;
}
</style>

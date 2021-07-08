<template>
  <form action="" class="modal-card document-form">
    <header class="modal-card-head">
      <p class="modal-card-title">Remplir un Document</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <div>
        <b-radio v-model="document.type" :native-value="0" name="document"
          >Decision</b-radio
        >
        <b-radio v-model="document.type" :native-value="1" name="document"
          >Attestation</b-radio
        >
        <b-radio v-model="document.type" :native-value="2" name="document"
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
      <b-button icon-left="content-save" label="Sauvegarder" class="save-btn" />
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eDocuments } from "@/types/eDocuments";

interface IDocument {
  type: eDocuments;
  code: String;
  date: Date;
}

@Component
export default class DocumentForm extends Vue {
  selection: eDocuments = eDocuments.Decision;

  document: IDocument = {
    type: eDocuments.Decision,
    code: "",
    date: new Date()
  };

  setFullHeightClass() {
    var el = document.querySelector(".modal-card.document-form");
    el?.classList.add("document-form-fullheight");
  }
  setNormalHeightClass() {
    var el = document.querySelector(".modal-card.document-form");
    el?.classList.remove("document-form-fullheight");
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

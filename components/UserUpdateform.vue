<template>
  
  <form class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Modifier les informations</p>
      <b-button type="button"
                class="close"
                @click="$emit('close')">X</b-button>
    </header>
    
    <section class="modal-card-body">
      <b-field label="Nom Complet">
        <b-input
          type="texte"
          placeholder="Nom Complet"
          size="is-default"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input
          placeholder="Email"
          type="texte"
          size="is-default"
          icon="email"
          required
        >
        </b-input>
      </b-field>

      <b-field grouped group-multiline label="Role">
        <b-select  placeholder="Role">
          <option value="1">Administrateur</option>
          <option value="2">Résponsable de l'assiduité</option>
        </b-select>
      </b-field>
    </section>
      
    
    <footer class="modal-card-foot modal-card-actions" >
        <div>
          <b-button class="save"
                    @click="updateSave"
                    

          >Enregistrer
          </b-button>
          
          <b-button class="cancel" 
                    size="is-default"
                    @click="$emit('close')"
          >Annuler
          </b-button>
        
        </div>
      </footer>
</form>
</template>



<script lang="ts">
import { Vue, Component } from "vue-property-decorator";


@Component
export default class UserUpdateForm extends Vue {
  userUpdateForm: boolean = false;

}


</script>

<style scoped>
.save{
  color: white;
  background-color: #246530;
}

.cancel{
  color: white;
  background-color: #e4353e;
}
</style>



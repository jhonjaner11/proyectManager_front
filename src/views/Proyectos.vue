<template>

  <v-container class="grey lighten-5">
    <v-card>
      <v-card-title primary-title>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          to="/"
        >
          <v-icon dark>
            arrow_back
          </v-icon>
        </v-btn>
        Proyectos 
        
      </v-card-title>
     
    </v-card>



        <v-container>
            <v-row dense>

                <v-col
                v-for="(item, i) in proyectos"
                :key="i"
                cols="12"
                >
                <v-card
                    color="blue"
                    dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title
                        class="text-h5"
                        v-text="item.nombre"
                        ></v-card-title>

                        <v-card-subtitle >
                            proyecto id: {{item.id}}
                        </v-card-subtitle>
                            
                        <v-card-actions>


                        <v-btn
                            v-
                            class="ml-2 mt-5"
                            outlined
                            rounded
                            small
                            v-on:click="get_historias(item.id)"
                        >
                            Historias de usuario
                        </v-btn>
                        </v-card-actions>
                    </div>

                    
                    </div>
                </v-card>
                </v-col>
            </v-row>
            </v-container>
  </v-container>

</template>

<script>
import axios from "axios";
export default {
  name: "Proyectos",
  props: ['id'],
  
  data(){
    return{
      items: [],
      
      proyectos: [],
    }
  },
  components: {
  
  },
   methods:{
    get_historias: function (id) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      this.$router.push({ name: 'Historias Usuarios', params: {proyecto_id: id }})
    }
   },
   mounted () {
    
    let aa = 'http://localhost:3000/api/proyectos/'+this.id;
    axios
      .get(aa)
      .then(response => (this.proyectos = response.data))
  }
};
</script>

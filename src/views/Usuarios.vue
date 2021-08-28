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
        Usuarios
        
      </v-card-title>
     
    </v-card>



        <v-container>
            <v-row dense>

                <v-col
                v-for="(item, i) in users"
                :key="i"
                cols="4"
                >
                <v-card
                    
                    dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title
                        class="text-h5"
                        v-text="item.nombre"
                        ></v-card-title>

                        <v-card-subtitle >
                            
                            Nombre: {{item.firstname}} <br>
                            Apellido: {{item.lastname}} <br>
                            Correo: {{item.correo}} <br>
                            login: {{item.login}} <br>
                            

                        </v-card-subtitle>
                            

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
  name: "Usuarios",
  props: ['id'],
  
  data(){
    return{
      items: [],
      
      users: [],
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
    
    let aa = 'http://localhost:3000/api/usuarios';
    axios
      .get(aa)
      .then(response => (this.users = response.data.users))
  }
};
</script>

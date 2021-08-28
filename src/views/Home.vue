<template>
  <div>


    <v-card>
      <v-card-title primary-title>
         Bienvenido  {{this.$store.state.user.firstname}} {{ this.$store.state.user.lastname}},
      </v-card-title>
    </v-card>

    <v-container>
      <v-row >
        
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="6"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                 
                >{{item.nombre}}</v-card-title>

                <v-card-text >
                  Correo: {{item.correo}} <br>Direccion: {{item.direccion}} <br> Telefono: {{item.telefono}}
                </v-card-text>

                <v-card-actions>
                  

                  <v-btn
                   
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    v-on:click="get_proyectos(item.id)"
                  >
                    Proyectos
                  </v-btn>
                </v-card-actions>
              </div>

              
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  
  
  data(){
    return{
      items: [],
      cursos: [],

    }
  },
  
  components: {
  
  },
  methods:{
    get_contenido: function (id) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      this.$router.push({ name: 'Contenido', params: {id: id }})
    },
    get_proyectos: function (id) {
      console.log(id);
      // `this` dentro de los métodos apunta a la instancia de Vue
      this.$router.push({ name: 'Proyectos', params: {id: id }})
    },

    logout: function () {
      
      this.$router.push("/")
    }
  },

   beforeCreate:  async function () {
    
    if (!this.$store.state.auth) {
      this.$router.push("/login");
    }
    
    let empresas = 'http://localhost:3000/api/empresas_usuarios/'+this.$store.state.user.id;
    //let cursos = '/cursos/';

    let res1 = await axios.get(empresas);
    this.items = res1.data;
    console.log(this.items);

    //let res2 = await axios.get(cursos)
    //this.cursos = res2.data.courses

  },


};
</script>

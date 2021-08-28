<template>
<div>

  <v-layout row wrap>
 

    <v-card
    color="grey"
    >
     
    <v-card-title primary-title>
      Bienvenido  {{this.$store.state.user.firstname}} {{ this.$store.state.user.lastname}},
    </v-card-title>

    <v-card-subtitle>
      Materias Cursando
      </v-card-subtitle>

      
       <v-row>
 
      <v-col
        v-for="item in items" 
        :key="item.id"
        justify='center'
        cols="6"
      >
        <v-card
          class="pa-2"
          shaped
          tile
          elevation="3"
        >
          <v-card-title primary-title>
            f {{item.nombre}}  - {{cursos.find( fruta => fruta.id === item.course).name}}
          </v-card-title>
          <v-card-text>
               {{cursos.find( fr => fr.id === item.course).description}}
          </v-card-text>
          <v-card-actions>
            <v-btn dark :class="item.status=='passed' ? 'green' : 'red'">
              {{item.status}}
              <template v-if="item.status=='passed'">
                 <v-icon>check_circle</v-icon>
              </template>
              <template v-else>
                 <v-icon>highlight_off</v-icon>
              </template>
             
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" outlined  v-on:click="get_contenido(item.course)">
              contenido
              <v-icon>description</v-icon>
            </v-btn>
            
          </v-card-actions>
          
        </v-card>
      </v-col>
    </v-row>
    </v-card>
  </v-layout>
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

    //let res2 = await axios.get(cursos)
    //this.cursos = res2.data.courses

  },


};
</script>

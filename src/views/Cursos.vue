<template>
 <v-row>
    <v-col
      v-for="item in cursos" 
      :key="item.id"
      justify='center'
      md="6"
      sm="12"
    >
        <v-card
          class="pa-2"
          outlined
          tile
          elevation="5"
          :class="color(item.id)"
          
        >
          <v-card-title primary-title>
             {{item.id}}  -  {{item.name}} 
          </v-card-title>

          <v-card-text>
            {{item.description}}
          </v-card-text>
         
          <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-btn  outlined  v-on:click="get_contenido(item.id)">
              contenido
              <v-icon>description</v-icon>
            </v-btn>
            
          </v-card-actions>
          
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
//import HelloWorld from "../components/HelloWorld";
import axios from "axios";
export default {
  name: "Cursos",
  data(){
    return{
      cursos: '',
    }
  },
  computed: {
    // a computed getter
    
  },

  methods: {
    color(asd) {

      var cc='';
      
      if(asd=='A1'){
        cc = 'blue lighten-5';
      }

      if (asd=='B1') {
        cc= 'blue lighten-3';
      }
      if (asd=='C1') {
        cc= 'blue lighten-2 ';
      }

      return cc;
      
    },
    get_contenido: function (id) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      this.$router.push({ name: 'Contenido', params: {id: id }})
    },
  },
  
  components: {
    //HelloWorld,
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/cursos/')
      .then(response => (this.cursos = response.data.courses))
  }
};
</script>

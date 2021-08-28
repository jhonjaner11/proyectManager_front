<template>
  <v-container class="grey lighten-5">
    <v-card>
      <v-card-title primary-title>
        <v-btn class="mx-2" fab dark
        small
        color="primary"
        @click="back()"
        >
          <v-icon dark>
            arrow_back
          </v-icon>
        </v-btn>
        Tareas
        <v-spacer></v-spacer>
        
        <v-dialog
            v-model="dialog"
            persistent
            max-width="300px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                fab
                color="green"
                v-bind="attrs"
                v-on="on"
                small
                >
                    <v-icon  >
                        add
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Nueva Tarea</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                       
                    >
                        <v-text-field
                        label="Nombre tarea*"
                        required
                        v-model="name_tarea"
                        ></v-text-field>
                    </v-col>
                     <v-col
                        cols="12"
                       
                    >
                        <v-text-field
                        label="Comentarios*"
                        required
                        v-model="comentarios_tarea"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="crear_tarea()"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
      </v-card-title>
     
    </v-card>
        <v-container>
            <v-row dense>

                <v-col
                v-for="(item, i) in proyectos"
                :key="i"
                cols="4"
                >
                    <v-card
                        
                        
                    >

                        <v-card-title
                        class="text-h5"
                        v-text="item.nombre"
                        ></v-card-title>

                        <v-card-subtitle >
                            Tarea id: {{item.id}}
                        </v-card-subtitle>

                        <v-card-text>
                            Comentarios: {{item.comentarios}}
                        </v-card-text>



                        
                        <v-card-actions>
                        
                            <v-btn dark  :class="item.estado=='Activo' ? 'green' : 'gray'">
                            Estado: {{item.estado}} 
                                        
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="red"   v-on:click="eliminar(item.id)">
                            
                            <v-icon>delete</v-icon>
                            </v-btn>
                            
                        </v-card-actions>

                     
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

      
  </v-container>

</template>

<script>
import axios from "axios";
export default {
  name: "Tareas",
  props: ['historia_id', 'proyecto_id'],
  
  data(){
    return{
      items: [],
      dialog: false,
      proyectos: [],
      name_tarea:'',
      comentarios_tarea:'',
    }
  },
  components: {
  
  },
   methods:{

    back: function () {
        //console.log();
        // `this` dentro de los métodos apunta a la instancia de Vue
        this.$router.push({ name: 'Historias Usuarios', params: {proyecto_id: this.proyecto_id }})
    },
    crear_tarea(){
        this.dialog = false;

        var newTarea={};

        newTarea.name_tarea=this.name_tarea;
        newTarea.comentarios_tarea= this.comentarios_tarea;
        newTarea.historia_usuario = this.historia_id;
        newTarea.usuario = this.$store.state.user.id;
        newTarea.usuario_creador = this.$store.state.user.id;
        

        axios
            .post('http://localhost:3000/api/tarea/', {newTarea})
            .then(response => {
                //this.$session.start()
                //this.$session.set(response.data[0].id)
                
                console.log(response.data[0]);
                this.traer_tareas();
                //var data = response.data[0];
                
               
            })
    },

    eliminar(id){
         axios
            .delete('http://localhost:3000/api/tarea/'+ id )
            .then(response => {
                //this.$session.start()
                //this.$session.set(response.data[0].id)
                
                console.log(response.data[0]);
                this.traer_tareas();
                //var data = response.data[0];
                
               
            })
    },

    traer_tareas(){
        
        let aa = 'http://localhost:3000/api/tareas/'+this.historia_id;
        axios
        .get(aa)
        .then(response => (this.proyectos = response.data))
    }
   },
   mounted () {
    this.traer_tareas();
   
  }
};
</script>

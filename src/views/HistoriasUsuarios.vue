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
        Historias de Usuarios
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
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
                <span class="text-h5">Nueva Historia de Usuario</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="6"
                        
                        >
                            <v-text-field
                            label="Titulo Historia*"
                            required
                            v-model="titulo_historia"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="6"
                        
                        >
                            <v-text-field
                            label="Observacion Historia*"
                            required
                            v-model="observacion_historia"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="6"
                        
                        >
                            <v-text-field
                            label="Titulo Tarea*"
                            required
                            v-model="titulo_tarea"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="6"
                        
                        >
                            <v-text-field
                            label="Comentario Tarea*"
                            required
                            v-model="comentario_tarea"
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
                    @click="crear_historia()"
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
                            Historia id: {{item.id}}
                        </v-card-subtitle>

                        <v-card-text>
                            {{item.observacion}}
                        </v-card-text>
                            
                        <v-card-actions>


                        <v-btn
                            v-
                            class="ml-2 mt-5"
                            outlined
                            rounded
                            small
                            v-on:click="get_tareas(item.id)"
                        >
                            Tareas
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
  name: "Historias Usuarios",
  props: ['proyecto_id'],
  
  data(){
    return{
      items: [],
      
      proyectos: [],
      titulo_historia : '',
        observacion_historia : '',
        titulo_tarea : '',
        comentario_tarea : '',
    }
  },
  components: {
  
  },
   methods:{
    get_tareas: function (id) {
        console.log(id);
      // `this` dentro de los métodos apunta a la instancia de Vue
      this.$router.push({ name: 'Tareas', params: {historia_id: id, proyecto_id: this.proyecto_id }})
    },
    traer_historias(){

        this.dialog = false;
        let aa = 'http://localhost:3000/api/historias_usuarios/'+this.proyecto_id;
        axios
        .get(aa)
        .then(response => (this.proyectos = response.data))
    },
    crear_historia(){
        

        var newHistoria={};

        newHistoria.proyecto= this.proyecto_id;
        newHistoria.nombre = this.titulo_historia;
        newHistoria.usuario_creador = this.$store.state.user.id;
        newHistoria.observacion = this.observacion_historia;
        newHistoria.titulo_tarea = this.titulo_tarea;
        newHistoria.comentario_tarea = this.comentario_tarea;
        

        axios
            .post('http://localhost:3000/api/historia_usuario/', {newHistoria})
            .then(response => {
                //this.$session.start()
                //this.$session.set(response.data[0].id)
                
                console.log(response.data[0]);
                this.traer_historias();
                //var data = response.data[0];
                
               
            })
    }
   },
    mounted () {
    
        this.traer_historias();
        
    }
};
</script>

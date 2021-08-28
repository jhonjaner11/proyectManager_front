<template>
   <v-app>

      <v-layout align-center justify-center :style="{ backgroundImage: `url('/img/fondo.jpg')` }">
         <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
               <v-toolbar dark color="primary">
                  <v-toolbar-title>Registro form</v-toolbar-title>
               </v-toolbar>
               <v-card-text>
                  <v-form>
                     <v-text-field
                        prepend-icon="person"
                        name="firstname"
                        label="Nombre"
                        type="text"
                        v-model="nombre"
                     ></v-text-field>
                      <v-text-field
                        prepend-icon="person"
                        name="lastname"
                        label="Apellido"
                        type="text"
                        v-model="apellido"
                     ></v-text-field>
                     <v-text-field
                        id="correo"
                        prepend-icon="email"
                        name="correo"
                        label="correo"
                        
                        v-model="correo"
                     ></v-text-field>
                  
                      <v-text-field
                        prepend-icon="person"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="login"
                     ></v-text-field>
                     <v-text-field
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        
                        v-model="password"
                     ></v-text-field>
                  </v-form>
               </v-card-text>
               <v-card-actions>
                  
                  <v-btn color="primary" v-on:click="registrar">Registrar</v-btn>
                  
                  
               </v-card-actions>
            </v-card>
         </v-flex>
      </v-layout>
          
   </v-app>
</template>

<script>

import axios from "axios";
export default {
   name: 'Registrar',
   data(){
      return {
         login: null,
         password: null,
         nombre: null,
         apellido: null,
         correo:null
      }
   },
  
   methods: {
      registrar() {
        
         var newUser={};

         newUser.firstname=this.nombre;
         newUser.lastname = this.apellido;
         newUser.correo = this.correo;
         newUser.login = this.login;
         

         axios
               .post('http://localhost:3000/api/registro/', {newUser})
               .then(response => {
                  //this.$session.start()
                  //this.$session.set(response.data[0].id)
                  
                  console.log(response.data[0]);
                  this.traer_tareas();
                  //var data = response.data[0];
                  
                  
               })
         //console.log(this.$store.state.user);
         this.$router.push("/")
         //   login
      },

  }
};
</script>

<style></style>

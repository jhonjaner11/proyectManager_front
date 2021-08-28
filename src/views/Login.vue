<template>
   <v-app>

      <v-layout align-center justify-center :style="{ backgroundImage: `url('/img/fondo.jpg')` }">
         <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
               <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
               </v-toolbar>
               <v-card-text>
                  <v-form>
                     <v-text-field
                        prepend-icon="person"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="username"
                     ></v-text-field>
                     <v-text-field
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        type="password"
                        v-model="password"
                     ></v-text-field>
                  </v-form>
               </v-card-text>
               <v-card-actions>
                  
                  <v-btn color="primary" v-on:click="registrar">Registrar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="green" v-on:click="login">Login</v-btn>
               </v-card-actions>
            </v-card>
         </v-flex>
      </v-layout>
          
   </v-app>
</template>

<script>


export default {
   name: 'Login',
   data(){
      return {
         username: null,
         password: null
      }
   },
  
   methods: {
      async login() {
         let dataq = {user: this.username, pw: this.password};
         await this.$store.dispatch("login",  dataq);
         //console.log(this.$store.state.user);
         this.$router.push("/")
         //   login
      },
      registrar(){
         this.$router.push({ name: 'Registrar'});
      }
  }
};
</script>

<style></style>

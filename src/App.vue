<template>

<v-app>
  <v-card
  
    >
    
    <template v-if="$store.state.auth">
        <v-app-bar
            
            dense
            
          >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Cursera DEMO</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <span>{{$store.state.user.firstname}}</span> 
          <v-btn icon v-on:click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          
       </v-app-bar>

        
      </template>
      
        <v-card-text>
          <router-view />
        </v-card-text>

        
  </v-card>
   <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
          >
            <v-list
              
              dense
            >
              <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
              >

                <v-list-item>
                  <v-list-item-title v-on:click="$router.push('/')">Inicio</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title  v-on:click="$router.push('/usuarios')">Usuarios</v-list-item-title>
                </v-list-item>

              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
</v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({

     drawer: false,
      group: null,
    //
  }),

  watch: {
      group () {
        this.drawer = false
      },
    },
  methods: {
    async logout (){
      await this.$store.dispatch("logout");
      this.$router.push("/login")
    }
  }
};
</script>

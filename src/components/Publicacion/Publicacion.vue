<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ publicacion.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-publicacion-details-dialog :publicacion="publicacion"></app-edit-publicacion-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="publicacion.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ publicacion.date | date }} - {{ publicacion.location }}</div>
         
            <div>{{ publicacion.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-publicacion-register-dialog
              :publicacionId="publicacion.id"
              v-if="userIsAuthenticated && !userIsCreator"></app-publicacion-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      publicacion () {
        return this.$store.getters.loadedPublicacion(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.publicacion.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

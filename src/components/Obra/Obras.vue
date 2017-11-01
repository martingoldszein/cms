<template>
  <v-container>
    <v-layout row wrap v-for="obra in obras" :key="obra.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="obra.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ obra.title }}</h5>
                    <div>{{ obra.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/obras/' + obra.id">
                    <v-icon left light>arrow_forward</v-icon>
                    Ver Obra
                  </v-btn>
                   <app-edit-obra-details-dialog :obra="obra"></app-edit-obra-details-dialog>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      obras () {
        return this.$store.getters.loadedObras
      }
    }
  }
</script>

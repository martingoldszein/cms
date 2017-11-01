<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="obra in obras"
            :src="obra.imageUrl"
            :key="obra.id"
            @click="onLoadObra(obra.id)">
            <div class="title">
              {{ obra.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      obras () {
        return this.$store.getters.featuredObras
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadObra (id) {
        this.$router.push('/obras/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>

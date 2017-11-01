<template>
  <v-dialog width="650px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
            <h4>Editar Publicacion</h4>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Titulo"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Descripción"
                id="description"
                multi-line
                v-model="editedDescription"
                required></v-text-field>
            </v-card-text>
            <img :src="imageUrl" height="150" v-model="editedImage"   >
            <v-btn raised class="primary" @click="onPickFile">Subir Imagen</v-btn>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                v-on:change="editedImage"
                accept="image/*"
                @change="onFilePicked">
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">Cerrar</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Guardar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['publicacion'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.publicacion.title,
        editedDescription: this.publicacion.description,
        editedImage: this.publicacion.image
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updatePublicacionData', {
          id: this.publicacion.id,
          title: this.editedTitle,
          description: this.editedDescription,
          image: this.editedImage
        })
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

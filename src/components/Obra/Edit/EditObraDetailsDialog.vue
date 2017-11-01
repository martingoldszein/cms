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
            <h4>Editar Obra</h4>
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
                 <img :src="editedImage" height="150">
                 <v-btn raised class="primary" @click="onPickFile">Subir Imagen</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-card-text>
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
    props: ['obra'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.obra.title,
        editedDescription: this.obra.description,
        editedImageUrl: this.obra.imageUrl,
        editedImage: this.obra.image
      }
    },
    methods: {

      // onCreateObra () {
      //   if (!this.formIsValid) {
      //     return
      //   }
      //   if (!this.image) {
      //     return
      //   }
      //   const obraData = {
      //     title: this.title,
      //     image: this.image,
      //     description: this.description,
      //     date: this.submittableDateTime
      //   }
      //   this.$store.dispatch('createObra', obraData)
      //   this.$router.push('/obras')
      // }

      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateObraData', {
          id: this.obra.id,
          title: this.editedTitle,
          description: this.editedDescription,
          image: this.editedImage
        })
        this.$router.push('/obras')
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

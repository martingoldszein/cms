import * as firebase from 'firebase'

export default {
  state: {
    loadedPublicaciones: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Publicacion in New York',
        date: new Date(),
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Publicacion in Paris',
        date: new Date(),
        description: 'It\'s Paris!'
      }
    ]
  },
  mutations: {
    setLoadedPublicaciones (state, payload) {
      state.loadedPublicaciones = payload
    },
    createPublicacion (state, payload) {
      state.loadedPublicaciones.push(payload)
    },
    updatePublicacion (state, payload) {
      const publicacion = state.loadedPublicaciones.find(publicacion => {
        return publicacion.id === payload.id
      })
      if (payload.title) {
        publicacion.title = payload.title
      }
      if (payload.description) {
        publicacion.description = payload.description
      }
      if (payload.date) {
        publicacion.date = payload.date
      }
    }
  },
  actions: {
    loadPublicaciones ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('publicaciones').once('value')
        .then((data) => {
          const publicaciones = []
          const obj = data.val()
          for (let key in obj) {
            publicaciones.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedPublicaciones', publicaciones)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createPublicacion ({commit, getters}, payload) {
      const publicacion = {
        title: payload.title,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('publicaciones').push(publicacion)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('publicaciones/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('publicaciones').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createPublicacion', {
            ...publicacion,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updatePublicacionData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('publicaciones').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updatePublicacion', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedPublicaciones (state) {
      return state.loadedPublicaciones.sort((publicacionA, publicacionB) => {
        return publicacionA.date > publicacionB.date
      })
    },
    featuredPublicaciones (state, getters) {
      return getters.loadedPublicaciones.slice(0, 5)
    },
    loadedPublicacion (state) {
      return (publicacionId) => {
        return state.loadedPublicaciones.find((publicacion) => {
          return publicacion.id === publicacionId
        })
      }
    }
  }
}

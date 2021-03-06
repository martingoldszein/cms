import * as firebase from 'firebase'

export default {
  state: {
    loadedObras: [ ]
  },
  mutations: {
    setLoadedObras (state, payload) {
      state.loadedObras = payload
    },
    createObra (state, payload) {
      state.loadedObras.push(payload)
    },
    updateObra (state, payload) {
      const obra = state.loadedObras.find(obra => {
        return obra.id === payload.id
      })
      if (payload.title) {
        obra.title = payload.title
      }
      if (payload.description) {
        obra.description = payload.description
      }
      if (payload.date) {
        obra.date = payload.date
      }
      if (payload.imageUrl) {
        obra.imageUrl = payload.imageUrl
      }
    }
  },
  actions: {
    loadObras ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('obras').once('value')
        .then((data) => {
          const obras = []
          const obj = data.val()
          for (let key in obj) {
            obras.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedObras', obras)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createObra ({commit, getters}, payload) {
      const obra = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('obras').push(obra)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('obras/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('obras').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createObra', {
            ...obra,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateObraData ({commit}, payload) {
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
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
      firebase.database().ref('obras').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateObra', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedObras (state) {
      return state.loadedObras.sort((obraA, obraB) => {
        return obraA.date > obraB.date
      })
    },
    featuredObras (state, getters) {
      return getters.loadedObras.slice(0, 5)
    },
    loadedObra (state) {
      return (obraId) => {
        return state.loadedObras.find((obra) => {
          return obra.id === obraId
        })
      }
    }
  }
}

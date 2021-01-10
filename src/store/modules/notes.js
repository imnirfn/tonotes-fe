import Notes from './../../models/Notes'

const notes = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllNotes() {
      return new Promise((resolve, reject) => {
        this.$repository.notes.listing()
          .then(res => {
            Notes.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    AddNotes({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.notes.create(data)
          .then(res => {
            Notes.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    DeleteNotes({ commit }, id) {
      return new Promise(async(resolve, reject) => {
        this.$repository.notes.delete(id)
          .then(res => {
            Notes.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    EditComplete({ commit }, data) {
      return new Promise(async(resolve, reject) => {
        this.$repository.notes.editComplete(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default notes

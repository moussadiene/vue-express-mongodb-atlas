import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const clients = {
    namespaced: true,
    state: {
        clients: [],
        errors: {},
    },
    mutations: {
        setIndexClients(state, clients) {
            state.clients = clients
            state.errors = {}
            localStorage.setItem('clients', JSON.stringify(state))
        },
        addClientsCommit(state, data) {
            //state.clients.push(data)
            axios.post(API_URL, {
                nom: data.nom,
                prenom: data.prenom,
                date_naiss: data.date_naiss,
                genre: data.genre,
                email: data.email,
                telephone: data.telephone,
                date: data.date,
            }).then((data) => {
                //console.log(data)
                state.clients.push(data.data);

            }).catch((err) => console.log(err.data))
            
        },

        removeClientsCommit(state, data) {
            const module = state.clients.find(clients => clients.id === data.id)
            if (module !== undefined) {
                state.clients.splice(state.clients.indexOf(data), 1)
            }
        },
        updateClientsCommit(state, data) {
            const record = state.clients.find(clients => clients.id === data.id)
            state.clients[record] = data
        }
    },
    actions: {

        getAllClients({ commit }) {
            axios
                .get(API_URL)
                .then((data) => {
                    commit('setIndexClients', data.data)
                    //context.commit('fetchEnd')
                })
                .catch((response) => {
                    commit('setIndexClients', response.data.errors)
                })
        },
        addClientsAction(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('addClientsCommit', payload)
                resolve()
            })
        },
        removeClientsAction(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('removeClientsCommit', payload)
                resolve()
            })
        },
        updateClientsAction(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('updateClientsCommit', payload)
                resolve()
            })
        }
    }

}

export default clients
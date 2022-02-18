import {
  CREATE_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION
} from '../graphql/mutations'
import { LOCATIONS, LOCATIONS_BY_USER } from '../graphql/queries'
import { apolloClient } from '../vue-apollo'

const state = {
  locations: [],
  locationsByUser: [],
  isLoadingBtn: false,
  isLoading: false,
  errors: []
}

const getters = {
  locations: state => state.locations,
  locationsByUser: state => state.locationsByUser,
  isLoadingBtn: state => state.isLoadingBtn,
  isLoading: state => state.isLoading,
  error: state => state.error
}

const mutations = {
  ALL_LOCATIONS_START (state) {
    state.isLoading = true
  },
  ALL_LOCATIONS_SUCCESS (state, payload) {
    state.locations = payload
    state.isLoading = false
  },

  ALL_LOCATIONS_BY_USER_START (state) {
    state.isLoading = true
  },
  ALL_LOCATIONS_BY_USER_SUCCESS (state, payload) {
    state.locationsByUser = payload
    state.isLoading = false
  },
  CREATE_LOCATION_START (state) {
    state.isLoadingBtn = true
  },
  CREATE_LOCATION_SUCCESS (state, payload) {
    state.isLoadingBtn = false
    state.locationsByUser.push(payload)
  },
  CREATE_LOCATION_FAILURE (state) {
    state.isLoadingBtn = false
  },

  EDIT_LOCATION_START (state) {
    state.isLoadingBtn = true
  },
  EDIT_LOCATION_SUCCESS (state, payload) {
    state.isLoadingBtn = false
    state.locationsByUser.map(item => {
      if (item.id === payload.id) {
        item.address = payload.address
      }
    })
  },
  EDIT_LOCATION_FAILURE (state) {
    state.isLoadingBtn = false
  },

  DELETE_LOCATION_START (state, id) {
    state.isLoadingBtn = id
  },
  DELETE_LOCATION_SUCCESS (state, id) {
    state.isLoadingBtn = false
    state.locationsByUser = state.locationsByUser.filter(item => item.id !== id)
  },
  DELETE_LOCATION_FAILURE (state, errors) {
    console.log(errors)
    state.errors = errors
    state.isLoadingBtn = false
  }
}

const actions = {
  async getAllLocations ({ commit }) {
    commit('ALL_LOCATIONS_START')
    const data = await apolloClient.query({
      query: LOCATIONS
    })
    commit('ALL_LOCATIONS_SUCCESS', data.data.locations)
    console.log(data)
  },

  getAllLocationsByUser ({ commit }) {
    commit('ALL_LOCATIONS_BY_USER_START')
    apolloClient.query({
      query: LOCATIONS_BY_USER
    }).then(res => {
      commit('ALL_LOCATIONS_BY_USER_SUCCESS', res.data.locationsByUser)
      console.log(res)
    })
  },

  async createLocation ({ commit, dispatch }, address) {
    commit('CREATE_LOCATION_START')
    await apolloClient.mutate({
      mutation: CREATE_LOCATION,
      variables: { address: address }
    }).then((res) => {
      console.log(res.data.createLocation)
      const location = res.data.createLocation
      commit('CREATE_LOCATION_SUCCESS', location)
    })
  },
  async editLocation ({ commit, dispatch }, payload) {
    commit('EDIT_LOCATION_START')
    await apolloClient.mutate({
      mutation: UPDATE_LOCATION,
      variables: {
        id: payload.id,
        address: payload.title
      }
    }).then((res) => {
      console.log(res.data.updateLocation)
      // dispatch('getAllLocations')
      commit('EDIT_LOCATION_SUCCESS', res.data.updateLocation)
    })
  },

  async deleteLocation ({ commit, dispatch }, id) {
    commit('DELETE_LOCATION_START', id)
    await apolloClient.mutate({
      mutation: DELETE_LOCATION,
      variables: { id: id }
    }).then((res) => {
      const removedLocation = res.data.removeLocation.id
      commit('DELETE_LOCATION_SUCCESS', removedLocation)
    })
  }
}

export default {
  state, getters, mutations, actions
}

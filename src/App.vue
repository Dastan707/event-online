<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from './components/Header.vue'
export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      isAuth: 'isAuth'
    })
  },
  methods: {
    ...mapActions([
      'getMyEvents'
    ])
  },
  created () {
    if (localStorage.getItem('apollo-token')) {
      this.getMyEvents()
      this.$store.dispatch('getCurrentUser')
      this.$store.dispatch('getAllLocationsByUser')
    }
  }
}
</script>

<style>
#app {
  font-family: Didact Gothic, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper{
  width: 90%;
  margin: 0 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

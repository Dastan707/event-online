<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand class="logo" :to="{name: 'EventsList'}">
        EVENTS ONLINE
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isAuth">
        <b-nav-item class="item-link" active :to="{name: 'EventsList'}">
              Список мероприятий
        </b-nav-item>
        <b-nav-item class="item-link" active :to="{name: 'CreateEvent'}">
              Создать мероприятие
        </b-nav-item>
        <b-nav-item class="item-link" active :to="{name: 'locations'}">
              Локации
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item class="item-link" active :to="{name: 'Login'}">
            Войти
        </b-nav-item>
        <b-nav-item class="item-link" active :to="{name: 'Register'}">
            Зарегистрироваться
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="isAuth">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon icon="person-circle"></b-icon>
          </template>
          <b-dropdown-item @click="toProfile">
                    Профиль
            </b-dropdown-item>
            <b-dropdown-item @click="logoutBtn" href="#">
                    Выйти
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-modal id="modalLogout" ref="modalLogout" centered title="Выйти?">
            Вы уверены, что хотите выйти?
                <template slot="modal-footer">
                <b-button variant="primary" @click="logoutFromModal()" class="mr-1">Выйти</b-button>
                <b-button variant="secondary" @click="$bvModal.hide('modalLogout')">Отмена</b-button>
            </template>
        </b-modal>
</div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'isAuth'
    })
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ]),
    ...mapMutations([
      'clearEventStore'
    ]),
    toProfile () {
      this.$router.push({ name: 'Profile' })
    },
    logoutBtn () {
      this.$refs.modalLogout.show()
    },
    logoutFromModal () {
      this.logoutUser()
        .then(() => {
          this.$store.dispatch('clearEventStore', null)
          this.$refs.modalLogout.hide()
          this.$router.push({ name: 'Login' })
        })
    }
  }
}
</script>

<style scoped>
  a {
    color: #fff;
  }
  a:hover {
    color: rgb(228, 228, 228);
    text-decoration: none;
  }
  .logo {
    margin-left: 20px;
  }
  .navbar {
    padding: 0;
  }
  .item-link a{
    padding: 15px 0;
  }
</style>

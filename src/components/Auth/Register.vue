<template>
<div>
  <BContainer
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
  <b-form class="bg-light p-5 rounded" @submit.prevent="registerForm">
  <h5 class="d-flex justify-content-center">Регистрация</h5>
  <b-form-group
   id="input-group-2"
   label="Имя пользователя:"
   label-for="input-2"
  >
  <b-form-input
   id="input-2"
   v-model="user.username"
   type="text"
   placeholder="Введите ваше имя"
   required
  >
  </b-form-input>
  </b-form-group>
  <b-form-group
   id="input-group-1"
   label="Email адрес:"
   label-for="input-1"
  >
  <b-form-input
   id="input-1"
   v-model="user.email"
   type="text"
   placeholder="Введите почту"
   autocomplete="off"
   required
  >
  </b-form-input>
  </b-form-group>
  <b-form-group
   id="input-group-3"
   label="Пароль:"
   label-for="input-3"
  >
  <b-form-input
   id="input-3"
   v-model="user.password"
   type="password"
   placeholder="Введите ваш пароль"
   required
   >
   </b-form-input>
   </b-form-group>
   <p class="errors" v-if="error">{{error}}</p>
   <p class="paths">
   Уже зарегистрированы?
   <router-link :to="{name: 'Login'}"> Войти</router-link>
   </p>
   <div class="d-flex justify-content-center align-items-center">
   <b-button type="submit" variant="primary">Зарегистрироваться</b-button>
   </div>
   </b-form>
  </BContainer>
</div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    toastError (variant = null, body) {
      this.$bvToast.toast(`${body}`, {
        title: 'Ошибка!',
        variant: variant,
        solid: true,
        autoHideDelay: 700
      })
    },
    toastSuccess (variant = null, body) {
      this.$bvToast.toast(`${body}`, {
        title: 'Отлично!',
        variant: variant,
        solid: true,
        autoHideDelay: 700
      })
    },
    registerForm () {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const checkEmail = regex.test(this.user.email)
      if (checkEmail) {
        this.$store.dispatch('registerUser', {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password
        })
          .then(() => {
            this.$router.push({ name: 'Login' })
            this.toastSuccess('success', 'Успешно зарегистрирован')
          })
          .catch(error => {
            console.log(error, 'error')
            this.toastError('danger', error.message.split(':')[1])
          })
      } else {
        this.toastError('danger', 'Введите адрес эл.почты корректно')
      }
    }
  }
}
</script>

<style>

</style>

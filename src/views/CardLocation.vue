<template>
    <div>
        <h3 v-if="errors">{{errors}}</h3>
        <ul v-else class="card-list">
            <li
                v-for="event in eventsFrom"
                :key="event.id"
                class="card-list__item"
            >
                <h4>{{event.name}}</h4>
                <p>{{event.description}}</p>
                <p>{{(new Date(event.day)).toLocaleDateString()}}</p>
                <span>Организатор: <strong>{{event.account.username}}</strong></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GcardLocation',
  computed: {
    ...mapGetters({
      eventsFrom: 'EVENTS_FROM_LOCATION',
      errors: 'ERRORS'
    })
  },
  created () {
    this.$store.dispatch('getAllEventsFromLocation', parseInt(this.$route.params.id))
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style scoped>
ul,li {
    list-style-type: none;
}
a {
    display: block;
    color: black
}
.card-table {
    width: 100%;
}
.card-list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}
.card-list__item {
    width: 18%;
    padding: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    transition: 0.2s ease-in-out;
}
.card-list__item:hover {
    background: rgb(245, 245, 245);
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
    text-decoration: none;
}
</style>

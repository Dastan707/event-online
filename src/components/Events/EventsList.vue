<template>
  <div>
      <div class="d-flex mt-2">
        <div class="wrapper text-left">
            <h4 class="mt-2">Все мероприятия</h4>
        </div>
      </div>
      <div>
          <div class="d-flex wrapper justify-content-between align-items-center mt-3 mb-2">
              <div class="d-flex justify-content-start aling-items-center mr-2">
                <div class="date-block">
                <label for="datepicker1">Начало даты (ДД/ММ/ГГ)</label>
                    <b-form-datepicker
                    placeholder="дата не выбрана"
                    id="datepicker1"
                    :min="minStartDay"
                    :max="maxStartDay"
                    v-model="filterData.startDay"
                    :hide-header="true"
                    ></b-form-datepicker>
                </div>
                <div class="ml-3 date-block">
                <label for="datepicker2">Конец даты (ДД/ММ/ГГ)</label>
                    <b-form-datepicker
                    placeholder="дата не выбрана"
                    id="datepicker2"
                    :min="minEndDay"
                    :max="maxEndDay"
                    v-model="filterData.endDay"
                    :date-disabled-fn="disabledDate"
                    :hide-header="true"
                    ></b-form-datepicker>
                </div>
                <div class="ml-4 btns-block">
                        <b-button @click="filterDateBtn" variant="primary">Искать</b-button>

                        <b-button class="ml-3" @click="resetFilter" variant="danger">Очистить</b-button>
                </div>
              </div>
            <div class="justify-content-end mt-3">
            </div>
        </div>
      </div>
        <div v-if="!EVENTS" class="mt-4">
          <h3>Мероприятия не найдены</h3>
      </div>
      <div v-else>
      <ul class="event-list" id="event-id">
                <li class="event-list__item" v-for="item in EVENTS" :key="item.id">
                    <h4 >{{item.name}}</h4>
                    <div>
                        Локация: {{item.location.address}}
                        <div class="mt-2">
                            <p class="mb-1">Дата: {{new Date(item.day).toLocaleDateString()}} </p>
                            <p>Организатор: <b>{{item.account.username}}</b></p>
                        </div>
                    </div>
                </li>
            </ul>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EventsList',
  data () {
    return {
      events: [],
      filterData: {
        startDay: '',
        endDay: ''
      },
      minStartDay: '',
      maxStartDay: '',
      minEndDay: '',
      maxEndDay: '',
      rows: 10,
      perPage: 1
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
    disabledDate () {
      if (this.filterData.startDay > this.filterData.endDay) {
        this.filterData.endDay = this.filterData.startDay
        this.minEndDay = this.filterData.startDay
      }
    },
    ...mapActions([
      'getAllEvents',
      'getEventDetails',
      'getMyEvents'
    ]),
    filterDateBtn () {
      if (this.filterData.startDay && this.filterData.endDay) {
        this.$store.dispatch('getEventsByDates', {
          startDay: this.filterData.startDay,
          endDay: this.filterData.endDay
        })
          .then((res) => {
            console.log(res, 'success')
          })
          .catch(error => console.log(error))
      } else {
        this.toastError('danger', 'Заполните поля')
      }
    },
    resetFilter () {
      this.filterData = {}
      this.getAllEvents()
    }
  },
  computed: {
    ...mapGetters([
      'EVENTS',
      'SHOW_BTN_DETAILS'
    ])
  },
  mounted () {
    this.getAllEvents()
  }
}
</script>

<style>
.card-block{
    display: flex;
    flex-wrap: wrap;
}
.date-block{
    width: 260px;
    height: 80px;
}
.btns-block{
    margin-top: 30px;
}
ul,li {
    list-style-type: none;
}
.event-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
}
.event-list__item {
    width: 18%;
    padding: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    transition: 0.2s ease-in-out;

}
.event-list__item:hover{
    background: rgb(245, 245, 245);
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
    text-decoration: none;
}
</style>

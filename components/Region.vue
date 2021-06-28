<template>
  <div class="text-lg-right">
    <!-- <a class="link pointer" data-toggle="modal" data-target="#exampleModalCenter">
      <i class="fa fa-location-arrow" aria-hidden="true" />
      {{ region }}
    </a> -->
    <div
      id="exampleModalCenter"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center pb-5">
            <img class="img-fluid" :src="require('@/assets/geo.svg')" alt="Geolocation">
            <h5 class="mt-4">
              Выбранная локация:
              <span class="font-weight-bold">{{ region }}</span>
            </h5>
            <div class="col-lg-9 pb-2 mx-auto mt-4">
              <v-select
                v-model="selectedCity"
                class="custom-element"
                placeholder="Укажите другой регион"
                :options="cities"
              >
                <div slot="no-options">
                  Совпадения не найдены
                </div>
              </v-select>
              <button class="btn btn-primary w-100 py-2 px-3 mt-4" data-dismiss="modal" @click="changeCity">
                Продолжить с новым регионом
              </button>
              <div class="text-center mt-4">
                <a class="link pointer" data-dismiss="modal" @click="clearRegion">Определять автоматически</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Region',
  data: () => ({
    selectedCity: ''
  }),
  computed: {
    region () {
      return this.$store.state.location
    },
    sessionProducts () {
      return this.$store.state.sessionProducts
    },
    cities () {
      const citiesArray = []
      for (const product of this.sessionProducts) {
        citiesArray.push(product.fields.location)
      }
      return [...new Set(citiesArray)]
    }
  },
  methods: {
    changeCity () {
      if (this.selectedCity) {
        this.$store.commit('setLocation', this.selectedCity)
        localStorage.region = this.selectedCity
      }
    },
    async clearRegion () {
      localStorage.removeItem('region')
      const headers = {
        'Accept-Language': 'ru'
      }
      const request = await fetch('https://freegeoip.app/json/', {
        method: 'GET',
        headers
      })
      const locationData = await request.json()
      this.selectedCity = ''
      let selectedCity
      if (locationData.city) {
        selectedCity = locationData.city
      } else {
        selectedCity = locationData.country_name
      }
      this.$store.commit('setLocation', selectedCity)
    }
  }
}
</script>

<style lang="css" scoped>
.modal-header {
  border-bottom: 0;
}

.modal-body img {
  user-select: none;
}

.modal-body h5 {
  font-weight: 400;
}
</style>

<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  name: 'Default',
  data: () => ({
    region: ''
  }),
  mounted () {
    this.getLocation()
    this.getAvailableCities()
  },
  methods: {
    async getLocation () {
      if (!localStorage.region) {
        const headers = {
          'Accept-Language': 'ru'
        }
        const request = await fetch('https://freegeoip.app/json/', {
          method: 'GET',
          headers
        })
        const locationData = await request.json()
        if (locationData.city) {
          this.region = locationData.city
        } else {
          this.region = locationData.country_name
        }
        this.$store.commit('setLocation', this.region)
      } else {
        this.$store.commit('setLocation', localStorage.region)
      }
    },
    getAvailableCities () {
      client.getEntries({
        content_type: 'category',
        include: 2
      }).then((entries) => {
        const sessionProducts = []
        for (const category of entries.items) {
          for (const subcategory of category.fields.subcategories) {
            for (const product of subcategory.fields.products) {
              sessionProducts.push(product)
            }
          }
        }
        this.$store.commit('addToSessionProducts', sessionProducts)
      // eslint-disable-next-line
      }).catch(e => console.log(e))
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.link:hover {
  color: #007bff !important;
  text-decoration: none;
}

.tags h3 {
  font-size: 22px;
}

.tags h3:not(:first-child):before {
  font-family: FontAwesome;
  content: '\f178';
  color: rgba(0,0,0,0.3);
  padding-left: 10px;
  padding-right: 5px;
}

.pointer {
  cursor: pointer;
}

.search-icon {
  width: 120px;
  user-select: none;
}

.btn {
  border-radius: 40px;
}

.main {
  flex: 1 0 auto;
}

.footer{
   flex: 0 0 auto;
}

.bg-service {
  background-color: rgba(0,0,0,0.03);
}
</style>

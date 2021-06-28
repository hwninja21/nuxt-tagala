<template>
  <div>
    <Header />
    <section class="container pb-5">
      <div class="col-12 row mx-auto px-0 tags mt-3">
        <div class="d-lg-flex col-lg-9 order-lg-1 order-2 mt-lg-0 mt-3 px-0">
          <h3>
            <nuxt-link class="pointer link" to="/">
              Главная
            </nuxt-link>
          </h3>
          <h3>
            <nuxt-link class="pointer link" :to="`/${categoryLink}`">
              {{ category.fields.name }}
            </nuxt-link>
          </h3>
          <h3>
            {{ subcategory.fields.name }}
          </h3>
        </div>
        <div class="col-lg-3 px-0 order-lg-2 order-1">
          <Region />
        </div>
      </div>
      <h1 class="category mt-5">
        {{ subcategory.fields.name }}
      </h1>
      <div class="mt-5">
        <div class="col-12 px-0 mx-auto row">
          <v-select
            v-model="selected"
            class="custom-element col-xl-3 col-lg-4 px-0"
            placeholder="Сортировка"
            :searchable="false"
            :options="['По возрастанию цены', 'По убыванию цены']"
            @input="sort"
          />
          <!-- <v-select
            v-model="selectedLocation"
            class="custom-element ml-lg-3 col-xl-3 col-lg-4 mt-lg-0 mt-2 px-0"
            placeholder="Город"
            :options="cities"
            @input="filter"
          >
            <div slot="no-options">
              Совпадения не найдены
            </div>
          </v-select> -->
        </div>
        <div v-if="subcategory.fields.products && subcategory.fields.products.length">
          <Product v-for="product of subcategory.fields.products" :key="product.fields.title" :breadcrumbs="breadcrumbsNames" :product="product" class="mx-1 mt-4" />
        </div>
        <div v-else class="mt-5">
          <div class="text-center">
            <img class="search-icon img-fluid" src="https://img.icons8.com/ios-filled/500/000000/search.png">
            <h5 class="mt-4 text-muted">
              В городе {{ selectedLocation }} ничего не найдено
            </h5>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Product from '@/components/Product'
import Header from '@/components/Header'
import Region from '@/components/Region'
import client from '~/plugins/contentful'

export default {
  name: 'Subcategory',
  components: {
    Product,
    Region,
    Header
  },
  asyncData ({ params }) {
    return client.getEntries({
      content_type: 'category',
      'fields.slug': params.category,
      include: 2
    }).then((entriesCategory) => {
      const subcategory = entriesCategory.items[0].fields.subcategories.find(i => i.fields.slug === params.subcategory)
      // const subcategoryCopy = JSON.parse(JSON.stringify(subcategory))
      // const products = subcategoryCopy.fields.products.sort(function (a, b) { return 0.5 - Math.random() })
      subcategory.fields.products.sort(function (a, b) { return 0.5 - Math.random() })
      return {
        category: entriesCategory.items[0],
        subcategory
      }
    // eslint-disable-next-line
    }).catch(e => console.log(e))
  },
  data: () => ({
    productsOriginal: [],
    selected: '',
    selectedLocation: ''
  }),
  computed: {
    categoryLink () {
      return this.$route.params.category
    },
    breadcrumbsNames () {
      return [
        this.category.fields.name,
        this.subcategory.fields.name
      ]
    },
    selectedIpCity () {
      return this.$store.state.location
    },
    cities () {
      const citiesArray = []
      for (const product of this.productsOriginal) {
        citiesArray.push(product.fields.location)
      }
      return [...new Set(citiesArray)]
    }
  },
  watch: {
    selectedIpCity (val) {
      if (val !== 'Локация') {
        this.selectedLocation = val
        this.filter(this.selectedLocation)
      }
    }
  },
  created () {
    for (const product of this.subcategory.fields.products) {
      this.productsOriginal.push(product)
    }
    if (this.selectedIpCity !== 'Локация') {
      this.selectedLocation = this.selectedIpCity
      this.filter(this.selectedLocation)
    }
  },
  methods: {
    sort (sortMethod) {
      if (this.selected === 'По возрастанию цены') {
        this.subcategory.fields.products.sort((a, b) => {
          return +a.fields.price.replace(/\D+/g, '') - +b.fields.price.replace(/\D+/g, '')
        })
      } else if (this.selected === 'По убыванию цены') {
        this.subcategory.fields.products.sort((a, b) => {
          return +b.fields.price.replace(/\D+/g, '') - +a.fields.price.replace(/\D+/g, '')
        })
      } else {
        this.subcategory.fields.products = []
        for (const product of this.productsOriginal) {
          this.subcategory.fields.products.push(product)
        }
      }
      if (this.selectedLocation && sortMethod === null) {
        this.filter(this.selectedLocation)
      }
    },
    filter (city) {
      if (this.selectedLocation) {
        this.subcategory.fields.products = this.productsOriginal.filter((product) => {
          return product.fields.location === this.selectedLocation
        })
      } else {
        this.subcategory.fields.products = []
        for (const product of this.productsOriginal) {
          this.subcategory.fields.products.push(product)
        }
      }
      if (this.selected) {
        this.sort(this.selected)
      }
    }
  },
  head () {
    return {
      title: this.subcategory.fields.name
    }
  }
}
</script>

<style scoped>
.category {
  font-size: 36px;
  font-weight: 600;
}

@media screen and (max-width: 767px) {
  .tags h3 {
    width: 100%;
  }

  .tags h3:before {
    padding-left: 0px;
  }
}
</style>

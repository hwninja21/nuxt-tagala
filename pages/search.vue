<template>
  <div>
    <Header :keyword-prop="keyword" />
    <section class="container pb-5">
      <div class="col-12 mx-auto row px-0 tags mt-3">
        <div class="col-lg-9 order-lg-1 order-2 mt-lg-0 mt-3 px-0">
          <h3>
            <nuxt-link class="pointer link link-breadcrumb" to="/">
              Главная
            </nuxt-link>
          </h3>
        </div>
        <div class="col-lg-3 order-lg-2 order-1 px-0">
          <Region />
        </div>
      </div>
      <div>
        <h1 class="category mt-5">
          Поиск: "{{ keyword }}"
        </h1>
        <div class="col-12 px-0 mx-auto row mt-4">
          <v-select
            v-model="selected"
            class="custom-element col-xl-3 col-lg-4 px-0"
            placeholder="Сортировка"
            :searchable="false"
            :options="['По возрастанию цены', 'По убыванию цены']"
            @input="sort"
          />
          <v-select
            v-model="selectedLocation"
            class="custom-element ml-lg-3 col-xl-3 col-lg-4 mt-lg-0 mt-2 px-0"
            placeholder="Город"
            :options="cities"
            @input="filter"
          >
            <div slot="no-options">
              Совпадения не найдены
            </div>
          </v-select>
        </div>
      </div>
      <div v-if="products && products.length">
        <Product
          v-for="product of products"
          :key="`${product.category.name}-${product.subcategory.name}-${product.fields.title}`"
          :breadcrumbs="[product.category.name, product.subcategory.name]"
          :product="product"
          class="mx-1 mt-4"
        />
      </div>
      <div v-else class="mt-5">
        <div class="text-center">
          <img class="search-icon img-fluid" src="https://img.icons8.com/ios-filled/500/000000/search.png">
          <h5 class="col-lg-5 mx-auto mt-4 text-muted">
            По запросу "{{ keyword }}" в городе {{ selectedLocation }} ничего не найдено
          </h5>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Product from '@/components/Product'
import Region from '@/components/Region'
import Header from '@/components/Header'

export default {
  name: 'Search',
  components: {
    Product,
    Region,
    Header
  },
  data: () => ({
    selected: '',
    selectedLocation: ''
  }),
  computed: {
    keyword () {
      return this.$route.query.keyword
    },
    title () {
      if (this.keyword) {
        return `Поиск - ${this.keyword}`
      } else {
        return 'Поиск'
      }
    },
    products () {
      return this.$store.state.products
    },
    productsOriginal () {
      return this.$store.state.productsOriginal
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
        this.selectedLocation = this.selectedIpCity
        this.filter(this.selectedLocation)
      }
    },
    cities () {
      if (this.selectedLocation !== 'Локация') {
        this.selectedLocation = this.selectedIpCity
        this.filter(this.selectedLocation)
      }
    }
  },
  created () {
    if (this.keyword) {
      this.$store.dispatch('search', this.keyword)
    }
  },
  methods: {
    sort () {
      this.$store.commit('sort', this.selected)
    },
    filter () {
      this.$store.commit('filter', this.selectedLocation)
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped>
.category {
  font-size: 36px;
  font-weight: 600;
}
</style>

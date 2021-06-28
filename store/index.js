import Vue from 'vue'
import Vuex from 'vuex'
import client from '~/plugins/contentful'

Vue.use(Vuex)

export const state = () => ({
  sessionProducts: [],
  products: [],
  productsOriginal: [],
  location: 'Локация',
  selected: '',
  selectedLocation: ''
})

export const mutations = {
  addToSessionProducts (state, products) {
    state.sessionProducts = products
  },
  addToProducts (state, products) {
    state.products = products
    state.productsOriginal = products
  },
  // emptyProducts (state) {
  //   state.productsOriginal = []
  // },
  setLocation (state, location) {
    state.location = location
    state.selectedLocation = location
  },
  sort (state, sortMethod) {
    state.selected = sortMethod
    if (state.selected === 'По возрастанию цены') {
      state.products.sort((a, b) => {
        return +a.fields.price.replace(/\D+/g, '') - +b.fields.price.replace(/\D+/g, '')
      })
    } else if (state.selected === 'По убыванию цены') {
      state.products.sort((a, b) => {
        return +b.fields.price.replace(/\D+/g, '') - +a.fields.price.replace(/\D+/g, '')
      })
    } else {
      state.products = []
      for (const product of state.productsOriginal) {
        state.products.push(product)
      }
    }
    if (state.selectedLocation && sortMethod === null) {
      this.commit('filter', state.selectedLocation)
    }
  },
  filter (state, city) {
    state.selectedLocation = city
    if (state.selectedLocation) {
      state.products = state.productsOriginal.filter((product) => {
        return product.fields.location === state.selectedLocation
      })
    } else {
      state.products = []
      for (const product of state.productsOriginal) {
        state.products.push(product)
      }
    }
    if (state.selected) {
      this.commit('sort', state.selected)
    }
  }
}

export const actions = {
  search ({ commit }, keyword) {
    client.getEntries({
      content_type: 'category',
      include: 2
    }).then((entries) => {
      const products = []
      for (const category of entries.items) {
        for (const subcategory of category.fields.subcategories) {
          for (const product of subcategory.fields.products) {
            if (product.fields.title.toLowerCase().includes(keyword.toLowerCase())) {
              const extendedProduct = {
                ...product,
                ...{
                  category: {
                    name: category.fields.name,
                    slug: category.fields.slug
                  },
                  subcategory: {
                    name: subcategory.fields.name,
                    slug: subcategory.fields.slug
                  }
                }
              }
              products.push(extendedProduct)
            }
          }
        }
      }
      commit('addToProducts', products)
    // eslint-disable-next-line
    }).catch(e => console.log(e))
  }
}

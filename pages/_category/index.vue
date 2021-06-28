<template>
  <div>
    <Header />
    <section class="container pb-5">
      <div class="col-12 mx-auto row px-0 tags mt-3">
        <div class="d-lg-flex col-lg-9 order-lg-1 order-2 mt-lg-0 mt-3 px-0">
          <h3>
            <nuxt-link class="pointer link" to="/">
              Главная
            </nuxt-link>
          </h3>
          <h3>
            {{ category.fields.name }}
          </h3>
        </div>
        <div class="col-lg-3 px-0 order-lg-2 order-1">
          <Region />
        </div>
      </div>
      <h1 class="category mt-5">
        {{ category.fields.name }}
      </h1>
      <div class="col-12 mx-auto px-0 row mt-5">
        <div v-for="(subcategory, i) of category.fields.subcategories" :key="subcategory.fields.subcategoryName" class="col-lg-6 px-0 mb-4">
          <div :class="{'mr-lg-4': (i+1) % 2 !== 0}" class="h-100 bg-service rounded py-4">
            <Subcategory :subcategory="subcategory.fields" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Subcategory from '@/components/Subcategory'
import Header from '@/components/Header'
import Region from '@/components/Region'
import client from '~/plugins/contentful'

export default {
  name: 'Category',
  components: {
    Subcategory,
    Header,
    Region
  },
  asyncData ({ params }) {
    return client.getEntries({
      content_type: 'category',
      'fields.slug': params.category
    }).then((entries) => {
      return {
        category: entries.items[0]
      }
    // eslint-disable-next-line
    }).catch(e => console.log(e))
  },
  head () {
    return {
      title: this.category.fields.name
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

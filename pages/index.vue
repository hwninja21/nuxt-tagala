<template>
  <div>
    <Header />
    <section class="container pb-5">
      <Region class="mt-3" />
      <h1 class="category mt-5">
        Главная
      </h1>
      <div class="col-12 mx-auto px-0 row mt-5">
        <div v-for="(category, i) of categories" :key="category.name" class="col-lg-6 px-0 mb-4">
          <div :class="{'mr-lg-4': (i+1) % 2 !== 0}" class="h-100 bg-service rounded py-4">
            <Category :category="category.fields" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Category from '@/components/Category'
import Header from '@/components/Header'
import Region from '@/components/Region'
import client from '~/plugins/contentful'

export default {
  name: 'Main',
  components: {
    Category,
    Region,
    Header
  },
  asyncData () {
    return client.getEntries({
      content_type: 'category'
    }).then((entries) => {
      return {
        categories: entries.items
      }
    // eslint-disable-next-line
    }).catch(e => console.log(e))
  },
  head: {
    title: 'Главная'
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

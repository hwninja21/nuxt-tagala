<template>
  <div class="col-12 h-100">
    <div class="row h-100">
      <div class="col-lg-4 text-center align-self-center pr-lg-0">
        <nuxt-link
          :to="category.slug"
          append
        >
          <img
            v-lazy="`https:${category.image.fields.file.url}`"
            :src="require('@/assets/spinner-small.gif')"
            :alt="category.name"
            class="img-fluid pointer rounded"
          >
        </nuxt-link>
      </div>
      <div class="d-flex flex-column col-lg-8">
        <div class="main">
          <h2 class="category-title mt-lg-0 mt-2">
            <nuxt-link class="pointer link" :to="category.slug" append>
              {{ category.name }}
            </nuxt-link>
          </h2>
          <!-- eslint-disable-next-line -->
          <div class="text-muted" v-html="$md.render(category.description)" />
        </div>
        <div class="footer">
          <nuxt-link :to="category.slug" class="btn btn-primary font-weight-bold" append>
            Смотреть
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.category-title {
  font-size: 24px;
}
</style>

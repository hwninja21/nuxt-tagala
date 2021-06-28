<template>
  <div class="col-12 h-100">
    <div class="row h-100">
      <div class="col-lg-4 text-center align-self-center pr-lg-0">
        <nuxt-link
          :to="subcategory.slug"
          append
        >
          <img
            v-lazy="`https:${subcategory.image.fields.file.url}`"
            :src="require('@/assets/spinner-small.gif')"
            :alt="subcategory.name"
            class="img-fluid pointer rounded"
          >
        </nuxt-link>
      </div>
      <div class="d-flex flex-column col-lg-8">
        <div class="main">
          <h2 class="subcategory-title mt-lg-0 mt-2">
            <nuxt-link class="pointer link" :to="subcategory.slug" append>
              {{ subcategory.name }}
            </nuxt-link>
          </h2>
          <!-- eslint-disable-next-line -->
          <div class="text-muted" v-html="$md.render(subcategory.description)" />
        </div>
        <div class="footer">
          <nuxt-link :to="subcategory.slug" class="btn btn-primary font-weight-bold" append>
            Смотреть
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubcategoryCard',
  props: {
    subcategory: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.subcategory-title {
  font-size: 24px;
}
</style>

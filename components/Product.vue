<template>
  <div class="d-flex rounded py-3 bg-service row">
    <div class="col-lg-3 align-self-center text-center">
      <nuxt-link
        :to="link"
        :append="!product.category"
      >
        <img
          v-lazy="`https:${product.fields.image.fields.file.url}`"
          :src="require('@/assets/spinner.gif')"
          :alt="product.fields.title"
          class="img-fluid pointer rounded"
        >
      </nuxt-link>
    </div>
    <div class="col-lg-9 mt-lg-0 mt-3">
      <div v-if="!product.category" class="text-muted">
        <small>{{ breadcrumbs[0] }} <i class="fa fa-long-arrow-right" aria-hidden="true" /></small>
        <small>{{ breadcrumbs[1] }}</small>
      </div>
      <div v-else class="text-muted">
        <small>
          <nuxt-link class="pointer link" :to="`/${product.category.slug}`">
            {{ product.category.name }}
          </nuxt-link>
        </small>
        <small>
          <i class="fa fa-long-arrow-right" aria-hidden="true" />
        </small>
        <small>
          <nuxt-link class="pointer link" :to="`/${product.category.slug}/${product.subcategory.slug}`">
            {{ product.subcategory.name }}
          </nuxt-link>
        </small>
      </div>
      <h2 class="service-title mt-2">
        <nuxt-link
          class="pointer link"
          :to="link"
          :append="!product.category"
        >
          {{ product.fields.title }}
        </nuxt-link>
      </h2>
      <!-- eslint-disable-next-line -->
      <div class="service-text text-muted" v-html="$md.render(product.fields.description)" />
      <h4 class="service-text mt-2 mb-3">
        Цена:
        <span class="font-weight-bold">{{ product.fields.price }}</span>
      </h4>
      <div class="row">
        <div class="service-user col-lg-6">
          <a class="font-weight-bold text-dark">
            {{ product.fields.name }}
          </a>
          <span>
            —
          </span>
          <a
            v-if="isNumberHidden"
            class="btn btn-primary show-phone font-weight-bold"
            href="#"
            @click.prevent="isNumberHidden = false"
          >
            Смотреть тел.
          </a>
          <a v-else class="font-weight-bold" :href="`tel:+${product.fields.phoneNumber.replace('+', '').replace(/ /g, '')}`">
            {{ product.fields.phoneNumber }}
          </a>
        </div>
        <div class="col-lg-6 mt-lg-0 mt-2 text-lg-right">
          <div class="">
            <span class="service-user font-weight-bold text-success">
              <i class="fa fa-map-marker" aria-hidden="true" />
              {{ product.fields.location }}
            </span>
          </div>
          <div class="">
            <span class="service-date">
              {{ date }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    },
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isNumberHidden: true
  }),
  computed: {
    date () {
      const date = new Date(this.product.sys.createdAt).toLocaleDateString()
      const timeWithoutSeconds = new Date(this.product.sys.createdAt).toLocaleTimeString([],
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      )
      return `${date} ${timeWithoutSeconds}`
    },
    link () {
      if (this.product.category) {
        return `/${this.product.category.slug}/${this.product.subcategory.slug}/${this.product.fields.slug}`
      } else {
        return this.product.fields.slug
      }
    }
  }
}
</script>

<style lang="css" scoped>
.show-phone {
  border-radius: 40px;
}

.service-title {
  font-size: 22px;
}

.service-text {
  font-size: 18px;
  margin-bottom: 5px;
}

.service-user {
  font-size: 18px;
}

.service-user a:nth-child(1) {
  color: black !important;
}

.service-user a:nth-child(1):hover {
  text-decoration: none;
}

.service-date {
  font-size: 18px;
  color: rgba(0,0,0,0.3);
}
</style>

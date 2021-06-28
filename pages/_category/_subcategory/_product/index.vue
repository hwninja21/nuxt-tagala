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
            <nuxt-link class="pointer link" :to="`/${categoryLink}/${subcategoryData.fields.slug}`">
              {{ subcategoryData.fields.name }}
            </nuxt-link>
          </h3>
          <h3>
            {{ product.fields.title }}
          </h3>
        </div>
        <div class="col-lg-3 px-0 order-lg-2 order-1">
          <Region />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-6">
          <img class="img-fluid rounded" :src="`https:${product.fields.image.fields.file.url}`" alt="">
        </div>
        <div class="col-lg-6 mt-lg-0 mt-3">
          <div class="d-flex flex-column h-100">
            <div class="main-content">
              <h1 class="product-title">
                {{ product.fields.title }}
              </h1>
              <div class="mt-4">
                <h5 class="text-success">
                  Цена:
                  <span class="font-weight-bold">{{ product.fields.price }}</span>
                </h5>
              </div>
              <div class="bg-service rounded col-lg-6 py-3 mt-3 mb-2">
                <h5>
                  <i class="fa fa-user text-muted" aria-hidden="true" /> {{ product.fields.name }}
                </h5>
                <div class="pt-2">
                  <span class="font-weight-bold text-success">
                    <i class="fa fa-map-marker" aria-hidden="true" />
                    {{ product.fields.location }}
                  </span>
                </div>
                <div class="pt-3">
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
              </div>
            </div>
            <footer class="text-muted-date">
              Дата объявления
              <span class="font-weight-bold">{{ date }}</span>
            </footer>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-weight-bold">
          Описание
        </h4>
        <!-- eslint-disable-next-line -->
        <div class="mt-3 product-text" v-html="$md.render(product.fields.description)" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Region from '@/components/Region'
import client from '~/plugins/contentful'

export default {
  name: 'Product',
  components: {
    Header,
    Region
  },
  asyncData ({ params }) {
    return client.getEntries({
      content_type: 'product',
      'fields.slug': params.product
    }).then((entriesProduct) => {
      return client.getEntries({
        content_type: 'category',
        'fields.slug': params.category
      }).then((entriesCategory) => {
        return {
          category: entriesCategory.items[0],
          product: entriesProduct.items[0]
        }
      // eslint-disable-next-line
      }).catch(e => console.log(e))
    // eslint-disable-next-line
    }).catch(e => console.log(e))
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
    categoryLink () {
      return this.$route.params.category
    },
    subcategoryData () {
      return this.category.fields.subcategories.find(i => i.fields.slug === this.$route.params.subcategory)
    }
  },
  head () {
    return {
      title: this.product.fields.title
    }
  }
}
</script>

<style lang="css" scoped>
.product-title {
  font-size: 32px;
}

.product-text {
  font-size: 18px;
}

.text-muted-date {
  color: rgba(0,0,0,0.35)
}

.footer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-content {
   flex: 1 0 auto;
}

footer {
   flex: 0 0 auto;
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

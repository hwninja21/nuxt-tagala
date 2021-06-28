<template>
  <header class="sticky-top py-2 bg-gradient">
    <div class="container-fluid position-relative">
      <div class="col-lg-10 px-0 mx-auto">
        <div class="text-center">
          <a href="/stroitelnye_uslugi/stroitelstvo-domov-v-moskve-i-moskovskoy-oblsti"><img class="logo rounded" :src="require('@/assets/logo.png')" alt="Логотип"></a>
        </div>
        <!-- <div class="input-group">
          <input
            v-model="keyword"
            type="text"
            placeholder="Поиск"
            class="pl-4 form-control search-input"
            @keyup.enter="toSearchPage"
          >
          <div class="input-group-append">
            <button
              class="btn font-weight-bold btn-outline-light"
              type="button"
              @click="toSearchPage"
            >
              <i class="fa fa-search mr-1" aria-hidden="true" />
              Искать
            </button>
          </div>
        </div> -->
      </div>
      <div class="px-0 text-light position-absolute text-container d-none d-sm-block">
        <div>Sample Text 1</div>
        <div>Sample Text 2</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    keywordProp: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    keyword: ''
  }),
  created () {
    if (this.keywordProp) {
      this.keyword = this.keywordProp
    }
  },
  methods: {
    // toSearchPage () {
    //   if (this.keyword && this.keywordProp !== this.keyword) {
    //     if (this.$route.name !== 'search') {
    //       this.$router.replace({ path: '/search', query: { keyword: this.keyword } })
    //     } else {
    //       this.$router.push({ path: '/search', query: { keyword: this.keyword } })
    //       this.$store.dispatch('search', this.keyword)
    //     }
    //   }
    // }
  }
}
</script>

<style lang="css" scoped>
.text-container {
  top: 0;
  right: 30px;
}
.text-container p {

}

.bg-gradient {
  background: #4776E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #8E54E9, #4776E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.search-input {
  font-size: 21px;
  border-radius: 50px;
  border: none;
}

.logo {
  width: 180px;
  user-select: none;
}

@media screen and (max-width: 991px) {
  .logo {
    width: 180px;
  }
}

.input-group-append .btn {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.search-input:focus, .input-group-append .btn:focus {
  box-shadow: none;
}
</style>

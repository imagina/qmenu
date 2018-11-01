<template>
  <div id="search">
    <!--= Search Desktop =-->
    <div class="desktop-only">
      <q-search
        ref="searchDesktop"
        color="white" inverted-light
        class="searchDesktop"
        v-model="searchData"
        clearable no-icon
        @input="search"
        @enter="search"
        placeholder="Buscar"
        :before="[
          {
            icon: 'search',
            color: 'primary',
            handler () {
              search
            }
          }
        ]"
      ></q-search>
    </div>


    <!--= Search Mobile =-->
    <q-btn flat icon="fas fa-search"
           @click="modalSearch = true"
           color="primary"
           class="mobile-only btnMobile">
    </q-btn>

    <q-modal v-model="modalSearch"
             @show="$refs.searchMobile.focus()"
             position="top">
      <div class="q-pa-sm">
        <q-search
          ref="searchMobile"
          v-model="searchData"
          :debounce="600"
          @input="search"
          @enter="search"
          placeholder="Buscar"
          :after="[
          {
            icon: 'fas fa-search',
            color: 'primary',
            handler () {
              search
            }
          }
        ]" no-icon
        ></q-search>
      </div>
    </q-modal>
  </div>
</template>

<script>
  export default {
    props: {
      focus: {default:false}
    },
    components: {},
    watch: {
      focus(){
        this.$refs.searchDesktop.focus()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.setSearch()
        if(this.focus){
          this.$refs.searchDesktop.focus()
        }
      })
    },
    data() {
      return {
        modalSearch : false,
        searchData: '',
        collapsibleSearch: false
      }
    },
    methods: {
      search(){
        if(this.searchData) {
          this.$router.push({
            name: 'buscar',
            query: {search: this.searchData}
          })
        }
      },
      //if ther is search in url
      setSearch(){
        let url = this.$route.query
        if(url.search){
          this.searchData = url.search
        }
      }
    }

  }
</script>

<style lang="stylus">
  @import "~variables";
  #search
    .desktop-only
      .searchDesktop
        width 500px
        margin 0 auto
    .btnMobile
      border none !important
</style>

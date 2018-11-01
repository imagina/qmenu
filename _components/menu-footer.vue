<template>
  <div id="menuFooter">
    <span class="text-weight-bold" style="font-size: 18px">Menú</span>
    <q-list no-border link inset-delimiter class="q-pa-none">
      <q-item link :to="item.to" :key="index"
              v-for="(item, index) in sidebar">
        <q-item-side icon="fas fa-angle-right"/>
        <q-item-main>{{item.title}}</q-item-main>
      </q-item>
    </q-list>
  </div>
</template>
<script>
  /*Services*/
  import menuService from '../_services/menu'

  export default {
    props: {
      idMenu : {default:1}
    },
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getData()
      })
    },
    data() {
      return {
        sidebar: [],
      }
    },
    methods: {
      /*Request Menu*/
      getData() {
        menuService.show(this.idMenu).then((menu) => {
          this.renderMenu(menu.data)
        })
      },

      /*Chech if hasacces item menu*/
      async renderMenu(dataMenu) {
        //Function recursive for validate permissions
        let hasAccess = async (data) => {
          for (var item in data) {
            let itemAccess = data[item]

            itemAccess.can = true
            if (itemAccess.children) {
              itemAccess.children = await hasAccess(itemAccess.children)
            }
          }
          return data//Return all data
        }

        this.sidebar = await hasAccess(dataMenu)
      },
    }

  }
</script>
<style lang="stylus">
  @import "~variables";
  #menuFooter
    .q-list
      margin-top 25px
      .q-item
        padding 0
        .q-item-side
          min-width auto
          transition .5s
        .q-item-main
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        &:first-child
          display none
        &:hover,
        &.router-link-active
          background-color transparent
          color $grey-6
          .q-item-side
            padding-left 15px
</style>

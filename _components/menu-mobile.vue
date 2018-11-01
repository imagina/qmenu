<template>
  <div id="menuMobile">
    <!--= MENU =-->
    <q-list id="list_menu" separator class="q-py-none">
      <!--Level 1 Single-->
      <singleItem v-for="(lv1,key1) in sidebar"
                  :item="lv1" :key="key1"
                  v-if="!lv1.children || !lv1.children.length">
      </singleItem>

      <!--Level 1 Dropdown-->
      <dropdownItem v-else-if="lv1.children && lv1.can"
                    :item="lv1">
        <!--Level 2 Single-->
        <singleItem v-for="(lv2,key2) in lv1.children"
                    :item="lv2" :key="key2"
                    v-if="!lv2.children || !lv1.children.length"></singleItem>

        <!--Level 2 Dropdown-->
        <dropdownItem v-else-if="lv2.children"
                      :item="lv2">
          <singleItem v-for="(lv3,key3) in lv2.children"
                      :item="lv3" :key="key3"></singleItem>
        </dropdownItem>
      </dropdownItem>
    </q-list>
  </div>
</template>
<script>
  /*Components*/
  import singleItem from './items/singleItem'
  import dropdownItem from './items/dropdownItem'

  /*Config*/
  import Config from 'src/config/index'
  import _cloneDeep from 'lodash.clonedeep'

  /*Services*/
  import menuService from '../_services/menu'

  export default {
    props: {
      idMenu : {default : 1}
    },
    components: {
      singleItem,
      dropdownItem
    },
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
</style>

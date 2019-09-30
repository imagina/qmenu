<template>
  <div class="row gutter-y-sm relative-position">
    <div class="col-md-12 ">
      <div class="float-right">
        <q-btn
          :to="{name: 'qmenu.admin.menus'}"
          icon="fas fa-arrow-alt-circle-left"
          color="primary"
          class="q-ml-xs"/>
        <q-btn
          :to="{name: 'qmenu.admin.menu.create', params: {menuId: this.$route.params.id}}"
          icon="fas fa-edit"
          label="new Redcord"
          color="green"
          class="q-ml-xs"/>
        <q-btn
          v-if="menuItems.length"
          @click="updateOrder"
          icon="fas fa-edit"
          label="Update Redcord"
          color="red"
          class="q-ml-xs"/>
        <q-btn
          @click="getItems(true)"
          icon="fas fa-sync-alt"
          color="info"
          class="q-ml-xs">
          <q-tooltip :delay="300">
            {{$tr('ui.label.refresh')}}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="col-md-12">
      <nestedMenuItems :menuItems="menuItems"/>
    </div>
    
    <modalNew
      :opened="modalNewItem"
      @closeModal="modalNewItem = false"/>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import nestedMenuItems from '@imagina/qmenu/_components/admin/menuitems/nested'
  import modalNew from '@imagina/qmenu/_components/admin/menuitems/modalNew'
  
  export default {
    components:{
      nestedMenuItems,
      modalNew,
    },
    data(){
      return {
        loading: false,
        menuItems: [],
        modalNewItem: false,
        modalUpdateItem: false,
        itemUpdate: {},
        itemDelete: {},
      }
    },
    created() {
      this.$nextTick(() => {
        this.getItems()
      })
    },
    methods:{
      getItems (refresh = false) {
        this.loading = true
        let params = {
          refresh: refresh,
          params: {
            filter: {
              menu: this.$route.params.id
            }
          },
        }
        this.$crud.index('apiRoutes.qmenu.menuItems', params)
        .then(response => {
          this.menuItems = this.arrayToTree(response.data)
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
      },
      updateOrder(){
        let newdata = []
        this.treeToArray(this.menuItems, newdata)
        console.warn('Implements in backend')
        /*.... to send to service data with new order and new parent*/
      },
      arrayToTree( elements, parentId = null ) {
        return elements.filter( element => {
          if (element.parentId == parentId) {
            return element['children'] = this.arrayToTree(elements, element.id)
          }
        })
      },
      treeToArray(items, response, parentId = null){
        let elements = [...items]
        elements.forEach( (element, index) => {
          element.position = index
          element.parentId = parentId
          response.push(element)
          if (element.children.length) this.treeToArray(element.children, response, element.id)
        })
      },
    }
  }
</script>

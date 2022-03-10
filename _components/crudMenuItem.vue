<template>
  <master-modal 
    v-model="show" 
    :title="title"
    custom-position
    :actions="actions"
  >
    <div class="box relative-position">
      <!-- btn create new menu item -->
      <div class="row justify-end">
        <q-btn 
          color="green" 
          class="q-ml-xs q-mb-sm text-cente text-capitalize" 
          unelevated
          rounded outline
          @click="$refs.crudMenuItems.create()"
        >
          <q-icon name="fas fa-plus-circle" class="q-mr-sm" size="16px"/>
          {{this.$tr('menu.cms.newItem')}}
        </q-btn>
      </div>
      <!-- crud template -->
      <crud
        :crud-data="import('@imagina/qmenu/_crud/menuItems')"
        type="onlyUpdate" 
        ref="crudMenuItems"
        @created="getItems(true)"
        @updated="getItems(true)"
        @deleted="getItems(true)"
        :custom-data="customMenuItem"
      />
      <!-- dragable -->
      <div class="col-12 q-mt-sm">
        <nestedMenuItems :items="menuItems"/>
      </div>
      <inner-loading :visible="loading"/>
    </div>
  </master-modal>
</template>

<script>
  import nestedMenuItems from '@imagina/qsite/_components/master/recursiveItemDraggable'

  export default {
    name:"crudMenuItems",
    components: {
      nestedMenuItems,
    },
    mounted() {
      this.$nextTick(() => {
        this.$root.$on('updateMenuItems', this.handlerUpdateMenuItems)
      })
    },
    data() {
      return {
        deleteApi: 'apiRoutes.qmenu.menuItems',
        title: '-',
        loading: false,
        menuId: null,
        show: false,
        menuItems: [],
        actions: [{
          action: ()=> this.updateOrder(),
          props: {
            label: this.$tr('isite.cms.label.save'),
            color: 'green'
          }
        }]
      }
    },
    computed: {
      customMenuItem() {
        return {
          getDataForm :(data) => {
            return new Promise((resolve, reject) => {
              data.menuId = this.menuId
              resolve(data)
            })
          }
        }
      },
      crudData() {
        //Crud data
        return {
          crudId: this.crudId,
          entityName: config("main.qmenu.entityNames.menu"),
          apiRoute: 'apiRoutes.qmenu.menus',
          permission: 'menu.menus',
          extraFormFields: 'menu.crud-fields.menus',
          create: {
            title: this.$tr('menu.cms.newMenu'),
          },
          read:false,
          update: {
            title: this.$tr('menu.cms.updateMenu'),
          },
          delete: true,
          formLeft: {
            title: {
              value: null,
              type: 'input',
              isTranslatable: true,
              props : {
                label: this.$tr('isite.cms.form.title'),
                rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
              }
            },
            name: {
              value: null,
              type: 'input',
              props : {
                label: this.$tr('isite.cms.form.name'),
                rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
              }
            },
            status: {
              value: '1',
              type: 'select',
              isTranslatable: true,
              props : {
                label: this.$tr('isite.cms.form.status'),
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                  {label: this.$tr('isite.cms.label.disabled'), value: '0'},
                ]
              }
            },
            isDefault: {
              value: '0',
              type: 'select',
              props : {
                label: this.$tr('isite.cms.form.default'),
                options: [
                  {label: this.$tr('isite.cms.label.yes'), value: '1'},
                  {label: this.$tr('isite.cms.label.no'), value: '0'},
                ]
              }
            },
          },
        }
      }
    },
    methods: {
      openModal ({show, title, menuId}) {
        this.show = show
        this.title = title
        this.menuId = menuId
        setTimeout(()=> {
          this.getItems()
        },100)
      },
      getItems(refresh = false) {
        this.loading = true
        let menuId = this.menuId
        let params = {
          refresh: refresh,
          params: {include: 'menuitems'},
        }
        this.$crud.show('apiRoutes.qmenu.menus', menuId, params).then(({data}) => {
          const menuitems = this.setActions(data.menuitems)
          this.menuItems = this.arrayToTree(menuitems)
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
          this.loading = false
        })
      },
      setActions (menu) {
        return menu.map((item) => {
          item = {
            ...item,
            actions:[
              {
                name: 'edit',
                icon: 'fas fa-pen',
                label: this.$tr('isite.cms.label.edit'),
                action: ()=> this.$refs.crudMenuItems.update(item)
              },
              {
                name: 'delete',
                icon: 'fas fa-trash-alt',
                label: this.$tr('isite.cms.label.delete'),
                action: ()=> this.$refs.crudMenuItems.delete(item)
              }
            ]
          }
          return item
        })
      },
      updateOrder() {
        let newdata = []
        this.treeToArray(this.menuItems, newdata)
        this.loading = true
        this.$crud.create('apiRoutes.qmenu.menuItemsOrdener', {menuitems: newdata})
          .then(response => {
            this.loading = false
            this.show = false
            this.getItems()
            this.$alert.info({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
          })
      },
      arrayToTree(elements, parentId = 0) {
        return elements.filter(element => {
          if (element.parentId == parentId) {
            return element['children'] = this.arrayToTree(elements, element.id)
          }
        })
      },
      treeToArray(items, response, parentId = null) {
        let elements = [...items]
        elements.forEach((element, index) => {
          element.position = index
          element.parentId = parentId
          response.push(element)
          if (element.children.length) this.treeToArray(element.children, response, element.id)
        })
      },
      handlerUpdateMenuItems(event) {
        this.getItems()
      }
    }
  }
</script>

<template>
<!-- crud compoment -->
  <crud-menu-item ref="crudMenuItem" />
</template>
<script>
import crudMenuItem from 'modules/qmenu/_components/crudMenuItem'
  export default {
    name:"menuAdmin",
    components:{ crudMenuItem },
    data() {
      return {
        modalTitle: this.$trp('isite.cms.label.item'),
        crudId: this.$uid(),
      }
    },
    methods: {
      refreshData() {
        setTimeout(() => {
          if (this.$refs.crudMenu) this.$refs.crudMenu.getData(true)
        }, 100)
      }
    },
    computed: {
      crudData() {
        //Crud data
        return {
          crudId: this.crudId,
          entityName: config("main.qmenu.entityNames.menu"),
          apiRoute: 'apiRoutes.qmenu.menus',
          permission: 'imenu.menus',
          extraFormFields: 'menu.crud-fields.menus',
          create: {
            title: this.$tr('menu.cms.newMenu'),
          },
          read: {
            columns: [
              {
                name: 'id', label: this.$tr('isite.cms.form.id'),
                field: 'id',
              },
              {
                name: 'title', label: this.$tr('isite.cms.form.title'),
                field: 'title',
                align: 'left',
              },
              {
                name: 'systemName', label: this.$tr('isite.cms.form.systemName'),
                field: 'systemName',
                align: 'left',
              },
              {
                name: 'status', label: this.$tr('isite.cms.form.status'),
                field: 'status',
                align: 'left',
                format: val => val ? this.$tr(`isite.cms.label.${parseInt(val) ? 'enabled' : 'disabled'}`) : '-',
              },
              {
                name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left'
              },
              {
                name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'
              },
            ],
            filters: {
              status: {
                value: null,
                type: 'select',
                props: {
                  label: this.$tr('isite.cms.form.status'),
                  options: [
                    {label: this.$tr('isite.cms.label.enabled'), value: 1},
                    {label: this.$tr('isite.cms.label.disabled'), value: 0},
                  ]
                }
              }
            },
            //custom action btn elements
            actions: [
              {
                //Set modal data
                icon: 'fas fa-list-ol',
                color: 'info',
                action: (item) => {
                  this.$refs.crudMenuItem.openModal({
                    show : true,
                    title : `${this.modalTitle} | ${item.title}`,
                    menuId : item.id
                  })
                },
                label: this.modalTitle
              }
            ],
            requestParams: {include:'translations'}
          },
          update: {
            title: this.$tr('menu.cms.updateMenu'),
            requestParams: {include:'translations'}
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
            systemName: {
              value: null,
              type: 'input',
              props : {
                label: this.$tr('isite.cms.form.systemName'),
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
            }
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>

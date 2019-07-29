<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmenu.menuItems',
          permission: 'imenu.menuitems',
          create: {
            title: this.$tr('qmenu.layout.newItem'),
          },
          read: {
            columns: [
              {
                name: 'id', label: this.$tr('ui.form.id'),
                field: 'id',
              },
              {
                name: 'title', label: this.$tr('ui.form.title'),
                field: 'title',
                align: 'left',
              },
              {
                name: 'parent', label: this.$tr('ui.form.parent'),
                field: 'parent',
                align: 'left',
                format: val => val ? val.title : '-',
              },
              {
                name: 'menu', label: this.$tr('ui.form.menu'),
                field: 'menu',
                align: 'left',
                format: val => val ? val.title : '-',
              },
              {
                name: 'status', label: this.$tr('ui.form.status'),
                field: 'status',
                align: 'left',
                format: val => val ? this.$tr(`ui.label.${parseInt(val) ? 'enabled' : 'disabled'}`) : '-',
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left'
              },
              {
                name: 'actions', label: this.$tr('ui.form.actions'), align: 'center'
              },
            ],
            requestParams: {include: 'menu'}
          },
          update: {
            title: this.$tr('qmenu.layout.updateItem'),
            requestParams: {include: ''}
          },
          delete: true,
          formLeft: {
            title: {
              label: this.$tr('ui.form.title'),
              value: null,
              type: 'text',
              isRequired: true,
              isTranslatable : true
            },
            url: {
              label: 'Url',
              value: null,
              type: 'text',
              isRequired: true,
              isTranslatable : true
            },
            status: {
              label: this.$tr('ui.form.status'),
              value: 1,
              type: 'select',
              isTranslatable : true,
              options: [
                {label: this.$tr('ui.label.enabled'), id: 1},
                {label: this.$tr('ui.label.disabled'), id: 0},
              ]
            },
            icon : {
              label: this.$tr('ui.form.icon'),
              value: null,
              type: 'text',
            }
          },
          formRight : {
            menuId: {
              label: this.$tr('ui.form.menu'),
              value: null,
              type: 'select',
              isRequired : true,
              loadOptions: {
                apiRoute: 'apiRoutes.qmenu.menus',
              }
            },
            parentId: {
              label: this.$tr('ui.form.parent'),
              value: null,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qmenu.menuItems',
              }
            },
            target: {
              label: this.$tr('ui.form.option'),
              value: '_self',
              type: 'select',
              options: [
                {id:'_self', label: this.$tr('qmenu.layout.sameTab')},
                {id:'_blank', label: this.$tr('qmenu.layout.newTab')},
              ]
            },
            isDefault: {
              label: this.$tr('ui.form.default'),
              value: 0,
              type: 'select',
              options: [
                {label: this.$tr('ui.label.yes'), id: 1},
                {label: this.$tr('ui.label.no'), id: 0},
              ]
            },
          }
        }
      }
    },
  }
</script>

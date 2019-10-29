<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmenu.menus',
          permission: 'menu.menus',
          create: {
            title: this.$tr('qmenu.layout.newMenu'),
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
                name: 'name', label: this.$tr('ui.form.name'),
                field: 'name',
                align: 'left',
              },
              {
                name: 'status', label: this.$tr('ui.form.status'),
                field: 'status',
                align: 'left',
                format: val => val ? this.$tr(`ui.label.${parseInt(val) ? 'enabled' : 'disabled'}`) : '-',
              },
              {
                name: 'isDefault', label: this.$tr('ui.form.default'),
                field: 'isDefault',
                align: 'left',
                format: val => val ? this.$tr(`ui.label.${parseInt(val) ? 'yes' : 'no'}`) : '-',
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left'
              },
              {
                name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'
              },
            ],
            filters: {
              status: {
                label: this.$tr('ui.form.status'),
                value: null,
                type: 'select',
                options: [
                  {label: this.$tr('ui.label.enabled'), value: 1},
                  {label: this.$tr('ui.label.disabled'), value: 0},
                ]
              }
            }
          },
          update: {
            title: this.$tr('qmenu.layout.updateMenu'),
            to: 'qmenu.admin.menus.show'
          },
          delete: true,
          formLeft: {
            title: {
              label: this.$tr('ui.form.title'),
              value: null,
              type: 'text',
              rules: [val => !!val || this.$tr('ui.message.fieldRequired')],
              isTranslatable: true
            },
            name: {
              label: this.$tr('ui.form.name'),
              value: null,
              type: 'text',
              rules: [val => !!val || this.$tr('ui.message.fieldRequired')],
            },
            status: {
              label: this.$tr('ui.form.status'),
              value: '1',
              type: 'select',
              isTranslatable: true,
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'},
              ]
            },
            isDefault: {
              label: this.$tr('ui.form.default'),
              value: '0',
              type: 'select',
              options: [
                {label: this.$tr('ui.label.yes'), value: '1'},
                {label: this.$tr('ui.label.no'), value: '0'},
              ]
            },
          },
        }
      }
    },
  }
</script>

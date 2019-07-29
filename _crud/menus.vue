<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmenu.menus',
          permission: 'imenu.menus',
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
                name: 'actions', label: this.$tr('ui.form.actions'), align: 'center'
              },
            ],
          },
          update: {
            title: this.$tr('qmenu.layout.updateMenu'),
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
            name: {
              label: this.$tr('ui.form.name'),
              value: null,
              type: 'text',
              isRequired: true,
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
            isDefault: {
              label: this.$tr('ui.form.default'),
              value: 0,
              type: 'select',
              options: [
                {label: this.$tr('ui.label.yes'), id: 1},
                {label: this.$tr('ui.label.no'), id: 0},
              ]
            },
          },
        }
      }
    },
  }
</script>

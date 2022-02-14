<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          entityName: config("main.qmenu.entityNames.menu"),
          apiRoute: 'apiRoutes.qmenu.menus',
          permission: 'menu.menus',
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
                name: 'name', label: this.$tr('isite.cms.form.name'),
                field: 'name',
                align: 'left',
              },
              {
                name: 'status', label: this.$tr('isite.cms.form.status'),
                field: 'status',
                align: 'left',
                format: val => val ? this.$tr(`isite.cms.label.${parseInt(val) ? 'enabled' : 'disabled'}`) : '-',
              },
              {
                name: 'isDefault', label: this.$tr('isite.cms.form.default'),
                field: 'isDefault',
                align: 'left',
                format: val => val ? this.$tr(`isite.cms.label.${parseInt(val) ? 'yes' : 'no'}`) : '-',
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
            }
          },
          update: {
            title: this.$tr('menu.cms.updateMenu'),
            to: 'qmenu.admin.menus.show'
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
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>

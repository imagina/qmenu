<template>

</template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      //Crud data
      return {
        crudId: this.crudId,
        entityName: config("main.qmenu.entityNames.menuitems"),
        apiRoute: 'apiRoutes.qmenu.menuItems',
        permission: 'menu.menuitems',
        extraFormFields: 'menu.crud-fields.menuitems',
        create: {
          title: this.$tr('menu.cms.newItem'),
        },
        read: false,
        update: {
          title: this.$tr('menu.cms.updateItem'),
        },
        delete: true,
        formLeft: {
          title: {
            value: null,
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.title') + '*',
              rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
            }
          },
          menuId: {
            value: null,
          },
          linkType: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('menu.cms.form.typeLink'),
              rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
              options: [
                {label: this.$tr('menu.cms.form.page'), value: 'page'},
                {label: this.$tr('menu.cms.form.internal'), value: 'internal'},
                {label: this.$tr('menu.cms.form.external'), value: 'external'}
              ]
            },
          },
          pageId: {
            value: null,
            type: 'select',
            props: {
              vIf: this.crudInfo.linkType == 'page',
              label: this.$tr('isite.cms.form.page'),
              //rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')]
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qpage.pages'
            }
          },
          url: {
            value: null,
            type: 'input',
            isTranslatable: true,
            props: {
              vIf: this.crudInfo.linkType == 'external',
              label: this.$tr('menu.cms.form.url'),
              //rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
            }
          },
          uri: {
            value: null,
            type: 'input',
            isTranslatable: true,
            props: {
              vIf: this.crudInfo.linkType == 'internal',
              label: this.$tr('menu.cms.form.uri'),
              //rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}`,
              type: 'textarea',
              rows: "3",
            },
          }
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.status'),
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'},
              ]
            }
          },
          parentId: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.parent'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qmenu.menuItems',
              refresh: true,
              params: {
                filter: {allTranslations: true}
              }
            }
          },
          icon: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('isite.cms.form.icon'),
            }
          },
          target: {
            value: '_self',
            type: 'select',
            props: {
              label: this.$tr('menu.cms.form.target'),
              options: [
                {value: '_self', label: this.$tr('menu.cms.form.sameTab')},
                {value: '_blank', label: this.$tr('menu.cms.form.newTab')},
              ],
            },
          },
          class: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('menu.cms.form.class'),
            }
          },
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>

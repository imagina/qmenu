<template>
  <div class="row gutter-x-sm relative-position" v-if="success">

    <!--Form-->
    <q-form autocorrect="off" autocomplete="off" ref="formContent" class="full-width q-my-sm"
            @submit="updateItem()" @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
      <div class="col-12 q-mb-md">
        <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
      </div>
      <div v-if="locale.success">
        <q-input outlined dense v-model="locale.formTemplate.name" :label="`${$tr('isite.cms.form.name')}*`"
                 :rules="[val => !!val || this.$tr('isite.cms.message.fieldRequired')]"/>

        <q-input outlined dense v-model="locale.formTemplate.title"
                 :label="`${$tr('isite.cms.form.title')} (${locale.language})*`"
                 :rules="[val => !!val || this.$tr('isite.cms.message.fieldRequired')]"/>

        <q-select :label="`${$tr('isite.cms.form.status')} (${locale.language})`"
                  v-model="locale.formTemplate.status"
                  :options="[
                  {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                  {label: this.$tr('isite.cms.label.disabled'), value: '0'}
                ]" outlined dense emit-value map-options/>

        <q-select :label="$tr('isite.cms.form.default')"
                  v-model="locale.formTemplate.isDefault"
                  :options="[
                  {label: this.$tr('isite.cms.label.yes'), value: '1'},
                  {label: this.$tr('isite.cms.label.no'), value: '0'}
                ]" outlined dense emit-value map-options/>

        <q-btn class="float-right" v-if="itemId" color="green" :loading="loading" unelevated
               icon="fas fa-save" :label="$tr('isite.cms.label.save')" type="submit" rounded/>
      </div>
    </q-form>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>

export default {
  components: {},
  watch: {
    $route(to, from) {
      this.initForm()
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.initForm()
    })
  },
  data() {
    return {
      locale: {},
      loading: false,
      success: false,
      itemId: false,
    }
  },
  computed: {
    dataLocale() {
      return {
        fields: {
          name: '',
          isDefault: '0',
        },
        fieldsTranslatable: {
          title: '',
          status: '1',
        }
      }
    }
  },
  methods: {
    async initForm() {
      this.loading = true
      this.success = false
      this.locale = this.$clone(this.dataLocale)
      this.itemId = this.$route.params.id
      if (this.locale.success) this.$refs.localeComponent.vReset()
      await this.getData()
      this.success = true
      this.loading = false
    },
    getData() {
      return new Promise((resolve, reject) => {
        const itemId = this.$clone(this.itemId)
        if (itemId) {
          let configName = 'apiRoutes.qmenu.menus'
          //Params
          let params = {
            refresh: true,
            params: {
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(configName, itemId, params).then(response => {
            this.orderDataItemToLocale(response.data)
            resolve(true)//Resolve
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
          })
        } else {
          resolve(true)//Resolve
        }
      })
    },
    orderDataItemToLocale(data) {
      let orderData = this.$clone(data)
      this.locale.form = this.$clone(orderData)
    },
    async updateItem() {
      if (await this.$refs.localeComponent.validateForm()) {
        this.loading = true
        let configName = 'apiRoutes.qmenu.menus'
        this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
          this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
            //this.initForm()
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated'), pos: 'bottom'})
        })
      }
    },
    getDataForm() {
      let response = this.locale.form
      for (var item in response) {
        let valueItem = response[item]
        if (valueItem == null || valueItem == undefined)
          delete response[item]
      }
      response.selectable = JSON.stringify(response.selectable)
      return response
    },
  }
}
</script>

<style scoped>

</style>

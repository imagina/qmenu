<template>
  <div class="row gutter-x-sm relative-position" v-if="success">
  
    <div class="col-12">
      <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
    </div>
  
    <div class="col-12" v-if="locale.success">
  
      <q-field
        class="q-mt-sm"
        :error="$v.locale.formTemplate.name.$error"
        :error-label="$tr('ui.message.fieldRequired')">
        <q-input
          v-model="locale.formTemplate.name"
          :stack-label="`${$tr('ui.form.name')}*`"/>
      </q-field>
  
      <q-field
        class="q-mt-sm"
        :error="$v.locale.formTemplate.title.$error"
        :error-label="$tr('ui.message.fieldRequired')">
        <q-input
          v-model="locale.formTemplate.title"
          :stack-label="`${$tr('ui.form.title')} (${locale.language})*`"/>
      </q-field>
  
      <div class="input-title">{{$tr('ui.form.status')}} ({{locale.language}})</div>
      <tree-select
        v-model="locale.formTemplate.status"
        :clearable="true"
        :options="[
          {label: this.$tr('ui.label.enabled'), id: 1},
          {label: this.$tr('ui.label.disabled'), id: 0},
        ]"
        placeholder=""/>
  
      <div class="input-title">{{$tr('ui.form.default')}}</div>
      <tree-select
        v-model="locale.formTemplate.isDefault"
        :clearable="true"
        :options="[
          {label: this.$tr('ui.label.yes'), id: 1},
          {label: this.$tr('ui.label.no'), id: 0},
        ]"
        placeholder=""/>
  
      <q-btn
        class="q-mt-md"
        v-if="itemId"
        color="positive" :loading="loading"
        icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        rounded/>
      
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import locales from '@imagina/qsite/_components/locales'
  import _cloneDeep from 'lodash.clonedeep'
  import {required} from 'vuelidate/lib/validators'
  
  export default {
    components:{
      locales
    },
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
    validations() {
      return this.getObjectValidation()
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
            isDefault: 0,
          },
          fieldsTranslatable: {
            title: '',
            status: 1,
          },
          validations: {
            title:{ required },
            name: { required }
          }
        }
      }
    },
    methods: {
      async initForm() {
        this.loading = true
        this.success = false
        this.locale = _cloneDeep(this.dataLocale)
        this.itemId = this.$route.params.id
        if (this.locale.success) this.$refs.localeComponent.vReset()
        await this.getData()
        this.$v.$reset()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = _cloneDeep(this.itemId)
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
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }
        })
      },
      orderDataItemToLocale(data) {
        let orderData = _cloneDeep(data)
        this.locale.form = _cloneDeep(orderData)
      },
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menus'
          this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            //this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
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
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
    }
  }
</script>

<style scoped>

</style>

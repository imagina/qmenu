<template>
  <div class="row gutter-x-sm relative-position q-layout-page layout-padding  q-mb-lg backend-page"
    v-if="success">
    <div class="col-12 box">
      <div class="row gutter-x-sm">
        <div class="col-12">
          <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
        </div>
        <div class="col-7" v-if="locale.success">
          
          <q-field
            :error="$v.locale.formTemplate.title.$error"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              v-model="locale.formTemplate.title"
              :stack-label="`${$tr('ui.form.title')} (${locale.language})*`"/>
          </q-field>
          
          <q-field
            :error="$v.locale.formTemplate.description.$error"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              v-model="locale.formTemplate.description"
              :stack-label="`${$tr('ui.form.description')} (${locale.language})*`"/>
          </q-field>
          
          <q-field
            v-if="locale.formTemplate.linkType == 'external'"
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              prefix="https://"
              v-model="locale.formTemplate.url"
              :stack-label="`${$tr('qmenu.layout.form.url')} (${locale.language})*`"/>
          </q-field>
  
          <q-field
            v-if="locale.formTemplate.linkType == 'internal'"
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              :prefix="`/${locale.language}/`"
              v-model="locale.formTemplate.uri"
              :stack-label="`${$tr('qmenu.layout.form.uri')} (${locale.language})*`"/>
          </q-field>
          
          <q-field
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <div class="input-title">{{`${$tr('ui.form.status')} (${locale.language})*`}}</div>
            <tree-select
              :clearable="false"
              :options="this.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""/>
          </q-field>
          
          <hr class="q-mt-lg border">
          
          <q-field
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              v-model="locale.formTemplate.icon"
              :stack-label="`${$tr('ui.form.icon')} *`"/>
          </q-field>
  
          <q-field
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-input
              v-model="locale.formTemplate.class"
              :stack-label="`${$tr('qmenu.layout.form.class')} *`"/>
          </q-field>
  
  
          <q-field
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <div class="input-title">{{`${$tr('ui.form.parent')} *`}}</div>
            <tree-select
              :clearable="true"
              :options="this.menuItems"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.parentId"
              placeholder=""/>
          </q-field>
  
          <q-field
            :error="false"
            :error-label="$tr('ui.message.fieldRequired')">
            <div class="input-title">{{`${$tr('qmenu.layout.form.target')} *`}}</div>
            <tree-select
              :clearable="false"
              :options="this.targets"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.target"
              placeholder=""/>
          </q-field>
  
          <q-field
            :error="false"
            v-if="locale.formTemplate.linkType == 'frontend'"
            :error-label="$tr('ui.message.fieldRequired')">
  
            <div class="input-title">{{`${$tr('qmenu.layout.form.pageName')} *`}}</div>
            <tree-select
              :clearable="true"
              :options="pages"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.pageName"
              placeholder=""/>
          </q-field>
          
        </div>
        <div class="col-5" v-if="locale.success">
          <div class="input-title">{{`${$tr('qmenu.layout.form.typeLink')} *`}}</div>
          <q-field
            :error="$v.locale.formTemplate.linkType.$error"
            :error-label="$tr('ui.message.fieldRequired')">
            <q-option-group
              type="radio"
              v-model="locale.formTemplate.linkType"
              :options="linkTypes"/>
          </q-field>
          
        </div>
      </div>
    </div>
  
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="itemId"
        color="positive" :loading="loading"
        icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        rounded/>
      <q-btn
        v-else
        color="positive" :loading="loading"
        icon="fas fa-edit" :label="$tr('ui.label.create')" @click="createItem()"
        rounded/>
    </q-page-sticky>
  
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
        users: [],
        itemId: false,
        menuItems: [],
        pages: [],
        targets:[
          {id:'_self', label: this.$tr('qmenu.layout.form.sameTab')},
          {id:'_blank', label: this.$tr('qmenu.layout.form.newTab')},
        ],
        status: [
          {label: this.$tr('ui.label.enabled'), id: 1},
          {label: this.$tr('ui.label.disabled'), id: 0},
        ],
        linkTypes:[
          {label: this.$tr('qmenu.layout.form.page'), value: 'page'},
          {label: this.$tr('qmenu.layout.form.internal'), value: 'internal'},
          {label: this.$tr('qmenu.layout.form.external'), value: 'external'},
          {label: this.$tr('qmenu.layout.form.frontend'), value: 'frontend'},
        ]
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            menuId: this.$route.params.menuId,
            pageId : '',
            parentId : '',
            position : 0,
            target : null,
            modulename : '',
            isroot : '',
            icon : '',
            linkType : '',
            locale : '',
            class : '',
          },
          fieldsTranslatable: {
            title: '',
            description : '',
            uri: '',
            url: '',
            status: null,
          },
          validations: {
            menuId: { required },
            target : { required },
            icon : { required },
            linkType : { required },
            class : { required },
            description : { required },
            title: { required },
            status: { required },
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
        this.getPages()
        this.getMenuItems()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = _cloneDeep(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qmenu.menuItems'
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
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menuItems'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            this.$router.push({name: 'qmenu.admin.menus.show', params:{id: this.$route.params.menuId}})
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menuItems'
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
      getMenuItems() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qmenu.menuItems'
          let params = {//Params to request
            refresh: true,
            params: { filter: {allTranslations: true}},
          }
          //Request
          this.$crud.index(configName, params).then(response => {
            this.menuItems = this.$helper.array.tree(response.data)
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      getPages(){
        let result = []
        let objPages = config('pages')
        for (let pages in objPages) {
          for (let item in objPages[pages]){
            var id = objPages[pages][item].name
            var label = this.$tr(objPages[pages][item].title)
            result.push({id, label})
          }
        }
        this.pages =  this.arrayUnique(result)
      },
      arrayUnique(arrayWithRepeats){
        return arrayWithRepeats.filter((currentValue, currentIndex, newArray) => {
          return newArray.findIndex(
            valueOfArray =>JSON.stringify(valueOfArray) === JSON.stringify(currentValue)
          ) === currentIndex
        });
      },
    }
  }
</script>

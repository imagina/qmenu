<template>
  <!--Modal with form to category-->
  <q-modal id="formCategory" v-model="show" v-if="show"
           no-esc-dismiss no-backdrop-dismiss class="backend-page">
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title v-if="!itemId">New Menu Items</q-toolbar-title>
        <q-toolbar-title v-else>Update Menu Items ID: {{itemId}}</q-toolbar-title>
        <q-btn flat v-close-overlay icon="fas fa-times"/>
      </q-toolbar>
      
      <!--Footer-->
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title></q-toolbar-title>
        <!--Button Save-->
        <q-btn icon="fas fa-save" color="positive"
               v-if="!itemId" label="Save"
               :loading="loading" @click="createItem()"/>
        <!--Button Update-->
        <q-btn label="Update" icon="fas fa-pen" color="positive"
               :loading="loading" @click="updateItem()" v-else/>
      </q-toolbar>
      
      <!--Content-->
      <div class="layout-padding relative-position">
        <div class="row gutter-x-md">
          <!--Language-->
          <div class="col-12">
            <span class="input-title q-mr-sm">Language</span>
            <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
          </div>
          
          <!--Form left (Trasnlatables Fields )-->
          <div class="col-12 col-md-8" v-if="locale.success">
            
            <div class="row shadow-1 border-top-color q-mt-lg">
              <div class="col-12">
                <p>Translatable fields</p>
  
                <q-field
                  :error="false"
                  error-label="This field is required">
  
                  <div class="input-title">Status ({{locale.language}})*</div>
                  <treeselect
                    :clearable="false"
                    :options="this.status"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="locale.formTemplate.status"
                    placeholder=""/>
                  
                </q-field>
  
                <q-field
                  :error="$v.locale.formTemplate.title.$error"
                  error-label="This field is required">
                  <q-input
                    v-model="locale.formTemplate.title"
                    :stack-label="'Title ('+locale.language+')*'"/>
                </q-field>
  
                <q-field
                  v-if="locale.formTemplate.linkType == 'external'"
                  :error="false"
                  error-label="This field is required">
                  <q-input
                    prefix="https://"
                    v-model="locale.formTemplate.url"
                    :stack-label="'url ('+locale.language+')*'"/>
                </q-field>
  
                <q-field
                  v-if="locale.formTemplate.linkType == 'internal'"
                  :error="false"
                  error-label="This field is required">
                  <q-input
                    :prefix="`/${locale.language}/`"
                    v-model="locale.formTemplate.uri"
                    :stack-label="'uri ('+locale.language+')*'"/>
                </q-field>
              </div>
            </div>
  
            <div class="row shadow-1 border-top-color q-mt-lg">
              <div class="col-12">
                <p>Non translatable fields</p>
              </div>
              <div class="col-12">
  
              <q-field
                :error="false"
                error-label="This field is required">
                <q-input
                  v-model="locale.formTemplate.icon"
                  :stack-label="'Icon'"/>
              </q-field>
              
              <q-field
                :error="false"
                error-label="This field is required">
                <q-input
                  v-model="locale.formTemplate.class"
                  :stack-label="'CSS Class'"/>
              </q-field>
  
                <q-field
                  :error="false"
                  v-if="locale.formTemplate.linkType == 'page'"
                  error-label="This field is required">
                  <q-input
                    v-model="locale.formTemplate.pageId"
                    :stack-label="'Page'"/>
                </q-field>
  
                <q-field
                  :error="false"
                  v-if="locale.formTemplate.linkType == 'frontend'"
                  error-label="This field is required">
                  <q-input
                    v-model="locale.formTemplate.pageName"
                    :stack-label="'Page Name'"/>
                </q-field>
  
                
                <q-field
                  :error="false"
                  error-label="This field is required">
                  <div class="input-title">Parent</div>
                  <treeselect
                    :clearable="false"
                    :options="this.menuItems"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="locale.formTemplate.parentId"
                    placeholder=""/>
                </q-field>
  
                <q-field
                  :error="false"
                  error-label="This field is required">
                  <div class="input-title">Target</div>
                  <treeselect
                    :clearable="false"
                    :options="this.targets"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="locale.formTemplate.target"
                    placeholder=""/>
                </q-field>
                
              </div>
              
            </div>
          </div>
          <!--Form right( No Trasnlatables Fields) -->
          <div class="col-12 col-md-4 " v-if="locale.success">
  
            <div class="row shadow-1 border-top-color q-mt-lg">
              
              <div class="col-12">
                <q-field
                  :error="$v.locale.formTemplate.menuId.$error"
                  error-label="This field is required">
                  <span class="input-title">Menu *</span>
                  <treeselect
                    :clearable="false"
                    :options="this.menus"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="locale.formTemplate.menuId"
                    placeholder=""/>
                </q-field>
              </div>
              
              <div class="col-12">
  
                <q-field
                  :error="$v.locale.formTemplate.linkType.$error"
                  error-label="This field is required">
    
                  <q-list link no-border	separator highlight>
                    <q-list-header>Link Type *</q-list-header>
                    <q-item tag="label">
                      <q-item-side>
                        <q-radio v-model="locale.formTemplate.linkType" val="page"/>
                      </q-item-side>
                      <q-item-main>
                        <q-item-tile label>Page</q-item-tile>
                      </q-item-main>
                    </q-item>
                    <q-item tag="label">
                      <q-item-side>
                        <q-radio v-model="locale.formTemplate.linkType" val="internal"/>
                      </q-item-side>
                      <q-item-main>
                        <q-item-tile label>Internal</q-item-tile>
                      </q-item-main>
                    </q-item>
                    <q-item tag="label">
                      <q-item-side>
                        <q-radio v-model="locale.formTemplate.linkType" val="external"/>
                      </q-item-side>
                      <q-item-main>
                        <q-item-tile label>External</q-item-tile>
                      </q-item-main>
                    </q-item>
                    <q-item tag="label">
                      <q-item-side>
                        <q-radio v-model="locale.formTemplate.linkType" val="frontend"/>
                      </q-item-side>
                      <q-item-main>
                        <q-item-tile label>Frontend (Quasar)</q-item-tile>
                      </q-item-main>
                    </q-item>
                  </q-list>
                </q-field>
              </div>
            </div>
          </div>
        </div>
        <!--Loading-->
        <inner-loading :visible="loading" />
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  //Config
  import indexConfig from 'src/config/index'
  //Services
  import menuServices from '@imagina/qcommerce/_services/index';
  //Components
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import uploadImg from '@imagina/qmedia/_components/form'
  import locales from '@imagina/qsite/_components/locales'
  import innerLoading from 'src/components/master/innerLoading'
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import _cloneDeep from 'lodash.clonedeep'
  export default {
    props: {
      value: {default: false},
      itemId: {default: false}
    },
    components: {
      uploadImg,
      Treeselect,
      locales,
      innerLoading
    },
    watch: {
      value(newValue) {
        this.show = this.value
      },
      show(newValue) {
        this.$emit('input', this.show)
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
        show: false,
        locale: _cloneDeep(this.dataLocale),
        editorText: {},
        loading: false,
        menus: [],
        menuItems: [],
        targets:[
          {id:'_self', label:'Same Tab'},
          {id:'_blank', label:'New Tab'},
        ],
        status: [
          {label:'Active', id:1},
          {label:'Inactive', id:0}
        ],
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            menuId: null,
            pageId: null,
            //position: '',
            target: null,
            linkType: '',
            class: '',
            moduleName: '',
            parentId: null,
            lft: '',
            rgt: '',
            depth: '',
            //isRoot: '',
            pageName: '',
            icon: '',
          },
          fieldsTranslatable: {
            status: 1,
            title: '',
            url: '',
            uri: '',
          },
          validations: {
            title: {required},
            linkType: {required},
            menuId:{required},
          }
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        //If ther is menuItems Id, request data, else set default data
        if (this.itemId) await this.getDataItem()
        else this.locale = _cloneDeep(this.dataLocale)
        this.getMenus()//Optiene los menuItems
        this.getMenuItems()//Optiene los MenuItems
        this.$v.$reset()//Reset validations
        this.show = this.value//Assign props value to show modal
        this.loading = false
      },
      //Get data menuItems to update
      getDataItem() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qmenu.menuItems'
          let params = {//Params to request
            refresh: true,
            params: {filter: {allTranslations: true}}
          }
          //Request
          menuServices.crud.show(configName, this.itemId, params).then(response => {
            this.locale.form = _cloneDeep(response.data)
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(false)
          })
        })
      },
      //Get menus
      getMenus() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qmenu.menus'
          let params = {//Params to request
            refresh: true,
            params: {filter: {allTranslations: true}},
          }
          //Request
          menuServices.crud.index(configName, params).then(response => {
            //this.menus = this.$helper.array.tree(response.data)
            this.menus = response.data.map(item=>{
              return {id:item.id, label:item.name}
            })
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      //Get menuItems
      getMenuItems() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qmenu.menuItems'
          let params = {//Params to request
            refresh: true,
            params: { filter: {allTranslations: true}},
          }
          //Request
          menuServices.crud.index(configName, params).then(response => {
            this.menuItems = this.$helper.array.tree(response.data)
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      //Create menuItems
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menuItems'
          menuServices.crud.create(configName, this.locale.form).then(response => {
            this.$helper.alert.success('Category created ID: ' + response.data.id)
            this.initForm()
            this.loading = false
            this.show = false
            this.$emit('created', response.data)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        }else{
          this.$helper.alert.error('Please check required fields','bottom')
        }
      },
      //Update menuItems
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menuItems'
          menuServices.crud.update(configName, this.itemId, this.locale.form).then(response => {
            this.$helper.alert.success('Category updated ID: ' + this.itemId)
            this.initForm()
            this.loading = false
            this.show = false
            this.$emit('updated', response.data)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        }else{
          this.$helper.alert.error('Please check required fields','bottom')
        }
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
</style>

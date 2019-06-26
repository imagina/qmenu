<template>
  <!--Modal with form to category-->
  <q-modal
    id="formCategory"
    v-model="show"
    v-if="show"
    no-esc-dismiss
    no-backdrop-dismiss
    class="backend-page">
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title
          v-if="!itemId">
          New Menu
        </q-toolbar-title>
        <q-toolbar-title
          v-else>
          Update Menu ID: {{itemId}}
        </q-toolbar-title>
        <q-btn
          flat
          v-close-overlay
          icon="fas fa-times"/>
      </q-toolbar>
      
      <!--Footer-->
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title>
        </q-toolbar-title>
        <!--Button Save-->
        <q-btn
          v-if="!itemId"
          icon="fas fa-save"
          color="positive"
          label="Save"
          :loading="loading"
          @click="createItem()"/>
        <!--Button Update-->
        <q-btn
          v-else
          label="Update"
          icon="fas fa-pen"
          color="positive"
          :loading="loading"
          @click="updateItem()"/>
      </q-toolbar>
      
      <!--Content-->
      <div class="layout-padding relative-position">
        <div class="row gutter-x-md">
          <!--Language-->
          <div class="col-12">
            <span
              class="input-title q-mr-sm">
              Language
            </span>
            <locales
              v-model="locale"
              ref="localeComponent"
              @validate="$v.$touch()"/>
          </div>
          
          <!--Form left (Trasnlatables Fields )-->
          <div
            class="col-12 col-md-8"
            v-if="locale.success">
            <!--Status -->
            <div class="input-title">Status ({{locale.language}})*</div>
            <treeselect
              :clearable="false"
              :options="this.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""/>
            <!--Title-->
            <q-field
              :error="$v.locale.formTemplate.title.$error"
              error-label="This field is required">
              <q-input
                v-model="locale.formTemplate.title"
                :stack-label="'Title ('+locale.language+')*'"/>
            </q-field>
          </div>
          <!--Form right( No Trasnlatables Fields) -->
          <div
            class="col-12 col-md-4"
            v-if="locale.success">
            <!--is_default -->
            <div class="input-title">Default Menu *</div>
            <treeselect
              :clearable="false"
              :options="this.BoolenaValues"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.is_default"
              placeholder=""/>
            <q-field
              :error="$v.locale.formTemplate.name.$error"
              error-label="This field is required">
              <q-input
                :stack-label="'Name *'"
                v-model="locale.formTemplate.name"/>
            </q-field>
          </div>
        </div>
        <!--Loading-->
        <inner-loading :visible="loading" />
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  //Services
  import menuServices from '@imagina/qmenu/_services/index';
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
    components: {uploadImg, Treeselect, locales, innerLoading},
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
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
        loading: false,
        status: [
          {label:'Active', id:1},
          {label:'Inactive', id:0}
        ],
        BoolenaValues:[
          {label:'Yes', id:1},
          {label:'No', id:0}
        ]
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            name: '',
            is_default: 0,
          },
          fieldsTranslatable: {
            title: '',
            status: null,
          },
          validations: {
            name: {required},
            title: {required},
            is_default: {required},
            status: {required}
          }
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        //If ther is category Id, request data, else set default data
        if (this.itemId) await this.getDataItem()
        else this.locale = _cloneDeep(this.dataLocale)
        
        this.$v.$reset()//Reset validations
        this.show = this.value//Assign props value to show modal
        this.loading = false
      },
      //Get data category to update
      getDataItem() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qmenu.menus'
          let params = {//Params to request
            refresh: true,
            params: {
              filter: {
                allTranslations: true
              }
            }
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
      //Create Category
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qmenu.menus'
          menuServices.crud.create(configName, this.locale.form).then(response => {
            this.$helper.alert.success('Menu created ID: ' + response.data.id)
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
      //Update Category
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configname = 'apiRoutes.qmenu.menus'
          menuServices.crud.update(configname, this.itemId, this.locale.form).then(response => {
            this.$helper.alert.success('Menu updated ID: ' + this.itemId)
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
      //Complete slug Only when is creation
      setSlug(){
        if(!this.itemId){
          let title = _cloneDeep(this.locale.formTemplate.title)
          title = title.split(' ').join('-').toLowerCase()
          this.locale.formTemplate.slug = _cloneDeep(title)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
</style>

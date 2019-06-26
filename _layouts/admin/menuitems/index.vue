<template>
  
  <div class="q-layout-page layout-padding">
    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-stream"></q-icon>
      Items List
    </h1>
    
    <!--Content-->
    <div class="relative-position backend-page">
      <!--Table-->
      <div class="col-12">
        <q-table
          :data="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getdata"
          :filter="table.filter"
          class="shadow-1 border-top-color">
          
          <!--Header Table-->
          <template slot="top" slot-scope="props">
            <div class="row full-width">
              <!--Search-->
              <div class="col-12 col-md-6 q-mt-sm">
                <div class="col-12 col-md-6">
                  <q-search
                    hide-underline
                    clearable
                    v-model="table.filter.search"
                    @input="getDataTable"/>
                </div>
              </div>
              <!--Button Actions-->
              <div class="col-12 col-md-6 q-mt-sm text-right">
                <!--Button new record-->
                <q-btn
                  @click="formItemShow = true; itemIdToEdit = false"
                  icon="fas fa-edit"
                  color="positive"
                  label="New Item"
                  rounded />
                <!--Button refresh data-->
                <q-btn
                  icon="fas fa-sync-alt"
                  color="info"
                  class="q-ml-xs"
                  @click="getDataTable(true)"
                  rounded>
                  <q-tooltip :delay="300">Refresh Data</q-tooltip>
                </q-btn>
              </div>
              <!--Filters-->
              <div class="col-12 q-mt-sm">
              
              </div>
            </div>
          </template>
          
          <!--= Custom Columns =-->
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <!--Edit button-->
            <q-btn
              @click="itemIdToEdit = props.row.id; formItemShow = true"
              color="positive"
              icon="fas fa-pen"
              size="sm"
              rounded>
              <q-tooltip :delay="300">Edit</q-tooltip>
            </q-btn>
            <!--Delete button-->
            <q-btn
              @click="deleteItem(props.row)"
              color="negative"
              icon="fas fa-trash-alt"
              size="sm"
              rounded>
              <q-tooltip :delay="300">Delete</q-tooltip>
            </q-btn>
          </q-td>
  
          <q-td slot="body-cell-id" slot-scope="props" :props="props">
            <q-chip>
              {{props.row.id}}
            </q-chip>
          </q-td>
          
          <q-td slot="body-cell-parentId" slot-scope="props" :props="props">
            <q-chip v-if="props.row.parentId">
              {{props.row.parentId}}
            </q-chip>
            <div v-else >
              -
            </div>
          </q-td>
        
        </q-table>
      </div>
      
      <!--Loading-->
      <inner-loading :visible="loading" />
    </div>
    <!--Form category (create and/or update)-->
    <form-menuitem v-model="formItemShow" @created="getDataTable(true)"
               @updated="getDataTable(true)" :item-id="itemIdToEdit">
    </form-menuitem>
  </div>
</template>

<script>
  //Services
  import menuServices from '@imagina/qcommerce/_services/index';
  //Component
  import formMenuitem  from '@imagina/qmenu/_components/admin/menuitems/form'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    components: {
      Treeselect,
      innerLoading,
      formMenuitem
    },
    mounted() {
      this.$nextTick(function () {
        this.getDataTable()
      })
    },
    data() {
      return {
        loading: false,
        table: {
          data: [],
          columns: [
            {name: 'id', label: 'ID', field: 'id', align: 'left'},
            {name: 'title', label: 'Title', field: 'title', align: 'left'},
            {name: 'parentId', label: 'Parent', field: 'parentId', align: 'left'},
            {name: 'linkType', label: 'link Type', field: 'linkType', align: 'left'},
            {name: 'menuName', label: 'Menu', field: 'menuName', align: 'left'},
            {name: 'actions', label: 'Actions', align: 'right'},
          ],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter: {
            search: null
          },
          filters: {},
          options: {}
        },
        formItemShow: false,
        dialogDeleteItem: false,
        itemIdToEdit: false,
        itemIdToDelete: false,
      }
    },
    methods: {
      //Request products with params from server table
      getDataTable(refresh = false) {
        this.getdata({pagination: this.table.pagination}, refresh)
      },
      //Get menuItems
      getdata({pagination, filter}, refresh = false) {
        this.loading = true
        //Params to request
        let params = {
          refresh: refresh,
          params: {
            filter: Object.assign({}, this.table.filter, this.table.filters),
            page: pagination.page,
            take: pagination.rowsPerPage,
          }
        }
        //Request
        menuServices.crud.index('apiRoutes.qmenu.menuItems', params).then(response => {
          this.table.data = response.data
          this.table.pagination.page = response.meta.page.currentPage
          this.table.pagination.rowsNumber = response.meta.page.total
          this.table.pagination.rowsPerPage = pagination.rowsPerPage
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error, 'bottom')
        })
      },
      //Delete category
      deleteItem(item) {
        this.$q.dialog({
          title: item.id+' - '+item.title,
          message: 'Do you want delete this Item?',
          color: 'negative',
          ok: 'Delete',
          cancel: true
        }).then(data => {
          this.loading = true
          menuServices.crud.delete('apiRoutes.qmenu.menuItems', item.id).then(response => {
            this.getDataTable(true)
            this.$helper.alert.success('menuItems deleted')
            this.dialogDeleteItem = false
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error, 'bottom')
          })
        }).catch(data => {})
      }
    }
  }
</script>

<style scoped>

</style>

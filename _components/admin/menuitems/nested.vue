<template>
  <div>
    <draggable
      tag="div"
      v-bind="dragOptions"
      :list="menuItems"
      :group="{ name: 'g1' }">
      <div
        class="list-group-item"
        v-for="(menuItem, index) in menuItems"
        :key="menuItem.id">
        <div class="row justify-between q-mb-xs q-mt-xs">
          <div class="col-10">
            <span>{{ menuItem.title }}</span>
            <q-icon
              color="primary"
              v-if="menuItem.linkType == 'external'"
              name="fas fa-globe-americas"
              class="q-mx-sm"/>
          </div>
          <div class="col-2 relative-position">
            <q-btn-group class="absolute-right">
              <q-btn
                :to="{name: 'qmenu.admin.menu.update', params: {menuid: menuItem.menuId, id: menuItem.id}}"
                icon="fas fa-pen"
                size="xs"
                color="positive"/>
              <q-btn
                @click="dialogDeleteItem = true; itemIdToDelete = menuItem"
                icon="fas fa-trash-alt"
                size="xs"
                color="negative"/>
            </q-btn-group>
          </div>
        </div>
        <nestedDraggable
          :class="`${menuItem.children.length} ?: q-mb-xs`"
          :menuItems="menuItem.children" />
      </div>
    </draggable>
  
    <q-dialog
      v-model="dialogDeleteItem"
      class="backend-page"
      prevent-close>
      <!-- Message -->
      <div slot="message">
        <h1 class="q-title text-negative">{{itemIdToDelete.label}}</h1>
        {{$tr('ui.message.deleteRecord')}}
      </div>
      <!--Buttons-->
      <div slot="buttons" >
        <!--Button cancel-->
        <q-btn
          color="blue-grey"
          label="Cancel"
          @click="dialogDeleteItem = false"/>
        <!--Button confirm delete category-->
        <q-btn
          color="negative"
          icon="fas fa-trash-alt"
          label="Delete"
          @click="deleteItem()"/>
      </div>
    </q-dialog>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  
  export default {
    name: 'nestedDraggable',
    components: {
      draggable,
    },
    props: {
      menuItems: {
        required: true,
        type: Array
      }
    },
    data () {
      return {
        dialogDeleteItem: false,
        itemIdToDelete: {},
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
    },
    methods:{
      deleteItem(){
        this.$crud.delete('apiRoutes.qmenu.menuItems', this.itemIdToDelete.id)
          .then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordDeleted')})
            this.dialogDeleteItem = false
            this.$root.$emit('updateMenuItems',{})
          }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom'})
        })
      },
    }
  };
</script>

<style scoped>

</style>

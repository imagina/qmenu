<template>
  <div>
    <draggable
      tag="div"
      v-bind="dragOptions"
      :list="menuItems"
      :group="{ name: 'g1' }"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          class="list-group-item"
          :key="element.id"
        >
          <div class="row justify-between q-mb-xs q-mt-xs">
            <div class="col-6 q-py-xs">
              <q-icon class="cursor-pointer" name="fas fa-arrows-alt"/>
              {{element.title}}
            </div>
            <div class="col-6 text-right q-py-xs relative-position">
              <q-btn
                :to="{name: 'qmenu.admin.menu.update', params: {menuId: $route.params.id, id: element.id}}"
                icon="fas fa-pen"
                size="xs"
                class="q-mr-sm"
                rounded
                unelevated
                color="green"/>
              <q-btn
                @click="dialogDeleteItem = true; itemIdToDelete = element"
                icon="fas fa-trash-alt"
                size="xs"
                rounded
                unelevated
                color="red"/>
            </div>
            <div class="col-12">
              <q-separator/>
            </div>
          </div>
          <nestedDraggable
            :class="`${element.children.length} ?: q-mb-xs`"
            :menuItems="element.children"/>
        </div>
      </template>
    </draggable>

    <q-dialog v-model="dialogDeleteItem">
      <q-card class="backend-page">
        <q-card-section>
          <h5 class="q-ma-none text-red">{{itemIdToDelete.label}}</h5>
          {{$tr('isite.cms.message.deleteRecord')}}
        </q-card-section>

        <q-card-actions align="right">
          <!--Button cancel-->
          <q-btn color="blue-grey" label="Cancel" @click="dialogDeleteItem = false"/>
          <!--Button confirm delete category-->
          <q-btn color="red" icon="fas fa-trash-alt"
                 label="Delete" @click="deleteItem()"/>
        </q-card-actions>
      </q-card>
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
    emits: ['updated'],
    data() {
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
    methods: {
      deleteItem() {
        this.$crud.delete('apiRoutes.qmenu.menuItems', this.itemIdToDelete.id)
          .then(response => {
            this.$alert.success({message: this.$tr('isite.cms.message.recordDeleted')})
            this.dialogDeleteItem = false
            this.$emit('updated')
          }).catch(error => {
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoDeleted'), pos: 'bottom'})
        })
      },
    }
  };
</script>

<style lang="scss">
  .list-group-item {
    .list-group-item {
      padding-left: 15px !important;
    }
  }
</style>

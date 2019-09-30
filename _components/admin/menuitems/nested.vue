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
          </div>
          <div class="col-2 relative-position">
            <q-btn-group class="absolute-right">
              <q-btn
                icon="fas fa-pen"
                size="xs"
                color="positive"/>
              <q-btn
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
    

  </div>
</template>

<script>
  import modalEdit from '@imagina/qmenu/_components/admin/menuitems/modalEdit'
  import draggable from 'vuedraggable'
  
  export default {
    name: 'nestedDraggable',
    components: {
      draggable,
      modalEdit
    },
    props: {
      menuItems: {
        required: true,
        type: Array
      }
    },
    data () {
      return {
      
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

    }
  };
</script>

<style scoped>

</style>

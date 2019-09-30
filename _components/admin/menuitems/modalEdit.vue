<template>
  
  <q-modal
    v-model="opened"
    no-esc-dismiss
    no-backdrop-dismiss
    class="backend-page">
    <q-modal-layout>
      
      <q-toolbar slot="header">
        <q-toolbar-title >
          Crear Elemento
        </q-toolbar-title>
        <q-btn
          @click="closeModal"
          flat
          icon="fas fa-times"/>
      </q-toolbar>
      
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title/>
        <q-btn
          icon="fas fa-save"
          color="positive"
          :label="$tr('ui.label.save')"/>
      </q-toolbar>
      
      <div class="layout-padding relative-position" >
      
      </div>
    </q-modal-layout>
  </q-modal>

</template>

<script>
  export default {
    props: {
      opened: {
        default: false
      },
    },
    methods :{
      closeModal(){
        this.$emit('closeModal')
      }
    }
  }
</script>

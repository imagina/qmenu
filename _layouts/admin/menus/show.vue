<template>
  <div
    id="pageId"
    class="q-layout-page layout-padding">
    <div class=" q-mb-lg backend-page">
      <div class="row gutter-x-sm">
        <div class="col-md-7">
          <div class="box">
            <indexItemsByMenu/>
          </div>
        </div>
        <div class="col-md-5">
          <div class="box">
            <formMenu/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // Components
  import formMenu from '@imagina/qmenu/_components/admin/menus/form'
  import indexItemsByMenu from '@imagina/qmenu/_components/admin/menuitems/indexItemsByMenu'
  
  export default {
    components:{
      formMenu,
      indexItemsByMenu
    }
  }
</script>

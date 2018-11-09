<template>
  <div id="menuDesktop" class="q-container desktop-only">
    <div class="content bg-primary bg-primary">
      <figure :class="showSearch ? 'rotate' : ''">
        <div ref="frontal" class="frontal">
          <!--Menu-->
          <q-btn-group flat>
            <!--Level 1 Single-->
            <q-btn flat :label="lv1.title" :key="key1"
                   v-for="(lv1,key1) in sidebar"
                   :class="$route.path == lv1.to ? 'active' : ''"
                   :to="lv1.to"
                   v-if="!lv1.children || !lv1.children.length">
            </q-btn>

            <!--Level 1 Dropdown-->
            <q-btn-dropdown flat :label="lv1.title"
                            split :to="lv1.to"
                            :class="'btnDropdown ' + ($route.path == lv1.to ? 'active' : '')"
                            :key="key1" v-else>
              <q-list id="list_menu" separator class="q-py-none">
                <!--Level 2 Single-->
                <singleItem v-for="(lv2,key2) in lv1.children"
                            :item="lv2" :key="key2"
                            v-if="!lv2.children || !lv2.children.length">
                </singleItem>

                <!--Level 2 Dropdown-->
                <dropdownItem v-else-if="lv2.children"
                              :item="lv2">
                  <singleItem v-for="(lv3,key3) in lv2.children"
                              :item="lv3" :key="key3">
                  </singleItem>
                </dropdownItem>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>

          <!--== btn Search ==-->
          <q-btn flat icon="fas fa-search" class="btnSearch"
                 @click="showSearch = true"></q-btn>
        </div>
        <div class="trasera">
          <div style="width: 100%; height: 100%">
            <search-component :focus="showSearch"></search-component>

            <q-btn flat icon="fas fa-times" class="btnSearch"
                   @click="showSearch = false"></q-btn>
          </div>
        </div>
      </figure>
    </div>
  </div>
</template>
<script>
  /*Components*/
  import singleItem from './items/singleItem'
  import dropdownItem from './items/dropdownItem'
  import searchComponent from './search'

  /*Config*/
  import Config from 'src/config/index'
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    components: {
      singleItem,
      dropdownItem,
      searchComponent
    },
    watch: {
      showSearch(to){
        //For rotate menu
        if(to){
          setTimeout(() => {
            this.$refs.frontal.style.display = 'none'
          },500)
        }else{
          this.$refs.frontal.style.display = 'block'
        }
      }
    },
    data() {
      return {
        sidebar: this.$store.getters['menu/mainMenu'],
        showSearch: false
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";

  #menuDesktop
    position relative
    .content
      height 60px
      width 100%
      position absolute
      left 0
      top 0px
      padding 0 15px
      /*animation 3D*/
      figure
        height 60px
        margin 0px
        position relative
        transition all ease .5s
        transform-style preserve-3d
        transform perspective(0px) rotateX(0deg)
        .frontal, .trasera
          width 100%
          height 100%
          transition all ease .5s
        .frontal
          padding 18px 0
          background-color $primary
          backface-visibility hidden
        .trasera
          position absolute
          top 0
          background-color $primary
          transform perspective(0px) rotateX(180deg)
          backface-visibility hidden
          #search
            padding 11px 0
        &.rotate
          transform perspective(0px) rotateX(180deg)
    .q-btn
      font-size 15px
      margin 0 8px
      color white
      min-height 22px !important
      height 22px !important
      border-right 1px solid $secondary
      .q-btn-inner
        font-size 15px
      &:last-child
        border 0
      &:hover, &:focus
        color $secondary
        .q-focus-helper
          display none
    .btnSearch
      height 23px !important
      position absolute
      top 18px
      right 0
      border-left 1px solid $secondary !important
      border-right 1px solid $secondary !important
      border-radius 0
      .q-icon
        font-size 17px
    .active
      color $secondary
      .q-btn
        color $secondary !important
</style>

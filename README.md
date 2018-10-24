##Module Qmenu
Module with components for load a menu and component for search
#

###Component: menu-desktop
- ####Usage 
  ```js
  import menuDesktop from '@imagina/qmenu/_components/menu-desktop';

  export default {
    ...
    components: {
      menuDesktop
    }
    ...
  };
  ```
  
  ```html
  <menu-desktop class="desktop-only" id-menu="[id menu]"></menu-desktop>
  ```
 #

###Component: menu-mobile
- ####Usage 
  ```js
  import menuMobile from '@imagina/qmenu/_components/menu-mobile';

  export default {
    ...
    components: {
      menuMobile
    }
    ...
  };
  ```
  
  ```html
  <menu-mobile class="mobile-only" id-menu="[id menu]"></menu-mobile>
  ```
#

###Component: menu-footer
- ####Usage 
  ```js
  import menuFooter from '@imagina/qmenu/_components/menu-footer';

  export default {
    ...
    components: {
      menuFooter
    }
    ...
  };
  ```
  
  ```html
  <menu-footer id-menu="[id menu]"></menu-footer>
  ```

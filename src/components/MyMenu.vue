<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
  />

  <div
    id="mySidebar"
    class="sidebar"
    @mouseover="toggleSidebar"
    @mouseout="toggleSidebar"
  >
    
    <a @click="showAboutEE">
      <span class="material-icons">info</span>
      <span class="icon-text">About EE</span>
    </a><br>  
    <AboutEE v-show="showinfoEE"/>

    <a @click="showWeierstrassMenu">
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Weierstrass</span> 
    </a><br />

    <MenuWeierstrass v-show="showWeierstrass" />

    <a @click="showMontgomeryMenu" >
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Montgomery</span>
    </a><br />
    <MenuMont v-show="showMont" />

    <a @click="showEdwardsMenu" >
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Edwards</span>
    </a><br />
    <MenuEdwards v-show="showEdwards" />
    
    <a @click="changePinStatus">
      <span id="pin" class="material-icons">push_pin</span>
    </a>

  </div>

</template>


<script>
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMont from "./menu/MenuMont";
import MenuEdwards from "./menu/MenuEdwards";
import AboutEE from "./menu/AboutEE";

export default {
  name: "MyMenu",
  components: {
    MenuWeierstrass,
    MenuMont,
    MenuEdwards,
    AboutEE
  },
  data() {
    return {
      // param affichage sous menus
      showWeierstrass: false,
      showMont: false,
      showEdwards: false,
      showinfoEE: false,
      // the menu is fixed by default
      pinned: true,
      // get computed size of sidebar when mouse is on or over
      width: getComputedStyle(document.documentElement).getPropertyValue(
        "--sidebar-width"
      ),
      miniWidth: getComputedStyle(document.documentElement).getPropertyValue(
        "--sidebar-width-minimized"
      ),
      // get computed margin of #main when mouse is on or over
      mainIDMarginLeft: getComputedStyle(
        document.documentElement
      ).getPropertyValue("--main-margin-left"),
      mainIDMarginLeftMinimized: getComputedStyle(
        document.documentElement
      ).getPropertyValue("--main-margin-left-minimized")
    };
  },
  methods: {
    // display the weierstrass submenu
    showWeierstrassMenu() {
      this.showWeierstrass = !this.showWeierstrass;
    },
    showMontgomeryMenu() {
      this.showMont = !this.showMont;
    },
    showEdwardsMenu() {
      this.showEdwards = !this.showEdwards;
    },
    showAboutEE() {
      this.showinfoEE = !this.showinfoEE;
    },
    // hide sidebar on mouse over if pinned=false
    toggleSidebar() {
      if (!this.pinned) {
        if (this.mini) {
          // console.log("opening sidebar");
          document.getElementById("mySidebar").style.width = this.width;
          document.getElementById("main").style.marginLeft = this.mainIDMarginLeft;
          this.mini = false;
        } else {
          // console.log("closing sidebar");
          document.getElementById("mySidebar").style.width = this.miniWidth;
          document.getElementById("main").style.marginLeft = this.mainIDMarginLeftMinimized;
          this.mini = true;
        }
      }
    },
    // change pin boolean value and change pin icon
    changePinStatus() {
    if (this.pinned) {
      document.getElementById("pin").className = "material-icons-outlined";
    } else {
      document.getElementById("pin").className = "material-icons";
    }
    this.pinned = !this.pinned;
    },
  },
};
</script>

<style lang="css" scoped>
  @import '@/css/menu.css';
</style>
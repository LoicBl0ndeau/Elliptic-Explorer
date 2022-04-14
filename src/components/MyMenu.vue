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

    <a @click="open('shortmod')">
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Short Weierstrass</span>
    </a><br />
    <MenuShortMod v-show="isOpen.shortmod" ref="shortmod" />

    <a @click="open('weierstrass')">
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Weierstrass</span>
    </a><br />
    <MenuWeierstrass v-show="isOpen.weierstrass" ref="weierstrass" />

    <a @click="open('montgomery')">
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Montgomery</span> 
    </a><br />
    <MenuMontgomery v-show="isOpen.montgomery" ref="montgomery" />

    <a @click="open('edwards')">
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Edwards</span> 
    </a><br />
    <MenuEdwards v-show="isOpen.edwards" ref="edwards" />

    <a @click="openAbout()">
      <span class="material-icons">info</span>
      <span class="icon-text">About EE</span>
    </a><br>
    
    <a @click="changePinStatus">
      <span id="pin" class="material-icons">push_pin</span>
    </a>

  </div>

</template>


<script>
import MenuShortMod from "./menu/MenuShortMod";
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMontgomery from "./menu/MenuMont";
import MenuEdwards from "./menu/MenuEdwards";

import { menuStore } from "@/stores/menu.js";

export default {
  name: "MyMenu",
  components: {
    MenuShortMod,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards
  },
  setup() {
    const menuS = menuStore();

    return { menuS };
  },
  data() {
    return {
      // param affichage sous menus
      isOpen: {
        "shortmod": false,
        "weierstrass": false,
        "montgomery": false,
        "edwards": false,
      },
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
    /** Open the selected menu, close the others. */
    open(menu) {
      for (const [key, ] of Object.entries(this.isOpen)) {
        if (key == menu) {
          this.isOpen[key] = true;
          this.$refs[key].displayDefaultCurve();
          // hide about text presentation in case it was open
          this.menuS.hideElementById("my-home-component");
          // display graph again if not already displayed
          this.menuS.displayElementById("calculator");
        }
        else this.isOpen[key] = false;
      }
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
    openAbout() {
      // close curve submenu of one was open and hide graph
      this.menuS.hideElementById("calculator");
      for (const [key, ] of Object.entries(this.isOpen)) {
        this.isOpen[key] = false;
      }
      // display explanation text
      this.menuS.displayElementById("my-home-component");
    }
  },
};
</script>

<style lang="css" scoped>
  @import '@/css/menu.css';
</style>
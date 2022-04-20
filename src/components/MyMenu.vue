<template>
  <!-- <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
  /> -->

  <div
    id="mySidebar"
    class="sidebar"
    @mouseover="toggleSidebar"
    @mouseout="toggleSidebar"
  >
    <a @click="open('about')">
      <img
        class="material-icons filter-orange"
        src="images/info_black_24dp.svg"
      />
      <span class="icon-text">About EE</span> </a
    ><br />

    <a @click="open('shortmod')">
      <img
        id="menu-shortmod"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Short Weierstrass</span> </a
    ><br />
    <MenuShortMod v-show="isOpen.shortmod" ref="shortmod" />

    <a @click="open('weierstrass')">
      <img
        id="menu-weierstrass"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Weierstrass</span> </a
    ><br />
    <MenuWeierstrass v-show="isOpen.weierstrass" ref="weierstrass" />

    <a @click="open('montgomery')">
      <img
        id="menu-montgomery"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Montgomery</span> </a
    ><br />
    <MenuMontgomery v-show="isOpen.montgomery" ref="montgomery" />

    <a @click="open('edwards')">
      <img
        id="menu-edwards"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Edwards</span> </a
    ><br />
    <MenuEdwards v-show="isOpen.edwards" ref="edwards" />

    <a @click="changePinStatus">
      <img
        id="pin"
        class="material-icons filter-orange"
        src="images/push_pin_black_24dp-filled.svg"
      />
    </a>
  </div>
</template>


<script>
import MenuShortMod from "./menu/MenuShortMod";
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMontgomery from "./menu/MenuMont";
import MenuEdwards from "./menu/MenuEdwards";

export default {
  name: "MyMenu",
  components: {
    MenuShortMod,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards,
  },
  data() {
    return {
      // param affichage sous menus
      isOpen: {
        about: false,
        shortmod: false,
        weierstrass: false,
        montgomery: false,
        edwards: false,
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
      ).getPropertyValue("--main-margin-left-minimized"),
    };
  },
  methods: {
    /** Open the selected menu, close the others. */
    open(menu) {
      if (menu == "about") {
        // hide graph and show about div
        document.getElementById("about-div").style.display = "inline";
        document.getElementById("graph-div").style.display = "none";
      }
      else {
        // hide about div and show graph
        document.getElementById("about-div").style.display = "none";
        document.getElementById("graph-div").style.display = "inline";
      }
      // get the curves names
      let keysOfIsOpen = Object.keys(this.isOpen);
      // remove "about" from keys (it's the 1st elem of the list)
      keysOfIsOpen.shift();

      for (const curvename of keysOfIsOpen) {
        if (curvename == menu) {
          this.isOpen[curvename] = true;
          this.$refs[curvename].displayDefaultCurve();
          // show expand arrow
          document.getElementById(`menu-${curvename}`).src =
            "images/expand_more_black_24dp.svg";
        } else {
          this.isOpen[curvename] = false;
          // show chevron right arrow
          document.getElementById(`menu-${curvename}`).src =
            "images/chevron_right_black_24dp.svg";
        }
      }
    },
    // hide sidebar on mouse over if pinned=false
    toggleSidebar() {
      if (!this.pinned) {
        if (this.mini) {
          // console.log("opening sidebar");
          document.getElementById("mySidebar").style.width = this.width;
          document.getElementById("main").style.marginLeft =
            this.mainIDMarginLeft;
          this.mini = false;
        } else {
          // console.log("closing sidebar");
          document.getElementById("mySidebar").style.width = this.miniWidth;
          document.getElementById("main").style.marginLeft =
            this.mainIDMarginLeftMinimized;
          this.mini = true;
        }
      }
    },
    // change pin boolean value and change pin icon
    changePinStatus() {
      if (this.pinned) {
        document.getElementById("pin").className = "material-icons-outlined filter-orange";
        document.getElementById("pin").src = "images/push_pin_black_24dp.svg";
      } else {
        document.getElementById("pin").className = "material-icons filter-orange";
        document.getElementById("pin").src = "images/push_pin_black_24dp-filled.svg";
      }
      this.pinned = !this.pinned;
    },
  },
};
</script>

<style lang="css" scoped>
@import "@/css/menu.css";
</style>
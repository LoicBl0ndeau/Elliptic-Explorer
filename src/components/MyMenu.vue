<template>
  <div
    id="mySidebar"
    class="sidebar"
    @mouseover="toggleSidebar"
    @mouseout="toggleSidebar"
  >
    <!-- param menu, not displayed by default -->
    <div id="graph-settings" style="display: none">
      <div id="options">
        <h3>Graph Parameters</h3>

        Show lines :
        <input
          type="checkbox"
          id="showLinesCheckbox"
          @change="graphS.displayLines(!getCheckBoxValue('showLinesCheckbox'))"
          checked
        /><br />
        Show labels :
        <input
          type="checkbox"
          id="showLabelsCheckbox"
          @change="graphS.displayLabels(getCheckBoxValue('showLabelsCheckbox'))"
          checked
        /><br />
        Show segments :
        <input
          type="checkbox"
          id="showSegmentsCheckbox"
          @change="
            graphS.displaySegments(getCheckBoxValue('showSegmentsCheckbox'))
          "
          checked
        /><br />
      </div>
    </div>

    <a @click="open('about')">
      <img
        class="material-icons filter-orange"
        src="images/info_black_24dp.svg"
      />
      <span class="icon-text">About EE</span></a
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

    <a @click="open('shortmodperiodic')">
      <img
        id="menu-shortmodperiodic"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Short Weierstrass Periodic</span> </a
    ><br />
    <MenuShortModPeriodic v-show="isOpen.shortmodperiodic" ref="shortmodperiodic" />

    <a @click="changePinStatus">
      <img
        id="pin"
        class="material-icons filter-orange"
        src="images/push_pin_black_24dp-filled.svg"
      />
    </a>

    <img
      id="graph-settings-icon"
      class="material-icons filter-orange"
      src="images/settings_black_24dp.svg"
      style="display: none"
      @click="changeGraphParamDisplay()"
    />
  </div>
</template>


<script>
import MenuShortMod from "./menu/MenuShortMod";
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMontgomery from "./menu/MenuMont";
import MenuEdwards from "./menu/MenuEdwards";
import { graphStore } from "@/stores/graph.js";
import MenuShortModPeriodic from "./menu/MenuShortModPeriodic";

export default {
  name: "MyMenu",
  components: {
    MenuShortMod,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards,
    MenuShortModPeriodic
},
  setup() {
    const graphS = graphStore();

    return { graphS };
  },
  data() {
    return {
      // list of the of the submenus in the sidebar
      isOpen: {
        about: false,
        shortmod: false,
        weierstrass: false,
        montgomery: false,
        edwards: false,
        shortmodperiodic: false,
      },
      // the menu is fixed and not minized by default
      isPinned: true,
      isMinimized: false,
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
    open(selectedMenu) {
      // special case for the "about" submenu, as it's not a curve.
      if (selectedMenu == "about") {
        // hide graph; display "about-div" id
        document.getElementById("graph-div").style.display = "none";
        document.getElementById("about-div").style.display = "inline";
        // hide graph optionnal settings
        document.getElementById("graph-settings").style.display = "none";
        document.getElementById("graph-settings-icon").style.display = "none";
      } else {
        // display a curve
        // hide "about div"; displays graph and graph param in menu
        document.getElementById("about-div").style.display = "none";
        document.getElementById("graph-div").style.display = "inline";
        // display gear icon for optionnal settings
        document.getElementById("graph-settings-icon").style.display = "inline";
      }
      // get the curves names
      let keysOfIsOpen = Object.keys(this.isOpen);
      // remove "about" from keys (it's the 1st elem of the list)
      keysOfIsOpen.shift();

      for (const curvename of keysOfIsOpen) {
        if (curvename == selectedMenu) {
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
    toggleSidebar() {
      if (!this.isPinned) {
        // hide sidebar on mouse over if menu not pinnned
        if (this.isMinimized) {
          // open sidebar menu
          document.getElementById("mySidebar").style.width = this.width;
          document.getElementById("main").style.marginLeft =
            this.mainIDMarginLeft;
        } else {
          // close sidebar menu
          document.getElementById("mySidebar").style.width = this.miniWidth;
          document.getElementById("main").style.marginLeft =
            this.mainIDMarginLeftMinimized;
        }
        this.isMinimized = !this.isMinimized;
      }
    },
    changePinStatus() {
      if (this.isPinned) {
        // change pin icon to its outlined version
        document.getElementById("pin").className =
          "material-icons-outlined filter-orange";
        document.getElementById("pin").src = "images/push_pin_black_24dp.svg";
      } else {
        // fill pin icon
        document.getElementById("pin").className =
          "material-icons filter-orange";
        document.getElementById("pin").src = "images/push_pin_black_24dp-filled.svg";
      }
      this.isPinned = !this.isPinned;
    },
    changeGraphParamDisplay() {
      let status = document.getElementById("graph-settings").style.display;
      if (status == "block")
        document.getElementById("graph-settings").style.display = "none";
      else
        document.getElementById("graph-settings").style.display = "block";
    },
    getCheckBoxValue(htmlID) {
      return document.getElementById(htmlID).checked;
    },
  },
};
</script>

<style lang="css" scoped>
@import "@/css/menu.css";
</style>
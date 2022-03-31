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

    <MenuParametre v-show="show" />

    <a @click="showMontgomeryMenu" >
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Montgomery</span>
    </a><br />
    <MenuParametreMont v-show="showMont" />

    <a @click="showEdwardsMenu" >
      <span class="material-icons">chevron_right</span>
      <span class="icon-text">Edwards</span>
    </a><br />
    <MenuParametreEdwards v-show="showEdwards" />
    
    <a @click="changePinStatus">
      <span id="pin" class="material-icons">push_pin</span>
    </a>

  </div>

</template>


<script>
import MenuParametre from "@/components/Menu/MenuParametre.vue";
import MenuParametreMont from "@/components/Menu/MenuParametreMont.vue"
import MenuParametreEdwards from "@/components/Menu/MenuParametreEdwards.vue"
import AboutEE from "@/components/Menu/AboutEE.vue"

export default {
  name: "MyMenu",
  components: {
    MenuParametre,
    MenuParametreMont,
    MenuParametreEdwards,
    AboutEE
  },
  data() {
    return {
      // param affichage sous menus
      show: false,
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
      this.show = !this.show;
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


// The style is shared with other components for the #main style
<style>
:root {
  --sidebar-width: 300px;
  --sidebar-font-size: 16px;
  --sidebar-bg-color: #111;
  --sidebar-pad-topbottom: 50px;
  --sidebar-pad-rigthleft: 15px;
  --sidebar-icon-size: 24px; /*default: 24px */

  /* Variable declared to be used in the js compenent defined above */
  --sidebar-width-minimized: calc(var(--sidebar-icon-size));
  --main-margin-left: calc(
    var(--sidebar-width) + 2 * var(--sidebar-pad-rigthleft)
  );
  --main-margin-left-minimized: calc(
    var(--sidebar-width-minimized) + 2 * var(--sidebar-pad-rigthleft)
  );
}

/* This is for all the content outside the sidebar.
It enables to fit to the different widths when the bqr is minimized or not */
#main {
  height: 100%;
  margin-left: var(--main-margin-left);
  transition: margin-left 0.5s;
  padding: 0px 5px 0px 5px;
}

.sidebar {
  height: 100%;
  width: var(--sidebar-width);
  padding: var(--sidebar-pad-topbottom) var(--sidebar-pad-rigthleft);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--sidebar-bg-color);
  transition: 0.5s;
  overflow-x: hidden;
  white-space: nowrap;
  font-size: var(--sidebar-font-size);
}

.sidebar a,
#pin {
  color: #818181;
}

.sidebar a {
  text-decoration: none;
  display: block;
}

.sidebar a:hover {
  color: #f1f1f1;
}

/* main .sidebar {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
} */

.material-icons,
.material-icons-outlined,
.icon-text {
  vertical-align: middle;
}

.material-icons,
.material-icons-outlined {
  font-size: var(--sidebar-icon-size) !important;
  padding-bottom: 3px;
  margin-right: var(--sidebar-pad-rigthleft);
}

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}

#pin {
  position: absolute;
  top: 0;
  margin-top: 5px;
  vertical-align: middle;
  padding-bottom: 3px;
  font-size: 30px;
}
</style>
<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
  <div id="mySidebar" class="sidebar" onmouseover="toggleSidebar()" onmouseout="toggleSidebar()">
    <a href="#"><span class="material-icons">info</span><span class="icon-text">About EE</span></a><br>
    <a href="#"><span class="material-icons">chevron_right</span><span class="icon-text">Weierstrass</span></a><br>
    <a href="#"><span class="material-icons">chevron_right</span><span class="icon-text">Montgomery</span></a><br>
    <a href="#"><span class="material-icons">chevron_right</span><span class="icon-text">Edwards</span></a>
    <a href="#" onclick="changePinStatus();"><span id="pin" class="material-icons">push_pin</span></a>
    <MenuParametre msg1="Courbes Weirstrass"/>
  </div>

  <component :is="'script'">
    var pinned = true;
    var mini = false;

    <!-- import CSS calculated variable for width and margin change -->
    var miniWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width-minimized');
    var width = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
    var mainMarginLeft = getComputedStyle(document.documentElement).getPropertyValue('--main-margin-left');
    var mainMarginLeftMinimized = getComputedStyle(document.documentElement).getPropertyValue('--main-margin-left-minimized');

    <!-- Displays menu if mouse hoover. Only works if pinned=false -->
    function toggleSidebar() {
      if (!pinned) {
        if (mini) {
          <!-- console.log("opening sidebar"); -->
          document.getElementById("mySidebar").style.width = width;
          document.getElementById("main").style.marginLeft = mainMarginLeft;
          this.mini = false;
        } else {
          <!-- console.log("closing sidebar"); -->
          document.getElementById("mySidebar").style.width = miniWidth;
          document.getElementById("main").style.marginLeft = mainMarginLeftMinimized;
          this.mini = true;
        }
      }
    }

    <!-- Switch pinned variable to true or false and change pin icon -->
    function changePinStatus() {
      if (pinned) {
        pinned = false;
        document.getElementById("pin").className = "material-icons-outlined";
      }
      else {
        pinned = true;
        document.getElementById("pin").className = "material-icons";
      }
    }
  </component>

</template>


<script>
import MenuParametre from '@/components/MenuParametre'

export default {
  name: "MyMenu",
  components: {
    MenuParametre
  }
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
  --sidebar-icon-size: 24px;     /*default: 24px */
  
  /* Variable declared to be used in the js compenent defined above */
  --sidebar-width-minimized: calc(var(--sidebar-icon-size));
  --main-margin-left: calc(var(--sidebar-width) + 2*var(--sidebar-pad-rigthleft));
  --main-margin-left-minimized: calc(var(--sidebar-width-minimized) + 2*var(--sidebar-pad-rigthleft));
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

.sidebar a, #pin {
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

.material-icons, .material-icons-outlined {
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
  top:0;
  margin-top: 5px;
  vertical-align: middle;
  padding-bottom: 3px;
  font-size: 30px;
}

</style>
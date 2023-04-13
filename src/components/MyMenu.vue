<template>
  <div id="mySidebar" class="sidebar" @mouseover="toggleSidebar" @mouseout="toggleSidebar">

    <!-- Pin icon : keep the menu attached or not -->
    <a @click="changePinStatus">
      <img id="pin" class="material-icons filter-orange" src="images/push_pin_black_24dp-filled.svg" />
    </a>

    <!-- Graph settings icon -->
    <img id="graph-settings-icon" class="material-icons filter-orange" src="images/settings_black_24dp.svg"
      @click="changeGraphParamDisplay()" />

    <!-- Graph settings section : "display:none" by default, displayed when 'Graph settings icon' is clicked -->
    <div id="graph-settings">
      <div id="options">
        <h3>Graph Parameters</h3>

        Show lines :
        <input type="checkbox" id="showLinesCheckbox"
          @change="graphS.displayLines(!getCheckBoxValue('showLinesCheckbox'))" checked /><br />
        Show labels :
        <input type="checkbox" id="showLabelsCheckbox"
          @change="graphS.displayLabels(getCheckBoxValue('showLabelsCheckbox'))" checked /><br />
        Show segments :
        <input type="checkbox" id="showSegmentsCheckbox" @change="
          graphS.displaySegments(getCheckBoxValue('showSegmentsCheckbox'))
        " checked /><br />
      </div>
    </div>

    <!-- Corps section -->
    <div id="corps">
      <h1>Corps de l'équation</h1>

      <div class="flexbox">
        <div id="corps_reels" @click="setCorps('R')">
          <span>R</span>
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Réels</span>
        </div>

        <div id="corps_modulo" @click="setCorps('P')">
          <span>%</span>
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Modulo P</span>
        </div>

      </div>

      <p id="avertissementCorps">Veuillez choisir un corps.</p>

    </div>

    <!-- Equation section -->
    <div id="equation">
      <h1>
        Equation
      </h1>

      <h2>
        Forme :
        <select name="forme" id="forme" @change="formeChange()">
          <option value="Undefined" selected>Undefined</option>
          <option value="Short_Weierstrass">Short Weierstrass</option>
          <option value="Weierstrass">Weierstrass</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Edwards">Edwards</option>
        </select>
      </h2>

      <p id="avertissementForme">Veuillez choisir une forme.</p>

      <MenuShortMod v-show="isOpen.Short_Weierstrass" ref="Short_Weierstrass" :controleur='controleurObject' />
      <MenuWeierstrass v-show="isOpen.Weierstrass" ref="Weierstrass" :controleur='controleurObject' />
      <MenuEdwards v-show="isOpen.Edwards" ref="Edwards" :controleur='controleurObject' />
      <MenuMontgomery v-show="isOpen.Montgomery" ref="Montgomery" :controleur='controleurObject' />

    </div>

    <!-- Vues section -->
    <div id="vues_disponibles">
      <h1>
        Vues disponibles
      </h1>
      <p id="avertissementVue">Veuillez choisir une forme.</p>

      <div class="flexbox">
        <div id="vue2D" @click="setVue('vue2D')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Vue 2D</span>
        </div>

        <div id="vue3D" @click="setVue('vue3D')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Vue 3D</span>
        </div>

        <div id="vueFinie" @click="setVue('vueFinie')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Vue finie</span>
        </div>

        <div id="vuePeriodique" @click="setVue('vuePeriodique')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Vue périodique</span>
        </div>

        <div id="vuePerspective" @click="setVue('vuePerspective')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Vue perspective</span>
        </div>

      </div>
    </div>

    <!-- About section -->
    <a @click="openAbout()">
      <img class="material-icons filter-orange" src="images/info_black_24dp.svg" />
      <span class="icon-text">About EE</span>
    </a>

  </div>
</template>


<script>
import { graphStore } from "@/stores/graph.js";
import MenuShortMod from "./menu/MenuShortMod";
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMontgomery from "./menu/MenuMont";
import MenuEdwards from "./menu/MenuEdwards";
import Controleur from "@/data/Controleur.js";

let controleur = new Controleur();

export default {
  name: "MyMenu",
  components: {
    MenuShortMod,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards,
  },
  setup() {
    const graphS = graphStore();
    return { graphS };
  },
  mounted() {
    this.setCorps('R');
  },
  data() {
    return {
      controleurObject: controleur, // the controleur object's reference
      isOpen: { // state list of the submenus (open or not) 
        about: false,
        Short_Weierstrass: false,
        Weierstrass: false,
        Montgomery: false,
        Edwards: false,
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
    setCorps(value) { // set the corps in the controleur object and display the available vues
      // hide the warning if the user selects a corps
      document.getElementById('avertissementCorps').style.display = "none";
      if (controleur.getCorps() == "Undefined") {
        document.getElementById('vues_disponibles').children[2].style.display = "block";
      }
      controleur.setCorps(value);
      controleur.setVue("Undefined");

      // remove the selected class from all the menu items and add it to the selected one
      // also display the available vues for the selected corps
      document.getElementById("corps").children[1].childNodes.forEach((child) => {
        child.classList.remove("selected");
      });

      let availableVues = [];

      switch (value) {
        case "R":
          document.getElementById("p_span").style.display = "none";
          document.getElementById("corps_reels").classList.add("selected");
          availableVues = ["vue2D", "vue3D", "vuePerspective"];
          break;
        case "P":
          document.getElementById("p_span").style.display = "block";
          document.getElementById("corps_modulo").classList.add("selected");
          availableVues = ["vueFinie", "vuePeriodique"];
          break;
      }

      document.getElementById('vues_disponibles').children[2].childNodes.forEach((child) => {
        child.classList.remove("selected");
        if (availableVues.includes(child.id)) {
          child.style.display = "flex";
        } else {
          child.style.display = "none";
        }
      });

      document.getElementById('forme').value = "Undefined";
      this.formeChange();
    },
    formeChange() {
      let forme = document.getElementById('forme').value;
      let oldForme = controleur.getForme();

      if (controleur.getCorps() != "Undefined") {
        controleur.setForme(forme);

        if (forme == "Undefined") {
          document.getElementById('avertissementForme').style.display = "block";
        } else {
          document.getElementById('avertissementForme').style.display = "none";
        }
        this.isOpen[oldForme] = false;
        this.isOpen[forme] = true;

        document.getElementById('avertissementVue').innerText = "Veuillez choisir une vue.";
      }
    },
    setVue(value) {
      if (controleur.getForme() != "Undefined") {
        document.getElementById('avertissementVue').style.display = "none";
        controleur.setVue(value);

        // remove the selected class from all the menu items and add it to the selected one
        document.getElementById("vues_disponibles").children[2].childNodes.forEach((child) => {
          child.classList.remove("selected");
        });

        switch (value) {
          case "vue2D":
            document.getElementById("vue2D").classList.add("selected");
            break;
          case "vue3D":
            document.getElementById("vue3D").classList.add("selected");
            break;
          case "vueFinie":
            document.getElementById("vueFinie").classList.add("selected");
            break;
          case "vuePerspective":
            document.getElementById("vuePerspective").classList.add("selected");
            break;
          case "vuePeriodique":
            document.getElementById("vuePeriodique").classList.add("selected");
            break;
          default:
            console.log("Erreur : vue non reconnue");
            break;
        }

        // display the graph
        document.getElementById("about-div").style.display = "none";
        document.getElementById("graph-div").style.display = "inline";

        // display the graph curve
        //this.graphS.displayShort()
      }
    },
    openAbout() {
      // hide graph and display "about-div"
      document.getElementById("graph-div").style.display = "none";
      document.getElementById("about-div").style.display = "inline";
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
  }
};
</script>

<style lang="css" scoped>
@import "@/css/menu.css";
</style>
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
      <h1>Equation field</h1>

      <div class="flexbox">
        <div id="corps_reels" @click="setCorps('R')">
          <span>R</span>
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Real numbers</span>
        </div>

        <div id="corps_modulo" @click="setCorps('P')">
          <span>%</span>
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Prime field of order p</span>
        </div>

      </div>

      <p id="avertissementCorps">Please choose a form.</p>

    </div>

    <!-- Equation section -->
    <div id="equation">
      <h1>
        Equation definition
      </h1>

      <h2>
        Form :
        <select name="forme" id="forme" @change="formeChange()">
          <option value="Undefined" selected>Undefined</option>
          <option value="Short_Weierstrass">Short Weierstrass</option>
          <option value="Weierstrass">Weierstrass</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Edwards">Edwards</option>
        </select>
      </h2>

      <p id="avertissementForme">Please choose a form.</p>

      <MenuShortMod v-show="isOpen.Short_Weierstrass" ref="Short_Weierstrass" :controleur='controleurObject' />
      <MenuWeierstrass v-show="isOpen.Weierstrass" ref="Weierstrass" :controleur='controleurObject' />
      <MenuEdwards v-show="isOpen.Edwards" ref="Edwards" :controleur='controleurObject' />
      <MenuMontgomery v-show="isOpen.Montgomery" ref="Montgomery" :controleur='controleurObject' />

    </div>

    <!-- Vues section -->
    <div id="vues_disponibles">
      <h1>
        Available views
      </h1>
      <p id="avertissementVue">Please choose a view.</p>

      <div class="flexbox">
        <div id="vue2D" @click="setVue('vue2D')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>2D view</span>
        </div>

        <div id="vue3D" @click="setVue('vue3D')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>3D view</span>
        </div>

        <div id="vueFinie" @click="setVue('vueFinie')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Finite view</span>
        </div>

        <div id="vuePeriodique" @click="setVue('vuePeriodique')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Periodic view</span>
        </div>

        <div id="vuePerspective" @click="setVue('vuePerspective')">
          <!-- <span>...</span> -->
          <!-- <img class="material-icons filter-orange" src="images/chevron_right_black_24dp.svg" /> -->
          <span>Perspective view</span>
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
import { menuStore } from "@/stores/menu.js";
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
    const menuS = menuStore();
    return { graphS , menuS};
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
      this.graphS.destroy();
      this.openAbout();

      // hide the warning if the user selects a corps
      document.getElementById('avertissementCorps').style.display = "none";
      if (controleur.getCorps() == "Undefined") {
        document.getElementById('vues_disponibles').children[2].style.display = "block";
      }
      controleur.setCorps(value);
      controleur.setVue("Undefined");
      this.setVue("Undefined");

      // remove the selected class from all the menu items and add it to the selected one
      // also display the available vues for the selected corps
      document.getElementById("corps").children[1].childNodes.forEach((child) => {
        child.classList.remove("selected");
      });

      let availableVues = [];

      switch (value) {
        case "R":
          document.getElementById('container_curve-toggle').style.display = "none";
          document.getElementById("p_span").style.display = "none";
          document.getElementById("corps_reels").classList.add("selected");
          // undisable implemented vues on the select tag
          document.querySelector("#forme option[value='Weierstrass']").disabled = false;
          document.querySelector("#forme option[value='Montgomery']").disabled = false;
          document.querySelector("#forme option[value='Edwards']").disabled = false;
          availableVues = ["vue2D", "vue3D", "vuePerspective"];
          break;
        case "P":
          document.getElementById('container_curve-toggle').style.display = "block";
          document.getElementById("p_span").style.display = "block";
          document.getElementById("corps_modulo").classList.add("selected");
          // disable unimplemented vues on the select tag
          document.querySelector("#forme option[value='Weierstrass']").disabled = true;
          document.querySelector("#forme option[value='Montgomery']").disabled = true;
          document.querySelector("#forme option[value='Edwards']").disabled = true;
          availableVues = ["vueFinie", "vuePeriodique"];
          break;
      }

      // display the available vues for the selected corps
      document.getElementById('vues_disponibles').children[2].childNodes.forEach((child) => {
        if (availableVues.includes(child.id)) {
          child.style.display = "flex";
        } else {
          child.style.display = "none";
        }
      });

      document.getElementById('forme').value = "Undefined";
    },
    formeChange() {
      this.graphS.destroy();
      this.openAbout();
      // remove the selected class from all the menu items and add it to the selected one
      document.getElementById("vues_disponibles").children[2].childNodes.forEach((child) => {
          child.classList.remove("selected");
        });

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
        if(controleur.getForme() == "Short_Weierstrass"){
          if(controleur.getCorps() == "Modulo"){
            this.menuS.displayLaTeX('short-eq', 'y^2 \\underset{5}\\equiv  x^3 + 2x + 1');
            this.menuS.displayLaTeX('general-short-eq', 'y^2 \\underset{p}\\equiv  x^3 + ax + b');
            // The finite view is preselected
            this.setVue('vueFinie');
          }else{
            this.menuS.displayLaTeX('short-eq', `y^2 = x^3 + ${controleur.coefficients.a}x + ${controleur.coefficients.b}`);
            this.menuS.displayLaTeX('general-short-eq', 'y^2 = x^3 + ax + b');
          }
          this.menuS.displayLaTeX('discriminant-short-res', `~~~~~= ${-16 * (4 * controleur.coefficients.a ** 3 + 27 * controleur.coefficients.b ** 2)}`);
        }
        if(controleur.getCorps() == "Reels"){
          // The 2D view is preselected
          this.setVue('vue2D');
        }
      }
    },
    setVue(value) {
      if(value != "Undefined"){
        if (controleur.getForme() != "Undefined") {
          document.getElementById('avertissementVue').style.display = "none";
          controleur.setVue(value);

          // remove the selected class from all the menu items and add it to the selected one
          document.getElementById("vues_disponibles").children[2].childNodes.forEach((child) => {
            child.classList.remove("selected");
          });

          document.getElementById("calculator").textContent = "";

          switch (value) {
            case "vue2D":
              document.getElementById("vue2D").classList.add("selected");
              switch (controleur.getForme()){
                case "Weierstrass":
                  this.graphS.displayWeierstrass(
                    controleur.coefficients.a1,
                    controleur.coefficients.a3,
                    controleur.coefficients.a2,
                    controleur.coefficients.a4,
                    controleur.coefficients.a6,
                  );
                  this.graphS.showAddition(-2, 1);
                  break;
                case "Montgomery":
                  this.graphS.displayMontgomery(
                    controleur.coefficients.a,
                    controleur.coefficients.b,
                    controleur.coefficients.c,
                    controleur.coefficients.d,
                  );
                  this.graphS.showAddition(-2, 1);
                  break;
                case "Edwards":
                  this.graphS.displayEdwards(
                    controleur.coefficients.a,
                    controleur.coefficients.d,
                  );
                  this.graphS.showAddition(-2, 1);
                  break;
                case "Short_Weierstrass":
                  this.graphS.displayWeierstrass(
                    0,
                    0,
                    0,
                    controleur.coefficients.a,
                    controleur.coefficients.b
                  );
                  this.graphS.showAddition(2, 0);
                  break;
              }           
              break;
            case "vue3D":
              document.getElementById("vue3D").classList.add("selected");
              document.getElementById("calculator").textContent = "This view is not yet available.";
              break;
            case "vueFinie":
            document.getElementById("update_for_periodic").style.display = "none";
              this.graphS.displayShort(
                controleur.coefficients.a,
                controleur.coefficients.b,
                controleur.coefficients.p
              );
              //Required to add clickable points
              this.graphS.getGraph.addClickPoints();
              document.getElementById("vueFinie").classList.add("selected");
              break;
            case "vuePerspective":
              document.getElementById("vuePerspective").classList.add("selected");
              document.getElementById("calculator").textContent = "This view is not yet available.";
              break;
            case "vuePeriodique":
              document.getElementById("vuePeriodique").classList.add("selected");
              document.getElementById("update_for_periodic").style.display = "block";
              this.graphS.displayShortPeriodic(
                controleur.coefficients.a,
                controleur.coefficients.b,
                controleur.coefficients.p
              );
              this.graphS.getGraph.addClickPoints();
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
      }
      else{
        //set all parameters of isOpen to false
        for (var key in this.isOpen) {
          this.isOpen[key] = false;
        }
        document.getElementById('avertissementForme').style.display = "block";
        document.getElementById('avertissementVue').style.display = "block";
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
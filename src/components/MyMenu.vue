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
          <span>Real numbers</span>
        </div>

        <div id="corps_modulo" @click="setCorps('P')">
          <span>%</span>
          <span>Prime field of order p</span>
        </div>

      </div>
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
          <option value="ShortWeierstrass">Short Weierstrass</option>
          <option value="Weierstrass">Weierstrass</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Edwards">Edwards</option>
        </select>
      </h2>

      <p id="avertissementForme">Please choose a form.</p>

      <MenuShortWeierstrass v-show="isOpen.ShortWeierstrass" ref="ShortWeierstrass" :controleur='controleurReference' />
      <MenuWeierstrass v-show="isOpen.Weierstrass" ref="Weierstrass" :controleur='controleurReference' />
      <MenuEdwards v-show="isOpen.Edwards" ref="Edwards" :controleur='controleurReference' />
      <MenuMontgomery v-show="isOpen.Montgomery" ref="Montgomery" :controleur='controleurReference' />
    </div>

    <!-- Vues section -->
    <div id="vues_disponibles">
      <h1>
        Available views
      </h1>

      <p id="avertissementVue">Please choose a view.</p>

      <div class="flexbox">
        <div id="vue2D" @click="setVue('vue2D')">
          <span>2D view</span>
        </div>

        <div id="vue3D" @click="setVue('vue3D')">
          <span>3D view</span>
        </div>

        <div id="vueFinie" @click="setVue('vueFinie')">
          <span>Finite view</span>
        </div>

        <div id="vuePeriodique" @click="setVue('vuePeriodique')">
          <span>Periodic view</span>
        </div>

        <div id="vuePerspective" @click="setVue('vuePerspective')">
          <span>Perspective view</span>
        </div>

      </div>
    </div>

    <br>
    <!-- About section -->
    <a @click="openAbout()">
      <img class="material-icons filter-orange" src="images/info_black_24dp.svg" />
      <span class="icon-text">About Eliptic Explorer</span>
    </a>

  </div>
</template>


<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";
import MenuShortWeierstrass from "./menu/MenuShortWeierstrass.vue";
import MenuWeierstrass from "./menu/MenuWeierstrass";
import MenuMontgomery from "./menu/MenuMontgomery";
import MenuEdwards from "./menu/MenuEdwards";
import Controleur from "@/data/Controleur.js";

let controleur = new Controleur();

export default {
  name: "MyMenu",
  components: {
    MenuShortWeierstrass,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards
  },
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();
    return { graphS, menuS };
  },
  mounted() {
    this.setCorps('R');
  },
  data() {
    return {
      // the controleur object's reference
      controleurReference: controleur,
      // state list of the submenus (open or not) 
      isOpen: {
        about: false,
        Undefined: false,
        ShortWeierstrass: false,
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
    openAbout() {
      // hide graph and display "about-div"
      document.getElementById("graph-div").style.display = "none";
      document.getElementById("about-div").style.display = "inline";
    },
    // display on the graph the curve corresponding to the form and vue selected
    displayCurve(view, form) {
      switch (view) {
        case "vue2D":
          switch (form) {
            case "Weierstrass":
              this.graphS.displayWeierstrass(
                controleur.coefficients.a1,
                controleur.coefficients.a3,
                controleur.coefficients.a2,
                controleur.coefficients.a4,
                controleur.coefficients.a6,
              );
              this.graphS.showAddition(-2, 1); // show a random addition on the graph
              break;
            case "Montgomery":
              this.graphS.displayMontgomery(
                controleur.coefficients.a,
                controleur.coefficients.b,
                controleur.coefficients.c,
                controleur.coefficients.d,
              );
              this.graphS.showAddition(-2, 1); // show a random addition on the graph
              break;
            case "Edwards":
              this.graphS.displayEdwards(
                controleur.coefficients.a,
                controleur.coefficients.d,
              );
              this.graphS.showAddition(-2, 1); // show a random addition on the graph
              break;
            case "Short_Weierstrass":
              this.graphS.displayWeierstrass(
                0,
                0,
                0,
                controleur.coefficients.a,
                controleur.coefficients.b
              );
              this.graphS.showAddition(2, 0); // show a random addition on the graph
              break;
          }
          break;
        case "vue3D":
          document.getElementById("calculator").textContent = "This view is not yet available.";
          break;
        case "vueFinie":
          document.getElementById("update_for_periodic").style.display = "none";
          this.graphS.displayShort(
            controleur.coefficients.a,
            controleur.coefficients.b,
            controleur.coefficients.p
          );
          this.graphS.getGraph.addClickPoints(); // enable the click on the points
          break;
        case "vuePerspective":
          document.getElementById("calculator").textContent = "This view is not yet available.";
          break;
        case "vuePeriodique":
          document.getElementById("update_for_periodic").style.display = "block";
          this.graphS.displayShortPeriodic(
            controleur.coefficients.a,
            controleur.coefficients.b,
            controleur.coefficients.p
          );
          this.graphS.getGraph.addClickPoints(); // enable the click on the points
          break;
        default:
          console.log("Error: the value (" + view + ") is not a recognized view");
          break;
      }
    },
    setCorps(newCorps) { // set the corps in the controleur object and display the available vues
      let actualForm = controleur.getForme();

      this.graphS.destroy();
      this.openAbout();

      // close the actual form menu if it was open
      if (actualForm != "Undefined") {
        this.isOpen[actualForm] = false;
      }

      // set the new corps and vue in the controleur object
      controleur.setCorps(newCorps);
      controleur.setForme("Undefined");
      controleur.setVue("Undefined");


      // to highlight the right corps in the menu, remove the selected one and add the selected one depending the parameter 'newCorps'
      document.getElementById("corps").children[1].childNodes.forEach((child) => {
        child.classList.remove("selected");
      });

      let availableVues = [];

      switch (newCorps) {
        case "R":
          document.getElementById('container_curve-toggle').style.display = "none";
          document.getElementById("corps_reels").classList.add("selected");
          // enable implemented vues on the select tag
          document.querySelector("#forme option[value='Weierstrass']").disabled = false;
          document.querySelector("#forme option[value='Montgomery']").disabled = false;
          document.querySelector("#forme option[value='Edwards']").disabled = false;
          availableVues = ["vue2D", "vue3D", "vuePerspective"];
          break;
        case "P":
          document.getElementById('container_curve-toggle').style.display = "block";
          document.getElementById("corps_modulo").classList.add("selected");
          // disable unimplemented vues from the select input
          document.querySelector("#forme option[value='Weierstrass']").disabled = true;
          document.querySelector("#forme option[value='Montgomery']").disabled = true;
          document.querySelector("#forme option[value='Edwards']").disabled = true;
          availableVues = ["vueFinie", "vuePeriodique"];
          break;
      }

      // display the right vues in the menu depending the array 'availableVues'
      document.getElementById('vues_disponibles').children[2].childNodes.forEach((child) => {
        child.classList.remove("selected");
        child.style.display = availableVues.includes(child.id) ? "flex" : "none";
      });

      // The form input is by default set to "Undefined" when the corps is changed
      document.getElementById('forme').value = "Undefined";
    },
    formeChange() {
      let actualCorps = controleur.getCorps();
      let actualForm = document.getElementById('forme').value;
      let oldForm = controleur.getForme();
      let actualVue = controleur.getVue();

      controleur.setForme(actualForm);

      //if the form selected is not "Undefined", hide the warning
      document.getElementById('avertissementForme').style.display = actualForm == "Undefined" ? "block" : "none";

      // close the old form menu and open the new one
      this.isOpen[oldForm] = false;
      this.isOpen[actualForm] = true;

      if (actualForm == "Undefined") {
        this.openAbout();
      } else {
        // update the new form menu inputs value and latex display of the curve
        this.$refs[actualForm].updateAll()
        // if the vue is "Undefined", set the vue to the default one depending the corps
        if (actualVue == "Undefined") actualCorps == "Reels" ? this.setVue("vue2D") : this.setVue("vueFinie");
        else this.displayCurve(actualVue, actualForm); // else, refresh curve display
      }
    },
    setVue(newVue) {
      let actualForm = controleur.getForme();

      if (actualForm != "Undefined") {
        document.getElementById('avertissementVue').style.display = "none";
        controleur.setVue(newVue);

        // To highlight the selected vue, remove the 'selected' class from all and add it depending the parameter 'value'
        document.getElementById("vues_disponibles").children[2].childNodes.forEach((child) => {
          child.classList.remove("selected");
        });

        // if the previous vue was not implemented and the error message was displayed, reset it
        document.getElementById("calculator").textContent = "";
        document.getElementById(newVue).classList.add("selected");

        // display the graph
        document.getElementById("about-div").style.display = "none";
        document.getElementById("graph-div").style.display = "inline";

        this.displayCurve(newVue, actualForm);
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
}
</script>

<style lang="css" scoped>
@import "@/css/menu.css";
</style>
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
        <div id="realNumbers" @click="setCorps('R')">
          <span>R</span>
          <span>Real numbers</span>
        </div>

        <div id="moduloP" @click="setCorps('P')">
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
        <select name="form" id="form" @change="formChange()">
          <option value="Undefined" selected>Undefined</option>
          <option value="ShortWeierstrass">Short Weierstrass</option>
          <option value="Weierstrass">Weierstrass</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Edwards">Edwards</option>
        </select>
      </h2>

      <p id="warningForm">Please choose a form.</p>

      <MenuShortWeierstrass v-show="isOpen.ShortWeierstrass" ref="ShortWeierstrass" :controleur='controleurReference' />
      <MenuWeierstrass v-show="isOpen.Weierstrass" ref="Weierstrass" :controleur='controleurReference' />
      <MenuEdwards v-show="isOpen.Edwards" ref="Edwards" :controleur='controleurReference' />
      <MenuMontgomery v-show="isOpen.Montgomery" ref="Montgomery" :controleur='controleurReference' />
    </div>

    <!-- Views section -->
    <div id="availableViews">
      <h1>
        Available views
      </h1>

      <p id="warningView">Please choose a view.</p>

      <div class="flexbox">
        <div id="2DView" @click="setView('2DView')">
          <span>2D view</span>
        </div>

        <div id="3DView" @click="setView('3DView')">
          <span>3D view</span>
        </div>

        <div id="FiniteView" @click="setView('FiniteView')">
          <span>Finite view</span>
        </div>

        <div id="PeriodicView" @click="setView('PeriodicView')">
          <span>Periodic view</span>
        </div>

        <div id="PerspectiveView" @click="setView('PerspectiveView')">
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
import MenuShortWeierstrass from "./MenuShortWeierstrass";
import MenuWeierstrass from "./MenuWeierstrass";
import MenuMontgomery from "./MenuMontgomery";
import MenuEdwards from "./MenuEdwards";
import Controleur from "@/controleur/Controleur.js";

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
    // display on the graph the curve corresponding to the form and view selected
    displayCurve(view, form) {
      switch (view) {
        case "2DView":
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
            case "ShortWeierstrass":
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
        case "3DView":
          document.getElementById("calculator").textContent = "This view is not yet available.";
          break;
        case "FiniteView":
          document.getElementById("update_for_periodic").style.display = "none";
          this.graphS.displayShort(
            controleur.coefficients.a,
            controleur.coefficients.b,
            controleur.coefficients.p
          );
          this.graphS.getGraph.addClickPoints(); // enable the click on the points
          break;
        case "PerspectiveView":
          document.getElementById("calculator").textContent = "This view is not yet available.";
          break;
        case "PeriodicView":
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
    setCorps(newCorps) { // set the corps in the controleur object and display the available views
      let actualForm = controleur.getForm();

      this.graphS.destroy();
      this.openAbout();

      // close the actual form menu if it was open
      if (actualForm != "Undefined") this.isOpen[actualForm] = false;

      // set the new corps and view in the controleur object
      controleur.setCorps(newCorps);
      controleur.setForm("Undefined");
      controleur.setView("Undefined");

      // to highlight the right corps in the menu, remove the selected one and add the selected one depending the parameter 'newCorps'
      document.querySelector('#corps .flexbox').childNodes.forEach((child) => {
        child.classList.remove("selected");
      });

      let availableViews = [];

      switch (newCorps) {
        case "R":
          //set display none to all tags with the class "container_curve-toggle"
          document.querySelectorAll(".container_curve-toggle").forEach((element) => {
            element.style.display = "none";
          });
          document.getElementById("realNumbers").classList.add("selected");
          // enable implemented views on the select tag
          document.querySelector("#form option[value='Weierstrass']").disabled = false;
          document.querySelector("#form option[value='Montgomery']").disabled = false;
          document.querySelector("#form option[value='Edwards']").disabled = false;
          availableViews = ["2DView", "3DView", "PerspectiveView"];
          break;
        case "P":
          document.getElementById("moduloP").classList.add("selected");
          // disable unimplemented views from the select input
          document.querySelector("#form option[value='Weierstrass']").disabled = true;
          document.querySelector("#form option[value='Montgomery']").disabled = true;
          document.querySelector("#form option[value='Edwards']").disabled = true;
          availableViews = ["FiniteView", "PeriodicView"];
          break;
      }

      // display the right views in the menu depending the array 'availableViews'
      document.querySelector('#availableViews .flexbox').childNodes.forEach((child) => {
        child.classList.remove("selected");
        child.style.display = availableViews.includes(child.id) ? "flex" : "none";
      });

      // The form input is by default set to "Undefined" when the corps is changed
      document.getElementById('form').value = "Undefined";
    },
    formChange() {
      let actualCorps = controleur.getCorps();
      let actualForm = document.getElementById('form').value;
      let oldForm = controleur.getForm();
      let actualView = controleur.getView();

      controleur.setForm(actualForm);

      //if the form selected is not "Undefined", hide the warning
      document.getElementById('warningForm').style.display = actualForm == "Undefined" ? "block" : "none";

      // close the old form menu and open the new one
      this.isOpen[oldForm] = false;
      this.isOpen[actualForm] = true;

      if (actualForm == "Undefined") {
        this.openAbout();
      } else {
        // update the new form menu inputs value and latex display of the curve
        this.$refs[actualForm].updateAll()
        // if the view is "Undefined", set the view to the default one depending the corps
        if (actualView == "Undefined") actualCorps == "Reels" ? this.setView("2DView") : this.setView("FiniteView");
        else this.displayCurve(actualView, actualForm); // else, refresh curve display
      }
    },
    setView(newView) {
      let actualForm = controleur.getForm();

      if (actualForm != "Undefined") {
        document.getElementById('warningView').style.display = "none";
        controleur.setView(newView);

        // To highlight the selected view, remove the 'selected' class from all and add it depending the parameter 'value'
        document.querySelector('#availableViews .flexbox').childNodes.forEach((child) => {
          child.classList.remove("selected");
        });

        // if the previous view was not implemented and the error message was displayed, reset it
        document.getElementById("calculator").textContent = "";
        document.getElementById(newView).classList.add("selected");

        // display the graph
        document.getElementById("about-div").style.display = "none";
        document.getElementById("graph-div").style.display = "inline";

        this.displayCurve(newView, actualForm);
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
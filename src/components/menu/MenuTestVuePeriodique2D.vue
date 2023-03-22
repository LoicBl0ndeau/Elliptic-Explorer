<template>
    <div class="submenu">
        <h3 class="section">Test</h3>
    </div>
  </template>
  
  <script>
  import { graphStore } from "@/stores/graph.js";
  import { menuStore } from "@/stores/menu";

  export default {
    name: "TestVuePeriodique2D",
    setup() {
      const graphS = graphStore();
      const menuS = menuStore();
  
      return { graphS, menuS };
    },
    mounted() {
      this.displayDefaultCurve();
    },
    methods: {
      displayDefaultCurve() {

        // TO DO: add a function to display the 2D periodic curve in graph.js

        // testing the display of a curve temporarily
        this.graphS.displayShort(2,1,5);
      },
    },
  };
  </script>
  
  <style lang="css" scoped >
      @import "@/css/submenu.css";
  </style>
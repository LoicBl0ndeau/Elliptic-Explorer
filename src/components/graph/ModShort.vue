<template>
    <div id="calculator" ></div>
</template>

<script>
import { ShortWeierstrass } from '@/app/math/ShortWeierstrass.js';
import { getCoord } from '@/app/math/ShortWeierstrass.js';

export default {
  name: "ModularWeierstrass",
  mounted() {

    let graphMod = new ShortWeierstrass("calculator", 2, 1, 5);

    graphMod.findAllPoints();
    graphMod.findCoordPoints();

    graphMod.displayPoints();
    graphMod.addClickPoints();

    window.setInterval(function(){
      console.log(JSON.stringify(graphMod.selectedPoints));
      let point1 = graphMod.newPoint(graphMod.selectedPoints[0][0], graphMod.selectedPoints[0][1]);
      let point2 = graphMod.newPoint(graphMod.selectedPoints[1][0], graphMod.selectedPoints[1][1]);
      console.log(getCoord(graphMod.addPoints(point1, point2)));
    }, 1000)

    } 
};

</script>

<style scoped>
#calculator {
  width: 100%;
  height: 90%;
}
</style>
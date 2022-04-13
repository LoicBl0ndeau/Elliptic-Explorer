<template>
    <div id="calculator" ></div>
</template>

<script>
import { ShortWeierstrass } from '@/app/math/ShortWeierstrass.js';
//import { getCoord } from '@/app/math/ShortWeierstrass.js';

export default {
  name: "ModularWeierstrass",
  mounted() {

    let graphMod = new ShortWeierstrass("calculator", 2, 1, 5);

    graphMod.findAllPoints();
    graphMod.findCoordPoints();

    graphMod.displayPoints();
    let point1 = [3,3];
    let point2 =[0,4];
    var lignes =5;
    var modulo=5;

    graphMod.calculator.setExpressions([
      { id: `l`, latex: `l=${lignes}` },
      { id: `m`, latex: `m=${modulo}` },
      { id: `L`, latex: `L=\\left[\\frac{m}{2}i\\operatorname{for}i=\\left[-\\frac{lm}{2}...\\frac{lm}{2}\\right]\\right]` },
      { id: `x_{8}`, latex: `x_{8}=${point1[0]}` },
      { id: `y_{8}`, latex: `y_{8}=${point1[1]}` },
      { id: `x_{9}`, latex: `x_{9}=${point2[0]}` },
      { id: `y_{9}`, latex: `y_{9}=${point2[1]}` },
      { id: `a`, latex: `a=(y_{2}-y_{1})`},
      { id: `b`, latex: `b=(x_{1}-x_{2})`},
      { id: `c`, latex: `c=((x_{1}+L)y_{2}-(x_{2}+L)y_{1})`},
      { id: `e`, latex: `(ax+by)=c \\left\\{0<x<m\\right\\}\\ \\left\\{0<y<m\\right\\}` },
    ]);

    window.setInterval(function(){
      console.log(graphMod.calculator.getExpressions())
    }, 5000);  

    /*graphMod.addClickPoints();
 
    window.setInterval(function(){
      console.log(JSON.stringify(graphMod.selectedPoints));
      let point1 = graphMod.newPoint(graphMod.selectedPoints[0][0], graphMod.selectedPoints[0][1]);
      let point2 = graphMod.newPoint(graphMod.selectedPoints[1][0], graphMod.selectedPoints[1][1]);
      console.log(getCoord(graphMod.addPoints(point1, point2)));
    }, 1000)*/

    } 
};

</script>

<style scoped>
#calculator {
  width: 100%;
  height: 90%;
}
</style>
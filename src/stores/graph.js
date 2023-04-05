/**
 * This file is a vuejs Store using Pinia library.
 * It enables components or any other file in this project to :
 *  - import and use the methods defined in this file
 *  - read and write the declared variables (state) in this file
 */


import { defineStore } from 'pinia'
import { Graphic } from '@/app/graph/GraphicalInterface.js';

import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";
import { MontgomeryGraph } from "@/app/graph/supported_curves_on_R/montgomery/MontgomeryGraph.js";
import { EdwardsCurve } from "@/app/graph/supported_curves_on_R/edwards/EdwardsCurve.js";
import { ShortWeierstrass } from '@/app/math/ShortWeierstrass.js';

export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut, aucun graphique initialement dans le store
    graph: null,
  }),
  getters: {
    getGraph: state => state.graph
  },
  actions: {
    /**
     * Displays graph of the curve :
     * Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6
     * 
     * The following HTML code must be in web page:
     * \<div id="calculator">\</div>
     * 
     * @param {number} a1
     * @param {number} a3
     * @param {number} a2
     * @param {number} a4 
     * @param {number} a6 
     */
    displayWeierstrass(a1, a3, a2, a4, a6) {
      // verifie si un graphique est déjà tracé sur la page, si oui l'efface
      if (this.graph != null) {
        this.destroy();
      }
      // création du nouveau graphique
      this.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
      this.graph.showCurve();
    },
    /** 
     * Displays graph of the curve :
     * By^2 = x^3+ Ax^2 + x
     * 
     * The following HTML code must be in web page:
     * \<div id="calculator">\</div>
     * 
     * @param {number} a 
     * @param {number} b 
     * */
    displayMontgomery(a, b) {
      if (this.graph != null)
        this.destroy();
      this.graph = new MontgomeryGraph("calculator", a, b);
      this.graph.showCurve();
    },
    /**
     * Displays graph of the curve :
     * x^2 + y^2 = c^2 (1+ d*x^2*y^2)
     * 
     * The following HTML code must be in web page:
     * \<div id="calculator">\</div>
     * 
     * @param {number} c
     * @param {number} d
     */
    displayEdwards(c, d) {
      if (this.graph != null)
        this.destroy();
      this.graph = new EdwardsCurve("calculator", c, d);
      this.graph.showCurve();
    },
    /**
     * Construct the curve with equation y^2 = x^3 + ax + b mod p
     * 
     * The following HTML code must be in web page:
     * \<div id="calculator">\</div>
     * 
     * @param {integer ou string} a first parameter
     * @param {integer ou string} b second parameter
     * @param {integer ou string} p modulo
     */
    displayShort(a, b, p) {
      if (this.graph != null)
        this.destroy();
      this.graph = new ShortWeierstrass("calculator", a, b, p);
      this.graph.findAllPoints();
      this.graph.displayPoints();
    },
    // common methods for all graphs ===============================================
    /**
     * get value of an expression in the expressions list in desmosApi graph
     * 
     * @param {string} exp expression ("a_{1}", "x_{2}", "D", etc...)
     * @see {@link src\app\graph\GraphicalInterface.js} for further information
     */
    getExpValue(exp) {
      return this.graph.getValueOfParameter(exp);
    },
    /**
     * set value of an expression in the expressions list in desmosApi graph
     * 
     * @param {string} exp expression ("a_{1}", "x_{2}", "D", etc...)
     * @see {@link src\app\graph\GraphicalInterface.js} for further information
     */
    setExpValue(exp, value) {
      this.graph.setValueOfParameter(exp, value);
    },
    /**
     * See official DesmosApi calculator.destroy() method documentation.
     */
    destroy() {
      this.graph.calculator.destroy();
    },
    /**
     * Displays the addition of two points P and Q, namely
     * the line (PQ), the intersect between (PQ) & the elliptic
     * curve, the opposite of this point (= the result of P+Q).
     * 
     * @param {number} xP abscissa of point P
     * @param {number} xQ abscissa of point Q
     */
    showAddition(xP, xQ) {
      let id1 = this.graph.addCurvePoint(xP);
      this.graph.setExpressionParameters(`p_{1}`, { label: `P` })
      let id2 = this.graph.addCurvePoint(xQ);
      this.graph.setExpressionParameters(`p_{2}`, { label: `Q` })
      this.graph.showAdditionOfPoints(id1, id2);
      this.graph.setExpressionParameters(`p_{3}`, { label: `P+Q`, color: Graphic.Colors.finalPoint })
      this.graph.showLabels(true);
    },
    /**
     * Displays steps to perform P times k.
     * 
     * @param {number} xP abscissa of point P
     * @param {number} k factor, must be greater than 2.
     */
    showMul(xP, k) {
      if (k < 2) return;
      let id1 = this.graph.addCurvePoint(xP);
      this.graph.setExpressionParameters(`p_{1}`, { label: `P` })
      this.graph.showDoublingPoint(id1);
      this.graph.setExpressionParameters(`p_{2}`, { label: `2*P` })
      for (let i = 2; i < k; i++) {
        this.graph.showAdditionOfPoints(id1, i);
        this.graph.setExpressionParameters(`p_{${i + 1}}`, { label: `${i + 1}*P` })
      }
      this.graph.setExpressionParameters(`p_{${k}}`, { color: Graphic.Colors.finalPoint })
      this.graph.showLabels(true);
    },
    /**
     * Each x abscissa on a curve has 2 ordinates.
     * For a given point id on the graph, this function
     * switch Point ordinate between these 2 ordinates.
     * 
     * @param {number} pointId subscript of point
     */
    switchPointOrdinate(pointId) {
      let actualY = this.graph.getValueOfParameter(`y_{${pointId}}`);
      let negY = this.graph.getValueOfParameter(`y_{n${pointId}}`);
      let newY = null;
      if (actualY == negY) {
        newY = `y_{p${pointId}}`;
      }
      else {
        newY = `y_{n${pointId}}`;
      }
      this.graph.setValueOfParameter(`y_{${pointId}}`, newY)
    },
    displayLines(bool) {
      this.graph.showLines(bool);
    },
    displayLabels(bool) {
      this.graph.showLabels(bool);
    },
    displaySegments(bool) {
      this.graph.showSegments(bool);
    },
  }
});
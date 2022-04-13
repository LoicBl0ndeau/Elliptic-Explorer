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
    displayWeierstrass(a1, a3, a2, a4, a6) {
      // verifie si un graphique est déjà tracé sur la page, si oui l'efface
      if (this.graph != null) {
        this.destroy();
      }
      // création du nouveau graphique
      this.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
      this.graph.showCurve();
    },
    displayMontgomery(a, b) {
      if (this.graph != null)
        this.destroy();
      this.graph = new MontgomeryGraph("calculator", a, b);
      this.graph.showCurve();
    },
    displayEdwards(c, d) {
      if (this.graph != null)
        this.destroy();
      this.graph = new EdwardsCurve("calculator", c, d);
      this.graph.showCurve();
    },
    displayShort(a, b, p) {
      if (this.graph != null)
        this.destroy();
      this.graph = new ShortWeierstrass("calculator", a, b, p);
      this.graph.findAllPoints();
      this.graph.findCoordPoints();
      this.graph.displayPoints();
    },
    getExpValue(exp) {
      return this.graph.getValueOfParameter(exp);
    },
    setExpValue(exp, value) {
      this.graph.setValueOfParameter(exp, value);
    },
    destroy() {
      this.graph.calculator.destroy();
    },
    showAddition(xP, xQ) {
      let id1 = this.graph.addCurvePoint(xP);
      this.graph.setExpressionParameters(`p_{1}`, { label: `P` })
      let id2 = this.graph.addCurvePoint(xQ);
      this.graph.setExpressionParameters(`p_{2}`, { label: `Q` })
      this.graph.showAdditionOfPoints(id1, id2);
      this.graph.setExpressionParameters(`p_{3}`, { label: `P+Q`, color: Graphic.Colors.finalPoint })
      this.graph.showLabels(true);
    },
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
    }
  }
});
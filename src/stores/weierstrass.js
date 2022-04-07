import { defineStore } from 'pinia'

import { graphStore } from './graph.js'

import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";
import { Graphic } from '@/app/graph/GraphicalInterface.js';

export const weierstrassStore = defineStore('weierstrassGraph', {
    actions: {
        create(a1, a3, a2, a4, a6) {
            const graphS = graphStore();

            // verifie si un graphique est déjà tracé sur la page, si oui l'efface
            if (graphS.graph != null) {
                graphS.destroy();
            }
            // création du nouveau graphique
            graphS.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
            graphS.graph.showCurve();
        },
        showAddition() {
            const graphS = graphStore();

            let id1 = graphS.graph.addCurvePoint(0);
            graphS.graph.setExpressionParameters(`p_{1}`,{label:`P`})
            let id2 = graphS.graph.addCurvePoint(2);
            graphS.graph.setExpressionParameters(`p_{2}`,{label:`Q`})
            graphS.graph.showAdditionOfPoints(id1, id2);
            graphS.graph.setExpressionParameters(`p_{3}`,{label:`P+Q`,color:Graphic.Colors.finalPoint})
            graphS.graph.showLabels(true);
        },
        showMul(xPos, k) {
            const graphS = graphStore();

            if (k < 2) return;
            let id1 = graphS.graph.addCurvePoint(xPos);
            graphS.graph.setExpressionParameters(`p_{1}`,{label:`P`})
            graphS.graph.showDoublingPoint(id1);
            graphS.graph.setExpressionParameters(`p_{2}`,{label:`2*P`})
            for (let i = 2; i < k; i++) {
                graphS.graph.showAdditionOfPoints(id1, i);
                graphS.graph.setExpressionParameters(`p_{${i+1}}`,{label:`${i+1}*P`})
            }
            graphS.graph.setExpressionParameters(`p_{${k}}`,{color:Graphic.Colors.finalPoint})
            graphS.graph.showLabels(true);
        },
    }
});
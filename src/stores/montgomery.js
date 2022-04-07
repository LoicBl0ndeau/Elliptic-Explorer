import { defineStore } from 'pinia'

import { graphStore } from './graph.js'

import { MontgomeryGraph } from "@/app/graph/supported_curves_on_R/montgomery/MontgomeryGraph.js";
import { Graphic } from '@/app/graph/GraphicalInterface.js';

export const montgomeryStore = defineStore('montgomery', {
    actions: {
        create(a, b) {
            const graphS = graphStore();

            if (graphS.graph != null)
                graphS.destroy();
            graphS.graph = new MontgomeryGraph("calculator", a, b);
            graphS.graph.showCurve();
        },
        showAddition() {
            const graphS = graphStore();

            let id1 = graphS.graph.addCurvePoint(1);
            graphS.graph.setExpressionParameters(`p_{1}`,{label:`P`})
            let id2 = graphS.graph.addCurvePoint(2);
            graphS.graph.setExpressionParameters(`p_{2}`,{label:`Q`})
            graphS.graph.showAdditionOfPoints(id1, id2);
            graphS.graph.setExpressionParameters(`p_{3}`,{label:`P+Q`,color:Graphic.Colors.finalPoint})
            graphS.graph.showLabels(true);
        },
        showDouble() {
            const graphS = graphStore();

            let id1 = graphS.graph.addCurvePoint(1);
            graphS.graph.setExpressionParameters(`p_{1}`,{label:`P`})
            graphS.graph.showDoublingPoint(id1);
            graphS.graph.setExpressionParameters(`p_{2}`,{label:`2*P`,color:Graphic.Colors.finalPoint})
            graphS.graph.showLabels(true);
        },
    }
});
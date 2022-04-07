import { defineStore } from 'pinia'

import { graphStore } from './graph.js'

import { MontgomeryGraph } from "@/app/graph/supported_curves_on_R/montgomery/MontgomeryGraph.js";

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

            let id1 = graphS.graph.addCurvePoint(-1);
            let id2 = graphS.graph.addCurvePoint(2);
            graphS.graph.showAdditionOfPoints(id1, id2);
        },
        showDouble() {
            const graphS = graphStore();

            let id1 = graphS.graph.addCurvePoint(0);
            graphS.graph.showDoublingPoint(id1);
        },
    }
});
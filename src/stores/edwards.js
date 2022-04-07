import { defineStore } from 'pinia'

import { graphStore } from './graph.js'

import { EdwardsCurve } from "@/app/graph/supported_curves_on_R/edwards/EdwardsCurve.js";

export const edwardsStore = defineStore('edwards', {
    actions: {
        create(c, d) {
            const graphS = graphStore();

            if (graphS.graph != null)
                graphS.destroy();
            graphS.graph = new EdwardsCurve("calculator", c, d);
            graphS.graph.showCurve();
        },
        showAddition() {
            const graphS = graphStore();

            let id1 = graphS.graph.addCurvePoint(0);
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
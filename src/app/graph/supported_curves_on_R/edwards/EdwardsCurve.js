import { Graphic, RealCurveGraph } from "../../GraphicalInterface.js";

/* Class representing a real Edwards elliptic curve*/
export class EdwardsCurve extends RealCurveGraph {
    /**
     *x^2 + y^2 = c^2 (1+ d*x^2*y^2)
     @constructor
     @param {string} element
     @param {number} c
     @param {number} d
     */
    constructor(element, c, d) {
        if (typeof (c) != "number" || typeof (d) != "number") {
            throw new Error("All coefficients must be a number type.");
        }
        if (d == 0 || d == 1) {
            throw new Error("This d value can not be select")
        }
        if (c * d * (1 - c ^ 4 * d) == 0) {
            throw new Error("You have to choose an other d or c value")
        }
        super(element)
        this.c = c;
        this.d = d;
        this.calculator.updateSettings({
            polarMode: true,
        });
    }

    // fonction to plot Edwards curve

    showCurve() {
        this.calculator.setExpressions([
            { id: 'C', latex: `C=${this.c}`, sliderBounds: { min: 0, max: "" } },
            { id: 'D', latex: `D=${this.d}`, sliderBounds: { min: "", max: 0 } },
            { id: 'curve_{1}', latex: 'x^2 + y^2 = C^2(1+ D*x^2*y^2)', color: Graphic.Colors.curve }
        ])
        this.saveGraphicState();
    }

    /**
     * add a point on the curve knowing its x position on the graph
     * @param {number} xPos
     * @return {number} return the id of the point created
     */
    addCurvePoint(xPos) {
        this.pointId++;
        this.addCurvePointInExpressions(
            xPos,
            `\\sqrt{\\frac{(x_{${this.pointId}}^{2}/C^{2})-1}{Dx_{${this.pointId}}^{2}-(1/C^{2})}}`,
            `-y_{p${this.pointId}}`);
        this.setExpressionParameters(`x_{${this.pointId}}`, { sliderBounds: { min: "-C", max: "C" } });
        this.addSegment([`x_{${this.pointId}}`, `0`], [`y_{${this.pointId}}`, `0`]);
        return this.pointId;
    }

    /**
     * shows the addition of two point given their id
     *
     * @param {number} idP - The id of the first point 
     * @param {number} idQ - The id of the second point  
     * @return {number} return the id of the point created
     * @return {number} return the id of line created 
     * @return {number} return the id of the segment created
     **/
    showAdditionOfPoints(idP, idQ) {
        this.pointId++;

        this.calculator.setExpressions([
            { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=\\frac{x_{${idP}}y_{${idQ}}+x_{${idQ}}y_{${idP}}}{C(1+Dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}})}` },
            { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=\\frac{y_{${idP}}y_{${idQ}}-x_{${idP}}x_{${idQ}}}{C(1-Dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}})}` },
            { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: Graphic.Colors.point, pointSize: 15 },
        ]);

        this.addSegment([`x_{${this.pointId}}`, `0`], [`y_{${this.pointId}}`, `0`]);
        return this.pointId, this.lineId, this.segmentId;
    }

    /**
     * shows the double of a point given his id
     *
     * @param {number} idP - The id of the first point 
     * @return {number} return the id of the point created
     * @return {number} return the id of line created 
     * @return {number} return the id of the segment created
    **/
    showDoublingPoint(idP) {
        return this.showAdditionOfPoints(idP,idP)
    }

    /**
     * shows the multiplication of two point given their id
     *
     * @param {number} idP - The id of the first point 
     * @param {number} mul - The factor of multiplication 
     * @return {number} return the id of the point created
     * @return {number} return the id of line created 
     * @return {number} return the id of the segment created
     **/
     showMultiplicationOfPoint(idP, mult){
        this.pointID++;

        let idQ = idP;

        for (let i=0; i<mult-1; i++){

        this.calculator.setExpressions([
            { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=\\frac{x_{${idP}}y_{${idQ}}+x_{${idQ}}y_{${idP}}}{c(1+dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}})}` },
            { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=\\frac{y_{${idP}}y_{${idQ}}-x_{${idP}}x_{${idQ}}}{c(1-dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}})}` },
            { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
        ]);

        this.addSegment([`x_{${this.pointId}}`, `0`], [`y_{${this.pointId}}`, `0`]);

        idQ= this.pointID;

        
        }
        return this.pointId, this.lineId, this.segmentId;
    }

}
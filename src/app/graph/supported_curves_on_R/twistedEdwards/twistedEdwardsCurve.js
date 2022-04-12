import { RealCurveGraph } from "../../GraphicalInterface.js";

/* Class representing a real twisted Edwards elliptic curve*/
export class twistedEdwardsCurve extends RealCurveGraph {
      /**
     *a*x^2 + y^2 = 1+ d*x^2*y^2
     @constructor
     @param {string} element
     @param {number} a
     @param {number} d
     */

     constructor(element,a,d){
        if (typeof (a) != "number" || typeof (d) != "number") {
            throw new Error("All coefficients must be a number type.");
        }
        if ((a==0) || (d==0)){
            throw new Error("a and d can not be nul.");
        }
        super(element)
        this.a = a;
        this.d = d;
        this.calculator.updateSettings({
          polarMode: true,
        });
     }

      // fonction to plot a twisted Edwards curve

    showCurve() {
        this.calculator.setExpressions([
            { id: 'a', latex: `a=${this.a}`, sliderBounds:{min: 0, max: ""}},
            { id: 'd', latex: `d=${this.d}`, sliderBounds:{min: "", max: 0} },
            { id: 'curve_{1}', latex: `a*x^2 + y^2 = 1+ d*x^2*y^2` }
        ])
        this.saveGraphicState();
    }

     /**
     * add a point on the curve knowing its x position on the graph
     * @param {number} xPos
     * @return {number} return the id of the point created
     */
      addCurvePoint(xPos){
        this.pointId++;
        this.calculator.setExpressions([
            { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=${xPos}`},
            { id: `y_{p${this.pointId}}`, latex: `y_{p${this.pointId}}=sqrt(frac{a*x_{${this.pointId}}^{2}-1}{d*x_{${this.pointId}}^{2}-1})` },
            { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=-y_{p${this.pointId}}` },
            { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=y_{p${this.pointId}}` },
            { id: `p_{${this.pointId}}`, latex: `(x_{${this.pointId}},y_{${this.pointId}})` }
          ]);

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
    showAdditionOfPoints(idP, idQ){
        this.pointId++;

        this.calculator.setExpressions([
            { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=\\frac{x_{${idP}}y_{${idQ}}+x_{${idQ}}y_{${idP}}}{1+dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}}}` },
            { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=\\frac{y_{${idP}}y_{${idQ}}-a*x_{${idP}}x_{${idQ}}}{1-dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}}}` },
            { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
        ]);

        
        this.addSegment([`x_{${this.pointId}}`, `0`], [`y_{${this.pointId}}`, `0`]);
        return this.pointId, this.lineId, this.segmentID;
    }



    /**
     * shows the multiplication of two point given their id
     *
     * @param {number} idP - The id of the first point 
     * @param {number} mult - The factor of multiplication  
     * @return {number} return the id of the point created 
     * @return {number} return the id of line created 
     * @return {number} return the id of the segment created 
     **/
    showMultiplicationOfPoints(idP, mult){
        this.pointId++;

        let idQ = idP;

        for (let i=0; i<mult-1; i++){

            this.calculator.setExpressions([
                {id: `x_{${this.pointId}}`, latex:`x_{${this.pointId}}=\\frac{x_{${idP}}y_{${idQ}}+x_{${idQ}}y_{${idP}}}{1+dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}}}`},
                {id: `y_{${this.pointID}}`, latex: `y_{${this.pointId}}=\\frac{y_{${idP}}y_{${idQ}}-a*x_{${idP}}x_{${idQ}}}{1-dx_{${idP}}x_{${idQ}}y_{${idP}}y_{${idQ}}}`},
                { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
            ]);

            this.addSegment([`x_{${this.pointId}}`, `0`], [`y_{${this.pointId}}`, `0`]);

            idQ= this.pointID;
        }
        return this.pointId, this.lineId, this.segmentID;
    }


}
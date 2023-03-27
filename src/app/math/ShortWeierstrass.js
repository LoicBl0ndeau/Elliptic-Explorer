import elliptic from 'elliptic';
import BN from 'bn.js';
import { Graphic, ModCurveGraph } from '../graph/GraphicalInterface.js';

/**
 * Get the coordinates of a point in the form [x, y]
 * @param {Point} point point
 * @returns {Array} the x y coordinates of the point in the form [x, y] with x and y integers
 */
export function getCoord(point) {
    if (point.inf)
        return [null, null];
    return [point.x.words[0], point.y.words[0]];
}

export class ShortWeierstrass extends ModCurveGraph {

    /**
     * Construct the curve with equation y^2 = x^3 + ax + b mod p
     * @param {string} element The ID of the HTML element where the calculator will be.
     * @param {integer ou string} a first parameter
     * @param {integer ou string} b second parameter
     * @param {integer ou string} p modulo
     */
    constructor(element, a, b, p) {
        super(element, p);
        while (a < 0) {
            a = a + p;
        }
        while (b < 0) {
            b = b + p;
        }
        this.param = {
            a: a,
            b: b,
        }
        this.shortWcurve = new elliptic.curve.short({ ...this.param, ...{ p } });
        this.listPoints = [];
    }




    /**
     * Create the point with coordinates (x, y) from the curve (the point is linked to the curve)
     * @param {integer || string} x x-coordinate
     * @param {integer || string} y y-coordinate
     * @returns {Point} point
     */
    newPoint(x, y) { //ATTENtion ici
        let p = this.p;
        while (x < -p/2) {
            x = x + p;
        }
        while (y < -p/2) {
            y = y + p;
        }
        console.log(x,y);
        //Create a point on the shortW curve
        return this.shortWcurve.point(x, y, true);
    }

    /**
     * Get the coordinates of a point in the form [x, y]
     * @param {Point} point point
     * @returns {Array} the x y coordinates of the point in the form [x, y] with x and y integers
     */
    getCoord(point) {
        let p = this.p;
        if (point.inf)
            return [0, 1.5*p/2 + 0.5];
        return [point.x.words[0], point.y.words[0]];
    }


    /**
     * To know if a point belongs to the curve
     * @param {Point} P 
     * @returns {boolean} true if the point belongs to the curve, false otherwise
     */
    isPointOnCurve(P) {
        return this.shortWcurve.validate(P);
    }

    /**
     * Knowing if two points are equal
     * @param {Point} P 
     * @param {Point} Q 
     * @returns {boolean} true if P = Q
     */
    equalPoints(P, Q) {
        return (P.eq(Q));
    }


    /**
     * Add two points
     * @param {Point} P point on curve
     * @param {Point} Q point on curve
     * @returns {Point} Point resulting from the addition P+Q
     */
    addPoints(P, Q) {
        return (P.add(Q));
    }


    /**
     * Multiply P by k
     * @param {Point} P point on curve
     * @param {integer} k factor
     * @returns {Point} Resulting point of k*P
     */
    mulPoints(P, k) {
        if (k == 2) {
            return (P.dbl());
        }
        return (P.mul(k))
    }

    /**
     * The second point is subtracted from the first
     * @param {Point} P point on curve
     * @param {Point} Q point on curve
     * @returns {Point} Resulting point of P-Q 
     */
    subPoints(P, Q) {
        return (P.add(Q.neg()));
    }

    /**
     * 
     * @param {Point} P point on curve
     * @param {Point} Q point on curve
     * @param {integer} k1 factor
     * @param {integer} k2 factor
     * @returns {Point} Resulting point of k1P + k2Q 
     */
    linearCombination(P, Q, k1, k2) {
        k1 = new BN(k1, 16)
        k2 = new BN(k2, 16)
        return (P.mulAdd(k1, Q, k2));
    }


    /**
     * Find the multiple n such that nP = Q
     * @param {Point} P point on curve
     * @param {Point} Q point on curve
     * @returns {integer} the multiple n such that nP = Q
     */
    findMultiple(P, Q) {
        if (P.eq(Q)) {
            return 1;
        }
        var n = 2;
        while (!P.mul(n).eq(Q) && !P.mul(n).eq(P)) {
            n = n + 1;
        }
        if (P.mul(n).eq(P)) {
            return "Pas de multiple";
        }
        return n;
    }

    /**
     * Find all the points of the curve and put them in a list
     */
    findAllPoints() {
        let a = this.param.a;
        let b = this.param.b;
        let p = this.p;
        let listPoints = this.listPoints;
        var calculx;
        var calculy;
        var screenSize = Math.round(p/2);
        for (var y = -screenSize; y < screenSize; y++) {
            calculy = (Math.pow(y, 2)) % p;
            for (var x = -screenSize; x < screenSize; x++) {
                calculx = (Math.pow(x, 3) + (a * x) + b) % p;
                if (calculy == calculx) {
                    listPoints.push(this.newPoint(x, y));
                }
            }
        }
        listPoints.push(this.newPoint(null, null));
        console.log("ah");
        console.log(listPoints);
        listPoints.forEach(item => {
            console.log("b!");
            console.log(this.getCoord(item));
            //console.log(item.x.words,item.y.words);
        });

    }

    /**
     * Transform the list of points into a list of point coordinates
     */
    findCoordPoints() {
        let listPoints = this.listPoints;
        let listCoordPoints = this.listCoordPoints;
        listPoints.forEach(item => {
            listCoordPoints.push(this.getCoord(item));
        });
        console.log(listCoordPoints);
    }

    /**
     * Find the additive order of the point P
     * @param {Point} P point on curve
     * @returns {integer} additive order of point P
     */
    findAdditiveOrder(P) {
        var n = 2;
        while (!P.mul(n).eq(P.neg()) && !P.mul(n).eq(P)) {
            n = n + 1;
        }
        if (P.mul(n).eq(P)) {
            return 2;
        }
        return n + 1;
    }

    /**
     * Display lines of the modulo on a square of modulo x modulo
     */
    displayModulo() {
        var modulo = this.p;
        var lignes =5;
        try {
            this.calculator.setExpressions([
                { id: `m`, latex: `m=${modulo}` },
                { id: `l`, latex: `l=${lignes}` },
                { id: `L_{1}`, latex: `L_{1}=[m\\frac{b}{a}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `L_{2}`, latex: `L_{2}=[\\frac{m}{2}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `a`, latex: `a=(y_{${this.idSelectedPoints[1]}}-y_{${this.idSelectedPoints[0]}})` },
                { id: `b`, latex: `b=(x_{${this.idSelectedPoints[0]}}-x_{${this.idSelectedPoints[1]}})` },
                //{ id: `d`, latex: `d=(x_{${this.idSelectedPoints[0]}}y_{${this.idSelectedPoints[1]}}-x_{${this.idSelectedPoints[1]}}y_{${this.idSelectedPoints[0]}})` },
                { id: `c`, latex: `c=\\left\\{\\left|a\\right|>\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{1})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{1})y_{${this.idSelectedPoints[0]}},\\left|a\\right|\\le\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{2})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{2})y_{${this.idSelectedPoints[0]}}\\right\\}` },          
            ]);
            this.calculator.setExpressions([
                //{ id: `e`, latex: `\\operatorname{mod}\\left(ax+by,m\\right)\\ =\\operatorname{mod}\\left(d,m\\right)\\ \\left\\{-0.5<x<m-0.5\\right\\}\\ \\left\\{-0.5<y<m-0.5\\right\\}`, color: Graphic.Colors.curve },
                { id: `f`, latex: `(ax+by)=c \\left\\{0<x<m\\right\\} \\left\\{0<y<m\\right\\}`, color: Graphic.Colors.curve },
            ]);

            // Plot the points on the curve and color them in green
            this.calculator.model.observe('expressionAnalysis', () => { //As Desmos is asynchrounous, we need to wait for the expression to be analysed
                // get the value of 'a', 'b' and 'c'
                var a = this.getValueOfParameter(`a`);
                var b = this.getValueOfParameter(`b`);
                var c = this.getValueOfParameter(`c`);

                // If values in listCoordPoints solves the equation of a*x+b*y=c, we display the points in green
                this.listCoordPoints.forEach(item => {
                    if (c.includes(a * item[0] + b * item[1])) {
                        //get the current index of the point
                        var index = this.listCoordPoints.indexOf(item) + 1;
                        //set the color of the point to green
                        this.setExpressionParameters(`p_{${index}}`, { color: Graphic.Colors.pointOnCurve });
                    }
                });
            });

        } catch (error) {
            throw new Error(`An error has occured adding modular lines : ${error}`);
        }
    }

    /**
     * Show the result of the addition in red and draw the segment
     * @param {Array} addPoint coordinates of the additionnal point
     * @param {boolean} isTheSamePoint true if we do P+P
     */
    displayAddPoint(addPoint, isTheSamePoint) {
        let listPoints = this.listPoints;
        let negPoint = getCoord(this.newPoint(addPoint[0], addPoint[1]).neg());
        var i = 1;
        var j = 1;
        for (i = 1; i < listPoints.length+1; i++) {
            if ((addPoint[0] == this.getValueOfParameter(`x_{${i}}`)) && (addPoint[1] == this.getValueOfParameter(`y_{${i}}`))) {
                this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.finalPoint })
                var idAdd = i;
            }
            else {
                this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.point })
            }
        }
        this.calculator.removeExpression({ id: `s_{${this.segmentId}}` });
        if (!isTheSamePoint) {
            for (j = 1; j < listPoints.length; j++) {
                if ((negPoint[0] == this.getValueOfParameter(`x_{${j}}`)) && (negPoint[1] == this.getValueOfParameter(`y_{${j}}`))) {
                    this.addSegment([`x_{${idAdd}}`, `x_{${j}}`], [`y_{${idAdd}}`, `y_{${j}}`]);
                }
            }
        }
    }

    displayInfinity(){
        this.calculator.removeExpressions([
            { id: `f` },
            { id: `s_{${this.segmentId}}` },
        ]);
    }
}
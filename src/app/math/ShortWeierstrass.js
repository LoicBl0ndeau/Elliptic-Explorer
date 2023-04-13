const elliptic = require('elliptic');
const BN = require('bn.js');
import { Graphic, ModCurveGraph, PModCurveGraph } from '../graph/GraphicalInterface.js';

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
        this.shortWcurve = new elliptic.curve.short({
            a: new BN(a),
            b: new BN(b),
            p: new BN(p),
          });
        this.shortWcurve = new elliptic.curve.short({
            a: new BN(a),
            b: new BN(b),
            p: new BN(p),
          });
        this.listPoints = [];
    }




    /**
     * Create the point with coordinates (x, y) from the curve (the point is linked to the curve)
     * @param {integer || string} x x-coordinate
     * @param {integer || string} y y-coordinate
     * @returns {Point} point
     */
    newPoint(x, y) {
        var p = this.p;
        //Create a point on the shortW curve
        var p = this.p;
        //Create a point on the shortW curve
        while (x < 0) {
            x += p;
            x += p;
        }
        while (y < 0) {
            y += p;
            y += p;
        }
        return this.shortWcurve.point(new BN(x), new BN(y));
        return this.shortWcurve.point(new BN(x), new BN(y));
    }

    /**
     * Get the coordinates of a point in the form [x, y]
     * @param {Point} point point
     * @returns {Array} the x y coordinates of the point in the form [x, y] with x and y integers
     */
    getCoord(point) {
        if (point.inf) //if the point is the point at infinity
            return [0, 1.5*this.p/2 + 0.5];
        if (point.inf) //if the point is the point at infinity
            return [0, 1.5*this.p/2 + 0.5];
        return [point.getX().toNumber(), point.getY().toNumber()];
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
     * @returns {resCoordPoint} Coordinates of resulting point from the addition P+Q
     */
    addPoints(P, Q) {
        var resPoint = P.add(Q);
        let resCoordPoint = this.getCoord(resPoint);        
        while (resCoordPoint[0] > this.p/2) {
            resCoordPoint[0] -= this.p;
        }
        while (resCoordPoint[0] < -this.p/2) {
            resCoordPoint[0] += this.p;
        }
        while (resCoordPoint[1] > this.p/2) {
            resCoordPoint[1] -= this.p;
        }
        while (resCoordPoint[1] < -this.p/2) {
            resCoordPoint[1] += this.p;
        }
        return resCoordPoint;
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
        this.listCoordPoints.length = 0;
        let listCoordPoints = this.listCoordPoints;
        this.listPoints.length = 0;
        let listPoints = this.listPoints;
        var calculx;
        var calculy;
        let screenSizeX = Math.floor(this.p/2);
        let screenSizeY = Math.floor(this.p/2);

        for (var y = -screenSizeY; y <= screenSizeY; y++) {
            calculy = (Math.pow(y, 2));
            for (var x = -screenSizeX; x <= screenSizeX; x++) {
                calculx = (Math.pow(x, 3) + (a * x) + b);
                if ((calculy - calculx)%p == 0) {
                    listCoordPoints.push([x, y]);
                    listPoints.push(this.newPoint(x, y));
                }
            }
        }
        console.log(listCoordPoints.length);
        listCoordPoints.push([0, 1.5*this.p/2 + 0.5]);
        listPoints.push(this.newPoint(null, null));
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
        var lignes = Math.floor(Math.sqrt(modulo));
        try {
            this.calculator.setExpressions([
                { id: `m`, latex: `m=${modulo}` },
                { id: `l`, latex: `l=${lignes}` },
                { id: `L_{1}`, latex: `L_{1}=[m\\frac{b}{a}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `L_{2}`, latex: `L_{2}=[\\frac{m}{2}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `a`, latex: `a=(y_{${this.idSelectedPoints[1]}}-y_{${this.idSelectedPoints[0]}})` },
                { id: `b`, latex: `b=(x_{${this.idSelectedPoints[0]}}-x_{${this.idSelectedPoints[1]}})` },
                { id: `c`, latex: `c=\\left\\{\\left|a\\right|>\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{1})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{1})y_{${this.idSelectedPoints[0]}},\\left|a\\right|\\le\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{2})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{2})y_{${this.idSelectedPoints[0]}}\\right\\}` },          
                { id: `f`, latex: `(ax+by)=c \\left\\{-${this.p/2}<x<${this.p/2}\\right\\} \\left\\{-${this.p/2}<y<${this.p/2}\\right\\}`, color: Graphic.Colors.curve }, //Here to choose the centering of the square for the lines of the modulo
            ]);
        } catch (error) {
            throw new Error(`An error has occured adding modular lines : ${error}`);
        }
    }

    /**
     * Show the result of the addition in red and draw the segment
     * @param {Array} addPoint coordinates of the additionnal point
     * @param {boolean} isTheSamePoint true if we do P+P
     */
    displayAddPoint(addPoint, isTheSamePoint, isInfinityAPointOnCurve) {
        let listPoints = this.listPoints;
        var i = 1;
        var j = 1;
        this.calculator.model.observe('expressionAnalysis', () => { //As Desmos is asynchrounous, we need to wait for the expression to be analysed
            this.calculator.model.unobserve('expressionAnalysis'); //We don't need to observe anymore otherwise it will loop infinitely
            // get the value of 'a', 'b' and 'c'
            var a = this.getValueOfParameter(`a`);
            var b = this.getValueOfParameter(`b`);
            var c = this.getValueOfParameter(`c`);
            //To know if the user clicked twice on the same point
            var isExactlyTheSamePoint = false;
            if(this.selectedPoints[0][0] == this.selectedPoints[1][0] && this.selectedPoints[0][1] == this.selectedPoints[1][1]){
                isExactlyTheSamePoint = true;
            }
            for (i = 1; i < listPoints.length+1; i++) {
                // If the values of the additionnal point are in the listCoordPoints, we display the point in red
                if ((addPoint[0] == this.getValueOfParameter(`x_{${i}}`)) && (addPoint[1] == this.getValueOfParameter(`y_{${i}}`))) {
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.finalPoint });
                    var idAdd = i;
                }
                // Else if values in listCoordPoints solves the equation of a*x+b*y=c, we display the points in green
                else if(c.includes(a * this.getValueOfParameter(`x_{${i}}`) + b * this.getValueOfParameter(`y_{${i}}`)) && i != listPoints.length && !isExactlyTheSamePoint && !isInfinityAPointOnCurve){
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.pointOnCurve });
                }
                else {
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.point });
                }
            }
            //If the user clicked twice on the same point (but not infinity), we display it in green
            if(isExactlyTheSamePoint && this.idSelectedPoints[0] != this.listPoints.length){
                this.setExpressionParameters(`p_{${this.idSelectedPoints[0]}}`, { color: Graphic.Colors.pointOnCurve });
            }
            //If only one of the point is infinity, we display it in green
            if(isInfinityAPointOnCurve){
                this.setExpressionParameters(`p_{${listPoints.length}}`, { color: Graphic.Colors.pointOnCurve });
            }
            //Remove the previous segment in any case
            this.calculator.removeExpression({ id: `s_{${this.segmentId}}` });
            if(!isTheSamePoint){
                //Add the segment if the point is not the same as the initial point
                for (j = 1; j < listPoints.length; j++) {
                    if ((addPoint[0] == this.getValueOfParameter(`x_{${j}}`)) && (-addPoint[1] == this.getValueOfParameter(`y_{${j}}`))) {
                        this.addSegment([`x_{${idAdd}}`, `x_{${j}}`], [`y_{${idAdd}}`, `y_{${j}}`]);
                    }
                }
            }
        });
    }

    displayInfinity(){
        this.calculator.removeExpressions([
            { id: `f` },
            { id: `s_{${this.segmentId}}` },
        ]);
    }
}

export class PeriodicShortWeierstrass extends PModCurveGraph {
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
        this.shortWcurve = new elliptic.curve.short({
            a: new BN(a),
            b: new BN(b),
            p: new BN(p),
          });
        this.listPoints = [];
    }




    /**
     * Create the point with coordinates (x, y) from the curve (the point is linked to the curve)
     * @param {integer || string} x x-coordinate
     * @param {integer || string} y y-coordinate
     * @returns {Point} point
     */
    newPoint(x, y) {
        var p = this.p;
        //Create a point on the shortW curve
        while (x < 0) {
            x += p;
        }
        while (y < 0) {
            y += p;
        }
        return this.shortWcurve.point(new BN(x), new BN(y));
    }

    /**
     * Get the coordinates of a point in the form [x, y]
     * @param {Point} point point
     * @returns {Array} the x y coordinates of the point in the form [x, y] with x and y integers
     */
    getCoord(point) {
        if (point.inf) //if the point is the point at infinity
            return [0, 1.5*this.p/2 + 0.5];
        return [point.getX().toNumber(), point.getY().toNumber()];
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
     * @returns {CoordPoint} Coordinates of resulting point from the addition P+Q
     */
    addPoints(P, Q) {
        var resPoint = P.add(Q);
        let resCoordPoint = this.getCoord(resPoint);        
        while (resCoordPoint[0] > this.p/2) {
            resCoordPoint[0] -= this.p;
        }
        while (resCoordPoint[0] < -this.p/2) {
            resCoordPoint[0] += this.p;
        }
        while (resCoordPoint[1] > this.p/2) {
            resCoordPoint[1] -= this.p;
        }
        while (resCoordPoint[1] < -this.p/2) {
            resCoordPoint[1] += this.p;
        }
        return resCoordPoint;
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
        this.listCoordPoints.length = 0;
        let listCoordPoints = this.listCoordPoints;
        this.listPoints.length = 0;
        let listPoints = this.listPoints;
        var calculx;
        var calculy;
        let mathCoordinates = this.calculator.graphpaperBounds.mathCoordinates;
        this.height = mathCoordinates.top - mathCoordinates.bottom;
        this.width = mathCoordinates.right - mathCoordinates.left;
        //let screenSizeX = Math.floor(this.width / 2) - 1;
        //let screenSizeY = Math.floor(this.height / 2) - 1;
        
        let left = Math.floor(mathCoordinates.left);
        let right = Math.floor(mathCoordinates.right);
        let top = Math.floor(mathCoordinates.top);
        let bottom = Math.floor(mathCoordinates.bottom);

        for (var y = bottom; y <= top; y++) {
            calculy = (Math.pow(y, 2));
            for (var x = left; x <= right; x++) {
                calculx = (Math.pow(x, 3) + (a * x) + b);
                if ((calculy - calculx)%p == 0) {
                    listCoordPoints.push([x, y]);
                    listPoints.push(this.newPoint(x, y));
                }
            }
        }
        listCoordPoints.push([(this.calculator.graphpaperBounds.mathCoordinates.left + this.calculator.graphpaperBounds.mathCoordinates.right) / 2, this.calculator.graphpaperBounds.mathCoordinates.top - 0.5]);
        listPoints.push(this.newPoint(null, null));
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
        var lignes = Math.floor(Math.sqrt(modulo));
        try {
            this.calculator.setExpressions([
                { id: `m`, latex: `m=${modulo}` },
                { id: `l`, latex: `l=${lignes}` },
                { id: `L_{1}`, latex: `L_{1}=[m\\frac{b}{a}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `L_{2}`, latex: `L_{2}=[\\frac{m}{2}i\\operatorname{for}i=[-lm...lm]]` },
                { id: `a`, latex: `a=(y_{${this.idSelectedPoints[1]}}-y_{${this.idSelectedPoints[0]}})` },
                { id: `b`, latex: `b=(x_{${this.idSelectedPoints[0]}}-x_{${this.idSelectedPoints[1]}})` },
                { id: `c`, latex: `c=\\left\\{\\left|a\\right|>\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{1})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{1})y_{${this.idSelectedPoints[0]}},\\left|a\\right|\\le\\left|b\\right|:(x_{${this.idSelectedPoints[0]}}+L_{2})y_{${this.idSelectedPoints[1]}}-(x_{${this.idSelectedPoints[1]}}+L_{2})y_{${this.idSelectedPoints[0]}}\\right\\}` },          
                { id: `f`, latex: `(ax+by)=c \\left\\{-${this.p/2}<x<${this.p/2}\\right\\} \\left\\{-${this.p/2}<y<${this.p/2}\\right\\}`, color: Graphic.Colors.curve }, //Here to choose the centering of the square for the lines of the modulo
            ]);
        } catch (error) {
            throw new Error(`An error has occured adding modular lines : ${error}`);
        }
    }

    /**
     * Show the result of the addition in red and draw the segment
     * @param {Array} addPoint coordinates of the additionnal point
     * @param {boolean} isTheSamePoint true if we do P+P
     * @param {boolean} isInfinityAPointOnCurve true if one of the point is infinity
     */
    displayAddPoint(addPoint, isTheSamePoint, isInfinityAPointOnCurve) {
        let listPoints = this.listPoints;
        var i = 1;
        var j = 1;
        this.calculator.model.observe('expressionAnalysis', () => { //As Desmos is asynchrounous, we need to wait for the expression to be analysed
            this.calculator.model.unobserve('expressionAnalysis'); //We don't need to observe anymore otherwise it will loop infinitely
            // get the value of 'a', 'b' and 'c'
            var a = this.getValueOfParameter(`a`);
            var b = this.getValueOfParameter(`b`);
            var c = this.getValueOfParameter(`c`);
            //To know if the user clicked twice on the same point
            var isExactlyTheSamePoint = false;
            if(this.selectedPoints[0][0] == this.selectedPoints[1][0] && this.selectedPoints[0][1] == this.selectedPoints[1][1]){
                isExactlyTheSamePoint = true;
            }
            for (i = 1; i < listPoints.length+1; i++) {
                // If the values of the additionnal point are in the listCoordPoints, we display the point in red
                if ((addPoint[0] == this.getValueOfParameter(`x_{${i}}`)) && (addPoint[1] == this.getValueOfParameter(`y_{${i}}`))) {
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.finalPoint });
                    var idAdd = i;
                }
                // Else if values in listCoordPoints solves the equation of a*x+b*y=c, we display the points in green
                else if(c.includes(a * this.getValueOfParameter(`x_{${i}}`) + b * this.getValueOfParameter(`y_{${i}}`)) && i != listPoints.length && !isExactlyTheSamePoint && !isInfinityAPointOnCurve){
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.pointOnCurve });
                }
                else {
                    this.setExpressionParameters(`p_{${i}}`, { color: Graphic.Colors.point });
                }
            }
            //If the user clicked twice on the same point (but not infinity), we display it in green
            if(isExactlyTheSamePoint && this.idSelectedPoints[0] != this.listPoints.length){
                this.setExpressionParameters(`p_{${this.idSelectedPoints[0]}}`, { color: Graphic.Colors.pointOnCurve });
            }
            //If only one of the point is infinity, we display it in green
            if(isInfinityAPointOnCurve){
                this.setExpressionParameters(`p_{${listPoints.length}}`, { color: Graphic.Colors.pointOnCurve });
            }
            //Remove the previous segment in any case
            this.calculator.removeExpression({ id: `s_{${this.segmentId}}` });
            if(!isTheSamePoint){
                //Add the segment if the point is not the same as the initial point
                for (j = 1; j < listPoints.length; j++) {
                    if ((addPoint[0] == this.getValueOfParameter(`x_{${j}}`)) && (-addPoint[1] == this.getValueOfParameter(`y_{${j}}`))) {
                        this.addSegment([`x_{${idAdd}}`, `x_{${j}}`], [`y_{${idAdd}}`, `y_{${j}}`]);
                    }
                }
            }
        });
    }

    displayInfinity(){
        // No lines when infinity is selected
        this.calculator.removeExpressions([
            { id: `f` },
            { id: `s_{${this.segmentId}}` },
        ]);
    }
}
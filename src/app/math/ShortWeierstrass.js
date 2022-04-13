import elliptic from 'elliptic';
import BN from 'bn.js';
import { ModCurveGraph } from '../graph/GraphicalInterface.js';

/**
 * Obtenir les coordonnées d'un point sous la forme [x, y]
 * @param {Point} point point
 * @returns {Array} les coordonnées x y du point sous la forme [x, y] avec x et y des integers
 */
export function getCoord(point) {
    if (point.inf)
        return [null, null];
    return [point.getX().toNumber(), point.getY().toNumber()];
}

export class ShortWeierstrass extends ModCurveGraph {

    /**
     * Construit la courbe d'équation y^2 = x^3 + ax + b mod p
     * @param {string} element The ID of the HTML element where the calculator will be.
     * @param {integer ou string} a premier paramètre
     * @param {integer ou string} b deuxieme paramètre
     * @param {integer ou string} p modulo
     */
    constructor(element, a, b, p) {
        super(element);
        while (a < 0) {
            a = a + p;
        }
        while (b < 0) {
            b = b + p;
        }
        this.param = {
            p: p,
            a: a,
            b: b,
        }
        this.shortWcurve = new elliptic.curve.short(this.param);
        this.listPoints = [];
    }




    /**
     * Creer le point de coordonnées (x, y) à partir de la courbe (le point est lié à la courbe)
     * @param {integer || string} x coordonnée des abscisses
     * @param {integer || string} y coordonnée des ordonnés
     * @returns {Point} point
     */
    newPoint(x, y) {
        let p = this.param.p;
        while (x < 0) {
            x = x + p;
        }
        while (y < 0) {
            y = y + p;
        }
        return this.shortWcurve.point(x, y, false);
    }


    /**
     * Savoir si un point appartient à la courbe
     * @param {Point} P 
     * @returns {boolean} true si le point appartient à la courbe, false sinon
     */
    isPointOnCurve(P) {
        return this.shortWcurve.validate(P);
    }


    /**
     * Additionner deux points
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @returns {Point} Point résultant de l'addition P+Q
     */
    addPoints(P, Q) {
        return (P.add(Q));
    }


    /**
     * Multiplier P par k
     * @param {Point} P point sur la courbe
     * @param {integer} k facteur
     * @returns {Point} Point résultant de k*P
     */
    mulPoints(P, k) {
        if (k == 2) {
            return (P.dbl());
        }
        return (P.mul(k))
    }

    /**
     * On soustrait le deuxième point au premier
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @returns {Point} Point résultant de P-Q 
     */
    subPoints(P, Q) {
        return (P.add(Q.neg()));
    }

    /**
     * 
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @param {integer} k1 facteur
     * @param {integer} k2 facteur
     * @returns {Point} Point résultant de k1P + k2Q 
     */
    linearCombination(P, Q, k1, k2) {
        k1 = new BN(k1, 16)
        k2 = new BN(k2, 16)
        return (P.mulAdd(k1, Q, k2));
    }


    /**
     * Trouver le multiple n tel que nP = Q
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @returns {integer} le multiple n tel que nP = Q
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
     * Trouver tous les points de la courbe et les mettre dans une liste
     */
    findAllPoints() {
        let a = this.param.a;
        let b = this.param.b;
        let p = this.param.p;
        let listPoints = this.listPoints;
        var calculx;
        var calculy;
        for (var y = 0; y < p; y++) {
            calculy = (Math.pow(y, 2)) % p;
            for (var x = 0; x < p; x++) {
                calculx = (Math.pow(x, 3) + (a * x) + b) % p;
                if (calculy == calculx) {
                    listPoints.push(this.newPoint(x, y));
                }
            }
        }
        listPoints.push(this.newPoint(null, null))
    }

    /**
     * Transformer la liste des points en liste de coordonées de points
     */
    findCoordPoints() {
        let listPoints = this.listPoints;
        let listCoordPoints = this.listCoordPoints;
        listPoints.forEach(item => {
            listCoordPoints.push(getCoord(item));
        });
    }

    /**
     * Trouver l'ordre additif du point P
     * @param {Point} P point sur la courbe
     * @returns {integer} ordre additif du point P
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


    displayModulo(pointId){
        //let point1 = this.selectedPoints[0];
        //let point2 = this.selectedPoints[1];
        //let point1 = [3,3];
        //let point2 = [0,4];
        var lignes =5;
        var modulo=this.param.p;

        try {
            //this.pointId++;
            this.calculator.setExpressions([
                { id: `l`, latex: `l=${lignes}` },
                { id: `m`, latex: `m=${modulo}` },
                { id: `L`, latex: `L=[\\frac{m}{2}i\\operatorname{for}i=[\\operatorname{floor}(-\\frac{lm}{2})...\\operatorname{floor}(\\frac{lm}{2})]]` },
                { id: `x_${pointId}`, latex: `x_${pointId}=${this.selectedPoints[0][0]}` },
                { id: `y_${pointId}`, latex: `y_${pointId}=${this.selectedPoints[0][1]}` },
            ]);
            //this.pointId++;
            this.calculator.setExpressions([
                { id: `x_${pointId + 1}`, latex: `x_${pointId + 1}=${this.selectedPoints[1][0]}` },
                { id: `y_${pointId + 1}`, latex: `y_${pointId + 1}=${this.selectedPoints[1][1]}` },
                { id: `a`, latex: `a=(y_${pointId+1}-y_${pointId})`},
                { id: `b`, latex: `b=(x_${pointId}-x_${pointId + 1})`},
                { id: `c`, latex: `c=((x_${pointId}+L)y_${pointId + 1}-(x_${pointId + 1}+L)y_${pointId})`},
                { id: `e`, latex: `(ax+by)=c \\left\\{0<x<m\\right\\}\\ \\left\\{0<y<m\\right\\}` },
            ]);
        } catch (error) {
            throw new Error(`An error has occured adding modular lines : ${error}`);
        }
    }
}
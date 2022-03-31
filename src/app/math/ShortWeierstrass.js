import elliptic  from 'elliptic';
import BN from 'bn.js';

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

export class ShortWeierstrass {

    /**
     * Construit la courbe d'équation y^2 = x^3 + ax + b mod p
     * @param {integer ou string} a premier paramètre
     * @param {integer ou string} b deuxieme paramètre
     * @param {integer ou string} p modulo
     */
    constructor(a, b, p){
        while (a<0){
            a=a+p;
        }
        while (b<0){
            b=b+p;
        }
        this.param = {
          p: p,
          a: a,
          b: b,
        }
        this.shortWcurve = new elliptic.curve.short(this.param);
    }


    /**
     * Creer le point de coordonnées (x, y) à partir de la courbe (le point est lié à la courbe)
     * @param {integer || string} x coordonnée des abscisses
     * @param {integer || string} y coordonnée des ordonnés
     * @returns {Point} point
     */
    newPoint(x, y) {
        let p = this.param.p;
        while (x<0){
            x=x+p;
        }
        while (y<0){
            y=y+p;
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
    addPoints(P ,Q) {
        return(P.add(Q));
    }


    /**
     * Multiplier P par k
     * @param {Point} P point sur la courbe
     * @param {integer} k facteur
     * @returns {Point} Point résultant de k*P
     */
    mulPoints(P, k) {
        if(k==2) {
            return(P.dbl());
        }
        return(P.mul(k))
    }

    /**
     * On soustrait le deuxième point au premier
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @returns {Point} Point résultant de P-Q 
     */
    subPoints(P, Q) {
        return(P.add(Q.neg()));
    }

    /**
     * 
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @param {integer} k1 facteur
     * @param {integer} k2 facteur
     * @returns {Point} Point résultant de k1P + k2Q 
     */
    linearCombination(P,Q,k1,k2) {
        k1 = new BN(k1, 16)
        k2 = new BN(k2, 16)
        return(P.mulAdd(k1,Q,k2));
      }


    /**
     * Trouver le multiple n tel que nP = Q
     * @param {Point} P point sur la courbe
     * @param {Point} Q point sur la courbe
     * @returns {integer} le multiple n tel que nP = Q
     */
    findMultiple(P, Q) {
        if (P.eq(Q)){
            return 1;
        }
        var n=2;
        while (!P.mul(n).eq(Q) && !P.mul(n).eq(P)){
            n=n+1;
        }
        if (P.mul(n).eq(P)){
            return "Pas de multiple";
          }
        return n;
    }

    /**
     * Trouver tous les points de la courbe
     * @returns {Array} liste de tous les points de la courbe
     */
    findAllPoints() {
        let a = this.param.a;
        let b = this.param.b;
        let p = this.param.p;
        let foundPoints = [];
        var calculx;
        var calculy;
        for (var y = 0; y < p; y++){
          calculy = (Math.pow(y,2))%p;
          for (var x = 0; x < p; x++){
            calculx = (Math.pow(x,3) + (a*x) + b)%p;
            if (calculy == calculx){
                foundPoints.push( this.newPoint(x, y) );
            }
          }
        }
        foundPoints.push( this.newPoint(null, null) )
        return foundPoints;
    }

    /**
     * Trouver l'ordre additif du point P
     * @param {Point} P point sur la courbe
     * @returns {integer} ordre additif du point P
     */
    findAdditiveOrder(P) {
        var n=2;
        while (!P.mul(n).eq(P.neg()) && !P.mul(n).eq(P) ) {
            n=n+1;
        }
        if (P.mul(n).eq(P)){
          return 2;
        }
        return n+1;
      }   
}
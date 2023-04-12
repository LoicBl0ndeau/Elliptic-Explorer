import Forme from './Forme.js';

class Coefficients {

    #forme;
    #coefficients = {};

    constructor() {
        this.setForme(Forme.UNDEFINED);
    }

    setForme(forme) {
        if (Object.values(Forme).includes(forme)) {
            this.#forme = forme;
        } else {
            console.log('La forme donnée comme argument (' + forme + ') est invalide.');
        }
    }

    getForme() {
        return this.#forme;
    }

    getCoefficients() {
        return this.#coefficients;
    }


    defaultCoefficients() {
        switch (this.#forme) {
            case Forme.SHORT_WEIERSTRASS:
                this.#coefficients = {
                    'a': 3,
                    'b': 2,
                    'p': 5
                }
                break;
            case Forme.WEIERSTRASS:
                this.#coefficients = {
                    'a1': 0,
                    'a2': 4,
                    'a3': 0,
                    'a4': 2,
                    'a6': 1,
                }
                break;
            case Forme.MONTGOMERY:
                this.#coefficients = {
                    'a': 6,
                    'b': 2
                }
                break;
            case Forme.EDWARDS:
                this.#coefficients = {
                    'c': 2,
                    'd': 1
                }
                break;
            default:
                console.log('La forme actuelle n\'est pas définie.');
                break;
        }
    }

    // Fonction qui fait la conversion des coefficients d'une forme à une autre
    equivalentCoefficients() {

    }

}

export default Coefficients;
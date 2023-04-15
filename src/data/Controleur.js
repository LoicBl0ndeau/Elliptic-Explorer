import Forme from './Forme.js';
import Coefficients from './Coefficients.js';
import Corps from './Corps.js';
import Vues from './Vues.js';

class Controleur {

    corps = Corps.UNDEFINED;
    modulo = 0;
    vue = Vues.UNDEFINED;
    forme = Forme.UNDEFINED;
    coefficients = new Coefficients();


    constructor() {

    }

    getInformations() {
        console.table(this);
    }

    getCoefficients() {
        return this.coefficients;
    }

    setCorps(value) {
        switch (value) {
            case 'R':
                this.corps = Corps.REELS;
                break;
            case 'P':
                this.corps = Corps.MODULO;
                break;
            default:
                this.corps = Corps.UNDEFINED;
                break;
        }
    }
    getCorps() {
        return this.corps;
    }

    setVue(value) {
        switch (value) {
            case 'vue2D':
                this.vue = Vues.VUE_2D;
                break;
            case 'vue3D':
                this.vue = Vues.VUE_3D;
                break;
            case 'vuePeriodique':
                this.vue = Vues.VUE_PERIODIQUE;
                break;
            case 'vuePerspective':
                this.vue = Vues.VUE_PERSPECTIVE;
                break;
            case 'vueFinie':
                this.vue = Vues.VUE_FINIE;
                break;
            default:
                this.vue = Vues.UNDEFINED;
                break;
        }
    }

    getVue() {
        return this.vue;
    }

    getForme() {
        return this.forme;
    }

    setForme(value) {
        switch (value) {
            case 'Short_Weierstrass':
                this.forme = Forme.SHORT_WEIERSTRASS;
                break;
            case 'Weierstrass':
                this.forme = Forme.WEIERSTRASS;
                break;
            case 'Montgomery':
                this.forme = Forme.MONTGOMERY;
                break;
            case 'Edwards':
                this.forme = Forme.EDWARDS;
                break;
            default:
                this.forme = Forme.UNDEFINED;
                break;
        }
    }
}

export default Controleur;
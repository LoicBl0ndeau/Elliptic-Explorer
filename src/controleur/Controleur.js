import Corps from './Corps.js';
import Forms from './Forms.js';
import Views from './Views.js';
import Coefficients from './Coefficients.js';

class Controleur {

    corps = Corps.UNDEFINED;
    modulo = 0;
    view = Views.UNDEFINED;
    form = Forms.UNDEFINED;
    coefficients = new Coefficients();

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

    setView(newView) {
        switch (newView) {
            case '2DView':
                this.view = Views.VIEW_2D;
                break;
            case '3DView':
                this.view = Views.VIEW_3D;
                break;
            case 'PeriodicView':
                this.view = Views.PERIODIC_VIEW;
                break;
            case 'PerspectiveView':
                this.view = Views.PERSPECTIVE_VIEW;
                break;
            case 'FiniteView':
                this.view = Views.FINITE_VIEW;
                break;
            default:
                this.view = Views.UNDEFINED;
                break;
        }
    }

    getView() {
        return this.view;
    }

    getForm() {
        return this.form;
    }

    setForm(newForm) {
        switch (newForm) {
            case 'ShortWeierstrass':
                this.form = Forms.SHORT_WEIERSTRASS;
                break;
            case 'Weierstrass':
                this.form = Forms.WEIERSTRASS;
                break;
            case 'Montgomery':
                this.form = Forms.MONTGOMERY;
                break;
            case 'Edwards':
                this.form = Forms.EDWARDS;
                break;
            default:
                this.form = Forms.UNDEFINED;
                break;
        }
    }
}

export default Controleur;
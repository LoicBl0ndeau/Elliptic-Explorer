class Coefficients {
    // Modulo
    p = 5;

    // Short Weierstrass & Montgomery coefficients
    a = 3;
    b = 2;

    // Edwards coefficients
    c = 2;
    d = 1;

    // Weierstrass coefficients
    a1 = 0;
    a2 = 4;
    a3 = 0;
    a4 = 2;
    a6 = 1;


    showCoefficients() {
        console.log(JSON.parse(JSON.stringify(this)));
    }

    getModulo() {
        return this.p;
    }

    setCoef(name, value) {
        switch (name) {
            case 'a1':
                this.a1 = value;
                break;
            case 'a2':
                this.a2 = value;
                break;
            case 'a3':
                this.a3 = value;
                break;
            case 'a4':
                this.a4 = value;
                break;
            case 'a6':
                this.a6 = value;
                break;
            case 'a':
                this.a = value;
                break;
            case 'b':
                this.b = value;
                break;
            case 'c':
                this.c = value;
                break;
            case 'd':
                this.d = value;
                break;
            case 'p':
                this.p = value;
                break;
            default:
                console.log('Le coefficient n\'est pas défini.');
                break;
        }
    }

    getWeierstrassCoefficients() {
        return {
            a1: this.a1,
            a2: this.a2,
            a3: this.a3,
            a4: this.a4,
            a6: this.a6
        }

    }

    getShortWeierstrassCoefficients() {
        return {
            a: this.a,
            b: this.b
        }
    }

    getMontgomeryCoefficients() {
        return {
            a: this.a,
            b: this.b
        }
    }

    getEdwardsCoefficients() {
        return {
            c: this.c,
            d: this.d
        }
    }

    // Fonction qui fait la conversion des coefficients d'une forme à une autre
    equivalentCoefficients() {

    }

}

export default Coefficients;
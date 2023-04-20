class Coefficients {
    // Modulo
    p = 5;

    // Short Weierstrass & Montgomery coefficients
    a = 3;
    b = 2;

    // Edwards coefficients
    c = 2;
    d = 2;

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

    setCoef(coefName, value) {
        let newValue;
        try {
            newValue = parseInt(value);
        } catch (error) {
            console.log('Le coefficient en paramètre n\'est pas un nombre.');
        }
        switch (coefName) {
            case 'a1':
                this.a1 = newValue;
                break;
            case 'a2':
                this.a2 = newValue;
                break;
            case 'a3':
                this.a3 = newValue;
                break;
            case 'a4':
                this.a4 = newValue;
                break;
            case 'a6':
                this.a6 = newValue;
                break;
            case 'a':
                this.a = newValue;
                break;
            case 'b':
                this.b = newValue;
                break;
            case 'c':
                this.c = newValue;
                break;
            case 'd':
                this.d = newValue;
                break;
            case 'p':
                this.p = newValue;
                break;
            default:
                console.log('Le coefficient en paramètre n\'existe pas.');
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
}

export default Coefficients;
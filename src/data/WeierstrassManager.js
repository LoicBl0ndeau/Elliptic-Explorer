import data from './data.json';

class WeierstrassManager {

    getTargetName(target) {
        switch (target) {
            case 'shortmod':
                return 'Short_Weierstrass';
            case 'weierstrass':
                return 'Weierstrass';
            case 'p':
                return 'montgomery';
            case 'edwards':
                return 'edwards';
            default:
                return 'Undefined';
        }
    }

    getParameters(){
        return data.curve.parameters;
    }
    
    getCurveType(){
        return data.curve.type;
    }

    getEquivalentEquation(target) {
        let targetCurveName = this.getTargetName(target);
        switch (data.curve.type) {
            case 'Short_Weierstrass':
                console.log('La courbe précédente était une Short Weierstrass et on veut désormais une ' + targetCurveName);
                break;
            case 'Weierstrass':
                console.log('La courbe précédente était une Weierstrass et on veut désormais une ' + targetCurveName);
                break;
            case 'Montgomery':
                console.log('La courbe précédente était une Montgomery et on veut désormais une ' + targetCurveName);
                break;
            case 'Edwards':
                console.log('La courbe précédente était une Edwards et on veut une désormais une ' + targetCurveName);
                break;
            default:
                console.log('La courbe précédente n\'est pas définie : on utilise la courbe par défaut du type ' + targetCurveName);
                switch (targetCurveName) {
                    case 'Short_Weierstrass':
                        this.defaultShortWeierstrassCurve();
                        break;
                    case 'Weierstrass':
                        this.defaultWeierstrassCurve();
                        break;
                    case 'Montgomery':
                        this.defaultMontgomeryCurve();
                        break;
                    case 'Edwards':
                        this.defaultEdwardsCurve();
                        break;
                    default:
                        console.log('La courbe cible n\'est pas définie : PROBLEME');
                        break;
                }
            }
    }
    
    defaultShortWeierstrassCurve(){ 
        data.curve.type = 'Short_Weierstrass';
        data.curve.parameters = {
            'a':3,
            'b':2,
            'p':5
        }
        console.log(data)
    }
    defaultWeierstrassCurve(){
        data.curve.type = 'Weierstrass';
    }
    
    defaultMontgomeryCurve(){
        data.curve.type = 'Montgomery';
    }

    defaultEdwardsCurve(){
        data.curve.type = 'Edwards';
    }

}

export default WeierstrassManager;
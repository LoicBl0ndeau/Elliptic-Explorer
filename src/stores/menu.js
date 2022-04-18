import { defineStore } from 'pinia'

import { graphStore } from './graph.js'
import katex from 'katex';

export const menuStore = defineStore('menu', {
    actions: {
        /**
         * @param {string} htmlID l'id de l'élémeent HTML
         * @returns sa valeur
         */
        displayElementById(htmlID) {
            document.getElementById(htmlID).style.display = "inline";
        },
        hideElementById(htmlID) {
            document.getElementById(htmlID).style.display = "none";
        },
        setValueById(htmlID, value) {
            document.getElementById(htmlID).value = value;
        },
        getValueById(htmlID) {
            return document.getElementById(htmlID).value;
        },
        getIntFromInputId(htmlID) {
            return Number.parseInt(this.getValueById(htmlID));
        },
        getFloatFromInputId(htmlID) {
            return Number.parseFloat(this.getValueById(htmlID));
        },
        /**
         * 
         * @param {string} graphExp la valeur en latex de l'expression dans la show_list (par ex "a_{1}")
         * @param {*} inputHtmlID l'id de l'input 
         */
        setValueOnGraphFromUserInput(graphExp, inputHtmlID) {
            const graphS = graphStore();

            let value = Number.parseFloat(this.getValueById(inputHtmlID));
            graphS.setExpValue(graphExp, value);
        },
        setInputValueFromGraphExpValue(htmlID, exp) {
            const graphS = graphStore();

            let value = graphS.getExpValue(exp);
            // si le nombre est un float, on fixe 2 décimales
            value = !Number.isNaN(value) && Number.isInteger(value) ? value : value.toFixed(2);
            this.setValueById(htmlID, value);
        },
        /**
         * Replace innerHTML value of an element with rendered latex expression
         * @param {string} htmlID the id of element on which we want to use to display LaTex in its innerHTML
         * @param {string} latexExp LaTeX expression
         */
        displayLaTeX(htmlID, latexExp) {
            document.getElementById(htmlID).innerHTML = katex.renderToString(latexExp);
        }
    }
});
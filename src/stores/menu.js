import { defineStore } from 'pinia'

import { graphStore } from './graph.js'
import katex from 'katex';

export const menuStore = defineStore('menu', {
    actions: {
        /**
         * Sets hmtl element display style to "inline"
         * 
         * @param {string} htmlID id of the HTML element
         */
        displayElementById(htmlID) {
            document.getElementById(htmlID).style.display = "inline";
        },
        /**
         * Sets hmtl element display style to "none"
         * 
         * @param {string} htmlID id of the HTML element
         */
        hideElementById(htmlID) {
            document.getElementById(htmlID).style.display = "none";
        },
        /**
         * Sets hmtl element display style to "inline"
         * 
         * @param {string} htmlID id of the HTML element
         */
        setValueById(htmlID, value) {
            document.getElementById(htmlID).value = value;
        },
        /**
         * Gets the value of the element
         * 
         * @param {string} htmlID id of the HTML element
         * @return {string} element.value
         */
        getValueById(htmlID) {
            return document.getElementById(htmlID).value;
        },
        /**
         * Gets the value of an input and parse it into a integer.
         * 
         * @param {string} htmlID id of the HTML element
         * @return integer or NaN
         */
        getIntFromInputId(htmlID) {
            return Number.parseInt(this.getValueById(htmlID));
        },
        /**
         * Gets the value of an input and parse it into a float.
         * 
         * @param {string} htmlID id of the HTML element
         * @return float or NaN
         */
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
        /**
         * Fill an input field with a value from the expressions list 
         * in DesmosAPI.
         * 
         * @param {string} graphExp expression in the expression list (e.g "x_{1}")
         * @param {*} inputHtmlID id of the input field
         */
        setInputValueFromGraphExpValue(htmlID, exp) {
            const graphS = graphStore();

            let value = graphS.getExpValue(exp);
            // si le nombre est un float, on fixe 2 décimales
            value = !Number.isNaN(value) && Number.isInteger(value) ? value : value.toFixed(2);
            this.setValueById(htmlID, value);
        },
        /**
         * Replace innerHTML value of an element with rendered latex expression
         * 
         * @param {string} htmlID the id of element on which we want to use to display LaTex in its innerHTML
         * @param {string} latexExp LaTeX expression
         */
        displayLaTeX(htmlID, latexExp) {
            document.getElementById(htmlID).innerHTML = katex.renderToString(latexExp);
        }
    }
});
import Desmos from 'desmosapi';

/** Class representing a graphic calculator. */
export class Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element) {
    this.element = document.getElementById(element);
    if (this.element == undefined) {
      throw new Error(`Element : ${element} does not exist.`)
    }
    this.calculator = Desmos.GraphingCalculator(this.element, {
      keypad: false,
      language: "fr",
      showResetButtonOnGraphpaper: true,
      //settingsMenu: false,
      border: false,
      expressionsCollapsed: true,
      autosize: true,
      //invertedColors:true,
      expressions: false,
    });
    this.showExpressions();
    this.pointId = 0;
    this.lineId = 0;
    this.segmentId = 0;
  }

  static Colors = {
    curve: "#eb9671",
    point: "#2c3e50",
    line: "#000000",
    segment: "#2d70b3",
    finalPoint: "#ff0000",
    pointOnCurve: "#388c46"
  }

  get getElement() {
    return this.element;
  }

  get getcalculator() {
    return this.calculator;
  }

  /**
   * show the expressions tab on the left of the graph
   */
  showExpressions() {
    this.calculator.updateSettings({
      expressions: true
    });
  }

  /**
   * Save the current state of the graphic. This state can be loaded by using loadGraphicState()
   */
  saveGraphicState() {
    this.savedState = this.calculator.getState();
  }

  restoreGraphicState() {
    if (this.graphicState) {
      this.calculator.setExpressions(this.graphicState);
    }
  }

  /**
   * Load the latest state of the graphic. A state can be saved using saveGraphicState()
   */
  loadGraphicState() {
    this.calculator.setState(this.savedState);
  }

  /**
   * Reset the calculator to a blank state (empty)
   */
  setBlankState() {
    this.lineId = 0;
    this.pointId = 0;
    this.segmentId = 0;
    this.calculator.setBlank();
  }

  /**
   * Return the Desmos Expression giving his id
   * @param id - The id of the Desmos Expression
   * @returns The expression
   */
  getExpressionById(id) {
    let exp = this.calculator.getExpressions().find(element => element.id == id);
    if (exp == undefined) {
      console.warn(`id : ${id} does not exist.`);
    }
    return exp;
  }



  /**
   * Set the parameters of an expression giving her id.
   * @param exp - The expression which you want to change the parameters of
   * @param params - Parameters to change as an object see https://www.desmos.com/api/v1.6/docs/index.html?lang=fr#document-manipulating-expressions
   */
  setExpressionParameters(exp, params) {
    let oldExp = this.getExpressionById(exp);
    if (oldExp == undefined) return;
    delete oldExp['domain'];
    for (const [key, value] of Object.entries(params)) {
      oldExp[key] = value;
    }
    this.calculator.setExpression(oldExp);
    return exp;
  }

  /**
  * add a draggable point on the graph giving his coordinates
  * 
  * @param {array} P - The point coordinates as an array 
  * @return {number} return the id of the point created.
  */
  addDraggablePoint(P, Axis) {
    if (!Array.isArray(P)) {
      throw new Error("Wrong Inputs. 'P' must be an array");
    }
    else if (Axis != 'X' && Axis != 'Y' && Axis != 'XY' && Axis != 'NONE') {
      throw new Error("Wrong Inputs. 'Axis' must be either 'X','Y', 'XY' or 'NONE'");
    }

    try {
      this.pointId++;
      this.calculator.setExpressions([
        { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=${P[0]}` },
        { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=${P[1]}` },
        { id: `p_{${this.pointId}}`, latex: `(x_{${this.pointId}},y_{${this.pointId}})`, showLabel: true, dragMode: Axis, color: Graphic.Colors.point }
      ]);
      return this.pointId;
    } catch (error) {
      throw new Error(`An error has occured creating the point : ${error}`);
    }
  }

  /**
  * add a static point (not draggable) on the graph giving his coordinates
  * 
  * @param {array} P - The point coordinates as an array 
  * @return {number} return the id of the point created.
  */
  addStaticPoint(P) {
    return this.addDraggablePoint(P, 'NONE');
  }

  /**
   * update a point position on the graph giving his id and his new coordinates
   * 
   * @param {number} id - The id of the point to update
   * @param {array} newP - The new point coordinates as an array
   */
  updatePoint(id, newP) {
    if (typeof id != "number" || !Array.isArray(newP)) {
      throw new Error("Wrong Inputs. 'id' must be a number and 'newP' must be an array");
    }

    if (id > this.pointId) {
      throw new Error(`Selected point : ${id} do not exist. Number of points : ${this.pointId}`);
    }

    try {
      this.setValueOfParameter(`x_{${id}}`, newP[0]);
      this.setValueOfParameter(`y_{${id}}`, newP[1]);
    } catch (error) {
      throw new Error(`Point ${id} not found : ${error}`);
    }
  }

  /**
   * Change the value of a parameter for example : x_{i}, y_{i}, a_{i}, g_{i}, b_{i} etc...
   * @param param - The parameter you want to change the value
   * @param value - The value you want to put in this parameter
   */
  setValueOfParameter(param, value) {
    this.calculator.setExpression({ id: `${param}`, latex: `${param}=${value}` })
  }

  /**
   * Get the value of a parameter for example : x_{i}, y_{i}, a_{i}, g_{i}, b_{i} etc...
   * @param param - The parameter from where you want to extract the value
   * @returns The value of the parameter
   */
  getValueOfParameter(param) {
    return this.calculator.model.expressionAnalysis[param].evaluation.value;
  }

  /**
   * add a straight line on the graph giving : gradient, b of the equation Y = gradient * X + b
   * 
   * @param {number} gradient - The gradiant of the equation Y = gradient * X + b 
   * @param {number} b - The b of the equation Y = gradient * X + b 
   * @return {number} return the id of the line created.
   */
  addLine(gradient, b) {
    if (typeof gradient != "number" || typeof b != "number") {
      throw new Error("'grandiant' and 'b' must be numbers");
    }

    try {
      this.lineId++;
      this.calculator.setExpressions([
        { id: `g_{${this.lineId}}`, latex: `g_{${this.lineId}}=${gradient}` },
        { id: `b_{${this.lineId}}`, latex: `b_{${this.lineId}}=${b}` },
        { id: `l_{${this.lineId}}`, latex: `y_{l${this.lineId}} = g_{${this.lineId}}*x + b_{${this.lineId}}` }
      ]);
      return this.lineId;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }

  /**
   * add a straight line on the graph between two points 
   * 
   * @param {number} idP - The id of the first point 
   * @param {number} idQ - The id of the second point 
   * @return {number} - return the id of the line created.
   */
  addLineBetweenTwoPoints(idP, idQ) {
    if (typeof idP != "number" || typeof idQ != "number") {
      throw new Error("'idP' and 'idQ' must be numbers");
    }

    if (idP > this.pointId || idQ > this.pointId) {
      throw new Error(`Selected points : ${idP},${idQ} do not exist. Number of points : ${this.pointId}`);
    }

    try {
      this.lineId++;
      this.calculator.setExpressions([
        { id: `n_{${this.lineId}}`, latex: `n_{${this.lineId}}=y_{${idP}}-y_{${idQ}}` },
        { id: `d_{${this.lineId}}`, latex: `d_{${this.lineId}}=x_{${idP}}-x_{${idQ}}` },
        { id: `g_{${this.lineId}}`, latex: `g_{${this.lineId}}=\\frac{n_{${this.lineId}}}{d_{${this.lineId}}}` },
        { id: `l_{${this.lineId}}`, latex: `-n_{${this.lineId}}*x + d_{${this.lineId}}*y= x_{${idP}}y_{${idQ}}-y_{${idP}}x_{${idQ}}`, lineOpacity: 0.3 }
      ]);
      return this.lineId;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }

  /**
   * update a line position on the graph giving his id and his new coordinates
   * 
   * @param {number} id - The id of the line to update
   * @param {array} newP - The new point coordinates as an array
   */
  updateLine(id, newGradient, newB) {
    if (typeof id != "number" || typeof newGradient != "number" || typeof newB != "number") {
      throw new Error("Wrong Inputs. 'id', 'newline' and 'b' must be numbers");
    }

    if (id > this.lineId) {
      throw new Error(`Selected line : ${id} do not exist. Number of lines : ${this.lineId}`);
    }

    try {
      this.setValueOfParameter(`g_{${id}}`, newGradient);
      this.setValueOfParameter(`b_{${id}}`, newB);
    } catch (error) {
      throw new Error(`Line ${id} not found : ${error}`);
    }
  }

  /**
   * add a straight line on the graph between two points 
   * 
   * @param {array} coordinatesX - An array of the x pos to link 
   * @param {array} coordinatesY - An array of the y pos to link 
   * @return {number} - return the id of the segment created.
   */
  addSegment(coordinatesX, coordinatesY) {
    if (!Array.isArray(coordinatesX) || !Array.isArray(coordinatesY)) {
      throw new Error(`'coordinatesX' and 'coordinatesY' must be arrays. Given : ${typeof coordinatesX} and ${typeof coordinatesY}`)
    }

    this.segmentId++;
    this.calculator.setExpression({
      id: `s_{${this.segmentId}}`,
      type: 'table',
      columns: [
        {
          latex: `s_{x${this.segmentId}}`,
          values: coordinatesX
        },
        {
          latex: `s_{y${this.segmentId}}`,
          values: coordinatesY,
          color: Graphic.Colors.segment,
          hidden: false,
          pointStyle: "OPEN",
          lineStyle: "DASHED",
          points: false,
          lines: true
        }
      ]
    });

    return this.segmentId;
  }

  /**
   * Show all the lines
   * @param areLinesVisible - true if you want to show the lines, false if not
   */
  showLines(areLinesVisible) {
    for (let id = 1; id <= this.lineId; id++) {
      this.calculator.setExpression({ id: `l_{${id}}`, hidden: areLinesVisible })
    }
  }

  /**
   * Show all the lines
   * @param areLabelsVisible - true if you want to show the lines, false if not
   */
  showLabels(areLabelsVisible) {
    for (let id = 1; id <= this.pointId; id++) {
      this.calculator.setExpression({ id: `p_{${id}}`, showLabel: areLabelsVisible })
    }
  }

  /**
   * Show all the Segments
   * @param areSegmentsVisible - true if you want to show the Segments, false if not
   */
  showSegments(areSegmentsVisible) {
    for (let id = 1; id <= this.segmentId; id++) {
      this.calculator.setExpression({ id: `s_{${id}}`, hidden: areSegmentsVisible })
    }
  }
}

/** Class representing a real elliptic curve.*/
export class RealCurveGraph extends Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element) {
    super(element);
  }

  /**
   * show the curve on the graph
   */
  showCurve() {
    throw new Error('You have to implement the method showCurve for this curve!');
  }

  /**
   * add a point on the curve giving his x position on the graph
   * @param {number} xPos - The point X coordinate 
   * @return {number} return the id of the point created.
   */
  addCurvePoint() {
    throw new Error('You have to implement the method addCurvePoint for this curve!');
  }

  /**
   * create a point in the expression list giving his x position, the expression of his y value(positive and negative)
   * @param {number} xPos - The point X coordinate 
   * @param {number} yPositiveExpression - The expression of the positive solution of y in latex
   * @param {number} yNegativeExpression - The expression of the negative solution of y in latex
   */
  addCurvePointInExpressions(xPos, yPositiveExpression, yNegativeExpression,) {
    this.calculator.setExpressions([
      { id: `x_{${this.pointId}}`, latex: `x_${this.pointId}=${xPos}` },
      { id: `y_{p${this.pointId}}`, latex: `y_{p${this.pointId}}=${yPositiveExpression}` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=${yNegativeExpression}` },
      { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}} = y_{p${this.pointId}}` },
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}}=(x_{${this.pointId}},y_{${this.pointId}})`, color: Graphic.Colors.point }
    ]);
  }
}


/** Class representing a modular elliptic curve.*/
export class ModCurveGraph extends Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element, p) {
    super(element);
    this.p = p;
    this.calculator.updateSettings({
      showGrid: false,
      showXAxis: false,
      showYAxis: false,
    });
    // Set the center point of the screen (only for the user, not for the graph)
    //this.calculator.setMathBounds({ bottom: -0.5-this.p/2, top: 1.5*this.p/2 + 0.5, left: -0.5-this.p/2, right: 0.5+this.p/2});
    let mathCoordinates = this.calculator.graphpaperBounds.mathCoordinates;
    let height = mathCoordinates.top-mathCoordinates.bottom;
    let width = mathCoordinates.right-mathCoordinates.left;
    this.height = height;
    this.width = width;

      // Set the border of the screen
    this.calculator.setExpression({id:'border',latex:`\\operatorname{polygon}([(-${this.p/2},-${this.p/2}),(${this.p/2},-${this.p/2}),(${this.p/2},${this.p/2}),(-${this.p/2},${this.p/2})])`,fill:0,color:Graphic.Colors.line});
    this.listCoordPoints = [];
    this.selectedPoints = [[undefined, undefined], [undefined, undefined]];
    this.idSelectedPoints = [0, 0];
  }

  /**
   * Display all static points of the modular curve from the list of points
   */
  displayPoints() {
    var that = this;
    let listPoints = this.listCoordPoints;
    listPoints.forEach(function (item) {
      that.addStaticPoint(item);
    });
    that.setExpressionParameters(`p_{${listPoints.length}}`, { label: 'Infinity' });
    var i=0;
    try {
      this.calculator.setExpressions([
          { id: `L_{3}`, latex: `L_{3}=\\left[-${Math.floor(this.p/2)}...${Math.floor(this.p/2)}\\right]` }, // Here to set the position of points on the x axis
      ]);
    } catch (error) {
      throw new Error(`An error has occured adding modular lines : ${error}`);
    }
    for(i=0; i<this.p; i++){
      try{
        this.calculator.setExpressions([
          { id: `q_{${i}}`, latex: `q_{${i}}=(L_{3},${i-Math.floor(this.p/2)})`, pointOpacity: 0.4, pointSize: 6, color: Graphic.Colors.point}, // Here to set the position of points on the y axis
      ]);
      }catch (error) {
        throw new Error(`An error has occured adding modular lines : ${error}`);
      }
    }
  }
  /**
   * Recover the coordinates of two points and display modulo and the result of addition
   */
  addClickPoints() {
    let listPoints = this.listCoordPoints;
    var isSecondPoint = false;
    var isTheSamePoint = false;
    var that = this;
    var i = 1;
    // Find the pixel coordinates of the graphpaper origin:
    // that.calculator.mathToPixels({ x: 0, y: 0 });
    // Find the math coordinates of the mouse
    var calculatorRect = that.element.getBoundingClientRect();
    this.element.addEventListener('click', function click(evt) {
      // when user click on the screen, we go into this function
      try {
        var coordonnees_souris = that.calculator.pixelsToMath({
          x: evt.clientX - calculatorRect.left,
          y: evt.clientY - calculatorRect.top
        })
        var x = coordonnees_souris.x;
        var y = coordonnees_souris.y;
        // We round the coordinates to have the same coordinates as the points
        var x_arrondi = Math.round(x);
        var y_arrondi = Math.round(y);
        // This variable is used at the end to know if the user clicked on a point to know if we have to do something
        var changed = false;
        for (i = 1; i < listPoints.length; i++) {
          // Checking if the user clicked on a point
          if ((x_arrondi == that.getValueOfParameter(`x_{${i}}`)) && (y_arrondi == that.getValueOfParameter(`y_{${i}}`))) {
            // isSecondPoint alternate between True and False
            isSecondPoint ? that.selectedPoints[1] = [x_arrondi, y_arrondi] : that.selectedPoints[0] = [x_arrondi, y_arrondi];
            isSecondPoint ? that.idSelectedPoints[1] = i : that.idSelectedPoints[0] = i;
            isSecondPoint = !isSecondPoint;
            changed = true;
          }
        }
        // If the infinite point is selected
        if (((that.getValueOfParameter(`x_{${listPoints.length}}`)-0.5) <= x_arrondi) && (x_arrondi <= (that.getValueOfParameter(`x_{${listPoints.length}}`)+0.5)) && ((that.getValueOfParameter(`y_{${listPoints.length}}`)-0.5) <= y_arrondi) && (y_arrondi <= (that.getValueOfParameter(`y_{${listPoints.length}}`)+0.5))) {
          if(isSecondPoint){
            that.selectedPoints[1] = [undefined, undefined];
            that.idSelectedPoints[1] = listPoints.length;
          }else{
            that.selectedPoints[0] = [undefined, undefined];
            that.idSelectedPoints[0] = listPoints.length;
          }
          isSecondPoint = !isSecondPoint;
          changed = true;
        } 

        var point1 = that.newPoint(
          that.selectedPoints[0][0],
          that.selectedPoints[0][1],
        );
        var point2 = that.newPoint(
          that.selectedPoints[1][0],
          that.selectedPoints[1][1],
        );

        // If the user clicked on the infinity point, we set the point to infinity
        if(that.idSelectedPoints[0] == listPoints.length){
          point1.inf = true;
        }
        if(that.idSelectedPoints[1] == listPoints.length){
          point2.inf = true;
        }
        
        // If the user didn't click on a point or it is his first clicked point, we do nothing
        if ( ((that.selectedPoints[1][0] == undefined && that.selectedPoints[1][1] == undefined) && !point2.isInfinity()) || changed === false ){
          return;
        }

        isTheSamePoint=that.equalPoints(point1,point2);
        let addCoordPoint = that.addPoints(point1, point2);

        // Display the result of the addition in the menu
        document.getElementById("result-x-y-shortmod").innerHTML = `(${addCoordPoint[0]},   ${addCoordPoint[1]})`;

        that.displayModulo();

        if(point1.inf || point2.inf){
          that.displayInfinity();
          isTheSamePoint = true;
        }
        //If the two points have the same absolute y-coordinate or it is the same point with a y-coordinate value equal to 0, the result is infinity
        if ((((Math.abs(that.selectedPoints[0][1]) == Math.abs(that.selectedPoints[1][1])) && (that.selectedPoints[0][0] == that.selectedPoints[1][0])) && (!isTheSamePoint)) || (isTheSamePoint && that.selectedPoints[0][1] == 0 && that.selectedPoints[1][1] == 0) || (point1.inf && point2.inf)){
          isTheSamePoint = true;
          addCoordPoint = that.newPoint(null, null);
          addCoordPoint.inf = true;
          addCoordPoint = that.getCoord(addCoordPoint);
          document.getElementById("result-x-y-shortmod").innerHTML = `(Infinity, Infinity)`;
        }

        // To know is infinity is one of the clicked points (and only one !)
        let isInfinityAPointOnCurve = point1.inf ^ point2.inf;

        that.displayAddPoint(addCoordPoint, isTheSamePoint, isInfinityAPointOnCurve);
      } catch (error) {
        //console.warn("error : " + error);
      }
    });
  }
}

export class PModCurveGraph extends Graphic{
  /**
   * Represents a graphic calculator
   * @constructor
   * @param {string} element - The id of the element where the calculator will be displayed
   */
  constructor(element, p) {
    super(element);
    this.p = p;
    
    let mathCoordinates = this.calculator.graphpaperBounds.mathCoordinates;
    this.height = mathCoordinates.top - mathCoordinates.bottom;
    this.width = mathCoordinates.right - mathCoordinates.left;

    const debounce = () => {
        let mathCoordinates = this.calculator.graphpaperBounds.mathCoordinates;
        this.height = mathCoordinates.top - mathCoordinates.bottom;
        this.width = mathCoordinates.right - mathCoordinates.left;

        // if listPoints exist, we remove them
        if(this.listPoints != undefined){
          for(let i = 0; i < this.listPoints.length; i++){
            this.calculator.removeExpression({id:`x_{${i}}`});
            this.calculator.removeExpression({id:`y_{${i}}`});
            this.calculator.removeExpression({id:`p_{${i}}`});
          }
        }
        this.pointId = 0;
        this.findAllPoints();
        this.displayPoints();
        this.addClickPoints();
    };
    // event listener when button "update" is clicked
    document.querySelector('#update').addEventListener('click', debounce);

      // Set the border of the screen
    this.calculator.setExpression({id:'border',latex:`\\operatorname{polygon}([(-${this.p/2},-${this.p/2}),(${this.p/2},-${this.p/2}),(${this.p/2},${this.p/2}),(-${this.p/2},${this.p/2})])`,fill:0,color:Graphic.Colors.line, lineOpacity: 0.2});
    this.listCoordPoints = [];
    this.selectedPoints = [[undefined, undefined], [undefined, undefined]];
    this.idSelectedPoints = [0, 0];

    // Update the position of the infinity point when the screen is resized
    this.calculator.observe('graphpaperBounds', this.updateInfinityPosition.bind(this));
  }

    /**
   * Display all static points of the modular curve from the list of points
   */
    displayPoints() {
      var that = this;
      let listPoints = this.listCoordPoints;
      listPoints.forEach(function (item) {
        that.addStaticPoint(item);
      });
      that.setExpressionParameters(`p_{${listPoints.length}}`, { label: 'Infinity' });
      var i=0;
      try {
        this.calculator.setExpressions([
            { id: `L_{3}`, latex: `L_{3}=\\left[-${Math.floor(this.width/2)}...${Math.floor(this.width/2)}\\right]` }, // Here to set the position of points on the x axis
        ]);
      } catch (error) {
        throw new Error(`An error has occured adding modular lines : ${error}`);
      }
      for(i=0; i<this.height; i++){
        try{
          this.calculator.setExpressions([
            { id: `q_{${i}}`, latex: `q_{${i}}=(L_{3},${i-Math.floor(this.height/2)})`, pointOpacity: 0.4, pointSize: 6, color: Graphic.Colors.point}, // Here to set the position of points on the y axis
        ]);
        }catch (error) {
          throw new Error(`An error has occured adding modular lines : ${error}`);
        }
      }
    }
    /**
     * Recover the coordinates of two points and display modulo and the result of addition
     */
    addClickPoints() {
      let listPoints = this.listCoordPoints;
      var isSecondPoint = false;
      var isTheSamePoint = false;
      var that = this;
      var i = 1;
      // Find the pixel coordinates of the graphpaper origin:
      // that.calculator.mathToPixels({ x: 0, y: 0 });
      // Find the math coordinates of the mouse
      var calculatorRect = that.element.getBoundingClientRect();
      this.element.addEventListener('click', function click(evt) {
        // when user click on the screen, we go into this function
        try {
          var coordonnees_souris = that.calculator.pixelsToMath({
            x: evt.clientX - calculatorRect.left,
            y: evt.clientY - calculatorRect.top
          })
          var x = coordonnees_souris.x;
          var y = coordonnees_souris.y;
          // We round the coordinates to have the same coordinates as the points
          var x_arrondi = Math.round(x);
          var y_arrondi = Math.round(y);
          // This variable is used at the end to know if the user clicked on a point to know if we have to do something
          var changed = false;
          for (i = 1; i < listPoints.length; i++) {
            // Checking if the user clicked on a point
            if ((x_arrondi == that.getValueOfParameter(`x_{${i}}`)) && (y_arrondi == that.getValueOfParameter(`y_{${i}}`))) {
              // isSecondPoint alternate between True and False
              isSecondPoint ? that.selectedPoints[1] = [x_arrondi, y_arrondi] : that.selectedPoints[0] = [x_arrondi, y_arrondi];
              isSecondPoint ? that.idSelectedPoints[1] = i : that.idSelectedPoints[0] = i;
              isSecondPoint = !isSecondPoint;
              changed = true;
            }
          }
          // If the infinite point is selected
          if (((that.getValueOfParameter(`x_{${listPoints.length}}`)-0.5) <= x_arrondi) && (x_arrondi <= (that.getValueOfParameter(`x_{${listPoints.length}}`)+0.5)) && ((that.getValueOfParameter(`y_{${listPoints.length}}`)-0.5) <= y_arrondi) && (y_arrondi <= (that.getValueOfParameter(`y_{${listPoints.length}}`)+0.5))) {
            if(isSecondPoint){
              that.selectedPoints[1] = [undefined, undefined];
              that.idSelectedPoints[1] = listPoints.length;
            }else{
              that.selectedPoints[0] = [undefined, undefined];
              that.idSelectedPoints[0] = listPoints.length;
            }
            isSecondPoint = !isSecondPoint;
            changed = true;
          } 
  
          var point1 = that.newPoint(
            that.selectedPoints[0][0],
            that.selectedPoints[0][1],
          );
          var point2 = that.newPoint(
            that.selectedPoints[1][0],
            that.selectedPoints[1][1],
          );

          console.log(that.selectedPoints[0][0], that.selectedPoints[0][1], that.selectedPoints[1][0], that.selectedPoints[1][1]);
  
          // If the user clicked on the infinity point, we set the point to infinity
          if(that.idSelectedPoints[0] == listPoints.length){
            point1.inf = true;
          }
          if(that.idSelectedPoints[1] == listPoints.length){
            point2.inf = true;
          }
          console.log(point1.inf, point2.inf);
          
          // If the user didn't click on a point or it is his first clicked point, we do nothing
          if ( ((that.selectedPoints[1][0] == undefined && that.selectedPoints[1][1] == undefined) && !point2.isInfinity()) || changed === false ){
            return;
          }
  
          isTheSamePoint=that.equalPoints(point1,point2);
          let addCoordPoint = that.addPoints(point1, point2);
  
          // Display the result of the addition in the menu
          document.getElementById("result-x-y-shortmod").innerHTML = `(${addCoordPoint[0]},   ${addCoordPoint[1]})`;
  
          that.displayModulo();
  
          if(point1.inf || point2.inf){
            that.displayInfinity();
            isTheSamePoint = true;
          }
          //If the two points have the same absolute y-coordinate or it is the same point with a y-coordinate value equal to 0, the result is infinity
          if ((((Math.abs(that.selectedPoints[0][1]) == Math.abs(that.selectedPoints[1][1])) && (that.selectedPoints[0][0] == that.selectedPoints[1][0])) && (!isTheSamePoint)) || (isTheSamePoint && that.selectedPoints[0][1] == 0 && that.selectedPoints[1][1] == 0) || (point1.inf && point2.inf)){
            isTheSamePoint = true;
            addCoordPoint = that.newPoint(null, null);
            addCoordPoint.inf = true;
            addCoordPoint = that.getCoord(addCoordPoint);
            document.getElementById("result-x-y-shortmod").innerHTML = `(Infinity, Infinity)`;
          }
  
          // To know is infinity is one of the clicked points (and only one !)
          let isInfinityAPointOnCurve = point1.inf ^ point2.inf;

          that.displayAddPoint(addCoordPoint, isTheSamePoint, isInfinityAPointOnCurve);
        } catch (error) {
          //console.warn("error : " + error);
        }
      });
    }

    updateInfinityPosition(){
      let listPoints = this.listPoints;
      let listCoordPoints = this.listCoordPoints;
  
      // remove the last point
      this.calculator.removeExpression({id:`x_{${listPoints.length}}`});
      this.calculator.removeExpression({id:`y_{${listPoints.length}}`});
      this.calculator.removeExpression({id:`p_{${listPoints.length}}`});
  
      // remove the last point from the list
      listPoints.pop();
      listCoordPoints.pop();
  
      // add the new infinity point
      listCoordPoints.push([0, this.calculator.graphpaperBounds.mathCoordinates.top - 0.5]);
      listPoints.push(this.newPoint(null, null));
  
      // add the new point to the calculator
      this.pointId--;
      this.addStaticPoint(listCoordPoints[listCoordPoints.length - 1]);
      this.setExpressionParameters(`p_{${listPoints.length}}`, { label: 'Infinity' });
    }
}
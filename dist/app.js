"use strict";
var App;
(function (App) {
    App.Utils = StructVisorAPI.Utils;
    App.Errors = StructVisorAPI.Errors;
    App.Animations = StructVisorAPI.Animations;
    let Theme;
    (function (Theme) {
        Theme.dynamicColor = StructVisorAPI.Theme.dynamicColor;
    })(Theme = App.Theme || (App.Theme = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        let Controls;
        (function (Controls) {
            Controls.BaseControl = StructVisorAPI.Visualizer.Controls.BaseControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
        let Graphics;
        (function (Graphics) {
            Graphics.BaseGraphic = StructVisorAPI.Visualizer.Graphics.BaseGraphic;
            Graphics.GraphicCollection = StructVisorAPI.Visualizer.Graphics.GraphicCollection;
            Graphics.GraphicMap = StructVisorAPI.Visualizer.Graphics.GraphicMap;
            Graphics.getViewSize = StructVisorAPI.Visualizer.Graphics.getViewSize;
            Graphics.addEventListener = StructVisorAPI.Visualizer.Graphics.addEventListener;
            Graphics.removeEventListener = StructVisorAPI.Visualizer.Graphics.removeEventListener;
            Graphics.clearEventListener = StructVisorAPI.Visualizer.Graphics.clearEventListeners;
            Graphics.checkDisplay = StructVisorAPI.Visualizer.Graphics.checkDisplay;
            Graphics.convertToCanvasPosition = StructVisorAPI.Visualizer.Graphics.convertToCanvasPosition;
            Graphics.insert = StructVisorAPI.Visualizer.Graphics.insert;
            Graphics.extract = StructVisorAPI.Visualizer.Graphics.extract;
            Graphics.moveToFront = StructVisorAPI.Visualizer.Graphics.moveToFront;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            class TextControl extends Controls.BaseControl {
                constructor(options) {
                    super(options);
                    this._setOptions(options);
                }
                get placeholder() {
                    return this._htmlElement.placeholder;
                }
                set placeholder(placeholder) {
                    this._htmlElement.placeholder = placeholder;
                }
                get value() {
                    return this._htmlElement.value;
                }
                set value(value) {
                    this._htmlElement.value = value;
                }
                _setOptions(options) {
                    if ('placeholder' in options) {
                        this.placeholder = options.placeholder;
                    }
                    if ('value' in options) {
                        this.value = options.value;
                    }
                }
                _createHtmlElement(options) {
                    const htmlElement = document.createElement('input');
                    htmlElement.type = 'text';
                    htmlElement.placeholder = options.placeholder;
                    htmlElement.classList.add('standard-input');
                    return htmlElement;
                }
            }
            Controls.TextControl = TextControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            class NumberControl extends Controls.BaseControl {
                constructor(options) {
                    super(options);
                    this._setOptions(options);
                }
                get value() {
                    return Number(this._htmlElement.value);
                }
                set value(value) {
                    this._htmlElement.value = String(value);
                    this._validateValue();
                }
                get placeholder() {
                    return this._htmlElement.placeholder;
                }
                set placeholder(placeholder) {
                    this._htmlElement.placeholder = placeholder;
                }
                _setOptions(options) {
                    if ('value' in options) {
                        this.value = options.value;
                    }
                    if ('placeholder' in options) {
                        this.placeholder = options.placeholder;
                    }
                    if ('min' in options) {
                        this._htmlElement.min = String(options.min);
                    }
                    if ('max' in options) {
                        this._htmlElement.max = String(options.max);
                    }
                }
                _createHtmlElement(options) {
                    const htmlElement = document.createElement('input');
                    htmlElement.type = 'number';
                    htmlElement.placeholder = options.placeholder;
                    htmlElement.classList.add('standard-input');
                    htmlElement.addEventListener('change', () => this._validateValue());
                    return htmlElement;
                }
                _validateValue() {
                    const value = Number(this._htmlElement.value);
                    const min = Number(this._htmlElement.min);
                    const max = Number(this._htmlElement.max);
                    if (this._htmlElement.min.length > 0 && value < min) {
                        this.value = min;
                    }
                    else if (this._htmlElement.max.length > 0 && value > max) {
                        this.value = max;
                    }
                }
            }
            Controls.NumberControl = NumberControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            class ButtonControl extends Controls.BaseControl {
                constructor(options) {
                    super(options);
                }
                get value() {
                    return this._htmlElement.value;
                }
                set value(value) {
                    this._htmlElement.value = value;
                }
                _setOptions(options) {
                    if ('value' in options) {
                        this.value = options.value;
                    }
                }
                _createHtmlElement(options) {
                    const htmlElement = document.createElement('input');
                    htmlElement.type = 'button';
                    htmlElement.value = options.value;
                    htmlElement.classList.add('standard-button');
                    if (options.onclick !== undefined) {
                        htmlElement.addEventListener('click', options.onclick);
                    }
                    return htmlElement;
                }
            }
            Controls.ButtonControl = ButtonControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            class SelectControl extends Controls.BaseControl {
                constructor(options = {}) {
                    var _a;
                    super(options);
                    this._items = [];
                    for (const item of (_a = options.items) !== null && _a !== void 0 ? _a : []) {
                        item.insertTo(this);
                    }
                }
                get selected() {
                    var _a;
                    return (_a = this._items[this._htmlElement.selectedIndex]) !== null && _a !== void 0 ? _a : null;
                }
                insert(item, htmlElement) {
                    if (item.checkHtmlElementReference(htmlElement)) {
                        this._items.push(item);
                        this._htmlElement.appendChild(htmlElement);
                    }
                }
                extract(item, htmlElement) {
                    if (item.checkHtmlElementReference(htmlElement)) {
                        this._items.splice(this._items.indexOf(item), 1);
                        this._htmlElement.removeChild(htmlElement);
                    }
                }
                extractAll() {
                    for (const item of this._items) {
                        item.extractFrom(this);
                    }
                }
                _setOptions() { }
                _createHtmlElement() {
                    const htmlElement = document.createElement('select');
                    htmlElement.classList.add('standard-input');
                    return htmlElement;
                }
            }
            Controls.SelectControl = SelectControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            class CheckboxControl extends Controls.BaseControl {
                constructor(options) {
                    super(options);
                }
                get isChecked() {
                    return this._htmlElement.classList.contains('checked');
                }
                set isChecked(isChecked) {
                    if (this.isChecked !== isChecked) {
                        this._htmlElement.classList.toggle('checked');
                    }
                }
                _setOptions(options) {
                    if ('isChecked' in options) {
                        this.isChecked = options.isChecked;
                    }
                }
                _createHtmlElement(options) {
                    const blockHtmlElement = document.createElement('div');
                    const inputHtmlElement = document.createElement('div');
                    const valueHtmlElement = document.createElement('div');
                    blockHtmlElement.classList.add('standard-checkbox');
                    inputHtmlElement.classList.add('standard-checkbox-input');
                    valueHtmlElement.classList.add('standard-checkbox-value');
                    blockHtmlElement.appendChild(inputHtmlElement);
                    blockHtmlElement.appendChild(valueHtmlElement);
                    valueHtmlElement.innerText = options.value;
                    inputHtmlElement.addEventListener('click', () => this.isChecked = !this.isChecked);
                    inputHtmlElement.addEventListener('touchstart', () => this.isChecked = !this.isChecked);
                    if (options.oncheck !== undefined) {
                        inputHtmlElement.addEventListener('click', options.oncheck);
                        inputHtmlElement.addEventListener('touchstart', options.oncheck);
                    }
                    return blockHtmlElement;
                }
            }
            Controls.CheckboxControl = CheckboxControl;
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Controls;
        (function (Controls) {
            var Items;
            (function (Items) {
                class SelectControlItem {
                    constructor(target) {
                        this.target = target;
                        this._isInserted = false;
                        this._htmlElement = document.createElement('option');
                        this._htmlElement.innerText = String(target);
                    }
                    checkHtmlElementReference(htmlElement) {
                        return this._htmlElement === htmlElement;
                    }
                    insertTo(control) {
                        if (!this._isInserted) {
                            this._isInserted = true;
                            control.insert(this, this._htmlElement);
                        }
                    }
                    extractFrom(control) {
                        if (this._isInserted) {
                            this._isInserted = false;
                            control.insert(this, this._htmlElement);
                        }
                    }
                }
                Items.SelectControlItem = SelectControlItem;
            })(Items = Controls.Items || (Controls.Items = {}));
        })(Controls = Visual.Controls || (Visual.Controls = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Graphics;
        (function (Graphics) {
            class Line extends Graphics.BaseGraphic {
                constructor(bounds, from, to, options = {}) {
                    super(bounds, options);
                    this._countArrows = 0;
                    this._lengthArrows = 10;
                    this.from = from;
                    this.from.addChangeListener(() => this._update());
                    this.to = to;
                    this.to.addChangeListener(() => this._update());
                    this._setOptions(options);
                }
                get countArrows() {
                    return this._countArrows;
                }
                set countArrows(countArrows) {
                    if (this._countArrows !== countArrows) {
                        this._countArrows = countArrows;
                        this._update();
                    }
                }
                get lengthArrows() {
                    return this._lengthArrows;
                }
                set lengthArrows(lengthArrows) {
                    if (this._lengthArrows !== lengthArrows && this._lengthArrows > 0) {
                        this._lengthArrows = lengthArrows;
                        this._update();
                    }
                }
                _setOptions(options) {
                    if ('countArrows' in options) {
                        this.countArrows = options.countArrows;
                    }
                    if ('lengthArrows' in options) {
                        this.lengthArrows = options.lengthArrows;
                    }
                }
                _render(context) {
                    context.beginPath();
                    context.moveTo(this.from.x, this.from.y);
                    context.lineTo(this.to.x, this.to.y);
                    context.stroke();
                    if (this._countArrows > 0) {
                        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
                        context.moveTo(this.to.x, this.to.y);
                        context.lineTo(this.to.x - this._lengthArrows * Math.cos(angle - Math.PI / 7), this.to.y - this._lengthArrows * Math.sin(angle - Math.PI / 7));
                        context.moveTo(this.to.x, this.to.y);
                        context.lineTo(this.to.x - this._lengthArrows * Math.cos(angle + Math.PI / 7), this.to.y - this._lengthArrows * Math.sin(angle + Math.PI / 7));
                        if (this._countArrows > 1) {
                            context.moveTo(this.from.x, this.from.y);
                            context.lineTo(this.from.x + this._lengthArrows * Math.cos(angle - Math.PI / 7), this.from.y + this._lengthArrows * Math.sin(angle - Math.PI / 7));
                            context.moveTo(this.from.x, this.from.y);
                            context.lineTo(this.from.x + this._lengthArrows * Math.cos(angle + Math.PI / 7), this.from.y + this._lengthArrows * Math.sin(angle + Math.PI / 7));
                        }
                        context.stroke();
                    }
                }
            }
            Graphics.Line = Line;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Graphics;
        (function (Graphics) {
            class Text extends Graphics.BaseGraphic {
                constructor(bounds, text = '', options = {}) {
                    super(bounds, options);
                    this._fontSize = 12;
                    this._horizontalAlign = 'left';
                    this._verticalAlign = 'top';
                    this._text = text;
                    this._setOptions(options);
                }
                get text() {
                    return this._text;
                }
                set text(text) {
                    if (this._text !== text) {
                        this._text = text;
                        this._update();
                    }
                }
                get fontSize() {
                    return this._fontSize;
                }
                set fontSize(fontSize) {
                    if (this._fontSize !== fontSize) {
                        this._fontSize = fontSize;
                        this._update();
                    }
                }
                get horizontalAlign() {
                    return this._horizontalAlign;
                }
                set horizontalAlign(horizontalAlign) {
                    if (this._horizontalAlign !== horizontalAlign) {
                        this._horizontalAlign = horizontalAlign;
                        this._update();
                    }
                }
                get verticalAlign() {
                    return this._verticalAlign;
                }
                set verticalAlign(verticalAlign) {
                    if (this._verticalAlign !== verticalAlign) {
                        this._verticalAlign = verticalAlign;
                        this._update();
                    }
                }
                _setOptions(options) {
                    if ('fontSize' in options) {
                        this.fontSize = options.fontSize;
                    }
                    if ('horizontalAlign' in options) {
                        this.horizontalAlign = options.horizontalAlign;
                    }
                    if ('verticalAlign' in options) {
                        this.verticalAlign = options.verticalAlign;
                    }
                }
                _render(context) {
                    context.font = `${this._fontSize}px Arial`;
                    context.textBaseline = 'top';
                    const measureWidth = context.measureText(this._text).width;
                    const measurePosition = new App.Utils.Vector();
                    if (this._horizontalAlign === 'left') {
                        measurePosition.x = this.bounds.x;
                    }
                    else if (this._horizontalAlign === 'center') {
                        measurePosition.x = this.bounds.x + ((this.bounds.width - measureWidth) / 2);
                    }
                    else if (this._horizontalAlign === 'right') {
                        measurePosition.x = this.bounds.x + this.bounds.width - measureWidth;
                    }
                    if (this._verticalAlign === 'top') {
                        measurePosition.y = this.bounds.y;
                    }
                    else if (this._verticalAlign === 'center') {
                        measurePosition.y = this.bounds.y + ((this.bounds.height - this._fontSize) / 2);
                    }
                    else if (this._verticalAlign === 'bottom') {
                        measurePosition.y = this.bounds.y + this.bounds.height - this._fontSize;
                    }
                    context.fillText(this._text, measurePosition.x, measurePosition.y);
                    context.strokeText(this._text, measurePosition.x + 1, measurePosition.y + 1);
                }
            }
            Graphics.Text = Text;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Graphics;
        (function (Graphics) {
            class Ellipse extends Graphics.BaseGraphic {
                constructor(bounds, options = {}) {
                    super(bounds, options);
                    this._startAngle = 0;
                    this._endAngle = 360;
                    this._setOptions(options);
                }
                get startAngle() {
                    return this._startAngle;
                }
                set startAngle(angle) {
                    if (this._startAngle !== angle) {
                        this._startAngle = angle;
                        this._update();
                    }
                }
                get endAngle() {
                    return this._endAngle;
                }
                set endAngle(angle) {
                    if (this._endAngle !== angle) {
                        this._endAngle = angle;
                        this._update();
                    }
                }
                _setOptions(options) {
                    if ('startAngle' in options) {
                        this.startAngle = options.startAngle;
                    }
                    if ('endAngle' in options) {
                        this.endAngle = options.endAngle;
                    }
                }
                _render(context) {
                    const radius = new App.Utils.Vector(this.bounds.width / 2, this.bounds.height / 2);
                    context.beginPath();
                    context.ellipse(this.bounds.x + radius.x, this.bounds.y + radius.y, radius.x - this.strokeWidth / 2, radius.y - this.strokeWidth / 2, 0, App.Utils.toRadians(this._startAngle), App.Utils.toRadians(this._endAngle));
                    context.fill();
                    context.stroke();
                }
            }
            Graphics.Ellipse = Ellipse;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Graphics;
        (function (Graphics) {
            class LinkRectangle extends Graphics.BaseGraphic {
                constructor(bounds, options = {}) {
                    super(bounds, options);
                    this._isCrossed = false;
                    this._setOptions(options);
                }
                get isCrossed() {
                    return this._isCrossed;
                }
                set isCrossed(isCrossed) {
                    if (this._isCrossed !== isCrossed) {
                        this._isCrossed = isCrossed;
                        this._update();
                    }
                }
                _setOptions(options) {
                    if ('isCrossed' in options) {
                        this.isCrossed = options.isCrossed;
                    }
                }
                _render(context) {
                    context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
                    context.strokeRect(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth, this.bounds.width - this.strokeWidth * 2, this.bounds.height - this.strokeWidth * 2);
                    if (this._isCrossed) {
                        context.beginPath();
                        context.moveTo(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth);
                        context.lineTo(this.bounds.x + this.bounds.width - this.strokeWidth * 2, this.bounds.y + this.bounds.height - this.strokeWidth * 2);
                        context.stroke();
                    }
                }
            }
            Graphics.LinkRectangle = LinkRectangle;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Visual;
    (function (Visual) {
        var Graphics;
        (function (Graphics) {
            class LinkedNode extends Graphics.BaseGraphic {
                constructor(bounds, options = {}) {
                    super(bounds, options);
                    this._leftLinkState = null;
                    this._rightLinkState = null;
                    this._setOptions(options);
                }
                get leftLinkState() {
                    return this._leftLinkState;
                }
                set leftLinkState(linkState) {
                    if (this._leftLinkState !== linkState) {
                        this._leftLinkState = linkState;
                        this._update();
                    }
                }
                get rightLinkState() {
                    return this._rightLinkState;
                }
                set rightLinkState(linkState) {
                    if (this._rightLinkState !== linkState) {
                        this._rightLinkState = linkState;
                        this._update();
                    }
                }
                getWidthPadding() {
                    return Math.round(this.bounds.width / 100 * 28);
                }
                getInnerWidth() {
                    return this.bounds.width - this.getWidthPadding() * 2;
                }
                getInnerX() {
                    return this.bounds.x + this.getWidthPadding();
                }
                _setOptions(options) {
                    if ('leftLinkState' in options) {
                        this.leftLinkState = options.leftLinkState;
                    }
                    if ('rightLinkState' in options) {
                        this.rightLinkState = options.rightLinkState;
                    }
                }
                _render(context) {
                    this._drawRectangle(context);
                    this._drawLinkRectangles(context);
                }
                _drawRectangle(context) {
                    context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
                    context.strokeRect(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth, this.bounds.width - this.strokeWidth * 2, this.bounds.height - this.strokeWidth * 2);
                }
                _drawLinkRectangles(context) {
                    const padding = this.getWidthPadding();
                    if (this._leftLinkState !== null) {
                        context.beginPath();
                        context.moveTo(this.bounds.x + padding, this.bounds.y);
                        context.lineTo(this.bounds.x + padding, this.bounds.y + this.bounds.height);
                        context.stroke();
                        if (this._leftLinkState === 'closed') {
                            context.beginPath();
                            context.moveTo(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth);
                            context.lineTo(this.bounds.x + padding - this.strokeWidth, this.bounds.y + this.bounds.height - this.strokeWidth);
                            context.stroke();
                        }
                    }
                    if (this._rightLinkState !== null) {
                        context.beginPath();
                        context.moveTo(this.bounds.x + this.bounds.width - padding, this.bounds.y);
                        context.lineTo(this.bounds.x + this.bounds.width - padding, this.bounds.y + this.bounds.height);
                        context.stroke();
                        if (this._rightLinkState === 'closed') {
                            context.beginPath();
                            context.moveTo(this.bounds.x + this.bounds.width - padding + this.strokeWidth, this.bounds.y + this.strokeWidth);
                            context.lineTo(this.bounds.x + this.bounds.width - this.strokeWidth, this.bounds.y + this.bounds.height - this.strokeWidth);
                            context.stroke();
                        }
                    }
                }
            }
            Graphics.LinkedNode = LinkedNode;
        })(Graphics = Visual.Graphics || (Visual.Graphics = {}));
    })(Visual = App.Visual || (App.Visual = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        ASD.Invoker = StructVisorAPI.ASD.Invoker;
        ASD.BaseCommand = StructVisorAPI.ASD.BaseCommand;
        ASD.BaseControlsManager = StructVisorAPI.ASD.BaseControlsManager;
        ASD.BaseGraphicsManager = StructVisorAPI.ASD.BaseGraphicsManager;
        ASD.BaseProgressLoader = StructVisorAPI.ASD.BaseProgressLoader;
        let Structures;
        (function (Structures) {
            Structures.BaseStructure = StructVisorAPI.ASD.BaseStructure;
        })(Structures = ASD.Structures || (ASD.Structures = {}));
        let Algorithms;
        (function (Algorithms) {
            Algorithms.BaseAlgorithm = StructVisorAPI.ASD.BaseAlgorithm;
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
        let Items;
        (function (Items) {
            Items.BaseItem = StructVisorAPI.ASD.BaseItem;
        })(Items = ASD.Items || (ASD.Items = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            class NodeSequence extends Structures.BaseStructure {
            }
            Structures.NodeSequence = NodeSequence;
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Graphics;
            (function (Graphics) {
                class NodeSequenceGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(args) {
                        super(args);
                        this._items = args.items;
                    }
                    *moveNodesToResultsPositions(stepsCount) {
                        const generators = new Set();
                        for (let index = 0; index < this._items.length; index++) {
                            const item = this._items[index];
                            generators.add(item.graphicsManager.moveNodeToResultPosition(index, stepsCount));
                        }
                        for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
                            for (const generator of generators) {
                                yield generator.next();
                            }
                        }
                    }
                }
                Graphics.NodeSequenceGraphicsManager = NodeSequenceGraphicsManager;
            })(Graphics = Structures.Graphics || (Structures.Graphics = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class NodeSequenceCommand extends ASD.BaseCommand {
                    constructor(items) {
                        super(items, (percent) => 100 - Math.sqrt(percent) * 10);
                    }
                }
                Commands.NodeSequenceCommand = NodeSequenceCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class NodeSequenceClearCommand extends Commands.NodeSequenceCommand {
                    constructor(items) {
                        super(items);
                        if (this._items.length === 0) {
                            throw new App.Errors.ASDError('Відсутні елементи для видалення.');
                        }
                        this._itemsCopy = [...items];
                    }
                    toObject() {
                        return { name: 'clear' };
                    }
                    undo() {
                        for (const item of this._itemsCopy) {
                            this._items.push(item);
                            item.graphicsManager.setVisible(true);
                        }
                    }
                    _executeAlgorithm() {
                        while (this._items.length > 0) {
                            this._items.pop().graphicsManager.setVisible(false);
                        }
                    }
                    *_executeAnimation() { }
                }
                Commands.NodeSequenceClearCommand = NodeSequenceClearCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            class Stack extends Structures.NodeSequence {
                constructor() {
                    super('stack', 'Стек');
                    this._controlsManager = new Structures.Controls.StackControlsManager(this);
                    this._graphicsManager = new Structures.Graphics.StackGraphicsManager(this, this._items);
                    this._progressLoader = new Structures.Progress.StackProgressLoader(this, this._invoker, this._graphicsManager);
                }
                push(title) {
                    this._invoker.executeCommand(new Structures.Commands.StackPushCommand(this._items, this._graphicsManager, title));
                }
                pop() {
                    this._invoker.executeCommand(new Structures.Commands.StackPopCommand(this._items, this._graphicsManager));
                }
                clear() {
                    this._invoker.executeCommand(new Structures.Commands.StackClearCommand(this._items, this._graphicsManager));
                }
            }
            Structures.Stack = Stack;
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Controls;
            (function (Controls) {
                class StackControlsManager extends ASD.BaseControlsManager {
                    constructor(asd) {
                        super({
                            asd: asd,
                            controls: {
                                'general': {
                                    title: 'Загальне',
                                    items: {
                                        'input-item': new App.Visual.Controls.TextControl({ placeholder: 'Елемент' }),
                                        'push': new App.Visual.Controls.ButtonControl({ value: 'Push', onclick: () => this._asd.push(this._inputItemControl.value) }),
                                        'pop': new App.Visual.Controls.ButtonControl({ value: 'Pop', onclick: () => this._asd.pop() }),
                                        'clear': new App.Visual.Controls.ButtonControl({ value: 'Clear', onclick: () => this._asd.clear() })
                                    }
                                }
                            }
                        });
                    }
                    get _inputItemControl() {
                        return this._getControl('general', 'input-item');
                    }
                }
                Controls.StackControlsManager = StackControlsManager;
            })(Controls = Structures.Controls || (Structures.Controls = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Graphics;
            (function (Graphics) {
                class StackGraphicsManager extends Graphics.NodeSequenceGraphicsManager {
                    constructor(element, items) {
                        super({
                            element: element,
                            items: items,
                            viewSize: new App.Utils.Vector(1000, 500),
                            graphics: {
                                'top-arrow': new App.Visual.Graphics.Line(new App.Utils.Bounds(1000, 500, 0, 0), new App.Utils.Vector(180, 100), new App.Utils.Vector(), { isVisible: false, countArrows: 1 }),
                                'top-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(32, 32, 132, 84), 'Top', { verticalAlign: 'center' }),
                                'top-rectangle': new App.Visual.Graphics.LinkRectangle(new App.Utils.Bounds(32, 32, 164, 84), { isCrossed: true }),
                                'output-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(80, 20, 16, 36))
                            }
                        });
                        this._topItem = null;
                        this._topItemUpdateCallback = () => this._updateTopItem();
                    }
                    get _topArrowGraphic() {
                        return this._getGraphic('top-arrow');
                    }
                    get _topRectangleGraphic() {
                        return this._getGraphic('top-rectangle');
                    }
                    setTopItem(item) {
                        if (this._topItem !== item) {
                            const hasTopItem = (item !== null);
                            if (this._topItem !== null) {
                                this._topItem.graphicsManager.removeMoveListener(this._topItemUpdateCallback);
                            }
                            if (hasTopItem) {
                                item.graphicsManager.addMoveListener(this._topItemUpdateCallback);
                            }
                            this._topItem = item;
                            this._topArrowGraphic.isVisible = hasTopItem;
                            this._topRectangleGraphic.isCrossed = !hasTopItem;
                            this._updateTopItem();
                        }
                    }
                    _updateTopItem() {
                        if (this._topItem !== null) {
                            const target = this._topItem.graphicsManager.getTopArrowTargetPosition();
                            this._topArrowGraphic.to.x = target.x;
                            this._topArrowGraphic.to.y = target.y;
                        }
                    }
                }
                Graphics.StackGraphicsManager = StackGraphicsManager;
            })(Graphics = Structures.Graphics || (Structures.Graphics = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Progress;
            (function (Progress) {
                class StackProgressLoader extends ASD.BaseProgressLoader {
                    constructor(structure, invoker, graphicsManager) {
                        super({
                            structure: structure,
                            invoker: invoker,
                            commandsCallbacks: {
                                'push': (items, obj) => new Structures.Commands.StackPushCommand(items, graphicsManager, obj.title),
                                'pop': (items) => new Structures.Commands.StackPopCommand(items, graphicsManager),
                                'clear': (items) => new Structures.Commands.StackClearCommand(items, graphicsManager)
                            }
                        });
                    }
                }
                Progress.StackProgressLoader = StackProgressLoader;
            })(Progress = Structures.Progress || (Structures.Progress = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class StackPushCommand extends Commands.NodeSequenceCommand {
                    constructor(items, graphicsManager, title) {
                        var _a;
                        super(items);
                        if (title.length === 0) {
                            throw new App.Errors.ASDError('Заголовок елементу не було вказано.');
                        }
                        this._index = this._items.length;
                        this._item = new ASD.Items.NodeItem(title, 'left');
                        this._previousItem = (_a = this._items[this._items.length - 1]) !== null && _a !== void 0 ? _a : null;
                        this._graphicsManager = graphicsManager;
                    }
                    toObject() {
                        return { name: 'push', title: this._item.title };
                    }
                    undo() {
                        this._items.pop();
                        this._item.graphicsManager.setVisible(false);
                        this._graphicsManager.setTopItem(this._previousItem);
                    }
                    _executeAlgorithm() {
                        this._items.push(this._item);
                        this._item.graphicsManager.setVisible(true);
                    }
                    *_executeAnimation(mode) {
                        const stepsCount = (mode === 'start') ? 64 : 1;
                        const moverTextToNode = this._item.graphicsManager.moveTextToNode(stepsCount);
                        const moverNodeToResult = this._item.graphicsManager.moveNodeToResultPosition(this._index, Math.ceil(stepsCount / 2));
                        while (!moverTextToNode.next().done) {
                            yield;
                        }
                        this._graphicsManager.setTopItem(this._item);
                        while (!moverNodeToResult.next().done) {
                            yield;
                        }
                        this._item.leftLinkedItem = this._previousItem;
                    }
                }
                Commands.StackPushCommand = StackPushCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class StackPopCommand extends Commands.NodeSequenceCommand {
                    constructor(items, graphicsManager) {
                        var _a;
                        super(items);
                        if (this._items.length === 0) {
                            throw new App.Errors.ASDError('Неможливо видалити елемент, оскільки він не був визначений.');
                        }
                        this._item = this._items[items.length - 1];
                        this._previousItem = (_a = this._items[items.length - 2]) !== null && _a !== void 0 ? _a : null;
                        this._graphicsManager = graphicsManager;
                    }
                    toObject() {
                        return { name: 'pop' };
                    }
                    undo() {
                        this._items.push(this._item);
                        this._item.graphicsManager.setVisible(true);
                        this._graphicsManager.setTopItem(this._item);
                        App.Utils.startGenerator(this._item.graphicsManager.moveTextToNode(1));
                    }
                    _executeAlgorithm() {
                        this._items.pop();
                    }
                    *_executeAnimation(mode) {
                        const stepsCount = (mode === 'start') ? 64 : 1;
                        const moverTextFromNode = this._item.graphicsManager.moveTextFromNode(stepsCount);
                        while (!moverTextFromNode.next().done) {
                            yield;
                        }
                        this._item.graphicsManager.setVisible(false);
                        this._graphicsManager.setTopItem(this._previousItem);
                    }
                }
                Commands.StackPopCommand = StackPopCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class StackClearCommand extends Commands.NodeSequenceClearCommand {
                    constructor(items, graphicsManager) {
                        super(items);
                        this._graphicsManager = graphicsManager;
                        this._topItem = this._items[this._items.length - 1];
                    }
                    undo() {
                        super.undo();
                        this._graphicsManager.setTopItem(this._topItem);
                    }
                    _executeAlgorithm() {
                        super._executeAlgorithm();
                        this._graphicsManager.setTopItem(null);
                    }
                }
                Commands.StackClearCommand = StackClearCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            class Queue extends Structures.NodeSequence {
                constructor() {
                    super('queue', 'Черга');
                    this._controlsManager = new Structures.Controls.QueueControlsManager(this);
                    this._graphicsManager = new Structures.Graphics.QueueGraphicsManager(this, this._items);
                    this._progressLoader = new Structures.Progress.QueueProgressLoader(this, this._invoker, this._graphicsManager);
                }
                enqueue(title) {
                    this._invoker.executeCommand(new Structures.Commands.QueueEnqueueCommand(this._items, this._graphicsManager, title));
                }
                dequeue() {
                    this._invoker.executeCommand(new Structures.Commands.QueueDequeueCommand(this._items, this._graphicsManager));
                }
                clear() {
                    this._invoker.executeCommand(new Structures.Commands.QueueClearCommand(this._items, this._graphicsManager));
                }
            }
            Structures.Queue = Queue;
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Controls;
            (function (Controls) {
                class QueueControlsManager extends ASD.BaseControlsManager {
                    constructor(asd) {
                        super({
                            asd: asd,
                            controls: {
                                'general': {
                                    title: 'Загальне',
                                    items: {
                                        'input-item': new App.Visual.Controls.TextControl({ placeholder: 'Елемент' }),
                                        'enqueue': new App.Visual.Controls.ButtonControl({ value: 'Enqueue', onclick: () => this._asd.enqueue(this._inputItemControl.value) }),
                                        'dequeue': new App.Visual.Controls.ButtonControl({ value: 'Dequeue', onclick: () => this._asd.dequeue() }),
                                        'clear': new App.Visual.Controls.ButtonControl({ value: 'Clear', onclick: () => this._asd.clear() })
                                    }
                                }
                            }
                        });
                    }
                    get _inputItemControl() {
                        return this._getControl('general', 'input-item');
                    }
                }
                Controls.QueueControlsManager = QueueControlsManager;
            })(Controls = Structures.Controls || (Structures.Controls = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Graphics;
            (function (Graphics) {
                class QueueGraphicsManager extends Graphics.NodeSequenceGraphicsManager {
                    constructor(element, items) {
                        super({
                            element: element,
                            items: items,
                            viewSize: new App.Utils.Vector(1000, 500),
                            graphics: {
                                'head-arrow': new App.Visual.Graphics.Line(new App.Utils.Bounds(1000, 500, 0, 0), new App.Utils.Vector(180, 100), new App.Utils.Vector(), { isVisible: false, countArrows: 1 }),
                                'head-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(32, 32, 124, 84), 'Head', { verticalAlign: 'center' }),
                                'head-rectangle': new App.Visual.Graphics.LinkRectangle(new App.Utils.Bounds(32, 32, 164, 84), { isCrossed: true }),
                                'tail-arrow': new App.Visual.Graphics.Line(new App.Utils.Bounds(1000, 500, 0, 0), new App.Utils.Vector(180, 400), new App.Utils.Vector(), { isVisible: false, countArrows: 1 }),
                                'tail-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(32, 32, 136, 384), 'Tail', { verticalAlign: 'center' }),
                                'tail-rectangle': new App.Visual.Graphics.LinkRectangle(new App.Utils.Bounds(32, 32, 164, 384), { isCrossed: true }),
                            }
                        });
                        this._headItem = null;
                        this._tailItem = null;
                        this._headItemUpdateCallback = () => this._updateHeadItem();
                        this._tailItemUpdateCallback = () => this._updateTailItem();
                    }
                    get _headRectangleGraphic() {
                        return this._getGraphic('head-rectangle');
                    }
                    get _headArrowGraphic() {
                        return this._getGraphic('head-arrow');
                    }
                    get _tailRectangleGraphic() {
                        return this._getGraphic('tail-rectangle');
                    }
                    get _tailArrowGraphic() {
                        return this._getGraphic('tail-arrow');
                    }
                    setHeadItem(item) {
                        if (this._headItem !== item) {
                            const hasHeadItem = (item !== null);
                            if (this._headItem !== null) {
                                this._headItem.graphicsManager.removeMoveListener(this._headItemUpdateCallback);
                            }
                            if (hasHeadItem) {
                                item.graphicsManager.addMoveListener(this._headItemUpdateCallback);
                            }
                            this._headItem = item;
                            this._headArrowGraphic.isVisible = hasHeadItem;
                            this._headRectangleGraphic.isCrossed = !hasHeadItem;
                            this._updateHeadItem();
                        }
                    }
                    setTailItem(item) {
                        if (this._tailItem !== item) {
                            const hasHeadItem = (item !== null);
                            if (this._tailItem !== null) {
                                this._tailItem.graphicsManager.removeMoveListener(this._tailItemUpdateCallback);
                            }
                            if (hasHeadItem) {
                                item.graphicsManager.addMoveListener(this._tailItemUpdateCallback);
                            }
                            this._tailItem = item;
                            this._tailArrowGraphic.isVisible = hasHeadItem;
                            this._tailRectangleGraphic.isCrossed = !hasHeadItem;
                            this._updateTailItem();
                        }
                    }
                    _updateHeadItem() {
                        this._updateItem(this._headItem, this._headArrowGraphic, (item) => item.graphicsManager.getTopArrowTargetPosition());
                    }
                    _updateTailItem() {
                        this._updateItem(this._tailItem, this._tailArrowGraphic, (item) => item.graphicsManager.getBottomArrowTargetPosition());
                    }
                    _updateItem(item, arrowGraphic, targetPositionCallback) {
                        if (item !== null) {
                            const target = targetPositionCallback(item);
                            arrowGraphic.to.x = target.x;
                            arrowGraphic.to.y = target.y;
                        }
                    }
                }
                Graphics.QueueGraphicsManager = QueueGraphicsManager;
            })(Graphics = Structures.Graphics || (Structures.Graphics = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Progress;
            (function (Progress) {
                class QueueProgressLoader extends ASD.BaseProgressLoader {
                    constructor(structure, invoker, graphicsManager) {
                        super({
                            structure: structure,
                            invoker: invoker,
                            commandsCallbacks: {
                                'enqueue': (items, obj) => new Structures.Commands.QueueEnqueueCommand(items, graphicsManager, obj.title),
                                'dequeue': (items) => new Structures.Commands.QueueDequeueCommand(items, graphicsManager),
                                'clear': (items) => new Structures.Commands.QueueClearCommand(items, graphicsManager)
                            }
                        });
                    }
                }
                Progress.QueueProgressLoader = QueueProgressLoader;
            })(Progress = Structures.Progress || (Structures.Progress = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class QueueEnqueueCommand extends Commands.NodeSequenceCommand {
                    constructor(items, graphicsManager, title) {
                        var _a;
                        super(items);
                        if (title.length === 0) {
                            throw new App.Errors.ASDError('Заголовок елементу не було вказано.');
                        }
                        this._index = this._items.length;
                        this._item = new ASD.Items.NodeItem(title, 'right');
                        this._previousItem = (_a = this._items[this._items.length - 1]) !== null && _a !== void 0 ? _a : null;
                        this._graphicsManager = graphicsManager;
                    }
                    toObject() {
                        return { name: 'enqueue', title: this._item.title };
                    }
                    undo() {
                        this._items.pop();
                        this._item.graphicsManager.setVisible(false);
                        if (this._previousItem !== null) {
                            this._previousItem.rightLinkedItem = null;
                        }
                        else
                            this._graphicsManager.setHeadItem(null);
                        this._graphicsManager.setTailItem(this._previousItem);
                    }
                    _executeAlgorithm() {
                        this._items.push(this._item);
                        this._item.graphicsManager.setVisible(true);
                    }
                    *_executeAnimation(mode) {
                        const stepsCount = (mode === 'start') ? 64 : 1;
                        const moverTextToNode = this._item.graphicsManager.moveTextToNode(stepsCount);
                        const moverNodeToResult = this._item.graphicsManager.moveNodeToResultPosition(this._index, Math.ceil(stepsCount / 2));
                        while (!moverTextToNode.next().done) {
                            yield;
                        }
                        if (this._previousItem === null) {
                            this._graphicsManager.setHeadItem(this._item);
                        }
                        this._graphicsManager.setTailItem(this._item);
                        while (!moverNodeToResult.next().done) {
                            yield;
                        }
                        if (this._previousItem !== null) {
                            this._previousItem.rightLinkedItem = this._item;
                        }
                    }
                }
                Commands.QueueEnqueueCommand = QueueEnqueueCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class QueueDequeueCommand extends Commands.NodeSequenceCommand {
                    constructor(items, graphicsManager) {
                        var _a;
                        super(items);
                        if (this._items.length === 0) {
                            throw new App.Errors.ASDError('Неможливо видалити елемент, оскільки він не був визначений.');
                        }
                        this._item = this._items[0];
                        this._nextItem = (_a = this._items[1]) !== null && _a !== void 0 ? _a : null;
                        this._graphicsManager = graphicsManager;
                    }
                    toObject() {
                        return { name: 'dequeue' };
                    }
                    undo() {
                        this._items.unshift(this._item);
                        this._item.graphicsManager.setVisible(true);
                        App.Utils.startGenerator(this._item.graphicsManager.moveTextToNode(1));
                        this._graphicsManager.setHeadItem(this._item);
                        if (this._nextItem === null) {
                            this._graphicsManager.setTailItem(this._item);
                        }
                        App.Utils.startGenerator(this._graphicsManager.moveNodesToResultsPositions(1));
                    }
                    _executeAlgorithm() {
                        this._items.shift();
                    }
                    *_executeAnimation(mode) {
                        const stepsCount = (mode === 'start') ? 64 : 1;
                        const moverTextFromNode = this._item.graphicsManager.moveTextFromNode(stepsCount);
                        const moverNodesToResult = this._graphicsManager.moveNodesToResultsPositions(stepsCount);
                        while (!moverTextFromNode.next().done) {
                            yield;
                        }
                        this._item.graphicsManager.setVisible(false);
                        this._graphicsManager.setHeadItem(this._nextItem);
                        if (this._nextItem === null) {
                            this._graphicsManager.setTailItem(null);
                        }
                        while (!moverNodesToResult.next().done) {
                            yield;
                        }
                    }
                }
                Commands.QueueDequeueCommand = QueueDequeueCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class QueueClearCommand extends Commands.NodeSequenceClearCommand {
                    constructor(items, graphicsManager) {
                        super(items);
                        this._headItem = this._items[0];
                        this._tailItem = this._items[this._items.length - 1];
                        this._graphicsManager = graphicsManager;
                    }
                    undo() {
                        super.undo();
                        this._graphicsManager.setHeadItem(this._headItem);
                        this._graphicsManager.setTailItem(this._tailItem);
                    }
                    _executeAlgorithm() {
                        super._executeAlgorithm();
                        this._graphicsManager.setHeadItem(null);
                        this._graphicsManager.setTailItem(null);
                    }
                }
                Commands.QueueClearCommand = QueueClearCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            class Graph extends Structures.BaseStructure {
                constructor() {
                    super('graph', 'Граф');
                    this._controlsManager = new Structures.Controls.GraphControlsManager(this, this._items);
                    this._graphicsManager = new Structures.Graphics.GraphGraphicsManager(this, this._items);
                    this._progressLoader = new Structures.Progress.GraphProgressLoader(this, this._invoker);
                }
                checkInViewSize(position) {
                    return new App.Utils.Bounds(this._graphicsManager.viewSize).checkCollide(position);
                }
                addVertex(title, center) {
                    this._invoker.executeCommand(new Structures.Commands.GraphAddVertexCommand(this._items, title, center));
                }
                removeVertex(vertex) {
                    this._invoker.executeCommand(new Structures.Commands.GraphRemoveVertexCommand(this._items, this._items.indexOf(vertex)));
                }
                clearVertices() {
                    this._invoker.executeCommand(new Structures.Commands.GraphClearVerticesCommand(this._items));
                }
                connectVertices(isOriented, weight, startVertex, lastVertex) {
                    const startIndex = this._items.indexOf(startVertex);
                    const lastIndex = this._items.indexOf(lastVertex);
                    this._invoker.executeCommand(new Structures.Commands.GraphConnectVerticesCommand(this._items, isOriented, weight, startIndex, lastIndex));
                }
                disconnectVertices(startVertex, lastVertex) {
                    const startIndex = this._items.indexOf(startVertex);
                    const lastIndex = this._items.indexOf(lastVertex);
                    this._invoker.executeCommand(new Structures.Commands.GraphDisconnectVerticesCommand(this._items, startIndex, lastIndex));
                }
                clearConnections() {
                    this._invoker.executeCommand(new Structures.Commands.GraphClearConnectionsCommand(this._items));
                }
                clearHighlight() {
                    this._graphicsManager.clearHighlight();
                }
                setVisibleConnectionsWeights(isVisible) {
                    this._graphicsManager.setVisibleConnectionsWeights(isVisible);
                }
                findVertexIndex(arg) {
                    for (let index = 0; index < this._items.length; index++) {
                        const item = this._items[index];
                        if ((arg instanceof App.Utils.Vector && item.graphicsManager.checkCollide(arg)) || item.title === arg) {
                            return index;
                        }
                    }
                    return -1;
                }
            }
            Structures.Graph = Graph;
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Controls;
            (function (Controls) {
                class GraphControlsManager extends ASD.BaseControlsManager {
                    constructor(asd, items) {
                        super({
                            asd: asd,
                            controls: {
                                'vertices': {
                                    title: 'Вершини',
                                    items: {
                                        'input-vertex': new App.Visual.Controls.TextControl({ placeholder: 'Вершина' }),
                                        'add-vertex': new App.Visual.Controls.ButtonControl({ value: 'Add Vertex', onclick: () => this._addVertex() }),
                                        'remove-vertex': new App.Visual.Controls.ButtonControl({ value: 'Remove Vertex', onclick: () => this._removeVertex() }),
                                        'clear': new App.Visual.Controls.ButtonControl({ value: 'Clear', onclick: () => this._asd.clearVertices() })
                                    }
                                },
                                'connections': {
                                    title: 'З\'вязки',
                                    items: {
                                        'toggle-visible-connections-weights': new App.Visual.Controls.CheckboxControl({ value: 'Відображеня ваг', isChecked: true, oncheck: () => this._asd.setVisibleConnectionsWeights(this._toggleVisibleConnectionsWeight.isChecked) }),
                                        'input-connection-type': new App.Visual.Controls.SelectControl({ items: GraphControlsManager._CONNECTION_TYPES }),
                                        'input-connection-weight': new App.Visual.Controls.NumberControl({ placeholder: 'Вага', value: 1 }),
                                        'connect-vertices': new App.Visual.Controls.ButtonControl({ value: 'Connect vertices', onclick: () => this._connectVertices() }),
                                        'disconnect-vertices': new App.Visual.Controls.ButtonControl({ value: 'Disconnect vertices', onclick: () => this._disconnectVertices() }),
                                        'clear-connections': new App.Visual.Controls.ButtonControl({ value: 'Clear', onclick: () => this._asd.clearConnections() }),
                                    }
                                },
                                'highlight': {
                                    title: 'Виділення',
                                    items: {
                                        'clear': new App.Visual.Controls.ButtonControl({ value: 'Clear', onclick: () => this._asd.clearHighlight() }),
                                    }
                                }
                            }
                        });
                        this._items = items;
                        this._hoverInfo = { vertex: null, color: null };
                        this._selectInfo = { vertices: [], color: null };
                        this._callbacks = {
                            'add-vertex': (event) => this._addVertex(App.Visual.Graphics.convertToCanvasPosition(new App.Utils.Vector(event.offsetX, event.offsetY))),
                            'remove-vertex': () => { var _a; return this._removeVertex((_a = this._hoverInfo.vertex) !== null && _a !== void 0 ? _a : undefined); },
                            'connect-vertices': () => this._connectVertices(this._selectInfo.vertices),
                            'disconnect-vertices': () => this._disconnectVertices(this._selectInfo.vertices),
                            'hover-vertex': (event) => this._hoverVertex(App.Visual.Graphics.convertToCanvasPosition(new App.Utils.Vector(event.offsetX, event.offsetY))),
                            'select-vertices': (event) => this._selectVertices(App.Visual.Graphics.convertToCanvasPosition(new App.Utils.Vector(event.offsetX, event.offsetY)), true)
                        };
                    }
                    get _inputVertexControl() {
                        return this._getControl('vertices', 'input-vertex');
                    }
                    get _addVertexControl() {
                        return this._getControl('vertices', 'add-vertex');
                    }
                    get _removeVertexControl() {
                        return this._getControl('vertices', 'remove-vertex');
                    }
                    get _inputConnectionTypeControl() {
                        return this._getControl('connections', 'input-connection-type');
                    }
                    get _inputConnectionWeightControl() {
                        return this._getControl('connections', 'input-connection-weight');
                    }
                    get _connectVerticesControl() {
                        return this._getControl('connections', 'connect-vertices');
                    }
                    get _disconnectVerticesControl() {
                        return this._getControl('connections', 'disconnect-vertices');
                    }
                    get _toggleVisibleConnectionsWeight() {
                        return this._getControl('connections', 'toggle-visible-connections-weights');
                    }
                    _addVertex(position) {
                        if (!this._isActionExecuting) {
                            App.Visual.Graphics.addEventListener('click', this._callbacks['add-vertex']);
                            this._toggleActionExecuting(this._addVertexControl, this._inputVertexControl);
                        }
                        else if (position === undefined || this._asd.checkInViewSize(position)) {
                            if (position !== undefined) {
                                this._asd.addVertex(this._inputVertexControl.value, position);
                            }
                            App.Visual.Graphics.removeEventListener('click', this._callbacks['add-vertex']);
                            this._toggleActionExecuting(this._addVertexControl);
                        }
                    }
                    _removeVertex(vertex) {
                        if (!this._isActionExecuting) {
                            this._hoverInfo.color = 'red';
                            this._toggleActionExecuting(this._removeVertexControl);
                            App.Visual.Graphics.addEventListener('click', this._callbacks['remove-vertex']);
                            App.Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
                        }
                        else {
                            if (vertex === undefined) {
                                this._toggleActionExecuting(this._removeVertexControl);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['remove-vertex']);
                                App.Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                            }
                            else {
                                this._leaveVertex();
                                this._toggleActionExecuting(this._removeVertexControl);
                                this._asd.removeVertex(vertex);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['remove-vertex']);
                                App.Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                            }
                        }
                    }
                    _connectVertices(vertices) {
                        if (vertices === undefined) {
                            if (!this._isActionExecuting) {
                                this._hoverInfo.color = 'royalblue';
                                this._selectInfo.color = 'blue';
                                App.Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
                                App.Visual.Graphics.addEventListener('click', this._callbacks['select-vertices']);
                                App.Visual.Graphics.addEventListener('click', this._callbacks['connect-vertices']);
                            }
                            else {
                                this._unselectVertices();
                                App.Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['select-vertices']);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['connect-vertices']);
                            }
                            this._toggleActionExecuting(this._connectVerticesControl);
                        }
                        else if (vertices.length === 2) {
                            const isOriented = (this._inputConnectionTypeControl.selected === GraphControlsManager._CONNECTION_TYPES[0]);
                            this._connectVertices();
                            this._asd.connectVertices(isOriented, Number(this._inputConnectionWeightControl.value), vertices[0], vertices[1]);
                        }
                    }
                    _disconnectVertices(vertices) {
                        if (vertices === undefined) {
                            if (!this._isActionExecuting) {
                                this._hoverInfo.color = 'orange';
                                this._selectInfo.color = 'orangered';
                                App.Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
                                App.Visual.Graphics.addEventListener('click', this._callbacks['select-vertices']);
                                App.Visual.Graphics.addEventListener('click', this._callbacks['disconnect-vertices']);
                            }
                            else {
                                this._unselectVertices();
                                App.Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['select-vertices']);
                                App.Visual.Graphics.removeEventListener('click', this._callbacks['disconnect-vertices']);
                            }
                            this._toggleActionExecuting(this._disconnectVerticesControl);
                        }
                        else if (vertices.length === 2) {
                            this._disconnectVertices();
                            this._asd.disconnectVertices(vertices[0], vertices[1]);
                        }
                    }
                    _leaveVertex() {
                        if (this._hoverInfo.vertex !== null) {
                            this._hoverInfo.vertex.graphicsManager.fillColor = (this._selectInfo.vertices.includes(this._hoverInfo.vertex) ? this._selectInfo.color : null);
                            this._hoverInfo.vertex = null;
                        }
                    }
                    _hoverVertex(position) {
                        var _a;
                        const hoveredVertex = (_a = this._items[this._asd.findVertexIndex(position)]) !== null && _a !== void 0 ? _a : null;
                        if (hoveredVertex !== this._hoverInfo.vertex) {
                            this._leaveVertex();
                            if (hoveredVertex !== null) {
                                this._hoverInfo.vertex = hoveredVertex;
                                this._hoverInfo.vertex.graphicsManager.fillColor = this._hoverInfo.color;
                            }
                        }
                    }
                    _unselectVertices() {
                        for (const vertex of this._selectInfo.vertices) {
                            vertex.graphicsManager.fillColor = null;
                        }
                        this._selectInfo.vertices = [];
                    }
                    _selectVertices(position, isMultiple) {
                        var _a;
                        const selectedVertex = (_a = this._items[this._asd.findVertexIndex(position)]) !== null && _a !== void 0 ? _a : null;
                        if (selectedVertex !== null) {
                            if (!isMultiple) {
                                this._unselectVertices();
                            }
                            this._selectInfo.vertices.push(selectedVertex);
                            selectedVertex.graphicsManager.fillColor = this._selectInfo.color;
                        }
                    }
                }
                GraphControlsManager._CONNECTION_TYPES = [
                    new App.Visual.Controls.Items.SelectControlItem('Орієнтований'),
                    new App.Visual.Controls.Items.SelectControlItem('Неорієнтований')
                ];
                Controls.GraphControlsManager = GraphControlsManager;
            })(Controls = Structures.Controls || (Structures.Controls = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Graphics;
            (function (Graphics) {
                class GraphGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(element, items) {
                        super({
                            element: element,
                            viewSize: new App.Utils.Vector(1000, 500),
                            graphics: {}
                        });
                        this._items = items;
                    }
                    clearHighlight() {
                        for (const item of this._items) {
                            item.graphicsManager.clearHighlight();
                        }
                    }
                    setVisibleConnectionsWeights(isVisible) {
                        for (const item of this._items) {
                            item.graphicsManager.setVisibleConnectionsWeights(isVisible);
                        }
                    }
                }
                Graphics.GraphGraphicsManager = GraphGraphicsManager;
            })(Graphics = Structures.Graphics || (Structures.Graphics = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Progress;
            (function (Progress) {
                class GraphProgressLoader extends ASD.BaseProgressLoader {
                    constructor(structure, invoker) {
                        super({
                            structure: structure,
                            invoker: invoker,
                            commandsCallbacks: {
                                'add-vertex': (items, obj) => new Structures.Commands.GraphAddVertexCommand(items, obj.title, new App.Utils.Vector(obj.center)),
                                'remove-vertex': (items, obj) => new Structures.Commands.GraphRemoveVertexCommand(items, obj.index),
                                'clear-vertices': (items) => new Structures.Commands.GraphClearVerticesCommand(items),
                                'connect-vertices': (items, obj) => new Structures.Commands.GraphConnectVerticesCommand(items, obj.isOriented, obj.weight, obj.startIndex, obj.lastIndex),
                                'disconnect-vertices': (items, obj) => new Structures.Commands.GraphDisconnectVerticesCommand(items, obj.startIndex, obj.lastIndex),
                                'clear-connections': (items) => new Structures.Commands.GraphClearConnectionsCommand(items),
                                'dfs': (items, obj) => new ASD.Algorithms.Commands.DFSCommand(items, structure, obj.startIndex, obj.lastIndex),
                                'bfs': (items, obj) => new ASD.Algorithms.Commands.BFSCommand(items, structure, obj.startIndex, obj.lastIndex),
                                'dijkstra': (items, obj) => new ASD.Algorithms.Commands.DijkstraCommand(items, structure, obj.startIndex, obj.lastIndex)
                            }
                        });
                    }
                }
                Progress.GraphProgressLoader = GraphProgressLoader;
            })(Progress = Structures.Progress || (Structures.Progress = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphAddVertexCommand extends ASD.BaseCommand {
                    constructor(items, title, center) {
                        super(items);
                        if (title.length === 0) {
                            throw new App.Errors.ASDError('Заголовок елементу не було вказано.');
                        }
                        this._item = new ASD.Items.GraphVertex(title, center);
                    }
                    toObject() {
                        return { name: 'add-vertex', title: this._item.title, center: this._item.center.toObject() };
                    }
                    undo() {
                        this._items.pop();
                        this._item.graphicsManager.setVisible(false);
                    }
                    _executeAlgorithm() {
                        this._items.push(this._item);
                        this._item.graphicsManager.setVisible(true);
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphAddVertexCommand = GraphAddVertexCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphRemoveVertexCommand extends ASD.BaseCommand {
                    constructor(items, index) {
                        super(items);
                        if (this._items[index] === undefined) {
                            throw new App.Errors.ASDError('Індекс вершини для видалення було введено некоректно.');
                        }
                        this._item = this._items[index];
                        this._index = index;
                        this._connections = this._item.getConnections();
                    }
                    toObject() {
                        return { name: 'remove-vertex', index: this._index };
                    }
                    undo() {
                        this._items.splice(this._index, 0, this._item);
                        this._item.connect(this._connections);
                        this._item.graphicsManager.setVisible(true);
                    }
                    _executeAlgorithm() {
                        this._items.splice(this._index, 1);
                        this._item.disconnect(this._connections);
                        this._item.graphicsManager.setVisible(false);
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphRemoveVertexCommand = GraphRemoveVertexCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphClearVerticesCommand extends ASD.BaseCommand {
                    constructor(items) {
                        super(items);
                        if (items.length === 0) {
                            throw new App.Errors.ASDError('Відсутні елементи для видалення.');
                        }
                        this._itemsCopy = [...items];
                    }
                    toObject() {
                        return { name: 'clear-vertices' };
                    }
                    undo() {
                        for (const item of this._itemsCopy) {
                            this._items.push(item);
                            item.graphicsManager.setVisible(true);
                        }
                    }
                    _executeAlgorithm() {
                        while (this._items.length > 0) {
                            this._items.pop().graphicsManager.setVisible(false);
                        }
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphClearVerticesCommand = GraphClearVerticesCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphConnectVerticesCommand extends ASD.BaseCommand {
                    constructor(items, isOriented, weight, startIndex, lastIndex) {
                        super(items);
                        if (this._items[startIndex] === undefined) {
                            throw new App.Errors.ASDError('Індекс початкової вершини було введено некоректно.');
                        }
                        if (this._items[lastIndex] === undefined) {
                            throw new App.Errors.ASDError('Індекс кінцевої вершини було введено некоректно.');
                        }
                        this._isOriented = isOriented;
                        this._weight = weight;
                        this._startItem = this._items[startIndex];
                        this._lastItem = this._items[lastIndex];
                        this._startIndex = startIndex;
                        this._lastIndex = lastIndex;
                        const connections = this._startItem.getConnections();
                        if (connections.from.has(this._lastItem) || (!this._isOriented && connections.to.has(this._lastItem))) {
                            throw new App.Errors.ASDError('Неможливо створити з\'єднання між вершинами, оскільки воно вже існує.');
                        }
                    }
                    toObject() {
                        return { name: 'connect-vertices', isOriented: this._isOriented, weight: this._weight, startIndex: this._startIndex, lastIndex: this._lastIndex };
                    }
                    undo() {
                        this._startItem.disconnect(this._lastItem);
                        if (!this._isOriented) {
                            this._lastItem.disconnect(this._startItem);
                        }
                    }
                    _executeAlgorithm() {
                        this._startItem.connect(this._isOriented, this._weight, this._lastItem);
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphConnectVerticesCommand = GraphConnectVerticesCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphDisconnectVerticesCommand extends ASD.BaseCommand {
                    constructor(items, startIndex, lastIndex) {
                        super(items);
                        if (this._items[startIndex] === undefined) {
                            throw new App.Errors.ASDError('Індекс початкової вершини було введено некоректно.');
                        }
                        if (this._items[lastIndex] === undefined) {
                            throw new App.Errors.ASDError('Індекс кінцевої вершини було введено некоректно.');
                        }
                        this._startItem = this._items[startIndex];
                        this._lastItem = this._items[lastIndex];
                        this._startIndex = startIndex;
                        this._lastIndex = lastIndex;
                        const connection = this._startItem.getConnection(this._lastItem);
                        if (connection === null) {
                            throw new App.Errors.ASDError('Неможливо видалити з\'єднання між вершинами, оскільки воно не було визначено.');
                        }
                        this._isOriented = connection.isOriented;
                        this._weight = connection.weight;
                    }
                    toObject() {
                        return { name: 'disconnect-vertices', startIndex: this._startIndex, lastIndex: this._lastIndex };
                    }
                    undo() {
                        this._startItem.connect(this._isOriented, this._weight, this._lastItem);
                    }
                    _executeAlgorithm() {
                        this._startItem.disconnect(this._lastItem);
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphDisconnectVerticesCommand = GraphDisconnectVerticesCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Structures;
        (function (Structures) {
            var Commands;
            (function (Commands) {
                class GraphClearConnectionsCommand extends ASD.BaseCommand {
                    constructor(items) {
                        super(items);
                        let isExistConnections = false;
                        this._connections = new Map();
                        for (const item of this._items) {
                            const connections = item.getConnections();
                            this._connections.set(item, connections);
                            if (connections.from.size > 0) {
                                isExistConnections = true;
                            }
                        }
                        if (!isExistConnections) {
                            throw new App.Errors.ASDError('Відсутні з\'єднання для видалення.');
                        }
                    }
                    toObject() {
                        return { name: 'clear-connections' };
                    }
                    undo() {
                        for (const [item, connections] of this._connections) {
                            item.connect(connections);
                        }
                    }
                    _executeAlgorithm() {
                        for (const [item, connections] of this._connections) {
                            item.disconnect(connections);
                        }
                    }
                    *_executeAnimation() { }
                }
                Commands.GraphClearConnectionsCommand = GraphClearConnectionsCommand;
            })(Commands = Structures.Commands || (Structures.Commands = {}));
        })(Structures = ASD.Structures || (ASD.Structures = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            class GraphTraversal extends Algorithms.BaseAlgorithm {
                constructor(structure, name, title) {
                    super(structure, name, title);
                    this._controlsManager = new Algorithms.Controls.GraphTraversalControlsManager(this);
                }
            }
            Algorithms.GraphTraversal = GraphTraversal;
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Controls;
            (function (Controls) {
                class GraphTraversalControlsManager extends ASD.BaseControlsManager {
                    constructor(asd) {
                        super({
                            asd: asd,
                            controls: {
                                'general': {
                                    title: asd.title,
                                    items: {
                                        'input-start-item': new App.Visual.Controls.TextControl({ placeholder: 'Початкова вершина' }),
                                        'input-last-item': new App.Visual.Controls.TextControl({ placeholder: 'Кінцева вершина' }),
                                        'start': new App.Visual.Controls.ButtonControl({ value: 'Start', onclick: () => this._start() })
                                    }
                                }
                            }
                        });
                    }
                    get _inputStartItemControl() {
                        return this._getControl('general', 'input-start-item');
                    }
                    get _inputLastItemControl() {
                        return this._getControl('general', 'input-last-item');
                    }
                    clearStartItemTitle() {
                        this._inputStartItemControl.value = '';
                    }
                    clearLastItemTitle() {
                        this._inputLastItemControl.value = '';
                    }
                    _start() {
                        const startIndex = this._asd.structure.findVertexIndex(this._inputStartItemControl.value);
                        const lastIndex = this._asd.structure.findVertexIndex(this._inputLastItemControl.value);
                        this._asd.start(startIndex, lastIndex);
                    }
                }
                Controls.GraphTraversalControlsManager = GraphTraversalControlsManager;
            })(Controls = Algorithms.Controls || (Algorithms.Controls = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Graphics;
            (function (Graphics) {
                class GraphTraversalGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(element, items) {
                        super({ element: element, graphics: {} });
                        this._items = items;
                        this._currentItem = null;
                    }
                    setCurrentItem(item) {
                        const { COLORS } = GraphTraversalGraphicsManager;
                        if (this._currentItem !== item) {
                            if (this._currentItem !== null) {
                                this._currentItem.graphicsManager.clearHighlight('vertex');
                            }
                            if (item !== null) {
                                item.graphicsManager.strokeColor = COLORS.current;
                                item.graphicsManager.strokeWidth = 2;
                                item.graphicsManager.moveToFront();
                            }
                            this._currentItem = item;
                        }
                    }
                    setCheckedItem(currentItem, checkedItem, state) {
                        currentItem.graphicsManager.setConnectionStrokeColor(checkedItem, GraphTraversalGraphicsManager.COLORS[state]);
                    }
                    showPath(path, startItem, lastItem) {
                        const { COLORS } = GraphTraversalGraphicsManager;
                        let current = lastItem;
                        let previous = path.get(current);
                        this._strokeVerticesAsNotFinalPath();
                        if (current === startItem) {
                            current.graphicsManager.strokeWidth = 2;
                            current.graphicsManager.strokeColor = COLORS.finalPath;
                        }
                        if (previous !== undefined) {
                            while (current !== startItem) {
                                current.graphicsManager.strokeWidth = 2;
                                current.graphicsManager.strokeColor = COLORS.finalPath;
                                previous.graphicsManager.strokeWidth = 2;
                                previous.graphicsManager.strokeColor = COLORS.finalPath;
                                previous.graphicsManager.setConnectionStrokeWidth(current, 2);
                                previous.graphicsManager.setConnectionStrokeColor(current, COLORS.finalPath);
                                current = previous;
                                previous = path.get(previous);
                            }
                        }
                    }
                    _strokeVerticesAsNotFinalPath() {
                        const { COLORS } = GraphTraversalGraphicsManager;
                        for (const startItem of this._items) {
                            startItem.graphicsManager.strokeWidth = 1;
                            startItem.graphicsManager.strokeColor = COLORS.notFinalPath;
                            for (const [lastItem] of startItem.getConnections().from) {
                                startItem.graphicsManager.setConnectionStrokeWidth(lastItem, 1);
                                startItem.graphicsManager.setConnectionStrokeColor(lastItem, COLORS.notFinalPath);
                            }
                        }
                    }
                }
                GraphTraversalGraphicsManager.COLORS = {
                    current: 'blue',
                    next: 'aqua',
                    check: 'orange',
                    ready: 'limegreen',
                    block: 'red',
                    finalPath: 'purple',
                    notFinalPath: 'gray'
                };
                Graphics.GraphTraversalGraphicsManager = GraphTraversalGraphicsManager;
            })(Graphics = Algorithms.Graphics || (Algorithms.Graphics = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Commands;
            (function (Commands) {
                class GraphTraversalCommand extends ASD.BaseCommand {
                    constructor(items, structure, startIndex, lastIndex, controlsManager) {
                        super(items, (percent) => (App.Animations.Speed.MAX_PERCENT - percent) * 10);
                        if (this._items[startIndex] === undefined) {
                            controlsManager === null || controlsManager === void 0 ? void 0 : controlsManager.clearStartItemTitle();
                            throw new App.Errors.ASDError('Індекс початкової вершини було введено некоректно.');
                        }
                        if (this._items[lastIndex] === undefined) {
                            controlsManager === null || controlsManager === void 0 ? void 0 : controlsManager.clearLastItemTitle();
                            throw new App.Errors.ASDError('Індекс кінцевої вершини було введено некоректно.');
                        }
                        this._structure = structure;
                        this._startItem = this._items[startIndex];
                        this._lastItem = this._items[lastIndex];
                        this._startIndex = startIndex;
                        this._lastIndex = lastIndex;
                    }
                    undo() {
                        this._structure.clearHighlight();
                    }
                    _executeAlgorithm() { }
                }
                Commands.GraphTraversalCommand = GraphTraversalCommand;
            })(Commands = Algorithms.Commands || (Algorithms.Commands = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            class DFS extends Algorithms.GraphTraversal {
                constructor(structure) {
                    super(structure, 'dfs', 'Пошук в глибину');
                    this._graphicsManager = new Algorithms.Graphics.DFSGraphicsManager(this, this._items);
                }
                start(startIndex, lastIndex) {
                    const managers = { controls: this._controlsManager, graphics: this._graphicsManager };
                    this._invoker.executeCommand(new Algorithms.Commands.DFSCommand(this._items, this.structure, startIndex, lastIndex, managers));
                }
            }
            Algorithms.DFS = DFS;
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Graphics;
            (function (Graphics) {
                class DFSGraphicsManager extends Graphics.GraphTraversalGraphicsManager {
                    constructor(element, items) {
                        super(element, items);
                    }
                    setCurrentItem(currentItem, previousItem, direction) {
                        super.setCurrentItem(currentItem);
                        if (currentItem !== null && previousItem !== undefined && direction !== undefined) {
                            const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                            if (direction === 'forward') {
                                previousItem.graphicsManager.strokeColor = COLORS.ready;
                                previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
                            }
                            else {
                                previousItem.graphicsManager.strokeColor = COLORS.block;
                                currentItem.graphicsManager.setConnectionStrokeColor(previousItem, COLORS.block);
                            }
                            previousItem.graphicsManager.strokeWidth = 1;
                        }
                    }
                }
                Graphics.DFSGraphicsManager = DFSGraphicsManager;
            })(Graphics = Algorithms.Graphics || (Algorithms.Graphics = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Commands;
            (function (Commands) {
                class DFSCommand extends Commands.GraphTraversalCommand {
                    constructor(items, structure, startIndex, lastIndex, managers) {
                        super(items, structure, startIndex, lastIndex, managers === null || managers === void 0 ? void 0 : managers.controls);
                        if ((managers === null || managers === void 0 ? void 0 : managers.graphics) !== undefined) {
                            this._graphicsManager = managers.graphics;
                        }
                    }
                    toObject() {
                        return { name: 'dfs', startIndex: this._startIndex, lastIndex: this._lastIndex };
                    }
                    *_executeAnimation(mode) {
                        var _a, _b, _c, _d, _e, _f, _g;
                        if (mode !== 'load') {
                            const path = new Map([[this._startItem, undefined]]);
                            let currentItem = this._startItem;
                            this._structure.clearHighlight();
                            (_a = this._graphicsManager) === null || _a === void 0 ? void 0 : _a.setCurrentItem(null);
                            (_b = this._graphicsManager) === null || _b === void 0 ? void 0 : _b.setCurrentItem(currentItem);
                            while (currentItem !== undefined && currentItem !== this._lastItem) {
                                yield;
                                let isCurrentItemChanged = false;
                                for (const [item] of currentItem.getConnections().from) {
                                    (_c = this._graphicsManager) === null || _c === void 0 ? void 0 : _c.setCheckedItem(currentItem, item, 'check');
                                    yield;
                                    (_d = this._graphicsManager) === null || _d === void 0 ? void 0 : _d.setCheckedItem(currentItem, item, path.has(item) ? 'block' : 'next');
                                    yield;
                                    if (!path.has(item)) {
                                        path.set(item, currentItem);
                                        (_e = this._graphicsManager) === null || _e === void 0 ? void 0 : _e.setCurrentItem(item, currentItem, 'forward');
                                        isCurrentItemChanged = true;
                                        currentItem = item;
                                        break;
                                    }
                                }
                                yield;
                                if (!isCurrentItemChanged) {
                                    const previousItem = path.get(currentItem);
                                    if (previousItem !== undefined) {
                                        (_f = this._graphicsManager) === null || _f === void 0 ? void 0 : _f.setCurrentItem(previousItem, currentItem, 'back');
                                    }
                                    currentItem = previousItem;
                                }
                            }
                            (_g = this._graphicsManager) === null || _g === void 0 ? void 0 : _g.showPath(path, this._startItem, this._lastItem);
                        }
                    }
                }
                Commands.DFSCommand = DFSCommand;
            })(Commands = Algorithms.Commands || (Algorithms.Commands = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            class BFS extends Algorithms.GraphTraversal {
                constructor(structure) {
                    super(structure, 'bfs', 'Пошук в ширину');
                    this._graphicsManager = new Algorithms.Graphics.BFSGraphicsManager(this, this._items);
                }
                start(startIndex, lastIndex) {
                    const managers = { controls: this._controlsManager, graphics: this._graphicsManager };
                    this._invoker.executeCommand(new Algorithms.Commands.BFSCommand(this._items, this.structure, startIndex, lastIndex, managers));
                }
            }
            Algorithms.BFS = BFS;
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Graphics;
            (function (Graphics) {
                class BFSGraphicsManager extends Graphics.GraphTraversalGraphicsManager {
                    constructor(element, items) {
                        super(element, items);
                    }
                    setCurrentItem(currentItem, previousItem) {
                        super.setCurrentItem(currentItem);
                        if (currentItem !== null && previousItem !== undefined) {
                            const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                            previousItem.graphicsManager.strokeWidth = 1;
                            previousItem.graphicsManager.strokeColor = COLORS.ready;
                            previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
                        }
                    }
                    setReadyItem(item) {
                        const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                        item.graphicsManager.strokeWidth = 1;
                        item.graphicsManager.strokeColor = COLORS.ready;
                    }
                }
                Graphics.BFSGraphicsManager = BFSGraphicsManager;
            })(Graphics = Algorithms.Graphics || (Algorithms.Graphics = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Commands;
            (function (Commands) {
                class BFSCommand extends Commands.GraphTraversalCommand {
                    constructor(items, structure, startIndex, lastIndex, managers) {
                        super(items, structure, startIndex, lastIndex, managers === null || managers === void 0 ? void 0 : managers.controls);
                        if ((managers === null || managers === void 0 ? void 0 : managers.graphics) !== undefined) {
                            this._graphicsManager = managers.graphics;
                        }
                    }
                    toObject() {
                        return { name: 'bfs', startIndex: this._startIndex, lastIndex: this._lastIndex };
                    }
                    *_executeAnimation(mode) {
                        var _a, _b, _c, _d, _e;
                        if (mode !== 'load') {
                            const path = new Map([[this._startItem, undefined]]);
                            const stack = [];
                            let currentItem = this._startItem;
                            let previousItem = undefined;
                            this._structure.clearHighlight();
                            while (currentItem !== undefined && currentItem !== this._lastItem) {
                                (_a = this._graphicsManager) === null || _a === void 0 ? void 0 : _a.setCurrentItem(currentItem, path.get(currentItem));
                                if (previousItem !== undefined) {
                                    (_b = this._graphicsManager) === null || _b === void 0 ? void 0 : _b.setReadyItem(previousItem);
                                }
                                yield;
                                for (const [item] of currentItem.getConnections().from) {
                                    (_c = this._graphicsManager) === null || _c === void 0 ? void 0 : _c.setCheckedItem(currentItem, item, 'check');
                                    yield;
                                    (_d = this._graphicsManager) === null || _d === void 0 ? void 0 : _d.setCheckedItem(currentItem, item, path.has(item) ? 'block' : 'next');
                                    yield;
                                    if (!path.has(item)) {
                                        path.set(item, currentItem);
                                        stack.push(item);
                                    }
                                }
                                previousItem = currentItem;
                                currentItem = stack.shift();
                            }
                            (_e = this._graphicsManager) === null || _e === void 0 ? void 0 : _e.showPath(path, this._startItem, this._lastItem);
                        }
                    }
                }
                Commands.BFSCommand = BFSCommand;
            })(Commands = Algorithms.Commands || (Algorithms.Commands = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            class Dijkstra extends Algorithms.GraphTraversal {
                constructor(structure) {
                    super(structure, 'dijkstra', 'Найкоротший шлях Дейкстри');
                    this._graphicsManager = new Algorithms.Graphics.DijkstraGraphicsManager(this, this._items);
                }
                start(startIndex, lastIndex) {
                    const managers = { controls: this._controlsManager, graphics: this._graphicsManager };
                    this._invoker.executeCommand(new Algorithms.Commands.DijkstraCommand(this._items, this.structure, startIndex, lastIndex, managers));
                }
            }
            Algorithms.Dijkstra = Dijkstra;
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Graphics;
            (function (Graphics) {
                class DijkstraGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(element, items) {
                        const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                        const { _DISTANCES_POSITION } = DijkstraGraphicsManager;
                        super({
                            element: element,
                            viewSize: new App.Utils.Vector(1500, 500),
                            graphics: {
                                'headers': new App.Visual.Graphics.GraphicMap(),
                                'distances': new App.Visual.Graphics.GraphicCollection(),
                                'line': new App.Visual.Graphics.Line(new App.Utils.Bounds(460, 20, 1000, 80), new App.Utils.Vector(1000, 80), new App.Utils.Vector(1460, 80)),
                                'current-item-distance-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(100, 20, 1000, 10), 'current_distance:'),
                                'current-item-distance-value': new App.Visual.Graphics.Text(new App.Utils.Bounds(50, 20, 1098, 10), '0', { strokeColor: COLORS.current }),
                                'checked-item-distance-text': new App.Visual.Graphics.Text(new App.Utils.Bounds(100, 20, 1200, 10), 'checked_distance:'),
                                'checked-item-distance-value': new App.Visual.Graphics.Text(new App.Utils.Bounds(50, 20, 1305, 10), 'INF', { strokeColor: COLORS.check }),
                                'result-description': new App.Visual.Graphics.Text(new App.Utils.Bounds(500, 20, 1000, 30), 'path_length:'),
                                'path-length-value': new App.Visual.Graphics.Text(new App.Utils.Bounds(50, 20, 1072, 30), '0', { strokeColor: COLORS.finalPath })
                            }
                        });
                        this._items = items;
                        this._currentItem = null;
                        this._checkedItem = null;
                        this._nearestItem = null;
                        this._isValidForShowDescriptions = false;
                        this._distanceY = _DISTANCES_POSITION.y;
                        this.reset();
                    }
                    get _headersGraphics() {
                        return this._getGraphic('headers');
                    }
                    get _distancesGraphics() {
                        return this._getGraphic('distances');
                    }
                    get _lineGraphic() {
                        return this._getGraphic('line');
                    }
                    get _currentItemDistanceValueGraphic() {
                        return this._getGraphic('current-item-distance-value');
                    }
                    get _checkedItemDistanceValueGraphic() {
                        return this._getGraphic('checked-item-distance-value');
                    }
                    get _resultDescriptionGraphic() {
                        return this._getGraphic('result-description');
                    }
                    get _pathLengthValueGraphic() {
                        return this._getGraphic('path-length-value');
                    }
                    reset() {
                        this._lineGraphic.isVisible = false;
                        this._resultDescriptionGraphic.isVisible = false;
                        this._pathLengthValueGraphic.isVisible = false;
                        this._distanceY = DijkstraGraphicsManager._DISTANCES_POSITION.y;
                        this._isValidForShowDescriptions = this._checkValidForShowHeaders();
                        this._headersGraphics.clear();
                        this._distancesGraphics.clear();
                    }
                    setCurrentItem(currentItem, fromItem, distance) {
                        if (this._currentItem !== currentItem) {
                            const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                            this.setNearestItem(null);
                            if (this._currentItem !== null) {
                                this._currentItem.graphicsManager.clearHighlight('vertex');
                                this._headersGraphics.get(this._currentItem).strokeColor = App.Theme.dynamicColor;
                            }
                            if (currentItem !== null) {
                                if (fromItem !== null && fromItem !== undefined) {
                                    fromItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
                                }
                                currentItem.graphicsManager.strokeWidth = 2;
                                currentItem.graphicsManager.strokeColor = COLORS.current;
                                this._headersGraphics.get(currentItem).strokeColor = COLORS.current;
                                this._currentItemDistanceValueGraphic.text = String(distance);
                            }
                            this._currentItem = currentItem;
                        }
                    }
                    setCheckedItem(item) {
                        if (this._checkedItem !== item) {
                            if (this._checkedItem !== null) {
                                if (this._currentItem !== null && this._currentItem.checkConnection(this._checkedItem)) {
                                    this._currentItem.graphicsManager.setConnectionStrokeColor(this._checkedItem, App.Theme.dynamicColor);
                                }
                                this._checkedItem.graphicsManager.clearHighlight('vertex');
                                this._headersGraphics.get(this._checkedItem).strokeColor = App.Theme.dynamicColor;
                            }
                            if (item === null) {
                                this._checkedItemDistanceValueGraphic.text = 'INF';
                            }
                            else {
                                item.graphicsManager.strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.check;
                                this._headersGraphics.get(item).strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.check;
                            }
                            this._checkedItem = item;
                        }
                    }
                    setNearestItem(item) {
                        if (this._checkedItem === item && this._nearestItem !== item) {
                            this.setCheckedItem(null);
                            if (this._nearestItem !== null) {
                                this._nearestItem.graphicsManager.clearHighlight('vertex');
                                this._headersGraphics.get(this._nearestItem).strokeColor = App.Theme.dynamicColor;
                            }
                            if (item !== null) {
                                item.graphicsManager.strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.next;
                                this._headersGraphics.get(item).strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.next;
                            }
                            this._nearestItem = item;
                        }
                    }
                    setReadyItem(item) {
                        if (this._currentItem === item) {
                            this.setCurrentItem(null);
                        }
                        item.graphicsManager.strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.ready;
                        this._headersGraphics.get(item).strokeColor = Graphics.GraphTraversalGraphicsManager.COLORS.ready;
                    }
                    strokeCheckedItemConnectFrom(item) {
                        if (this._checkedItem === null) {
                            throw new App.Errors.DesignError('Неможливо обвести з\'єднання до елементу, що перевіряється, оскільки він не був визначений.');
                        }
                        item.graphicsManager.setConnectionStrokeColor(this._checkedItem, Graphics.GraphTraversalGraphicsManager.COLORS.check);
                    }
                    wrapToNextLine() {
                        this._distanceY += DijkstraGraphicsManager._ITEMS_MARGIN.y;
                    }
                    showCheckedItemDistance(distance) {
                        this._checkedItemDistanceValueGraphic.text = String(distance).toLocaleUpperCase();
                    }
                    showHeaders() {
                        const { _HEADERS_POSITION, _ITEMS_MARGIN, _ITEMS_SIZE } = DijkstraGraphicsManager;
                        const position = _HEADERS_POSITION.copy();
                        this._lineGraphic.isVisible = this._isValidForShowDescriptions;
                        for (const item of this._items) {
                            const graphic = new App.Visual.Graphics.Text(new App.Utils.Bounds(_ITEMS_SIZE, position), item.title);
                            graphic.isVisible = this._isValidForShowDescriptions;
                            position.x += _ITEMS_MARGIN.x;
                            this._headersGraphics.set(item, graphic);
                        }
                    }
                    showDistance(item, distance) {
                        const { _ITEMS_MARGIN, _ITEMS_SIZE, _DISTANCES_POSITION } = DijkstraGraphicsManager;
                        const stringifyDistance = String(distance !== null && distance !== void 0 ? distance : '');
                        const index = this._items.indexOf(item);
                        const position = new App.Utils.Vector(_DISTANCES_POSITION.x + _ITEMS_MARGIN.x * index, this._distanceY);
                        const graphic = new App.Visual.Graphics.Text(new App.Utils.Bounds(_ITEMS_SIZE, position), stringifyDistance, { isVisible: this._isValidForShowDescriptions });
                        this._distancesGraphics.add(graphic);
                    }
                    showPath(startItem, lastItem, path) {
                        var _a, _b;
                        const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                        const lastStep = path.get(lastItem);
                        let currentItem = lastItem;
                        let previousItem = lastStep === null || lastStep === void 0 ? void 0 : lastStep.from;
                        this._resultDescriptionGraphic.isVisible = true;
                        this._strokeVerticesAsNotFinalPath();
                        if (lastStep === undefined && startItem !== lastItem) {
                            this._resultDescriptionGraphic.text = 'Шляху між вказаними вершинами не існує.';
                            this._resultDescriptionGraphic.strokeColor = COLORS.block;
                            currentItem.graphicsManager.strokeColor = COLORS.block;
                        }
                        else {
                            this._resultDescriptionGraphic.text = 'path_length:';
                            this._resultDescriptionGraphic.strokeColor = App.Theme.dynamicColor;
                            this._pathLengthValueGraphic.isVisible = true;
                            this._pathLengthValueGraphic.text = String((_a = lastStep === null || lastStep === void 0 ? void 0 : lastStep.distance) !== null && _a !== void 0 ? _a : 0);
                            this._headersGraphics.get(startItem).strokeColor = COLORS.finalPath;
                            this._headersGraphics.get(lastItem).strokeColor = COLORS.finalPath;
                            startItem.graphicsManager.strokeWidth = 2;
                            startItem.graphicsManager.strokeColor = COLORS.finalPath;
                            lastItem.graphicsManager.strokeWidth = 2;
                            lastItem.graphicsManager.strokeColor = COLORS.finalPath;
                        }
                        while (previousItem !== undefined) {
                            previousItem.graphicsManager.strokeWidth = 2;
                            previousItem.graphicsManager.strokeColor = COLORS.finalPath;
                            previousItem.graphicsManager.setConnectionStrokeWidth(currentItem, 2);
                            previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.finalPath);
                            currentItem.graphicsManager.strokeWidth = 2;
                            currentItem.graphicsManager.strokeColor = COLORS.finalPath;
                            currentItem = previousItem;
                            previousItem = (_b = path.get(currentItem)) === null || _b === void 0 ? void 0 : _b.from;
                        }
                    }
                    _checkValidForShowHeaders() {
                        if (this._items.length > 10) {
                            return false;
                        }
                        for (const item of this._items) {
                            if (item.title.length > 1) {
                                return false;
                            }
                        }
                        return true;
                    }
                    _strokeVerticesAsNotFinalPath() {
                        const { COLORS } = Graphics.GraphTraversalGraphicsManager;
                        for (const startItem of this._items) {
                            startItem.graphicsManager.strokeWidth = 1;
                            startItem.graphicsManager.strokeColor = COLORS.notFinalPath;
                            for (const [lastItem] of startItem.getConnections().from) {
                                startItem.graphicsManager.setConnectionStrokeWidth(lastItem, 2);
                                startItem.graphicsManager.setConnectionStrokeColor(lastItem, COLORS.notFinalPath);
                            }
                        }
                    }
                }
                DijkstraGraphicsManager._HEADERS_POSITION = new App.Utils.Vector(1000, 60);
                DijkstraGraphicsManager._DISTANCES_POSITION = new App.Utils.Vector(1000, 90);
                DijkstraGraphicsManager._ITEMS_MARGIN = new App.Utils.Vector(50, 20);
                DijkstraGraphicsManager._ITEMS_SIZE = new App.Utils.Vector(50, 20);
                Graphics.DijkstraGraphicsManager = DijkstraGraphicsManager;
            })(Graphics = Algorithms.Graphics || (Algorithms.Graphics = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Algorithms;
        (function (Algorithms) {
            var Commands;
            (function (Commands) {
                class DijkstraCommand extends Commands.GraphTraversalCommand {
                    constructor(items, structure, startIndex, lastIndex, managers) {
                        super(items, structure, startIndex, lastIndex, managers === null || managers === void 0 ? void 0 : managers.controls);
                        if ((managers === null || managers === void 0 ? void 0 : managers.graphics) !== undefined) {
                            this._graphicsManager = managers.graphics;
                        }
                    }
                    toObject() {
                        return { name: 'dijkstra', startIndex: this._startIndex, lastIndex: this._lastIndex };
                    }
                    *_executeAnimation(mode) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                        if (mode !== 'load') {
                            const ready = new Set();
                            const path = new Map();
                            let currentItem = this._startItem;
                            this._structure.clearHighlight();
                            (_a = this._graphicsManager) === null || _a === void 0 ? void 0 : _a.reset();
                            (_b = this._graphicsManager) === null || _b === void 0 ? void 0 : _b.showHeaders();
                            while (currentItem !== this._lastItem) {
                                const fromItem = (_d = (_c = path.get(currentItem)) === null || _c === void 0 ? void 0 : _c.from) !== null && _d !== void 0 ? _d : null;
                                const currentItemDistance = (_f = (_e = path.get(currentItem)) === null || _e === void 0 ? void 0 : _e.distance) !== null && _f !== void 0 ? _f : 0;
                                let nearestItem = currentItem;
                                let nearestDistance = Infinity;
                                ready.add(currentItem);
                                (_g = this._graphicsManager) === null || _g === void 0 ? void 0 : _g.setCurrentItem(currentItem, fromItem, currentItemDistance);
                                yield;
                                for (const checkedItem of this._items) {
                                    if (!ready.has(checkedItem)) {
                                        (_h = this._graphicsManager) === null || _h === void 0 ? void 0 : _h.setCheckedItem(checkedItem);
                                        yield;
                                        const connection = currentItem.getConnection(checkedItem);
                                        if (connection !== null) {
                                            const fullCheckedItemDistance = currentItemDistance + connection.weight;
                                            const lastCheckedItemInfo = path.get(checkedItem);
                                            if (lastCheckedItemInfo === undefined || lastCheckedItemInfo.distance > fullCheckedItemDistance) {
                                                path.set(checkedItem, { from: currentItem, distance: fullCheckedItemDistance });
                                            }
                                            (_j = this._graphicsManager) === null || _j === void 0 ? void 0 : _j.strokeCheckedItemConnectFrom(currentItem);
                                            (_k = this._graphicsManager) === null || _k === void 0 ? void 0 : _k.showCheckedItemDistance(fullCheckedItemDistance);
                                        }
                                        else {
                                            (_l = this._graphicsManager) === null || _l === void 0 ? void 0 : _l.showCheckedItemDistance(null);
                                        }
                                        yield;
                                        const checkedItemInfo = path.get(checkedItem);
                                        if (checkedItemInfo !== undefined && nearestDistance > checkedItemInfo.distance) {
                                            nearestItem = checkedItem;
                                            nearestDistance = checkedItemInfo.distance;
                                            (_m = this._graphicsManager) === null || _m === void 0 ? void 0 : _m.setNearestItem(nearestItem);
                                        }
                                        (_o = this._graphicsManager) === null || _o === void 0 ? void 0 : _o.showDistance(checkedItem, (_q = (_p = path.get(checkedItem)) === null || _p === void 0 ? void 0 : _p.distance) !== null && _q !== void 0 ? _q : null);
                                        (_r = this._graphicsManager) === null || _r === void 0 ? void 0 : _r.setCheckedItem(null);
                                        yield;
                                    }
                                }
                                (_s = this._graphicsManager) === null || _s === void 0 ? void 0 : _s.setReadyItem(currentItem);
                                (_t = this._graphicsManager) === null || _t === void 0 ? void 0 : _t.wrapToNextLine();
                                if (currentItem === nearestItem) {
                                    break;
                                }
                                currentItem = nearestItem;
                            }
                            (_u = this._graphicsManager) === null || _u === void 0 ? void 0 : _u.showPath(this._startItem, this._lastItem, path);
                        }
                    }
                }
                Commands.DijkstraCommand = DijkstraCommand;
            })(Commands = Algorithms.Commands || (Algorithms.Commands = {}));
        })(Algorithms = ASD.Algorithms || (ASD.Algorithms = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Items;
        (function (Items) {
            class NodeItem extends Items.BaseItem {
                constructor(title, linkDirection) {
                    super();
                    this.title = title;
                    this.linkDirection = linkDirection;
                    this.graphicsManager = new Items.Graphics.NodeItemGraphicsManager(this);
                    this._leftLinkedItem = null;
                    this._rightLinkedItem = null;
                    this._leftLinkedItemUpdateCallback = () => this.graphicsManager.updateLeftLink();
                    this._rightLinkedItemUpdateCallback = () => this.graphicsManager.updateRightLink();
                }
                get leftLinkedItem() {
                    return this._leftLinkedItem;
                }
                set leftLinkedItem(item) {
                    if (this.checkCanLinked('left') && this._leftLinkedItem !== item) {
                        if (this._leftLinkedItem !== null) {
                            this._leftLinkedItem.graphicsManager.removeMoveListener(this._leftLinkedItemUpdateCallback);
                        }
                        if (item !== null) {
                            item.graphicsManager.addMoveListener(this._leftLinkedItemUpdateCallback);
                        }
                        this._leftLinkedItem = item;
                        this.graphicsManager.updateLeftLink();
                    }
                }
                get rightLinkedItem() {
                    return this._rightLinkedItem;
                }
                set rightLinkedItem(item) {
                    if (this.checkCanLinked('right') && this._rightLinkedItem !== item) {
                        if (this._rightLinkedItem !== null) {
                            this._rightLinkedItem.graphicsManager.removeMoveListener(this._rightLinkedItemUpdateCallback);
                        }
                        if (item !== null) {
                            item.graphicsManager.addMoveListener(this._rightLinkedItemUpdateCallback);
                        }
                        this._rightLinkedItem = item;
                        this.graphicsManager.updateRightLink();
                    }
                }
                checkCanLinked(direction) {
                    return this.linkDirection === 'any' || this.linkDirection === direction;
                }
            }
            Items.NodeItem = NodeItem;
        })(Items = ASD.Items || (ASD.Items = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Items;
        (function (Items) {
            var Graphics;
            (function (Graphics) {
                class NodeItemGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(element) {
                        super({
                            element: element,
                            graphics: {
                                'node': new App.Visual.Graphics.LinkedNode(new App.Utils.Bounds(72, 32, 224, 26)),
                                'text': new App.Visual.Graphics.Text(new App.Utils.Bounds(40, 32, 64, 26), element.title, { strokeWidth: 0.8, horizontalAlign: 'center', verticalAlign: 'center' }),
                                'left-link': new App.Visual.Graphics.Line(new App.Utils.Bounds(), new App.Utils.Vector(), new App.Utils.Vector(), { countArrows: 1 }),
                                'right-link': new App.Visual.Graphics.Line(new App.Utils.Bounds(), new App.Utils.Vector(), new App.Utils.Vector(), { countArrows: 1 })
                            }
                        });
                        this._eventTarget = new App.Utils.EventTarget();
                        this._initializeTextGraphic();
                        this._initializeNodeGraphic();
                    }
                    get _nodeGraphic() {
                        return this._getGraphic('node');
                    }
                    get _textGraphic() {
                        return this._getGraphic('text');
                    }
                    get _leftLinkGraphic() {
                        return this._getGraphic('left-link');
                    }
                    get _rightLinkGraphic() {
                        return this._getGraphic('right-link');
                    }
                    addMoveListener(listener) {
                        this._eventTarget.addEventListener('move', listener);
                    }
                    removeMoveListener(listener) {
                        this._eventTarget.removeEventListener('move', listener);
                    }
                    getTopArrowTargetPosition() {
                        return new App.Utils.Vector(this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width / 2, this._nodeGraphic.bounds.y);
                    }
                    getBottomArrowTargetPosition() {
                        return new App.Utils.Vector(this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width / 2, this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height);
                    }
                    *moveTextToNode(stepsCount) {
                        const difference = new App.Utils.Vector((this._nodeGraphic.getInnerX() - this._textGraphic.bounds.x) / stepsCount, (this._nodeGraphic.bounds.y - this._textGraphic.bounds.y) / stepsCount);
                        for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
                            this._textGraphic.bounds.x += difference.x;
                            this._textGraphic.bounds.y += difference.y;
                            yield;
                        }
                    }
                    *moveTextFromNode(stepsCount) {
                        const { _REMOVE_TEXT_RESULT_Y } = NodeItemGraphicsManager;
                        const differenceY = (_REMOVE_TEXT_RESULT_Y - this._textGraphic.bounds.y) / stepsCount;
                        for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
                            this._textGraphic.bounds.y += differenceY;
                            yield;
                        }
                    }
                    *moveNodeToResultPosition(index, stepsCount) {
                        const { _START_RESULT_POSITION, _ITEMS_MARGIN_X } = NodeItemGraphicsManager;
                        const difference = new App.Utils.Vector(((_START_RESULT_POSITION.x + (this._nodeGraphic.bounds.width + _ITEMS_MARGIN_X) * index) - this._nodeGraphic.bounds.x) / stepsCount, (_START_RESULT_POSITION.y - this._nodeGraphic.bounds.y) / stepsCount);
                        for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
                            this._nodeGraphic.bounds.x += difference.x;
                            this._nodeGraphic.bounds.y += difference.y;
                            this._textGraphic.bounds.x += difference.x;
                            this._textGraphic.bounds.y += difference.y;
                            yield;
                        }
                    }
                    updateLeftLink() {
                        var _a;
                        if (this._element.checkCanLinked('left')) {
                            const linkedItemGraphicsManager = (_a = this._element.leftLinkedItem) === null || _a === void 0 ? void 0 : _a.graphicsManager;
                            const hasLinkedItem = (linkedItemGraphicsManager !== undefined);
                            if (hasLinkedItem) {
                                this._leftLinkGraphic.from.x = this._nodeGraphic.bounds.x + this._nodeGraphic.getWidthPadding() / 2;
                                this._leftLinkGraphic.from.y = this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height / 2;
                                this._leftLinkGraphic.to.x = linkedItemGraphicsManager._nodeGraphic.bounds.x + linkedItemGraphicsManager._nodeGraphic.bounds.width;
                                this._leftLinkGraphic.to.y = linkedItemGraphicsManager._nodeGraphic.bounds.y + linkedItemGraphicsManager._nodeGraphic.bounds.height / 2;
                                this._leftLinkGraphic.bounds.x = this._leftLinkGraphic.to.x;
                                this._leftLinkGraphic.bounds.y = this._nodeGraphic.bounds.y;
                                this._leftLinkGraphic.bounds.width = this._leftLinkGraphic.from.x - this._leftLinkGraphic.to.x;
                                this._leftLinkGraphic.bounds.height = this._nodeGraphic.bounds.height;
                            }
                            this._leftLinkGraphic.isVisible = hasLinkedItem;
                            this._nodeGraphic.leftLinkState = hasLinkedItem ? 'opened' : 'closed';
                        }
                    }
                    updateRightLink() {
                        var _a;
                        if (this._element.checkCanLinked('right')) {
                            const linkedItemGraphicsManager = (_a = this._element.rightLinkedItem) === null || _a === void 0 ? void 0 : _a.graphicsManager;
                            const hasLinkedItem = (linkedItemGraphicsManager !== undefined);
                            if (hasLinkedItem) {
                                this._rightLinkGraphic.from.x = this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width - this._nodeGraphic.getWidthPadding() / 2;
                                this._rightLinkGraphic.from.y = this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height / 2;
                                this._rightLinkGraphic.to.x = linkedItemGraphicsManager._nodeGraphic.bounds.x;
                                this._rightLinkGraphic.to.y = linkedItemGraphicsManager._nodeGraphic.bounds.y + linkedItemGraphicsManager._nodeGraphic.bounds.height / 2;
                                this._rightLinkGraphic.bounds.x = this._rightLinkGraphic.from.x;
                                this._rightLinkGraphic.bounds.y = this._nodeGraphic.bounds.y;
                                this._rightLinkGraphic.bounds.width = this._rightLinkGraphic.to.x - this._rightLinkGraphic.from.x;
                                this._rightLinkGraphic.bounds.height = this._nodeGraphic.bounds.height;
                            }
                            this._rightLinkGraphic.isVisible = hasLinkedItem;
                            this._nodeGraphic.rightLinkState = hasLinkedItem ? 'opened' : 'closed';
                        }
                    }
                    _initializeTextGraphic() {
                        this._textGraphic.bounds.width = this._nodeGraphic.getInnerWidth();
                        if (this._element.linkDirection === 'right') {
                            this._textGraphic.horizontalAlign = 'left';
                        }
                        else if (this._element.linkDirection === 'left') {
                            this._textGraphic.horizontalAlign = 'right';
                        }
                        else
                            this._textGraphic.horizontalAlign = 'center';
                    }
                    _initializeNodeGraphic() {
                        if (this._element.checkCanLinked('left')) {
                            this._nodeGraphic.leftLinkState = 'closed';
                        }
                        if (this._element.checkCanLinked('right')) {
                            this._nodeGraphic.rightLinkState = 'closed';
                        }
                        this._nodeGraphic.bounds.addChangeListener(() => {
                            this.updateLeftLink();
                            this.updateRightLink();
                            this._eventTarget.dispatchEvent('move');
                        });
                    }
                }
                NodeItemGraphicsManager._START_RESULT_POSITION = new App.Utils.Vector(56, 172);
                NodeItemGraphicsManager._ITEMS_MARGIN_X = 20;
                NodeItemGraphicsManager._REMOVE_TEXT_RESULT_Y = 36;
                Graphics.NodeItemGraphicsManager = NodeItemGraphicsManager;
            })(Graphics = Items.Graphics || (Items.Graphics = {}));
        })(Items = ASD.Items || (ASD.Items = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Items;
        (function (Items) {
            class GraphVertex extends Items.BaseItem {
                constructor(title, center) {
                    super();
                    this.title = title;
                    this.center = center;
                    this._connections = { from: new Map(), to: new Map() };
                    this.graphicsManager = new Items.Graphics.GraphVertexGraphicsManager(this, this._connections);
                }
                checkConnection(vertex) {
                    return this._connections.from.has(vertex);
                }
                getConnection(vertex) {
                    const connection = this._connections.from.get(vertex);
                    return (connection !== undefined) ? Object.assign({}, connection) : null;
                }
                getConnections() {
                    return {
                        from: new Map(this._connections.from),
                        to: new Map(this._connections.to)
                    };
                }
                toObject(items) {
                    const obj = {
                        title: this.title,
                        center: this.center.toObject(),
                        connectionsIndexes: []
                    };
                    for (const [item, connection] of this._connections.from) {
                        obj.connectionsIndexes.push({ index: items.indexOf(item), weight: connection.weight });
                    }
                    return obj;
                }
                connect(arg, weight, vertex) {
                    if (typeof arg === 'boolean' && typeof weight === 'number' && vertex instanceof GraphVertex) {
                        if ((arg || (!arg && !this._connections.to.has(vertex))) && !this._connections.from.has(vertex)) {
                            this._connections.from.set(vertex, { isOriented: arg, weight });
                            vertex._connections.to.set(this, { isOriented: arg, weight });
                            if (!arg) {
                                this._connections.to.set(vertex, { isOriented: arg, weight });
                                vertex._connections.from.set(this, { isOriented: arg, weight });
                            }
                            this.graphicsManager.connect(arg, weight, vertex);
                        }
                    }
                    else if (typeof arg === 'object') {
                        for (const [vertex, obj] of arg.from) {
                            this.connect(obj.isOriented, obj.weight, vertex);
                        }
                        for (const [vertex, obj] of arg.to) {
                            vertex.connect(obj.isOriented, obj.weight, this);
                        }
                    }
                }
                disconnect(arg) {
                    if (arg instanceof GraphVertex) {
                        const connection = this._connections.from.get(arg);
                        if (connection !== undefined) {
                            this._connections.from.delete(arg);
                            arg._connections.to.delete(this);
                            if (!connection.isOriented) {
                                this._connections.to.delete(arg);
                                arg._connections.from.delete(this);
                            }
                            this.graphicsManager.disconnect(connection.isOriented, arg);
                        }
                    }
                    else {
                        for (const [vertex] of arg.from) {
                            this.disconnect(vertex);
                        }
                        for (const [vertex] of arg.to) {
                            vertex.disconnect(this);
                        }
                    }
                }
            }
            Items.GraphVertex = GraphVertex;
        })(Items = ASD.Items || (ASD.Items = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    var ASD;
    (function (ASD) {
        var Items;
        (function (Items) {
            var Graphics;
            (function (Graphics) {
                class GraphVertexGraphicsManager extends ASD.BaseGraphicsManager {
                    constructor(element, connections) {
                        const bounds = new App.Utils.Bounds(GraphVertexGraphicsManager.VERTEX_RADIUS * 2, GraphVertexGraphicsManager.VERTEX_RADIUS * 2, element.center.x - GraphVertexGraphicsManager.VERTEX_RADIUS, element.center.y - GraphVertexGraphicsManager.VERTEX_RADIUS);
                        super({
                            element: element,
                            graphics: {
                                'vertex': new App.Visual.Graphics.Ellipse(bounds, GraphVertexGraphicsManager._DEFAULT_GRAPHICS_OPTIONS.vertex),
                                'text': new App.Visual.Graphics.Text(bounds, element.title, { horizontalAlign: 'center', verticalAlign: 'center' }),
                                'connections-lines': new App.Visual.Graphics.GraphicMap(),
                                'connections-weights': new App.Visual.Graphics.GraphicMap()
                            }
                        });
                        this._connections = connections;
                        this._isVisibleConnectionsWeights = true;
                        this._connectionsWeightsGraphics.addChangeListener((graphic) => graphic.isVisible = this._isVisibleConnectionsWeights);
                    }
                    get fillColor() {
                        return this._vertexGraphic.fillColor;
                    }
                    set fillColor(color) {
                        this._vertexGraphic.fillColor = color;
                    }
                    get strokeColor() {
                        return this._vertexGraphic.strokeColor;
                    }
                    set strokeColor(color) {
                        this._vertexGraphic.strokeColor = color;
                    }
                    get strokeWidth() {
                        return this._vertexGraphic.strokeWidth;
                    }
                    set strokeWidth(width) {
                        this._vertexGraphic.strokeWidth = width;
                    }
                    get _vertexGraphic() {
                        return this._getGraphic('vertex');
                    }
                    get _connectionsLinesGraphics() {
                        return this._getGraphic('connections-lines');
                    }
                    get _connectionsWeightsGraphics() {
                        return this._getGraphic('connections-weights');
                    }
                    checkCollide(position) {
                        return this._vertexGraphic.bounds.checkCollide(position);
                    }
                    moveToFront() {
                        App.Visual.Graphics.moveToFront(this._vertexGraphic);
                    }
                    clearHighlight(filter) {
                        const { _DEFAULT_GRAPHICS_OPTIONS } = GraphVertexGraphicsManager;
                        if (filter === undefined || filter === 'vertex') {
                            this._vertexGraphic.setOptions(_DEFAULT_GRAPHICS_OPTIONS.vertex);
                        }
                        if (filter === undefined || filter === 'connections') {
                            for (const entry of this._connectionsLinesGraphics) {
                                entry[1].setOptions(_DEFAULT_GRAPHICS_OPTIONS.connection);
                            }
                            for (const entry of this._connectionsWeightsGraphics) {
                                entry[1].setOptions(_DEFAULT_GRAPHICS_OPTIONS.vertex);
                            }
                        }
                    }
                    setVisibleConnectionsWeights(isVisible) {
                        this._isVisibleConnectionsWeights = isVisible;
                        for (const entry of this._connectionsWeightsGraphics) {
                            entry[1].isVisible = isVisible;
                        }
                    }
                    setConnectionStrokeColor(vertex, color) {
                        const line = this._connectionsLinesGraphics.get(vertex);
                        const weight = this._connectionsWeightsGraphics.get(vertex);
                        if (line !== undefined && weight !== undefined) {
                            line.strokeColor = color;
                            weight.strokeColor = color;
                        }
                    }
                    setConnectionStrokeWidth(vertex, width) {
                        const line = this._connectionsLinesGraphics.get(vertex);
                        const weight = this._connectionsWeightsGraphics.get(vertex);
                        if (line !== undefined && weight !== undefined) {
                            line.strokeWidth = width;
                            weight.strokeWidth = width;
                        }
                    }
                    connect(isOriented, weight, vertex) {
                        const connection = this._connections.from.get(vertex);
                        if (connection !== undefined && connection.isOriented === isOriented && connection.weight === weight) {
                            if (!this._connectionsLinesGraphics.hasKey(vertex) && !this._connectionsWeightsGraphics.hasKey(vertex)) {
                                const lineGraphic = this._getConnectionLineGraphics(isOriented, vertex);
                                const weightGraphic = this._getConnectionWeightGraphic(isOriented, weight, vertex);
                                this._connectionsLinesGraphics.set(vertex, lineGraphic);
                                this._connectionsWeightsGraphics.set(vertex, weightGraphic);
                                if (!isOriented) {
                                    vertex.graphicsManager._connectionsLinesGraphics.set(this._element, lineGraphic);
                                    vertex.graphicsManager._connectionsWeightsGraphics.set(this._element, weightGraphic);
                                }
                            }
                        }
                    }
                    disconnect(isOriented, vertex) {
                        if (!this._connections.from.has(vertex) && this._connectionsLinesGraphics.hasKey(vertex) && this._connectionsWeightsGraphics.hasKey(vertex)) {
                            this._connectionsLinesGraphics.delete(vertex);
                            this._connectionsWeightsGraphics.delete(vertex);
                            if (!isOriented) {
                                vertex.graphicsManager._connectionsLinesGraphics.delete(this._element);
                                vertex.graphicsManager._connectionsWeightsGraphics.delete(this._element);
                            }
                        }
                    }
                    _getConnectionLineGraphics(isOriented, vertex) {
                        const { VERTEX_RADIUS, _DEFAULT_GRAPHICS_OPTIONS } = GraphVertexGraphicsManager;
                        if (this._element === vertex) {
                            return new App.Visual.Graphics.Ellipse(new App.Utils.Bounds(VERTEX_RADIUS, VERTEX_RADIUS, this._element.center.x - VERTEX_RADIUS - VERTEX_RADIUS / 2, this._element.center.y + VERTEX_RADIUS / 4), Object.assign(Object.assign({}, _DEFAULT_GRAPHICS_OPTIONS.connection), { endAngle: 270 }));
                        }
                        const distance = this._element.center.getDistanceTo(vertex.center);
                        const difference = new App.Utils.Vector((vertex.center.x - this._element.center.x) / distance, (vertex.center.y - this._element.center.y) / distance);
                        const position = new App.Utils.Vector(Math.min(this._element.center.x, vertex.center.x) - _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows, Math.min(this._element.center.y, vertex.center.y) - _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows);
                        const size = new App.Utils.Vector(Math.max(this._element.center.x, vertex.center.x) - position.x + _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows * 2, Math.max(this._element.center.y, vertex.center.y) - position.y + _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows * 2);
                        return new App.Visual.Graphics.Line(new App.Utils.Bounds(size, position), new App.Utils.Vector(this._element.center.x + difference.x * VERTEX_RADIUS, this._element.center.y + difference.y * VERTEX_RADIUS), new App.Utils.Vector(vertex.center.x - difference.x * VERTEX_RADIUS, vertex.center.y - difference.y * VERTEX_RADIUS), Object.assign(Object.assign({}, _DEFAULT_GRAPHICS_OPTIONS.connection), { countArrows: isOriented ? 1 : 0 }));
                    }
                    _getConnectionWeightGraphic(isOriented, weight, vertex) {
                        const { VERTEX_RADIUS } = GraphVertexGraphicsManager;
                        const size = new App.Utils.Vector(50, 20);
                        if (this._element === vertex) {
                            const position = new App.Utils.Vector(this._element.center.x - VERTEX_RADIUS * 2, this._element.center.y + VERTEX_RADIUS);
                            return new App.Visual.Graphics.Text(new App.Utils.Bounds(size, position), String(weight), { verticalAlign: 'top' });
                        }
                        const distance = this._element.center.getDistanceTo(vertex.center);
                        const denominator = isOriented ? 4 : 2;
                        const difference = new App.Utils.Vector((vertex.center.x - this._element.center.x) / distance, (vertex.center.y - this._element.center.y) / distance);
                        const position = new App.Utils.Vector(this._element.center.x + difference.x * (distance / denominator), this._element.center.y + difference.y * (distance / denominator));
                        return new App.Visual.Graphics.Text(new App.Utils.Bounds(size, position), String(weight), { verticalAlign: 'top' });
                    }
                }
                GraphVertexGraphicsManager.VERTEX_RADIUS = 16;
                GraphVertexGraphicsManager._DEFAULT_GRAPHICS_OPTIONS = {
                    vertex: {
                        fillColor: null,
                        strokeColor: App.Theme.dynamicColor,
                        strokeWidth: 1
                    },
                    connection: {
                        endAngle: 270,
                        lengthArrows: 10,
                        strokeWidth: 1,
                        strokeColor: App.Theme.dynamicColor,
                    }
                };
                Graphics.GraphVertexGraphicsManager = GraphVertexGraphicsManager;
            })(Graphics = Items.Graphics || (Items.Graphics = {}));
        })(Items = ASD.Items || (ASD.Items = {}));
    })(ASD = App.ASD || (App.ASD = {}));
})(App || (App = {}));
var App;
(function (App) {
    new App.ASD.Structures.Stack();
    new App.ASD.Structures.Queue();
    App.graph = new App.ASD.Structures.Graph();
    new App.ASD.Algorithms.DFS(App.graph);
    new App.ASD.Algorithms.BFS(App.graph);
    new App.ASD.Algorithms.Dijkstra(App.graph);
    StructVisorAPI.initialize();
})(App || (App = {}));

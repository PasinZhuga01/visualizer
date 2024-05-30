"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var StructVisorAPI;
(function (StructVisorAPI) {
    var Instructions;
    (function (Instructions) {
        function close() {
            StructVisorAPI.UI.Elements['instructions-section'].style.display = '';
            StructVisorAPI.UI.Elements['dark-overlay'].style.display = '';
        }
        function open(target) {
            const asd = StructVisorAPI.ASD.BaseASD.selected;
            const isVisibleTabs = (asd instanceof StructVisorAPI.ASD.BaseStructure);
            let name = asd === null || asd === void 0 ? void 0 : asd.name;
            if (asd !== null) {
                if (target === undefined) {
                    target = isVisibleTabs ? 'structure' : 'algorithm';
                }
                if (target === 'structure') {
                    if (asd instanceof StructVisorAPI.ASD.BaseAlgorithm) {
                        name = asd.structure.name;
                    }
                }
                StructVisorAPI.UI.Elements['instructions-section'].style.display = 'block';
                StructVisorAPI.UI.Elements['dark-overlay'].style.display = 'block';
                StructVisorAPI.UI.Elements['instructions-tabs'].style.display = isVisibleTabs ? 'none' : '';
                StructVisorAPI.UI.Elements['instructions-frame'].src = `../app/html/${target}s/${name}.html`;
            }
        }
        function initialize() {
            StructVisorAPI.UI.Elements['instructions-tab-structure'].addEventListener('click', () => open('structure'));
            StructVisorAPI.UI.Elements['instructions-tab-algorithm'].addEventListener('click', () => open('algorithm'));
            StructVisorAPI.UI.Elements['instructions-open'].addEventListener('click', () => open());
            StructVisorAPI.UI.Elements['instructions-close'].addEventListener('click', () => close());
        }
        Instructions.initialize = initialize;
    })(Instructions = StructVisorAPI.Instructions || (StructVisorAPI.Instructions = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Storage;
    (function (Storage) {
        var Clear;
        (function (Clear) {
            function clearStructureProgress() {
                const asd = StructVisorAPI.ASD.BaseASD.selected;
                const name = (asd instanceof StructVisorAPI.ASD.BaseAlgorithm) ? asd.structure.name : asd === null || asd === void 0 ? void 0 : asd.name;
                const progress = Storage.getItem('progress');
                if (name !== undefined && name in progress) {
                    progress[name] = { stack: [], cancelCount: 0 };
                    Storage.setItem('progress', progress);
                }
            }
            function setVisible(isVisible) {
                const display = isVisible ? 'block' : '';
                StructVisorAPI.UI.Elements['dark-overlay'].style.display = display;
                StructVisorAPI.UI.Elements['clear-storage-section'].style.display = display;
            }
            function perform(callback) {
                callback();
                location.reload();
            }
            function initialize() {
                StructVisorAPI.UI.Elements['clear-storage-open'].addEventListener('click', () => setVisible(true));
                StructVisorAPI.UI.Elements['clear-storage-close'].addEventListener('click', () => setVisible(false));
                StructVisorAPI.UI.Elements['clear-storage-button'].addEventListener('click', () => perform(() => Storage.clear()));
                StructVisorAPI.UI.Elements['clear-storage-progress-button'].addEventListener('click', () => perform(() => Storage.resetItem('progress')));
                StructVisorAPI.UI.Elements['clear-storage-structure-progress-button'].addEventListener('click', () => perform(() => clearStructureProgress()));
            }
            Clear.initialize = initialize;
        })(Clear = Storage.Clear || (Storage.Clear = {}));
    })(Storage = StructVisorAPI.Storage || (StructVisorAPI.Storage = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Storage;
    (function (Storage) {
        Storage.InitialItems = {
            'is-light-theme': true,
            'is-navigation-visible': true,
            'animation-speed': 50,
            'current-asd': null,
            'progress': {}
        };
    })(Storage = StructVisorAPI.Storage || (StructVisorAPI.Storage = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types.ts" />
/// <reference path="clear.ts" />
/// <reference path="initial_items.ts" />
var StructVisorAPI;
/// <reference path="types.ts" />
/// <reference path="clear.ts" />
/// <reference path="initial_items.ts" />
(function (StructVisorAPI) {
    var Storage;
    (function (Storage) {
        function initializeItems() {
            for (const itemKey of Object.keys(Storage.InitialItems)) {
                if (!(itemKey in localStorage)) {
                    resetItem(itemKey);
                }
            }
        }
        function getItem(name) {
            return JSON.parse(localStorage.getItem(name));
        }
        Storage.getItem = getItem;
        function setItem(name, value) {
            localStorage.setItem(name, JSON.stringify(value));
        }
        Storage.setItem = setItem;
        function resetItem(name) {
            localStorage.setItem(name, JSON.stringify(Storage.InitialItems[name]));
        }
        Storage.resetItem = resetItem;
        function clear() {
            localStorage.clear();
        }
        Storage.clear = clear;
        function initialize() {
            initializeItems();
            Storage.Clear.initialize();
        }
        Storage.initialize = initialize;
    })(Storage = StructVisorAPI.Storage || (StructVisorAPI.Storage = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Errors;
    (function (Errors) {
        class BaseError extends Error {
            constructor(message = '', name = 'Error') {
                super(message);
                this.name = `Application${name}`;
            }
        }
        class SVGError extends BaseError {
            constructor(message) {
                super(message, 'SVGError');
            }
        }
        Errors.SVGError = SVGError;
        class DesignError extends BaseError {
            constructor(message) {
                super(message, 'DesignError');
            }
        }
        Errors.DesignError = DesignError;
        class VisualError extends BaseError {
            constructor(message) {
                super(message, 'VisualError');
            }
        }
        Errors.VisualError = VisualError;
        class ASDError extends BaseError {
            constructor(message) {
                super(message, 'ASDError');
            }
        }
        Errors.ASDError = ASDError;
    })(Errors = StructVisorAPI.Errors || (StructVisorAPI.Errors = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Utils;
    (function (Utils) {
        class EventTarget {
            constructor() {
                this._listeners = {};
            }
            addEventListener(type, listener) {
                if (this._listeners[type] === undefined) {
                    this._listeners[type] = new Set();
                }
                this._listeners[type].add(listener);
            }
            removeEventListener(type, listener) {
                if (this._listeners[type] !== undefined) {
                    this._listeners[type].delete(listener);
                }
            }
            dispatchEvent(type, ...args) {
                var _a;
                for (const listener of (_a = this._listeners[type]) !== null && _a !== void 0 ? _a : []) {
                    listener(...args);
                }
            }
        }
        Utils.EventTarget = EventTarget;
    })(Utils = StructVisorAPI.Utils || (StructVisorAPI.Utils = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Utils;
    (function (Utils) {
        class Geometry {
            constructor() {
                this._lastGeometry = null;
                this._eventTarget = new Utils.EventTarget();
            }
            addChangeListener(listener) {
                if (this._lastGeometry === null) {
                    this._lastGeometry = this.copy();
                }
                this._eventTarget.addEventListener('change', listener);
            }
            removeChangeListener(listener) {
                this._eventTarget.removeEventListener('change', listener);
            }
            _dispatchChange() {
                if (this._lastGeometry !== null) {
                    this._eventTarget.dispatchEvent('change', this._lastGeometry.copy());
                    this._lastGeometry = this.copy();
                }
            }
        }
        Utils.Geometry = Geometry;
    })(Utils = StructVisorAPI.Utils || (StructVisorAPI.Utils = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Utils;
    (function (Utils) {
        class Vector extends Utils.Geometry {
            constructor(...args) {
                var _a, _b;
                super();
                this._x = (typeof args[0] === 'object') ? args[0].x : (_a = args[0]) !== null && _a !== void 0 ? _a : 0;
                this._y = (typeof args[0] === 'object') ? args[0].y : (_b = args[1]) !== null && _b !== void 0 ? _b : 0;
            }
            get x() {
                return this._x;
            }
            set x(value) {
                if (this._x !== value) {
                    this._x = value;
                    this._dispatchChange();
                }
            }
            get y() {
                return this._y;
            }
            set y(value) {
                if (this._y !== value) {
                    this._y = value;
                    this._dispatchChange();
                }
            }
            toObject() {
                return { x: this.x, y: this.y };
            }
            copy() {
                return new Vector(this.x, this.y);
            }
            compare(vector) {
                return this.x === vector.x && this.y === vector.y;
            }
            getDistanceTo(vector) {
                return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
            }
        }
        Utils.Vector = Vector;
    })(Utils = StructVisorAPI.Utils || (StructVisorAPI.Utils = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Utils;
    (function (Utils) {
        class Bounds extends Utils.Geometry {
            constructor(...args) {
                var _a, _b, _c;
                super();
                if (typeof args[0] === 'number' && (typeof args[1] === 'number' || args[1] === undefined)) {
                    this._size = new Utils.Vector(args[0], (_a = args[1]) !== null && _a !== void 0 ? _a : 0);
                    this._position = new Utils.Vector((_b = args[2]) !== null && _b !== void 0 ? _b : 0, (_c = args[3]) !== null && _c !== void 0 ? _c : 0);
                }
                else if (args[0] instanceof Utils.Vector) {
                    this._size = args[0].copy();
                    this._position = (args[1] instanceof Utils.Vector) ? args[1].copy() : new Utils.Vector();
                }
                else if (typeof args[0] === 'object') {
                    this._size = new Utils.Vector(args[0].width, args[0].height);
                    this._position = new Utils.Vector(args[0].x, args[0].y);
                }
                else {
                    this._size = new Utils.Vector();
                    this._position = new Utils.Vector();
                }
                this._size.addChangeListener(() => this._dispatchChange());
                this._position.addChangeListener(() => this._dispatchChange());
            }
            get width() {
                return this._size.x;
            }
            set width(value) {
                this._size.x = value;
            }
            get height() {
                return this._size.y;
            }
            set height(value) {
                this._size.y = value;
            }
            get x() {
                return this._position.x;
            }
            set x(value) {
                this._position.x = value;
            }
            get y() {
                return this._position.y;
            }
            set y(value) {
                this._position.y = value;
            }
            toObject() {
                return { width: this.width, height: this.height, x: this.x, y: this.y };
            }
            copy() {
                return new Bounds(this._size, this._position);
            }
            compare(bounds) {
                return this.width === bounds.width && this.height === bounds.height && this.x === bounds.x && this.y === bounds.y;
            }
            sizeCopy() {
                return this._size.copy();
            }
            positionCopy() {
                return this._position.copy();
            }
            checkCollide(target) {
                if (target instanceof Utils.Vector) {
                    return Utils.checkCollide(this.x, this.width, target.x, 1) && Utils.checkCollide(this.y, this.height, target.y, 1);
                }
                return Utils.checkCollide(this.x, this.width, target.x, target.width) && Utils.checkCollide(this.y, this.height, target.y, target.height);
            }
        }
        Utils.Bounds = Bounds;
    })(Utils = StructVisorAPI.Utils || (StructVisorAPI.Utils = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types.ts" />
/// <reference path="event_target.ts" />
/// <reference path="geometry.ts" />
/// <reference path="vector.ts" />
/// <reference path="bounds.ts" />
var StructVisorAPI;
/// <reference path="types.ts" />
/// <reference path="event_target.ts" />
/// <reference path="geometry.ts" />
/// <reference path="vector.ts" />
/// <reference path="bounds.ts" />
(function (StructVisorAPI) {
    var Utils;
    (function (Utils) {
        function randomBoolean() {
            return Boolean(randomInteger(0, 1));
        }
        Utils.randomBoolean = randomBoolean;
        function randomInteger(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        }
        Utils.randomInteger = randomInteger;
        function randomFloat(min, max) {
            return min + Math.random() * (max - min + Number.EPSILON);
        }
        Utils.randomFloat = randomFloat;
        function round(number, digits = 0) {
            return Number(number.toFixed(digits));
        }
        Utils.round = round;
        function clamp(number, range) {
            if (number <= range[0]) {
                return range[0];
            }
            if (number >= range[1]) {
                return range[1];
            }
            return number;
        }
        Utils.clamp = clamp;
        function toRadians(angle) {
            return (Math.PI / 180) * angle;
        }
        Utils.toRadians = toRadians;
        function checkCollide(Apos, Asize, Bpos, Bsize) {
            return (Apos < Bpos + Bsize) && (Bpos < Apos + Asize);
        }
        Utils.checkCollide = checkCollide;
        function includesWithIgnoreCase(string, substring) {
            return string.toLowerCase().includes(substring.toLowerCase());
        }
        Utils.includesWithIgnoreCase = includesWithIgnoreCase;
        function asyncSleep(milliseconds) {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        }
        Utils.asyncSleep = asyncSleep;
        function startGenerator(generator, callback) {
            while (!generator.next().done) {
                if (callback !== undefined) {
                    callback();
                }
            }
        }
        Utils.startGenerator = startGenerator;
    })(Utils = StructVisorAPI.Utils || (StructVisorAPI.Utils = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var SVG;
    (function (SVG) {
        SVG.Items = {
            'nav-toggle': `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="8" viewBox="0 0 18 8">
                <g fill="none" stroke="#000" stroke-width="2">
                    <line x1="0" y1="0" x2="18" y2="0"/>
                    <line x1="0" y1="4" x2="18" y2="4"/>
                    <line x1="0" y1="8" x2="18" y2="8"/>
                </g>
            </svg>
        `,
            'pause': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="48" viewBox="0 0 42 48" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 48) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z"/>
                    <path d="M270 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z"/>
                </g>
            </svg>    
        `,
            'play': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 24) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 120 c0 -66 3 -120 6 -120 11 0 194 114 194 121 0 7 -183 119 -194 119 -3 0 -6 -54 -6 -120z"/>
                </g>
            </svg>
        `,
            'skip': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="29" height="32" viewBox="0 0 29 32" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 32) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 160 c0 -139 2 -161 15 -156 8 3 55 33 105 66 l90 61 0 -66 0 -65 40 0 40 0 0 160 0 160 -40 0 -40 0 0 -65 0 -66 -90 61 c-50 33 -97 63 -105 66 -13 5 -15 -17 -15 -156z"/>
                </g>
            </svg>
        `,
            'step-back': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 34) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M85 275 c-44 -36 -81 -69 -83 -73 -2 -8 160 -142 172 -142 3 0 6 19 6 41 l0 42 48 -7 c76 -10 134 -44 157 -93 35 -75 47 -47 19 46 -27 91 -123 171 -206 171 -14 0 -18 8 -18 40 0 22 -3 40 -7 40 -5 -1 -44 -30 -88 -65z"/>
                </g>
            </svg>
        `,
            'step-forward': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 34) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M240 300 c0 -32 -4 -40 -18 -40 -83 0 -179 -80 -206 -171 -28 -93 -16 -121 19 -46 23 49 81 83 158 93 l47 7 0 -42 c0 -22 3 -41 6 -41 9 0 174 132 174 140 0 8 -165 140 -174 140 -3 0 -6 -18 -6 -40z"/>
                </g>
            </svg>
        `,
            'theme-toggle': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="46" height="46" viewBox="0 0 46.000000 46.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 46) scale(0.1, -0.1)" fill="#000000" stroke="none">
                <path d="M170 425 c0 -19 5 -35 10 -35 6 0 10 16 10 35 0 19 -4 35 -10 35 -5 0 -10 -16 -10 -35z"/>
                <path d="M220 235 c-118 -118 -211 -218 -207 -222 8 -7 437 415 437 429 0 5 -3 8 -8 8 -4 0 -104 -97 -222 -215z"/>
                <path d="M50 402 c0 -14 39 -46 47 -39 3 4 -2 16 -12 27 -19 21 -35 26 -35 12z"/>
                <path d="M275 390 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z"/>
                <path d="M119 341 c-19 -19 -29 -40 -29 -59 0 -32 33 -82 46 -70 4 5 0 16 -9 26 -24 26 -21 65 6 90 28 26 64 28 89 5 10 -9 21 -13 26 -9 12 13 -38 46 -70 46 -19 0 -40 -10 -59 -29z"/>
                <path d="M412 304 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z"/>
                <path d="M0 280 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z"/>
                <path d="M284 196 c-47 -47 -47 -95 0 -142 47 -47 95 -47 142 0 21 21 34 44 34 60 0 29 -11 33 -30 11 -7 -8 -22 -15 -35 -15 -45 0 -73 63 -40 90 22 19 18 30 -11 30 -16 0 -39 -13 -60 -34z m38 -25 c-6 -42 37 -85 79 -79 36 6 37 -4 3 -31 -37 -29 -70 -26 -105 8 -34 35 -37 68 -8 105 27 34 37 33 31 -3z"/>
                <path d="M65 180 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z"/>
                <path d="M182 44 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z"/>
                </g>
            </svg>
        `,
            'instructions-open': `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 16 4 C 9.3844277 4 4 9.3844277 4 16 C 4 22.615572 9.3844277 28 16 28 C 22.615572 28 28 22.615572 28 16 C 28 9.3844277 22.615572 4 16 4 z M 16 6 C 21.534692 6 26 10.465308 26 16 C 26 21.534692 21.534692 26 16 26 C 10.465308 26 6 21.534692 6 16 C 6 10.465308 10.465308 6 16 6 z M 16 10 C 13.802666 10 12 11.802666 12 14 L 14 14 C 14 12.883334 14.883334 12 16 12 C 17.116666 12 18 12.883334 18 14 C 18 14.767423 17.508714 15.44544 16.78125 15.6875 L 16.375 15.8125 C 15.559939 16.083523 15 16.862393 15 17.71875 L 15 19 L 17 19 L 17 17.71875 L 17.40625 17.59375 C 18.944786 17.08181 20 15.620577 20 14 C 20 11.802666 18.197334 10 16 10 z M 15 20 L 15 22 L 17 22 L 17 20 L 15 20 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/>
            </svg>
        `,
            'clear-storage-open': `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 729.837 729.838" style="enable-background:new 0 0 729.837 729.838;" xml:space="preserve">
                <g>
                    <g>
                        <g>
                            <path d="M589.193,222.04c0-6.296,5.106-11.404,11.402-11.404S612,215.767,612,222.04v437.476c0,19.314-7.936,36.896-20.67,49.653c-12.733,12.734-30.339,20.669-49.653,20.669H188.162c-19.315,0-36.943-7.935-49.654-20.669c-12.734-12.734-20.669-30.313-20.669-49.653V222.04c0-6.296,5.108-11.404,11.403-11.404c6.296,0,11.404,5.131,11.404,11.404v437.476c0,13.02,5.37,24.922,13.97,33.521c8.6,8.601,20.503,13.993,33.522,13.993h353.517c13.019,0,24.896-5.394,33.498-13.993c8.624-8.624,13.992-20.503,13.992-33.498V222.04H589.193z"/>
                            <path d="M279.866,630.056c0,6.296-5.108,11.403-11.404,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.404,5.108,11.404,11.404V630.056z"/>
                            <path d="M376.323,630.056c0,6.296-5.107,11.403-11.403,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.403,5.108,11.403,11.404V630.056z"/>
                            <path d="M472.803,630.056c0,6.296-5.106,11.403-11.402,11.403c-6.297,0-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.107-11.404,11.404-11.404c6.296,0,11.402,5.108,11.402,11.404V630.056L472.803,630.056z"/>
                            <path d="M273.214,70.323c0,6.296-5.108,11.404-11.404,11.404c-6.295,0-11.403-5.108-11.403-11.404c0-19.363,7.911-36.943,20.646-49.677C283.787,7.911,301.368,0,320.73,0h88.379c19.339,0,36.92,7.935,49.652,20.669c12.734,12.734,20.67,30.362,20.67,49.654c0,6.296-5.107,11.404-11.403,11.404s-11.403-5.108-11.403-11.404c0-13.019-5.369-24.922-13.97-33.522c-8.602-8.601-20.503-13.994-33.522-13.994h-88.378c-13.043,0-24.922,5.369-33.546,13.97C278.583,45.401,273.214,57.28,273.214,70.323z"/>
                            <path d="M99.782,103.108h530.273c11.189,0,21.405,4.585,28.818,11.998l0.047,0.048c7.413,7.412,11.998,17.628,11.998,28.818v29.46c0,6.295-5.108,11.403-11.404,11.403h-0.309H70.323c-6.296,0-11.404-5.108-11.404-11.403v-0.285v-29.175c0-11.166,4.585-21.406,11.998-28.818l0.048-0.048C78.377,107.694,88.616,103.108,99.782,103.108L99.782,103.108zM630.056,125.916H99.782c-4.965,0-9.503,2.02-12.734,5.274L87,131.238c-3.255,3.23-5.274,7.745-5.274,12.734v18.056h566.361v-18.056c0-4.965-2.02-9.503-5.273-12.734l-0.049-0.048C639.536,127.936,635.021,125.916,630.056,125.916z"/>
                        </g>
                    </g>
                </g>
            </svg>   
        `
        };
    })(SVG = StructVisorAPI.SVG || (StructVisorAPI.SVG = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="items.ts" />
var StructVisorAPI;
/// <reference path="items.ts" />
(function (StructVisorAPI) {
    var SVG;
    (function (SVG) {
        const domParser = new DOMParser();
        function createSvgElement(name) {
            return domParser.parseFromString(SVG.Items[name], 'image/svg+xml').documentElement;
        }
        function copyAttributes(sender, receiver) {
            for (const attribute of sender.attributes) {
                if (!receiver.hasAttribute(attribute.name)) {
                    receiver.setAttribute(attribute.name, attribute.value);
                }
            }
        }
        function setViewBox(target) {
            const viewString = target.getAttribute(StructVisorAPI.UI.Attributes['svg-view']);
            if (viewString !== null) {
                if (viewString.match(/^\d{1,2} \d{1,2}$/) === null) {
                    throw new StructVisorAPI.Errors.SVGError(`Значення SVG-атрибута "${StructVisorAPI.UI.Attributes['svg-name']}" було вказано некоректно.`);
                }
                const viewSplit = viewString.split(' ').map((value) => Number(value));
                const width = Number(target.getAttribute('width'));
                const height = Number(target.getAttribute('height'));
                const percentLeft = (100 - viewSplit[0]) / 2;
                const percentTop = (100 - viewSplit[1]) / 2;
                const newLeft = StructVisorAPI.Utils.round(width / 100 * percentLeft, 2);
                const newTop = StructVisorAPI.Utils.round(height / 100 * percentTop, 2);
                const newWidth = StructVisorAPI.Utils.round(newLeft * 2 + width, 2);
                const newHeight = StructVisorAPI.Utils.round(newTop * 2 + height, 2);
                target.setAttribute('viewBox', `${-newLeft} ${-newTop} ${newWidth} ${newHeight}`);
            }
        }
        function clearAttributes(target) {
            target.removeAttribute(StructVisorAPI.UI.Attributes['svg-name']);
            target.removeAttribute(StructVisorAPI.UI.Attributes['svg-view']);
        }
        function initialize() {
            for (const svgElement of document.querySelectorAll('svg[' + StructVisorAPI.UI.Attributes['svg-name'] + ']')) {
                const svgElementName = svgElement.getAttribute(StructVisorAPI.UI.Attributes['svg-name']);
                if (!(svgElementName in SVG.Items)) {
                    throw new StructVisorAPI.Errors.SVGError(`SVG-елемент з назвою "${svgElementName}" не було визначено.`);
                }
                const senderSvgElement = createSvgElement(svgElementName);
                svgElement.innerHTML = senderSvgElement.innerHTML;
                copyAttributes(senderSvgElement, svgElement);
                setViewBox(svgElement);
                clearAttributes(svgElement);
            }
        }
        SVG.initialize = initialize;
    })(SVG = StructVisorAPI.SVG || (StructVisorAPI.SVG = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var UI;
    (function (UI) {
        UI.Attributes = {
            'svg-name': 'data-svg-name',
            'svg-view': 'data-svg-view',
            'is-animation-speed-range': 'data-is-animation-speed-range'
        };
    })(UI = StructVisorAPI.UI || (StructVisorAPI.UI = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var UI;
    (function (UI) {
        UI.Elements = {
            'instructions-section': document.getElementById('instructions-section'),
            'instructions-tabs': document.getElementById('instructions-tabs'),
            'instructions-tab-structure': document.getElementById('instructions-tab-structure'),
            'instructions-tab-algorithm': document.getElementById('instructions-tab-algorithm'),
            'instructions-frame': document.getElementById('instructions-frame'),
            'instructions-open': document.getElementById('instructions-open'),
            'instructions-close': document.getElementById('instructions-close'),
            'navigation': document.querySelector('nav'),
            'navigation-toggle': document.getElementById('nav-toggle'),
            'navigation-search': document.getElementById('nav-search'),
            'asd-list': document.getElementById('asd-list'),
            'asd-control-section': document.getElementById('asd-control-section'),
            'animation-step-back': document.getElementById('animation-step-back'),
            'animation-step-forward': document.getElementById('animation-step-forward'),
            'animation-pause': document.getElementById('animation-pause'),
            'animation-play': document.getElementById('animation-play'),
            'animation-skip': document.getElementById('animation-skip'),
            'animation-speed-range': document.querySelector('[' + UI.Attributes['is-animation-speed-range'] + ']'),
            'animation-speed-slider': document.createElement('div'),
            'visualizer-canvas': document.getElementById('visualizer-canvas'),
            'clear-storage-section': document.getElementById('clear-storage-section'),
            'clear-storage-open': document.getElementById('clear-storage-open'),
            'clear-storage-close': document.getElementById('clear-storage-close'),
            'clear-storage-button': document.getElementById('clear-storage-button'),
            'clear-storage-progress-button': document.getElementById('clear-storage-progress-button'),
            'clear-storage-structure-progress-button': document.getElementById('clear-storage-structure-progress-button'),
            'dark-overlay': document.getElementById('dark-overlay'),
            'theme-toggle': document.getElementById('theme-toggle')
        };
    })(UI = StructVisorAPI.UI || (StructVisorAPI.UI = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="attributes.ts" />
/// <reference path="elements.ts" />
var StructVisorAPI;
(function (StructVisorAPI) {
    var Theme;
    (function (Theme) {
        Theme.Spectrums = [
            {
                '--first-main-color': '#1a365d',
                '--second-main-color': '#ffffff',
                '--third-main-color': '#3c3c3c',
                '--fourth-main-color': '#ffffff',
                '--fifth-main-color': '#59728d',
                '--canvas-color': '#000000',
            },
            {
                '--first-main-color': '#0664e3',
                '--second-main-color': '#ffffff',
                '--third-main-color': '#f0f0f0',
                '--fourth-main-color': '#000000',
                '--fifth-main-color': '#8eb7e3',
                '--canvas-color': '#ffffff',
            }
        ];
    })(Theme = StructVisorAPI.Theme || (StructVisorAPI.Theme = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types.ts" />
/// <reference path="spectrums.ts" />
var StructVisorAPI;
/// <reference path="types.ts" />
/// <reference path="spectrums.ts" />
(function (StructVisorAPI) {
    var Theme;
    (function (Theme) {
        Theme.dynamicColor = Symbol();
        let isLightTheme = true;
        function setLightThemeValue(value) {
            isLightTheme = value;
            for (const type of Object.keys(Theme.Spectrums[0])) {
                document.documentElement.style.setProperty(type, getColor(type));
            }
            StructVisorAPI.Storage.setItem('is-light-theme', isLightTheme);
            StructVisorAPI.Visualizer.Graphics.render();
        }
        function getColor(type) {
            return Theme.Spectrums[Number(isLightTheme)][type];
        }
        Theme.getColor = getColor;
        function initialize() {
            setLightThemeValue(StructVisorAPI.Storage.getItem('is-light-theme'));
            StructVisorAPI.UI.Elements['theme-toggle'].addEventListener('click', () => setLightThemeValue(!isLightTheme));
        }
        Theme.initialize = initialize;
    })(Theme = StructVisorAPI.Theme || (StructVisorAPI.Theme = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Navigation;
    (function (Navigation) {
        class Item {
            constructor(title, onclick) {
                this._title = title;
                this._subItems = new Set();
                this._htmlElements = {
                    fullBlock: document.createElement('li'),
                    titleBlock: document.createElement('span'),
                    subList: document.createElement('ul')
                };
                this._htmlElements.titleBlock.className = 'asd-title';
                this._htmlElements.titleBlock.innerText = title;
                this._htmlElements.fullBlock.appendChild(this._htmlElements.titleBlock);
                this._htmlElements.fullBlock.appendChild(this._htmlElements.subList);
                if (onclick !== undefined) {
                    this._htmlElements.titleBlock.addEventListener('click', onclick);
                }
                Item._list.add(this);
                StructVisorAPI.UI.Elements['asd-list'].appendChild(this._htmlElements.fullBlock);
            }
            static get list() {
                return this._list;
            }
            insertSubItem(title, onclick) {
                const subItem = new Navigation.SubItem(title, onclick);
                this._subItems.add(subItem);
                this._htmlElements.subList.appendChild(subItem.htmlElement);
            }
            displayFromSearch(text) {
                let isFullVisibled = StructVisorAPI.Utils.includesWithIgnoreCase(this._title, text);
                this._htmlElements.fullBlock.style.display = isFullVisibled ? 'list-item' : 'none';
                for (const subItem of this._subItems) {
                    subItem.htmlElement.style.display = (isFullVisibled || StructVisorAPI.Utils.includesWithIgnoreCase(subItem.htmlElement.innerText, text)) ? 'list-item' : 'none';
                    if (subItem.htmlElement.style.display === 'list-item') {
                        this._htmlElements.fullBlock.style.display = 'list-item';
                    }
                }
            }
        }
        Item._list = new Set();
        Navigation.Item = Item;
    })(Navigation = StructVisorAPI.Navigation || (StructVisorAPI.Navigation = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Navigation;
    (function (Navigation) {
        class SubItem {
            constructor(title, onclick) {
                this.htmlElement = document.createElement('li');
                this.htmlElement.className = 'asd-title';
                this.htmlElement.innerText = title;
                if (onclick !== undefined) {
                    this.htmlElement.addEventListener('click', onclick);
                }
            }
        }
        Navigation.SubItem = SubItem;
    })(Navigation = StructVisorAPI.Navigation || (StructVisorAPI.Navigation = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="item.ts" />
/// <reference path="subitem.ts" />
var StructVisorAPI;
/// <reference path="item.ts" />
/// <reference path="subitem.ts" />
(function (StructVisorAPI) {
    var Navigation;
    (function (Navigation) {
        let isVisible = false;
        function setVisible(value) {
            isVisible = value;
            StructVisorAPI.Storage.setItem('is-navigation-visible', isVisible);
            StructVisorAPI.UI.Elements['navigation'].style.width = isVisible ? '20vw' : '0';
        }
        function search(text) {
            for (const item of Navigation.Item.list) {
                item.displayFromSearch(text);
            }
        }
        function initialize() {
            setVisible(StructVisorAPI.Storage.getItem('is-navigation-visible'));
            StructVisorAPI.UI.Elements['navigation-toggle'].addEventListener('click', () => setVisible(!isVisible));
            StructVisorAPI.UI.Elements['navigation-search'].addEventListener('input', () => search(StructVisorAPI.UI.Elements['navigation-search'].value));
        }
        Navigation.initialize = initialize;
    })(Navigation = StructVisorAPI.Navigation || (StructVisorAPI.Navigation = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Animations;
    (function (Animations) {
        var Speed;
        (function (Speed) {
            Speed.MIN_PERCENT = 0;
            Speed.MAX_PERCENT = 100;
            const range = StructVisorAPI.UI.Elements['animation-speed-range'];
            const slider = StructVisorAPI.UI.Elements['animation-speed-slider'];
            let isActiveSliderControllerMoving = false;
            let percent = Speed.MIN_PERCENT;
            function startSliderControllerMove(event) {
                isActiveSliderControllerMoving = true;
                sliderControllerMove(event);
            }
            function sliderControllerMove(event) {
                if (isActiveSliderControllerMoving) {
                    event.preventDefault();
                    const x = (event instanceof MouseEvent) ? event.x : event.touches[0].clientX;
                    const difference = x - range.getBoundingClientRect().left - slider.offsetWidth / 2;
                    setPercent(difference / (range.offsetWidth / Speed.MAX_PERCENT));
                    slider.focus();
                }
            }
            function stopSliderControllerMove() {
                isActiveSliderControllerMoving = false;
            }
            function sliderKeyMove(event) {
                if (document.activeElement === slider) {
                    if (event.code === 'ArrowLeft') {
                        setPercent(percent - 1);
                    }
                    else if (event.code === 'ArrowRight') {
                        setPercent(percent + 1);
                    }
                }
            }
            function getPercent() {
                return percent;
            }
            Speed.getPercent = getPercent;
            function setPercent(value) {
                percent = StructVisorAPI.Utils.clamp(value, [Speed.MIN_PERCENT, Speed.MAX_PERCENT]);
                StructVisorAPI.Storage.setItem('animation-speed', percent);
                slider.style.left = `${percent}%`;
                slider.style.right = '';
                if (slider.offsetLeft + slider.offsetWidth >= range.offsetWidth) {
                    slider.style.left = '';
                    slider.style.right = '0';
                }
            }
            Speed.setPercent = setPercent;
            function initialize() {
                setPercent(StructVisorAPI.Storage.getItem('animation-speed'));
                slider.tabIndex = 0;
                slider.style.position = 'absolute';
                range.style.position = 'relative';
                range.appendChild(slider);
                range.removeAttribute(StructVisorAPI.UI.Attributes['is-animation-speed-range']);
                range.addEventListener('mousedown', (event) => startSliderControllerMove(event));
                range.addEventListener('touchstart', (event) => startSliderControllerMove(event));
                window.addEventListener('mousemove', (event) => sliderControllerMove(event));
                window.addEventListener('touchmove', (event) => sliderControllerMove(event));
                window.addEventListener('mouseup', () => stopSliderControllerMove());
                window.addEventListener('touchend', () => stopSliderControllerMove());
                window.addEventListener('keydown', (event) => sliderKeyMove(event));
            }
            Speed.initialize = initialize;
        })(Speed = Animations.Speed || (Animations.Speed = {}));
    })(Animations = StructVisorAPI.Animations || (StructVisorAPI.Animations = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="speed.ts" />
var StructVisorAPI;
/// <reference path="speed.ts" />
(function (StructVisorAPI) {
    var Animations;
    (function (Animations) {
        function perform(type) {
            let structure = StructVisorAPI.ASD.BaseASD.selected;
            if (structure !== null) {
                if (structure instanceof StructVisorAPI.ASD.BaseAlgorithm) {
                    structure = structure.structure;
                }
                structure.perform(type);
                if (type === 'skip') {
                    StructVisorAPI.UI.Elements['animation-play'].style.display = 'none';
                    StructVisorAPI.UI.Elements['animation-pause'].style.display = 'block';
                }
            }
        }
        function togglePause() {
            let structure = StructVisorAPI.ASD.BaseASD.selected;
            if (structure !== null) {
                if (structure instanceof StructVisorAPI.ASD.BaseAlgorithm) {
                    structure = structure.structure;
                }
                structure.perform('toggleAnimationPause');
                StructVisorAPI.UI.Elements['animation-play'].style.display = structure.isAnimationPaused ? 'block' : 'none';
                StructVisorAPI.UI.Elements['animation-pause'].style.display = structure.isAnimationPaused ? 'none' : 'block';
            }
        }
        function initializeControls() {
            StructVisorAPI.UI.Elements['animation-step-back'].addEventListener('click', () => perform('undo'));
            StructVisorAPI.UI.Elements['animation-step-forward'].addEventListener('click', () => perform('redo'));
            StructVisorAPI.UI.Elements['animation-pause'].addEventListener('click', () => togglePause());
            StructVisorAPI.UI.Elements['animation-play'].addEventListener('click', () => togglePause());
            StructVisorAPI.UI.Elements['animation-skip'].addEventListener('click', () => perform('skip'));
            StructVisorAPI.UI.Elements['animation-play'].style.display = 'none';
        }
        function initialize() {
            Animations.Speed.initialize();
            initializeControls();
        }
        Animations.initialize = initialize;
    })(Animations = StructVisorAPI.Animations || (StructVisorAPI.Animations = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Controls;
        (function (Controls) {
            class ControlBox {
                constructor(title) {
                    this._htmlElements = {
                        fullBlock: document.createElement('div'),
                        titleBlock: document.createElement('h2'),
                        itemsBlock: document.createElement('div')
                    };
                    this._htmlElements.titleBlock.innerText = title;
                    this._htmlElements.itemsBlock.className = 'control-items';
                    this._htmlElements.fullBlock.className = 'control-box';
                    this._htmlElements.fullBlock.appendChild(this._htmlElements.titleBlock);
                    this._htmlElements.fullBlock.appendChild(this._htmlElements.itemsBlock);
                }
                insert(control, htmlElement) {
                    if (control.checkHtmlElementReference(htmlElement)) {
                        this._htmlElements.itemsBlock.appendChild(htmlElement);
                    }
                }
                extract(control, htmlElement) {
                    if (control.checkHtmlElementReference(htmlElement)) {
                        this._htmlElements.itemsBlock.removeChild(htmlElement);
                    }
                }
                insertSelf() {
                    StructVisorAPI.UI.Elements['asd-control-section'].appendChild(this._htmlElements.fullBlock);
                }
                extractSelf() {
                    StructVisorAPI.UI.Elements['asd-control-section'].removeChild(this._htmlElements.fullBlock);
                }
            }
            Controls.ControlBox = ControlBox;
        })(Controls = Visualizer.Controls || (Visualizer.Controls = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Controls;
        (function (Controls) {
            class BaseControl {
                constructor(options) {
                    this._htmlElement = this._createHtmlElement(options);
                    this.setOptions(options);
                }
                get isVisible() {
                    return this._htmlElement.style.display !== 'none';
                }
                set isVisible(isVisible) {
                    this._htmlElement.style.display = isVisible ? '' : 'none';
                }
                get status() {
                    if (this._htmlElement.classList.contains('executed')) {
                        return 'executed';
                    }
                    else if (this._htmlElement.classList.contains('disabled')) {
                        return 'disabled';
                    }
                    return 'available';
                }
                set status(status) {
                    if ('disabled' in this._htmlElement && typeof this._htmlElement.disabled === 'boolean') {
                        this._htmlElement.disabled = (status === 'disabled');
                    }
                    this._htmlElement.classList.remove('executed', 'disabled');
                    if (status !== 'available') {
                        this._htmlElement.classList.add(status);
                    }
                }
                checkHtmlElementReference(htmlElement) {
                    return this._htmlElement === htmlElement;
                }
                insertTo(controlBox) {
                    controlBox.insert(this, this._htmlElement);
                }
                extractFrom(controlBox) {
                    controlBox.extract(this, this._htmlElement);
                }
                setOptions(options) {
                    if ('isVisible' in options) {
                        this.isVisible = options.isVisible;
                    }
                    if ('status' in options) {
                        this.status = options.status;
                    }
                    this._setOptions(options);
                }
            }
            Controls.BaseControl = BaseControl;
        })(Controls = Visualizer.Controls || (Visualizer.Controls = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types_and_interfaces.ts" />
/// <reference path="control_box.ts" />
/// <reference path="base_control.ts" />
var StructVisorAPI;
/// <reference path="types_and_interfaces.ts" />
/// <reference path="control_box.ts" />
/// <reference path="base_control.ts" />
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Controls;
        (function (Controls) {
            function insert(...controlBoxes) {
                for (const controlBox of controlBoxes) {
                    controlBox.insertSelf();
                }
            }
            Controls.insert = insert;
            function extract(...controlBoxes) {
                for (const controlBox of controlBoxes) {
                    controlBox.extractSelf();
                }
            }
            Controls.extract = extract;
            function extractAll() {
                while (StructVisorAPI.UI.Elements['asd-control-section'].childElementCount > 0) {
                    StructVisorAPI.UI.Elements['asd-control-section'].removeChild(StructVisorAPI.UI.Elements['asd-control-section'].firstChild);
                }
            }
            Controls.extractAll = extractAll;
        })(Controls = Visualizer.Controls || (Visualizer.Controls = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Graphics;
        (function (Graphics) {
            class BaseGraphic {
                constructor(bounds, options) {
                    this._isVisible = true;
                    this._fillColor = null;
                    this._strokeColor = StructVisorAPI.Theme.dynamicColor;
                    this._strokeWidth = 1;
                    this.bounds = bounds;
                    this.bounds.addChangeListener((lastBounds) => this._update(lastBounds));
                    this.setOptions(options);
                }
                get isVisible() {
                    return this._isVisible;
                }
                set isVisible(isVisible) {
                    if (this._isVisible !== isVisible) {
                        this._isVisible = isVisible;
                        this._update();
                    }
                }
                get fillColor() {
                    return this._fillColor;
                }
                set fillColor(color) {
                    if (this._fillColor !== color) {
                        this._fillColor = color;
                        this._update();
                    }
                }
                get strokeColor() {
                    return this._strokeColor;
                }
                set strokeColor(color) {
                    if (this._strokeColor !== color) {
                        this._strokeColor = color;
                        this._update();
                    }
                }
                get strokeWidth() {
                    return this._strokeWidth;
                }
                set strokeWidth(width) {
                    if (this._strokeWidth !== width) {
                        this._strokeWidth = width;
                        this._update();
                    }
                }
                setOptions(options) {
                    if ('isVisible' in options) {
                        this.isVisible = options.isVisible;
                    }
                    if ('fillColor' in options) {
                        this.fillColor = options.fillColor;
                    }
                    if ('strokeColor' in options) {
                        this.strokeColor = options.strokeColor;
                    }
                    if ('strokeWidth' in options) {
                        this.strokeWidth = options.strokeWidth;
                    }
                    this._setOptions(options);
                }
                render(context) {
                    if (this._isVisible) {
                        context.fillStyle = BaseGraphic.convertToColorString(this.fillColor);
                        context.strokeStyle = BaseGraphic.convertToColorString(this.strokeColor);
                        context.lineWidth = this._strokeWidth;
                        this._render(context);
                    }
                }
                _update(lastBounds) {
                    if (Graphics.checkDisplay(this)) {
                        if (lastBounds !== undefined) {
                            Graphics.render(lastBounds);
                        }
                        Graphics.render(this.bounds);
                    }
                }
                static convertToColorString(color) {
                    return (color === null) ? 'transparent' : (color === StructVisorAPI.Theme.dynamicColor) ? StructVisorAPI.Theme.getColor('--fourth-main-color') : color;
                }
            }
            Graphics.BaseGraphic = BaseGraphic;
        })(Graphics = Visualizer.Graphics || (Visualizer.Graphics = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Graphics;
        (function (Graphics) {
            class GraphicCollection {
                constructor() {
                    this._items = new Set();
                    this._eventTarget = new StructVisorAPI.Utils.EventTarget();
                }
                has(item) {
                    return this._items.has(item);
                }
                add(...items) {
                    for (const item of items) {
                        if (!this._items.has(item)) {
                            this._items.add(item);
                            this._eventTarget.dispatchEvent('change', item);
                        }
                    }
                }
                delete(...items) {
                    for (const item of items) {
                        if (this._items.has(item)) {
                            this._items.delete(item);
                            this._eventTarget.dispatchEvent('change', item);
                        }
                    }
                }
                clear() {
                    this.delete(...this._items);
                }
                addChangeListener(listener) {
                    this._eventTarget.addEventListener('change', listener);
                }
                removeChangeListener(listener) {
                    this._eventTarget.removeEventListener('change', listener);
                }
                *[Symbol.iterator]() {
                    for (const item of this._items) {
                        yield item;
                    }
                }
            }
            Graphics.GraphicCollection = GraphicCollection;
        })(Graphics = Visualizer.Graphics || (Visualizer.Graphics = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Graphics;
        (function (Graphics) {
            class GraphicMap {
                constructor() {
                    this._set = new Set();
                    this._map = new Map();
                    this._eventTarget = new StructVisorAPI.Utils.EventTarget();
                }
                hasKey(key) {
                    return this._map.has(key);
                }
                hasValue(value) {
                    return this._set.has(value);
                }
                get(key) {
                    return this._map.get(key);
                }
                set(key, value) {
                    if (this._map.get(key) !== value) {
                        if (this._set.has(value)) {
                            throw new StructVisorAPI.Errors.VisualError('Вказане значення вже використовується іншим ключем.');
                        }
                        const oldValue = this._map.get(key);
                        if (oldValue !== undefined) {
                            this._set.delete(oldValue);
                            this._eventTarget.dispatchEvent('change', oldValue);
                        }
                        this._set.add(value);
                        this._map.set(key, value);
                        this._eventTarget.dispatchEvent('change', value);
                    }
                }
                delete(key) {
                    const value = this._map.get(key);
                    if (value !== undefined) {
                        this._map.delete(key);
                        this._set.delete(value);
                        this._eventTarget.dispatchEvent('change', value);
                    }
                }
                clear() {
                    for (const key of this._map.keys()) {
                        this.delete(key);
                    }
                }
                addChangeListener(listener) {
                    this._eventTarget.addEventListener('change', listener);
                }
                removeChangeListener(listener) {
                    this._eventTarget.removeEventListener('change', listener);
                }
                *[Symbol.iterator]() {
                    for (const entry of this._map) {
                        yield entry;
                    }
                }
            }
            Graphics.GraphicMap = GraphicMap;
        })(Graphics = Visualizer.Graphics || (Visualizer.Graphics = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types_and_interfaces.ts" />
/// <reference path="base_graphic.ts" />
/// <reference path="graphic_collection.ts" />
/// <reference path="graphic_map.ts" />
var StructVisorAPI;
/// <reference path="types_and_interfaces.ts" />
/// <reference path="base_graphic.ts" />
/// <reference path="graphic_collection.ts" />
/// <reference path="graphic_map.ts" />
(function (StructVisorAPI) {
    var Visualizer;
    (function (Visualizer) {
        var Graphics;
        (function (Graphics) {
            const bounds = new StructVisorAPI.Utils.Bounds();
            const context = StructVisorAPI.UI.Elements['visualizer-canvas'].getContext('2d');
            const listeners = {};
            let displayed = new Set();
            function getViewSize() {
                return bounds.sizeCopy();
            }
            Graphics.getViewSize = getViewSize;
            function setViewSize(size) {
                bounds.width = size.x;
                bounds.height = size.y;
                StructVisorAPI.UI.Elements['visualizer-canvas'].width = bounds.width;
                StructVisorAPI.UI.Elements['visualizer-canvas'].height = bounds.height;
                render();
            }
            Graphics.setViewSize = setViewSize;
            function addEventListener(type, listener) {
                if (!(type in listeners)) {
                    listeners[type] = new Set();
                }
                listeners[type].add(listener);
                StructVisorAPI.UI.Elements['visualizer-canvas'].addEventListener(type, listener);
            }
            Graphics.addEventListener = addEventListener;
            function removeEventListener(type, listener) {
                if (type in listeners) {
                    listeners[type].delete(listener);
                    if (listeners[type].size === 0) {
                        delete listeners[type];
                    }
                }
                StructVisorAPI.UI.Elements['visualizer-canvas'].removeEventListener(type, listener);
            }
            Graphics.removeEventListener = removeEventListener;
            function clearEventListeners() {
                for (const type of Object.keys(listeners)) {
                    for (const listener of listeners[type]) {
                        removeEventListener(type, listener);
                    }
                }
            }
            Graphics.clearEventListeners = clearEventListeners;
            function convertToCanvasPosition(position) {
                return new StructVisorAPI.Utils.Vector(position.x * (StructVisorAPI.UI.Elements['visualizer-canvas'].width / StructVisorAPI.UI.Elements['visualizer-canvas'].offsetWidth), position.y * (StructVisorAPI.UI.Elements['visualizer-canvas'].height / StructVisorAPI.UI.Elements['visualizer-canvas'].offsetHeight));
            }
            Graphics.convertToCanvasPosition = convertToCanvasPosition;
            function normalizeBoundsForRender(bounds) {
                return new StructVisorAPI.Utils.Bounds(Math.ceil(bounds.width + (bounds.x - Math.floor(bounds.x))), Math.ceil(bounds.height + (bounds.y - Math.floor(bounds.y))), Math.floor(bounds.x), Math.floor(bounds.y));
            }
            Graphics.normalizeBoundsForRender = normalizeBoundsForRender;
            function render(...targetBoundsList) {
                targetBoundsList = (targetBoundsList.length > 0) ? targetBoundsList : [bounds];
                for (const targetBounds of targetBoundsList) {
                    const targetBoundsRounded = normalizeBoundsForRender(targetBounds);
                    if (targetBoundsRounded.checkCollide(bounds)) {
                        context.clearRect(targetBoundsRounded.x, targetBoundsRounded.y, targetBoundsRounded.width, targetBoundsRounded.height);
                        for (const graphic of displayed) {
                            const graphicBoundsRounded = normalizeBoundsForRender(graphic.bounds);
                            if (graphicBoundsRounded.checkCollide(targetBoundsRounded)) {
                                context.save();
                                context.beginPath();
                                context.rect(targetBoundsRounded.x, targetBoundsRounded.y, targetBoundsRounded.width, targetBoundsRounded.height);
                                context.clip();
                                context.beginPath();
                                context.rect(graphicBoundsRounded.x, graphicBoundsRounded.y, graphicBoundsRounded.width, graphicBoundsRounded.height);
                                context.clip();
                                graphic.render(context);
                                context.restore();
                            }
                        }
                    }
                }
            }
            Graphics.render = render;
            function checkDisplay(graphic) {
                return displayed.has(graphic);
            }
            Graphics.checkDisplay = checkDisplay;
            function insert(...targets) {
                for (const target of targets) {
                    if (target instanceof Graphics.GraphicCollection) {
                        insert(...target);
                    }
                    else if (target instanceof Graphics.GraphicMap) {
                        for (const entry of target) {
                            insert(entry[1]);
                        }
                    }
                    else if (!displayed.has(target)) {
                        displayed.add(target);
                        render(target.bounds);
                    }
                }
            }
            Graphics.insert = insert;
            function extract(...targets) {
                for (const target of targets) {
                    if (target instanceof Graphics.GraphicCollection) {
                        extract(...target);
                    }
                    else if (target instanceof Graphics.GraphicMap) {
                        for (const entry of target) {
                            extract(entry[1]);
                        }
                    }
                    else if (displayed.has(target)) {
                        displayed.delete(target);
                        render(target.bounds);
                    }
                }
            }
            Graphics.extract = extract;
            function extractAll() {
                for (const graphic of displayed.keys()) {
                    extract(graphic);
                }
            }
            Graphics.extractAll = extractAll;
            function moveToFront(...graphics) {
                const boundsList = [];
                for (const graphic of graphics) {
                    if (displayed.has(graphic)) {
                        displayed.delete(graphic);
                        displayed.add(graphic);
                        boundsList.push(graphic.bounds);
                    }
                }
                render(...boundsList);
            }
            Graphics.moveToFront = moveToFront;
            function moveToBack(...graphics) {
                const boundsList = [];
                const filteredGraphics = [];
                for (const graphic of graphics) {
                    if (displayed.has(graphic)) {
                        filteredGraphics.push(graphic);
                        boundsList.push(graphic.bounds);
                    }
                }
                displayed = new Set(filteredGraphics.concat(...displayed));
                render(...boundsList);
            }
            Graphics.moveToBack = moveToBack;
        })(Graphics = Visualizer.Graphics || (Visualizer.Graphics = {}));
    })(Visualizer = StructVisorAPI.Visualizer || (StructVisorAPI.Visualizer = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="controls/index.ts" />
/// <reference path="graphics/index.ts" />
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseASD {
            constructor(name) {
                this.name = name;
                this._register();
            }
            static get selected() {
                return this._selected;
            }
            select() {
                if (BaseASD._selected !== this) {
                    if (BaseASD._selected !== null && !(this instanceof ASD.BaseAlgorithm && this.structure === BaseASD._selected)) {
                        BaseASD._selected.unselect();
                    }
                    BaseASD._selected = this;
                    StructVisorAPI.Storage.setItem('current-asd', this.name);
                }
            }
            unselect() {
                if (BaseASD._selected === this) {
                    BaseASD._selected = null;
                    StructVisorAPI.Storage.setItem('current-asd', null);
                }
            }
            _register() {
                if (this.name in BaseASD._instances) {
                    throw new StructVisorAPI.Errors.DesignError(`Структуру або алгоритм "${this.name}" вже було ініціалізовано.`);
                }
                BaseASD._instances[this.name] = this;
            }
            static initialize() {
                for (const name of Object.keys(this._instances)) {
                    if (name === StructVisorAPI.Storage.getItem('current-asd')) {
                        this._instances[name].select();
                        break;
                    }
                }
            }
        }
        BaseASD._instances = {};
        BaseASD._selected = null;
        ASD.BaseASD = BaseASD;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseStructure extends ASD.BaseASD {
            constructor(name, title) {
                super(name);
                this._items = [];
                this._invoker = new ASD.Invoker();
                this._invoker.addChangeListener((commands) => this._progressLoader.save(commands));
                this._navigation = new StructVisorAPI.Navigation.Item(title, () => this.select());
            }
            get isAnimationPaused() {
                return this._invoker.isAnimationPaused;
            }
            select() {
                super.select();
                this._controlsManager.setVisible(true);
                this._graphicsManager.setVisible(true, this._items);
                this._progressLoader.load(this._items);
            }
            unselect() {
                super.unselect();
                this._invoker.skip();
                this._controlsManager.setVisible(false);
                this._graphicsManager.setVisible(false, this._items);
            }
            perform(action) {
                this._invoker[action]();
            }
            insert(algorithm) {
                if (algorithm.checkDefineReferences()) {
                    throw new StructVisorAPI.Errors.DesignError(`Алгоритм "${algorithm.name}" вже містить необхідні дані структури "${this.constructor.name}".`);
                }
                this._navigation.insertSubItem(algorithm.title, () => algorithm.select());
                return { invoker: this._invoker, items: this._items };
            }
        }
        ASD.BaseStructure = BaseStructure;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseAlgorithm extends ASD.BaseASD {
            constructor(structure, name, title) {
                super(name);
                this.title = title;
                this.structure = structure;
                this._references = this.structure.insert(this);
            }
            get _items() {
                return this._references.items;
            }
            get _invoker() {
                return this._references.invoker;
            }
            checkDefineReferences() {
                return this._references !== undefined;
            }
            select() {
                this.structure.select();
                this._controlsManager.setVisible(true);
                this._graphicsManager.setVisible(true);
                super.select();
            }
            unselect() {
                this.structure.unselect();
                this._controlsManager.setVisible(false);
                this._graphicsManager.setVisible(false);
                super.unselect();
            }
        }
        ASD.BaseAlgorithm = BaseAlgorithm;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseItem {
            constructor() { }
        }
        ASD.BaseItem = BaseItem;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseCommand {
            constructor(items, delayCalculatorCallback = (percent) => percent) {
                this._items = items;
                this._delayCalculatorCallback = delayCalculatorCallback;
                this._status = 'paused';
            }
            get status() {
                return this._status;
            }
            execute(isLoadFromStorage) {
                this._status = 'executed';
                this._executeAlgorithm();
                if (!isLoadFromStorage) {
                    this._executeAsyncAnimationLoop().then(() => this._status = 'ended');
                }
                else {
                    this._executeImmediateAnimationLoop('load');
                    this._status = 'ended';
                }
            }
            toggleAnimationPause() {
                if (this._status !== 'ended') {
                    this._status = (this._status === 'executed') ? 'paused' : 'executed';
                }
            }
            skip() {
                if (this._status !== 'ended') {
                    this._status = 'ended';
                    this._executeImmediateAnimationLoop('skip');
                }
            }
            _executeImmediateAnimationLoop(mode) {
                const generator = this._executeAnimation(mode);
                while (!generator.next().done) { }
            }
            _executeAsyncAnimationLoop() {
                return __awaiter(this, void 0, void 0, function* () {
                    const generator = this._executeAnimation('start');
                    while (this._status !== 'ended') {
                        if (this._status !== 'paused') {
                            if (generator.next().done) {
                                break;
                            }
                            yield StructVisorAPI.Utils.asyncSleep(this._delayCalculatorCallback(StructVisorAPI.Animations.Speed.getPercent()));
                        }
                        else
                            yield StructVisorAPI.Utils.asyncSleep(25);
                    }
                });
            }
        }
        ASD.BaseCommand = BaseCommand;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseControlsManager {
            constructor(args) {
                this._asd = args.asd;
                this._controls = args.controls;
                this._controlBoxes = this._createControlBoxes();
                this.__isActionExecuting = false;
                this._savedControlsStatuses = new Map();
            }
            get _isActionExecuting() {
                return this.__isActionExecuting;
            }
            setVisible(isVisible) {
                for (const name of Object.keys(this._controlBoxes)) {
                    if (isVisible) {
                        StructVisorAPI.Visualizer.Controls.insert(this._controlBoxes[name]);
                    }
                    else
                        StructVisorAPI.Visualizer.Controls.extract(this._controlBoxes[name]);
                }
            }
            _getControl(category, control) {
                return this._controls[category].items[control];
            }
            _getControls(category) {
                const controls = new Set();
                for (const controlBox of Object.keys(this._controls)) {
                    if (category === undefined || controlBox === category) {
                        for (const controlName of Object.keys(this._controls[controlBox].items)) {
                            controls.add(this._controls[controlBox].items[controlName]);
                        }
                    }
                }
                return controls;
            }
            _toggleActionExecuting(...exclusionControls) {
                var _a;
                this.__isActionExecuting = !this.__isActionExecuting;
                for (const control of this._getControls()) {
                    if (!exclusionControls.includes(control)) {
                        if (this.__isActionExecuting) {
                            this._savedControlsStatuses.set(control, control.status);
                        }
                        control.status = this.__isActionExecuting ? 'disabled' : (_a = this._savedControlsStatuses.get(control)) !== null && _a !== void 0 ? _a : control.status;
                    }
                }
            }
            _createControlBoxes() {
                const controlBoxes = {};
                for (const controlCategory of Object.keys(this._controls)) {
                    controlBoxes[controlCategory] = new StructVisorAPI.Visualizer.Controls.ControlBox(this._controls[controlCategory].title);
                    for (const control of this._getControls(controlCategory)) {
                        control.insertTo(controlBoxes[controlCategory]);
                    }
                }
                return controlBoxes;
            }
        }
        ASD.BaseControlsManager = BaseControlsManager;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseGraphicsManager {
            constructor(args) {
                this._element = args.element;
                this._graphics = args.graphics;
                this._collections = this._createCollectionsMap();
                if ('viewSize' in args && !(this._element instanceof ASD.BaseItem)) {
                    this._viewSize = args.viewSize;
                }
            }
            get viewSize() {
                if (this._viewSize === undefined) {
                    throw new StructVisorAPI.Errors.DesignError(`Графічний менеджер "${this.constructor.name}" не має поля "viewSize".`);
                }
                return this._viewSize;
            }
            setVisible(isVisible, items) {
                this._setVisibleElement(isVisible);
                this._setVisibleItems(isVisible, items);
                this._setCollectionsCallbacks(isVisible);
            }
            _getGraphic(graphic) {
                return this._graphics[graphic];
            }
            _createCollectionsMap() {
                const collections = new Map();
                for (const name in this._graphics) {
                    const collection = this._graphics[name];
                    if (collection instanceof StructVisorAPI.Visualizer.Graphics.GraphicCollection) {
                        collections.set(collection, (graphic) => {
                            if (collection.has(graphic)) {
                                StructVisorAPI.Visualizer.Graphics.insert(graphic);
                            }
                            else
                                StructVisorAPI.Visualizer.Graphics.extract(graphic);
                        });
                    }
                    else if (collection instanceof StructVisorAPI.Visualizer.Graphics.GraphicMap) {
                        collections.set(collection, (graphic) => {
                            if (collection.hasValue(graphic)) {
                                StructVisorAPI.Visualizer.Graphics.insert(graphic);
                            }
                            else
                                StructVisorAPI.Visualizer.Graphics.extract(graphic);
                        });
                    }
                }
                return collections;
            }
            _setVisibleElement(isVisible) {
                if (isVisible && this._viewSize !== undefined) {
                    StructVisorAPI.Visualizer.Graphics.setViewSize(this._viewSize);
                }
                for (const name of Object.keys(this._graphics)) {
                    const graphic = this._graphics[name];
                    if (isVisible) {
                        StructVisorAPI.Visualizer.Graphics.insert(graphic);
                    }
                    else
                        StructVisorAPI.Visualizer.Graphics.extract(graphic);
                }
            }
            _setVisibleItems(isVisible, items) {
                if (items !== undefined) {
                    for (const item of items) {
                        item.graphicsManager.setVisible(isVisible);
                    }
                }
            }
            _setCollectionsCallbacks(isVisible) {
                for (const [collection, callback] of this._collections) {
                    if (isVisible) {
                        collection.addChangeListener(callback);
                    }
                    else
                        collection.removeChangeListener(callback);
                }
            }
        }
        ASD.BaseGraphicsManager = BaseGraphicsManager;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class BaseProgressLoader {
            constructor(args) {
                this._isAlreadyLoaded = false;
                this._structure = args.structure;
                this._invoker = args.invoker;
                this._commandsCallbacks = args.commandsCallbacks;
            }
            load(items) {
                var _a;
                if (!this._isAlreadyLoaded) {
                    this._isAlreadyLoaded = true;
                    const progress = (_a = StructVisorAPI.Storage.getItem('progress')[this._structure.name]) !== null && _a !== void 0 ? _a : { stack: [], cancelCount: 0 };
                    for (const obj of progress.stack) {
                        if (!(obj.name in this._commandsCallbacks)) {
                            throw new StructVisorAPI.Errors.DesignError(`Завантажувач прогресу "${this.constructor.name}" не підтримує виконання команд з назвою "${obj.name}".`);
                        }
                        this._invoker.executeCommand(this._commandsCallbacks[obj.name](items, obj), true);
                    }
                    while (progress.cancelCount > 0) {
                        progress.cancelCount--;
                        this._invoker.undo();
                    }
                }
            }
            save(commands) {
                const progress = StructVisorAPI.Storage.getItem('progress');
                progress[this._structure.name] = { stack: [], cancelCount: commands.cancelCount };
                for (const command of commands.stack) {
                    progress[this._structure.name].stack.push(command.toObject());
                }
                StructVisorAPI.Storage.setItem('progress', progress);
            }
        }
        ASD.BaseProgressLoader = BaseProgressLoader;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
var StructVisorAPI;
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        class Invoker {
            constructor() {
                this._commands = { stack: [], cancelCount: 0 };
                this._eventTarget = new StructVisorAPI.Utils.EventTarget();
            }
            get isAnimationPaused() {
                var _a, _b;
                return (_b = (((_a = this._currentCommand) === null || _a === void 0 ? void 0 : _a.status) === 'paused')) !== null && _b !== void 0 ? _b : false;
            }
            get _currentCommand() {
                return this._commands.stack[this._commands.stack.length - this._commands.cancelCount - 1];
            }
            get _nextCommand() {
                return this._commands.stack[this._commands.stack.length - this._commands.cancelCount];
            }
            addChangeListener(listener) {
                this._eventTarget.addEventListener('change', listener);
            }
            removeChangeListener(listener) {
                this._eventTarget.removeEventListener('change', listener);
            }
            undo() {
                if (this._currentCommand !== undefined && this._currentCommand.status === 'ended') {
                    this._currentCommand.undo();
                    this._commands.cancelCount++;
                    this._eventTarget.dispatchEvent('change', Object.assign({}, this._commands));
                }
            }
            redo() {
                if (this._nextCommand !== undefined) {
                    this._nextCommand.execute(true);
                    this._commands.cancelCount--;
                    this._eventTarget.dispatchEvent('change', Object.assign({}, this._commands));
                }
            }
            toggleAnimationPause() {
                var _a;
                (_a = this._currentCommand) === null || _a === void 0 ? void 0 : _a.toggleAnimationPause();
            }
            skip() {
                var _a;
                (_a = this._currentCommand) === null || _a === void 0 ? void 0 : _a.skip();
            }
            executeCommand(command, isLoadFromStorage = false) {
                if (Invoker._lastExecutedCommand === null || Invoker._lastExecutedCommand.status === 'ended') {
                    Invoker._lastExecutedCommand = command;
                    command.execute(isLoadFromStorage);
                    this._commands.stack.splice(this._commands.stack.length - this._commands.cancelCount, this._commands.stack.length, command);
                    this._commands.cancelCount = 0;
                    this._eventTarget.dispatchEvent('change', Object.assign({}, this._commands));
                }
            }
        }
        Invoker._lastExecutedCommand = null;
        ASD.Invoker = Invoker;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="types.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="base_asd.ts" />
/// <reference path="base_structure.ts" />
/// <reference path="base_algorithm.ts" />
/// <reference path="base_item.ts" />
/// <reference path="base_command.ts" />
/// <reference path="base_controls_manager.ts" />
/// <reference path="base_graphics_manager.ts" />
/// <reference path="base_progress_loader.ts" />
/// <reference path="invoker.ts" />
var StructVisorAPI;
/// <reference path="types.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="base_asd.ts" />
/// <reference path="base_structure.ts" />
/// <reference path="base_algorithm.ts" />
/// <reference path="base_item.ts" />
/// <reference path="base_command.ts" />
/// <reference path="base_controls_manager.ts" />
/// <reference path="base_graphics_manager.ts" />
/// <reference path="base_progress_loader.ts" />
/// <reference path="invoker.ts" />
(function (StructVisorAPI) {
    var ASD;
    (function (ASD) {
        function initialize() {
            ASD.BaseASD.initialize();
        }
        ASD.initialize = initialize;
    })(ASD = StructVisorAPI.ASD || (StructVisorAPI.ASD = {}));
})(StructVisorAPI || (StructVisorAPI = {}));
/// <reference path="instructions/index.ts" />
/// <reference path="storage/index.ts" />
/// <reference path="errors/index.ts" />
/// <reference path="utils/index.ts" />
/// <reference path="svg/index.ts" />
/// <reference path="ui/index.ts" />
/// <reference path="theme/index.ts" />
/// <reference path="navigation/index.ts" />
/// <reference path="animations/index.ts" />
/// <reference path="visualizer/index.ts" />
/// <reference path="asd/index.ts" />
var StructVisorAPI;
/// <reference path="instructions/index.ts" />
/// <reference path="storage/index.ts" />
/// <reference path="errors/index.ts" />
/// <reference path="utils/index.ts" />
/// <reference path="svg/index.ts" />
/// <reference path="ui/index.ts" />
/// <reference path="theme/index.ts" />
/// <reference path="navigation/index.ts" />
/// <reference path="animations/index.ts" />
/// <reference path="visualizer/index.ts" />
/// <reference path="asd/index.ts" />
(function (StructVisorAPI) {
    function initialize() {
        StructVisorAPI.SVG.initialize();
        StructVisorAPI.Storage.initialize();
        StructVisorAPI.Theme.initialize();
        StructVisorAPI.Navigation.initialize();
        StructVisorAPI.Instructions.initialize();
        StructVisorAPI.Animations.initialize();
        StructVisorAPI.ASD.initialize();
    }
    StructVisorAPI.initialize = initialize;
})(StructVisorAPI || (StructVisorAPI = {}));

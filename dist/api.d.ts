declare namespace StructVisorAPI.Instructions {
    function initialize(): void;
}
declare namespace StructVisorAPI.Storage {
    type ItemsType = Utils.ValidateMatchType<{
        'is-light-theme': boolean;
        'is-navigation-visible': boolean;
        'animation-speed': number;
        'current-asd': string | null;
        'progress': {
            [structure: string]: ASD.StackCommandsType<ASD.CommandObjectType<ASD.ICommand<ASD.IStructure>>>;
        };
    }, Utils.PrimitiveObjectType>;
    type ItemNameType = keyof ItemsType;
}
declare namespace StructVisorAPI.Storage.Clear {
    function initialize(): void;
}
declare namespace StructVisorAPI.Storage {
    const InitialItems: Readonly<ItemsType>;
}
declare namespace StructVisorAPI.Storage {
    function getItem<K extends ItemNameType>(name: K): typeof InitialItems[K];
    function setItem<K extends ItemNameType>(name: K, value: typeof InitialItems[K]): void;
    function resetItem<K extends ItemNameType>(name: K): void;
    function clear(): void;
    function initialize(): void;
}
declare namespace StructVisorAPI.Errors {
    abstract class BaseError extends Error {
        protected constructor(message?: string, name?: string);
    }
    export class SVGError extends BaseError {
        constructor(message: string);
    }
    export class DesignError extends BaseError {
        constructor(message: string);
    }
    export class VisualError extends BaseError {
        constructor(message: string);
    }
    export class ASDError extends BaseError {
        constructor(message: string);
    }
    export {};
}
declare namespace StructVisorAPI.Utils {
    type EventsObjectType = {
        [type: string]: (...args: any[]) => void;
    };
    type VectorObjectType = {
        x: number;
        y: number;
    };
    type BoundsObjectType = VectorObjectType & {
        width: number;
        height: number;
    };
    type PrimitiveObjectType = {
        [name: string]: boolean | boolean[] | number | number[] | string | string[] | null | null[] | PrimitiveObjectType | PrimitiveObjectType[];
    };
    type ValidateMatchType<T extends object, S extends object> = T extends S ? T : never;
    type PartialExceptType<T extends object, K extends keyof T> = Partial<T> & Pick<T, K>;
}
declare namespace StructVisorAPI.Utils {
    class EventTarget<T extends EventsObjectType> {
        private readonly _listeners;
        addEventListener<K extends keyof T>(type: K, listener: T[K]): void;
        removeEventListener<K extends keyof T>(type: K, listener: T[K]): void;
        dispatchEvent<K extends keyof T>(type: K, ...args: Parameters<T[K]>): void;
    }
}
declare namespace StructVisorAPI.Utils {
    abstract class Geometry<T extends Geometry<T>> {
        private _lastGeometry;
        private readonly _eventTarget;
        protected constructor();
        abstract copy(): T;
        abstract compare(geometry: T): boolean;
        addChangeListener(listener: (lastGeometry: T) => void): void;
        removeChangeListener(listener: (lastGeometry: T) => void): void;
        protected _dispatchChange(): void;
    }
}
declare namespace StructVisorAPI.Utils {
    class Vector extends Geometry<Vector> {
        private _x;
        private _y;
        constructor(x?: number, y?: number);
        constructor(object: VectorObjectType);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        toObject(): VectorObjectType;
        copy(): Vector;
        compare(vector: Vector): boolean;
        getDistanceTo(vector: Vector): number;
    }
}
declare namespace StructVisorAPI.Utils {
    class Bounds extends Geometry<Bounds> {
        private readonly _size;
        private readonly _position;
        constructor(width?: number, height?: number, x?: number, y?: number);
        constructor(size: Vector, position?: Vector);
        constructor(object: BoundsObjectType);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        toObject(): BoundsObjectType;
        copy(): Bounds;
        compare(bounds: Bounds): boolean;
        sizeCopy(): Vector;
        positionCopy(): Vector;
        checkCollide(target: Vector | Bounds): boolean;
    }
}
declare namespace StructVisorAPI.Utils {
    function randomBoolean(): boolean;
    function randomInteger(min: number, max: number): number;
    function randomFloat(min: number, max: number): number;
    function round(number: number, digits?: number): number;
    function clamp(number: number, range: [number, number]): number;
    function toRadians(angle: number): number;
    function checkCollide(Apos: number, Asize: number, Bpos: number, Bsize: number): boolean;
    function includesWithIgnoreCase(string: string, substring: string): boolean;
    function asyncSleep(milliseconds: number): Promise<unknown>;
    function startGenerator(generator: Generator, callback?: () => void): void;
}
declare namespace StructVisorAPI.SVG {
    const Items: {
        readonly 'nav-toggle': "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"8\" viewBox=\"0 0 18 8\">\n                <g fill=\"none\" stroke=\"#000\" stroke-width=\"2\">\n                    <line x1=\"0\" y1=\"0\" x2=\"18\" y2=\"0\"/>\n                    <line x1=\"0\" y1=\"4\" x2=\"18\" y2=\"4\"/>\n                    <line x1=\"0\" y1=\"8\" x2=\"18\" y2=\"8\"/>\n                </g>\n            </svg>\n        ";
        readonly pause: "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"48\" viewBox=\"0 0 42 48\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 48) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                    <path d=\"M0 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z\"/>\n                    <path d=\"M270 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z\"/>\n                </g>\n            </svg>    \n        ";
        readonly play: "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"24\" viewBox=\"0 0 20 24\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 24) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                    <path d=\"M0 120 c0 -66 3 -120 6 -120 11 0 194 114 194 121 0 7 -183 119 -194 119 -3 0 -6 -54 -6 -120z\"/>\n                </g>\n            </svg>\n        ";
        readonly skip: "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" width=\"29\" height=\"32\" viewBox=\"0 0 29 32\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 32) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                    <path d=\"M0 160 c0 -139 2 -161 15 -156 8 3 55 33 105 66 l90 61 0 -66 0 -65 40 0 40 0 0 160 0 160 -40 0 -40 0 0 -65 0 -66 -90 61 c-50 33 -97 63 -105 66 -13 5 -15 -17 -15 -156z\"/>\n                </g>\n            </svg>\n        ";
        readonly 'step-back': "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"34\" viewBox=\"0 0 42 34\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 34) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                    <path d=\"M85 275 c-44 -36 -81 -69 -83 -73 -2 -8 160 -142 172 -142 3 0 6 19 6 41 l0 42 48 -7 c76 -10 134 -44 157 -93 35 -75 47 -47 19 46 -27 91 -123 171 -206 171 -14 0 -18 8 -18 40 0 22 -3 40 -7 40 -5 -1 -44 -30 -88 -65z\"/>\n                </g>\n            </svg>\n        ";
        readonly 'step-forward': "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"34\" viewBox=\"0 0 42 34\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 34) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                    <path d=\"M240 300 c0 -32 -4 -40 -18 -40 -83 0 -179 -80 -206 -171 -28 -93 -16 -121 19 -46 23 49 81 83 158 93 l47 7 0 -42 c0 -22 3 -41 6 -41 9 0 174 132 174 140 0 8 -165 140 -174 140 -3 0 -6 -18 -6 -40z\"/>\n                </g>\n            </svg>\n        ";
        readonly 'theme-toggle': "\n            <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"46\" height=\"46\" viewBox=\"0 0 46.000000 46.000000\" preserveAspectRatio=\"xMidYMid meet\">\n                <g transform=\"translate(0, 46) scale(0.1, -0.1)\" fill=\"#000000\" stroke=\"none\">\n                <path d=\"M170 425 c0 -19 5 -35 10 -35 6 0 10 16 10 35 0 19 -4 35 -10 35 -5 0 -10 -16 -10 -35z\"/>\n                <path d=\"M220 235 c-118 -118 -211 -218 -207 -222 8 -7 437 415 437 429 0 5 -3 8 -8 8 -4 0 -104 -97 -222 -215z\"/>\n                <path d=\"M50 402 c0 -14 39 -46 47 -39 3 4 -2 16 -12 27 -19 21 -35 26 -35 12z\"/>\n                <path d=\"M275 390 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z\"/>\n                <path d=\"M119 341 c-19 -19 -29 -40 -29 -59 0 -32 33 -82 46 -70 4 5 0 16 -9 26 -24 26 -21 65 6 90 28 26 64 28 89 5 10 -9 21 -13 26 -9 12 13 -38 46 -70 46 -19 0 -40 -10 -59 -29z\"/>\n                <path d=\"M412 304 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z\"/>\n                <path d=\"M0 280 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z\"/>\n                <path d=\"M284 196 c-47 -47 -47 -95 0 -142 47 -47 95 -47 142 0 21 21 34 44 34 60 0 29 -11 33 -30 11 -7 -8 -22 -15 -35 -15 -45 0 -73 63 -40 90 22 19 18 30 -11 30 -16 0 -39 -13 -60 -34z m38 -25 c-6 -42 37 -85 79 -79 36 6 37 -4 3 -31 -37 -29 -70 -26 -105 8 -34 35 -37 68 -8 105 27 34 37 33 31 -3z\"/>\n                <path d=\"M65 180 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z\"/>\n                <path d=\"M182 44 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z\"/>\n                </g>\n            </svg>\n        ";
        readonly 'instructions-open': "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">\n                <path style=\"text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans\" d=\"M 16 4 C 9.3844277 4 4 9.3844277 4 16 C 4 22.615572 9.3844277 28 16 28 C 22.615572 28 28 22.615572 28 16 C 28 9.3844277 22.615572 4 16 4 z M 16 6 C 21.534692 6 26 10.465308 26 16 C 26 21.534692 21.534692 26 16 26 C 10.465308 26 6 21.534692 6 16 C 6 10.465308 10.465308 6 16 6 z M 16 10 C 13.802666 10 12 11.802666 12 14 L 14 14 C 14 12.883334 14.883334 12 16 12 C 17.116666 12 18 12.883334 18 14 C 18 14.767423 17.508714 15.44544 16.78125 15.6875 L 16.375 15.8125 C 15.559939 16.083523 15 16.862393 15 17.71875 L 15 19 L 17 19 L 17 17.71875 L 17.40625 17.59375 C 18.944786 17.08181 20 15.620577 20 14 C 20 11.802666 18.197334 10 16 10 z M 15 20 L 15 22 L 17 22 L 17 20 L 15 20 z\" color=\"#000\" overflow=\"visible\" font-family=\"Bitstream Vera Sans\"/>\n            </svg>\n        ";
        readonly 'clear-storage-open': "\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"32px\" height=\"32px\" viewBox=\"0 0 729.837 729.838\" style=\"enable-background:new 0 0 729.837 729.838;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <g>\n                            <path d=\"M589.193,222.04c0-6.296,5.106-11.404,11.402-11.404S612,215.767,612,222.04v437.476c0,19.314-7.936,36.896-20.67,49.653c-12.733,12.734-30.339,20.669-49.653,20.669H188.162c-19.315,0-36.943-7.935-49.654-20.669c-12.734-12.734-20.669-30.313-20.669-49.653V222.04c0-6.296,5.108-11.404,11.403-11.404c6.296,0,11.404,5.131,11.404,11.404v437.476c0,13.02,5.37,24.922,13.97,33.521c8.6,8.601,20.503,13.993,33.522,13.993h353.517c13.019,0,24.896-5.394,33.498-13.993c8.624-8.624,13.992-20.503,13.992-33.498V222.04H589.193z\"/>\n                            <path d=\"M279.866,630.056c0,6.296-5.108,11.403-11.404,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.404,5.108,11.404,11.404V630.056z\"/>\n                            <path d=\"M376.323,630.056c0,6.296-5.107,11.403-11.403,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.403,5.108,11.403,11.404V630.056z\"/>\n                            <path d=\"M472.803,630.056c0,6.296-5.106,11.403-11.402,11.403c-6.297,0-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.107-11.404,11.404-11.404c6.296,0,11.402,5.108,11.402,11.404V630.056L472.803,630.056z\"/>\n                            <path d=\"M273.214,70.323c0,6.296-5.108,11.404-11.404,11.404c-6.295,0-11.403-5.108-11.403-11.404c0-19.363,7.911-36.943,20.646-49.677C283.787,7.911,301.368,0,320.73,0h88.379c19.339,0,36.92,7.935,49.652,20.669c12.734,12.734,20.67,30.362,20.67,49.654c0,6.296-5.107,11.404-11.403,11.404s-11.403-5.108-11.403-11.404c0-13.019-5.369-24.922-13.97-33.522c-8.602-8.601-20.503-13.994-33.522-13.994h-88.378c-13.043,0-24.922,5.369-33.546,13.97C278.583,45.401,273.214,57.28,273.214,70.323z\"/>\n                            <path d=\"M99.782,103.108h530.273c11.189,0,21.405,4.585,28.818,11.998l0.047,0.048c7.413,7.412,11.998,17.628,11.998,28.818v29.46c0,6.295-5.108,11.403-11.404,11.403h-0.309H70.323c-6.296,0-11.404-5.108-11.404-11.403v-0.285v-29.175c0-11.166,4.585-21.406,11.998-28.818l0.048-0.048C78.377,107.694,88.616,103.108,99.782,103.108L99.782,103.108zM630.056,125.916H99.782c-4.965,0-9.503,2.02-12.734,5.274L87,131.238c-3.255,3.23-5.274,7.745-5.274,12.734v18.056h566.361v-18.056c0-4.965-2.02-9.503-5.273-12.734l-0.049-0.048C639.536,127.936,635.021,125.916,630.056,125.916z\"/>\n                        </g>\n                    </g>\n                </g>\n            </svg>   \n        ";
    };
}
declare namespace StructVisorAPI.SVG {
    function initialize(): void;
}
declare namespace StructVisorAPI.UI {
    const Attributes: {
        readonly 'svg-name': "data-svg-name";
        readonly 'svg-view': "data-svg-view";
        readonly 'is-animation-speed-range': "data-is-animation-speed-range";
    };
}
declare namespace StructVisorAPI.UI {
    const Elements: {
        readonly 'instructions-section': HTMLElement;
        readonly 'instructions-tabs': HTMLElement;
        readonly 'instructions-tab-structure': HTMLElement;
        readonly 'instructions-tab-algorithm': HTMLElement;
        readonly 'instructions-frame': HTMLIFrameElement;
        readonly 'instructions-open': HTMLElement;
        readonly 'instructions-close': HTMLElement;
        readonly navigation: HTMLElement;
        readonly 'navigation-toggle': HTMLElement;
        readonly 'navigation-search': HTMLInputElement;
        readonly 'asd-list': HTMLElement;
        readonly 'asd-control-section': HTMLElement;
        readonly 'animation-step-back': HTMLElement;
        readonly 'animation-step-forward': HTMLElement;
        readonly 'animation-pause': HTMLElement;
        readonly 'animation-play': HTMLElement;
        readonly 'animation-skip': HTMLElement;
        readonly 'animation-speed-range': HTMLElement;
        readonly 'animation-speed-slider': HTMLDivElement;
        readonly 'visualizer-canvas': HTMLCanvasElement;
        readonly 'clear-storage-section': HTMLElement;
        readonly 'clear-storage-open': HTMLElement;
        readonly 'clear-storage-close': HTMLElement;
        readonly 'clear-storage-button': HTMLElement;
        readonly 'clear-storage-progress-button': HTMLElement;
        readonly 'clear-storage-structure-progress-button': HTMLElement;
        readonly 'dark-overlay': HTMLElement;
        readonly 'theme-toggle': HTMLElement;
    };
}
declare namespace StructVisorAPI.Theme {
    type SpectrumType = {
        '--first-main-color': string;
        '--second-main-color': string;
        '--third-main-color': string;
        '--fourth-main-color': string;
        '--fifth-main-color': string;
        '--canvas-color': string;
    };
    type SpectrumItemType = keyof SpectrumType;
}
declare namespace StructVisorAPI.Theme {
    const Spectrums: readonly [{
        readonly '--first-main-color': "#1a365d";
        readonly '--second-main-color': "#ffffff";
        readonly '--third-main-color': "#3c3c3c";
        readonly '--fourth-main-color': "#ffffff";
        readonly '--fifth-main-color': "#59728d";
        readonly '--canvas-color': "#000000";
    }, {
        readonly '--first-main-color': "#0664e3";
        readonly '--second-main-color': "#ffffff";
        readonly '--third-main-color': "#f0f0f0";
        readonly '--fourth-main-color': "#000000";
        readonly '--fifth-main-color': "#8eb7e3";
        readonly '--canvas-color': "#ffffff";
    }];
}
declare namespace StructVisorAPI.Theme {
    const dynamicColor: unique symbol;
    function getColor(type: SpectrumItemType): string;
    function initialize(): void;
}
declare namespace StructVisorAPI.Navigation {
    class Item {
        private static readonly _list;
        private readonly _title;
        private readonly _subItems;
        private readonly _htmlElements;
        constructor(title: string, onclick?: () => void);
        static get list(): Readonly<Set<Item>>;
        insertSubItem(title: string, onclick?: () => void): void;
        displayFromSearch(text: string): void;
    }
}
declare namespace StructVisorAPI.Navigation {
    class SubItem {
        readonly htmlElement: HTMLLIElement;
        constructor(title: string, onclick?: () => void);
    }
}
declare namespace StructVisorAPI.Navigation {
    function initialize(): void;
}
declare namespace StructVisorAPI.Animations.Speed {
    const MIN_PERCENT = 0;
    const MAX_PERCENT = 100;
    function getPercent(): number;
    function setPercent(value: number): void;
    function initialize(): void;
}
declare namespace StructVisorAPI.Animations {
    function initialize(): void;
}
declare namespace StructVisorAPI.Visualizer.Controls {
    type ControlStatusType = 'available' | 'executed' | 'disabled';
    type BaseControlGeneral = BaseControl<HTMLElement, IBaseControlOptions>;
    interface IBaseControlOptions {
        isVisible: boolean;
        status: ControlStatusType;
    }
}
declare namespace StructVisorAPI.Visualizer.Controls {
    class ControlBox {
        private readonly _htmlElements;
        constructor(title: string);
        insert<T extends HTMLElement>(control: BaseControl<T, IBaseControlOptions>, htmlElement: T): void;
        extract<T extends HTMLElement>(control: BaseControl<T, IBaseControlOptions>, htmlElement: T): void;
        insertSelf(): void;
        extractSelf(): void;
    }
}
declare namespace StructVisorAPI.Visualizer.Controls {
    abstract class BaseControl<T extends HTMLElement, O extends IBaseControlOptions> {
        protected readonly _htmlElement: T;
        protected constructor(options: Partial<O>);
        get isVisible(): boolean;
        set isVisible(isVisible: boolean);
        get status(): ControlStatusType;
        set status(status: ControlStatusType);
        checkHtmlElementReference(htmlElement: T): boolean;
        insertTo(controlBox: ControlBox): void;
        extractFrom(controlBox: ControlBox): void;
        setOptions(options: Partial<O>): void;
        protected abstract _createHtmlElement(options: Partial<IBaseControlOptions>): T;
        protected abstract _setOptions(options: Partial<O>): void;
    }
}
declare namespace StructVisorAPI.Visualizer.Controls {
    function insert(...controlBoxes: ControlBox[]): void;
    function extract(...controlBoxes: ControlBox[]): void;
    function extractAll(): void;
}
declare namespace StructVisorAPI.Visualizer.Graphics {
    type ColorType = typeof Theme.dynamicColor | string | null;
    type BaseGraphicGeneral = BaseGraphic<IBaseGraphicOptions>;
    type GraphicCollectionGeneral = GraphicCollection<BaseGraphicGeneral>;
    type GraphicMapGeneral = GraphicMap<any, BaseGraphicGeneral>;
    type GraphicCollectionsGeneral = GraphicCollectionGeneral | GraphicMapGeneral;
    interface IBaseGraphicOptions {
        isVisible: boolean;
        fillColor: ColorType;
        strokeColor: ColorType;
        strokeWidth: number;
    }
}
declare namespace StructVisorAPI.Visualizer.Graphics {
    abstract class BaseGraphic<T extends IBaseGraphicOptions> {
        readonly bounds: Utils.Bounds;
        private _isVisible;
        private _fillColor;
        private _strokeColor;
        private _strokeWidth;
        protected constructor(bounds: Utils.Bounds, options: Partial<T>);
        get isVisible(): boolean;
        set isVisible(isVisible: boolean);
        get fillColor(): ColorType;
        set fillColor(color: ColorType);
        get strokeColor(): ColorType;
        set strokeColor(color: ColorType);
        get strokeWidth(): number;
        set strokeWidth(width: number);
        setOptions(options: Partial<T>): void;
        render(context: CanvasRenderingContext2D): void;
        protected abstract _render(context: CanvasRenderingContext2D): void;
        protected abstract _setOptions(options: Partial<T>): void;
        protected _update(lastBounds?: Utils.Bounds): void;
        static convertToColorString(color: ColorType): string;
    }
}
declare namespace StructVisorAPI.Visualizer.Graphics {
    class GraphicCollection<T extends BaseGraphic<IBaseGraphicOptions>> {
        private readonly _items;
        private readonly _eventTarget;
        constructor();
        has(item: T): boolean;
        add(...items: T[]): void;
        delete(...items: T[]): void;
        clear(): void;
        addChangeListener(listener: (item: T) => void): void;
        removeChangeListener(listener: (item: T) => void): void;
        [Symbol.iterator](): Generator<T, void, unknown>;
    }
}
declare namespace StructVisorAPI.Visualizer.Graphics {
    class GraphicMap<K, V extends BaseGraphic<IBaseGraphicOptions>> {
        private readonly _set;
        private readonly _map;
        private readonly _eventTarget;
        constructor();
        hasKey(key: K): boolean;
        hasValue(value: V): boolean;
        get(key: K): V | undefined;
        set(key: K, value: V): void;
        delete(key: K): void;
        clear(): void;
        addChangeListener(listener: (value: V) => void): void;
        removeChangeListener(listener: (value: V) => void): void;
        [Symbol.iterator](): Generator<[K, V], void, unknown>;
    }
}
declare namespace StructVisorAPI.Visualizer.Graphics {
    function getViewSize(): Utils.Vector;
    function setViewSize(size: Utils.Vector): void;
    function addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void): void;
    function removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void): void;
    function clearEventListeners(): void;
    function convertToCanvasPosition(position: Utils.Vector): Utils.Vector;
    function normalizeBoundsForRender(bounds: Utils.Bounds): Utils.Bounds;
    function render(...targetBoundsList: Utils.Bounds[]): void;
    function checkDisplay(graphic: BaseGraphicGeneral): boolean;
    function insert(...targets: (BaseGraphicGeneral | GraphicCollection<BaseGraphicGeneral> | GraphicMap<any, BaseGraphicGeneral>)[]): void;
    function extract(...targets: (BaseGraphicGeneral | GraphicCollection<BaseGraphicGeneral> | GraphicMap<any, BaseGraphicGeneral>)[]): void;
    function extractAll(): void;
    function moveToFront(...graphics: BaseGraphicGeneral[]): void;
    function moveToBack(...graphics: BaseGraphicGeneral[]): void;
}
declare namespace StructVisorAPI.ASD {
    type CommandModeType = 'load' | 'start' | 'skip';
    type CommandStatusType = 'executed' | 'paused' | 'ended';
    type CommandObjectType<T extends IStructure['commands'][number]> = {
        name: T['name'];
    } & Omit<T['object'], 'name'>;
    type StackCommandsType<T extends IStructure['commands'][number]['class'] | CommandObjectType<IStructure['commands'][number]>> = {
        stack: T[];
        cancelCount: number;
    };
    type CommandsCallbacksType<T extends IStructure> = {
        [N in T['commands'][number]['name']]: (items: T['item']['class'][], obj: CommandObjectType<Extract<T['commands'][number], {
            name: N;
        }>>) => Extract<T['commands'][number], {
            name: N;
        }>['class'];
    };
    type ControlsBoxesStructuredType<T extends IControlable> = {
        [K in keyof T['controls']]: Visualizer.Controls.ControlBox;
    };
    type ControlsStructuredType<T extends IControlable> = {
        [K in keyof T['controls']]: {
            title: string;
            items: T['controls'][K];
        };
    };
    type GraphicsManagerArgsType<T extends IStructure | IAlgorithm<IStructure> | IItem> = {
        element: T['class'];
        graphics: T['graphics'];
    } & (T extends IStructure ? {
        viewSize: Utils.Vector;
    } : T extends IAlgorithm<IStructure> ? {
        viewSize?: Utils.Vector;
    } : {});
    type SelectedType = BaseStructure<IStructure> | BaseAlgorithm<IAlgorithm<IStructure>> | null;
}
declare namespace StructVisorAPI.ASD {
    interface IControlable {
        controls: {
            [controlBox: string]: {
                [control: string]: Visualizer.Controls.BaseControlGeneral;
            };
        };
    }
    interface IGraphicable {
        graphics: {
            [graphic: string]: Visualizer.Graphics.BaseGraphicGeneral | Visualizer.Graphics.GraphicCollection<Visualizer.Graphics.BaseGraphicGeneral> | Visualizer.Graphics.GraphicMap<unknown, Visualizer.Graphics.BaseGraphicGeneral>;
        };
    }
    /**
     * Інтерфейс структури
     * @property {IItem} item - елемент структури.
     * @property {ICommand<IStructure>[]} commands - масив команд структури.
     * @property {object} controls - контроли структури (extends IControlable).
     * @property {object} graphics - графічні елементи структури (extends IGraphicable).
     * @property {BaseStructure<IStructure>} class - клас структури.
     */
    interface IStructure extends IControlable, IGraphicable {
        item: IItem;
        commands: ICommand<IStructure>[];
        class: BaseStructure<IStructure>;
    }
    /**
     * Інтерфейс алгоритму
     * @template {IStructure} T - інтерфейс структури алгоритму.
     * @property {object} controls - контроли алгоритму (extends IControlable).
     * @property {object} graphics - графічні елементи алгоритму (extends IGraphicable).
     * @property {BaseAlgorithm<IAlgorithm<T>>} class - клас алгоритму.
     */
    interface IAlgorithm<T extends IStructure> extends IControlable, IGraphicable {
        structure: T;
        class: BaseAlgorithm<IAlgorithm<T>>;
    }
    /**
     * Інтерфейс елементу
     * @property {object} graphics - графічні елементи елементу (extends IGraphicable).
     * @property {BaseItem<IItem>} class - клас елементу.
     */
    interface IItem extends IGraphicable {
        class: BaseItem<IItem>;
    }
    /**
     * Інтерфейс команди
     * @template {IStructure} T - структура команди.
     * @property {string} name - назва команди.
     * @property {Utils.PrimitiveObjectType} object - примітивний об'єкт з даними команди для збереження прогресу.
     * @property {BaseCommand<ICommand<T>>} class - клас команди.
     */
    interface ICommand<T extends IStructure> {
        name: string;
        structure: T;
        object: Utils.PrimitiveObjectType;
        class: BaseCommand<ICommand<T>>;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseASD {
        private static readonly _instances;
        private static _selected;
        readonly name: string;
        constructor(name: string);
        static get selected(): BaseASD | null;
        select(): void;
        unselect(): void;
        private _register;
        static initialize(): void;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseStructure<T extends IStructure> extends BaseASD {
        protected readonly _invoker: Invoker<T>;
        protected readonly _items: T['item']['class'][];
        protected abstract readonly _controlsManager: BaseControlsManager<T>;
        protected abstract readonly _graphicsManager: BaseGraphicsManager<T>;
        protected abstract readonly _progressLoader: BaseProgressLoader<T>;
        private readonly _navigation;
        protected constructor(name: string, title: string);
        get isAnimationPaused(): boolean;
        select(): void;
        unselect(): void;
        perform(action: 'undo' | 'redo' | 'skip' | 'toggleAnimationPause'): void;
        insert<U extends IAlgorithm<T>>(algorithm: U['class']): {
            invoker: Invoker<T>;
            items: T['item']['class'][];
        };
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseAlgorithm<T extends IAlgorithm<IStructure>> extends BaseASD {
        readonly title: string;
        readonly structure: T['structure']['class'];
        protected abstract readonly _controlsManager: BaseControlsManager<T>;
        protected abstract readonly _graphicsManager: BaseGraphicsManager<T>;
        private readonly _references;
        protected constructor(structure: T['structure']['class'], name: string, title: string);
        protected get _items(): ReturnType<T['structure']['class']['insert']>['items'];
        protected get _invoker(): ReturnType<T['structure']['class']['insert']>['invoker'];
        checkDefineReferences(): boolean;
        select(): void;
        unselect(): void;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseItem<T extends IItem> {
        abstract readonly graphicsManager: BaseGraphicsManager<T>;
        protected constructor();
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseCommand<T extends ICommand<IStructure>> {
        protected readonly _items: T['structure']['item']['class'][];
        private readonly _delayCalculatorCallback;
        private _status;
        protected constructor(items: T['structure']['item']['class'][], delayCalculatorCallback?: (percent: number) => number);
        get status(): CommandStatusType;
        abstract toObject(): CommandObjectType<T>;
        abstract undo(): void;
        execute(isLoadFromStorage: boolean): void;
        toggleAnimationPause(): void;
        skip(): void;
        protected abstract _executeAlgorithm(): void;
        protected abstract _executeAnimation(mode: CommandModeType): Generator;
        private _executeImmediateAnimationLoop;
        private _executeAsyncAnimationLoop;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseControlsManager<T extends IStructure | IAlgorithm<IStructure>> {
        protected readonly _asd: T['class'];
        private readonly _controls;
        private readonly _controlBoxes;
        private __isActionExecuting;
        private readonly _savedControlsStatuses;
        protected constructor(args: {
            asd: T['class'];
            controls: ControlsStructuredType<T>;
        });
        protected get _isActionExecuting(): boolean;
        setVisible(isVisible: boolean): void;
        protected _getControl<K extends keyof T['controls'], V extends keyof T['controls'][K]>(category: K, control: V): T['controls'][K][V];
        protected _getControls(category?: keyof T['controls']): Set<Visualizer.Controls.BaseControlGeneral>;
        protected _toggleActionExecuting(...exclusionControls: Visualizer.Controls.BaseControlGeneral[]): void;
        private _createControlBoxes;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseGraphicsManager<T extends IStructure | IAlgorithm<IStructure> | IItem> {
        protected readonly _element: T['class'];
        private readonly _graphics;
        private readonly _viewSize?;
        private readonly _collections;
        protected constructor(args: GraphicsManagerArgsType<T>);
        get viewSize(): Readonly<Utils.Vector>;
        setVisible(isVisible: boolean, items?: BaseItem<IItem>[]): void;
        protected _getGraphic<K extends keyof T['graphics']>(graphic: K): T['graphics'][K];
        private _createCollectionsMap;
        private _setVisibleElement;
        private _setVisibleItems;
        private _setCollectionsCallbacks;
    }
}
declare namespace StructVisorAPI.ASD {
    abstract class BaseProgressLoader<T extends IStructure> {
        private readonly _invoker;
        private readonly _commandsCallbacks;
        private _isAlreadyLoaded;
        private readonly _structure;
        protected constructor(args: {
            structure: T['class'];
            invoker: Invoker<T>;
            commandsCallbacks: CommandsCallbacksType<T>;
        });
        load(items: T['item']['class'][]): void;
        save(commands: StackCommandsType<T['commands'][number]['class']>): void;
    }
}
declare namespace StructVisorAPI.ASD {
    class Invoker<T extends IStructure> {
        private static _lastExecutedCommand;
        private readonly _commands;
        private readonly _eventTarget;
        constructor();
        get isAnimationPaused(): boolean;
        private get _currentCommand();
        private get _nextCommand();
        addChangeListener(listener: (commands: StackCommandsType<T['commands'][number]['class']>) => void): void;
        removeChangeListener(listener: (commands: StackCommandsType<T['commands'][number]['class']>) => void): void;
        undo(): void;
        redo(): void;
        toggleAnimationPause(): void;
        skip(): void;
        executeCommand(command: T['commands'][number]['class'], isLoadFromStorage?: boolean): void;
    }
}
declare namespace StructVisorAPI.ASD {
    function initialize(): void;
}
declare namespace StructVisorAPI {
    function initialize(): void;
}

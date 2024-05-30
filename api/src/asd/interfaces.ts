namespace StructVisorAPI.ASD{
    /* Загальні */

    export interface IControlable{
        controls: {
            [controlBox: string]: {
                [control: string]: Visualizer.Controls.BaseControlGeneral;
            }
        }
    }

    export interface IGraphicable{
        graphics: {
            [graphic: string]: Visualizer.Graphics.BaseGraphicGeneral | Visualizer.Graphics.GraphicCollection<Visualizer.Graphics.BaseGraphicGeneral> | Visualizer.Graphics.GraphicMap<unknown, Visualizer.Graphics.BaseGraphicGeneral>;
        }
    }

    /* Інтерфейси архітектурних елементів */

    /**
     * Інтерфейс структури
     * @property {IItem} item - елемент структури.
     * @property {ICommand<IStructure>[]} commands - масив команд структури.
     * @property {object} controls - контроли структури (extends IControlable).
     * @property {object} graphics - графічні елементи структури (extends IGraphicable).
     * @property {BaseStructure<IStructure>} class - клас структури.
     */
    export interface IStructure extends IControlable, IGraphicable{
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
    export interface IAlgorithm<T extends IStructure> extends IControlable, IGraphicable{
        structure: T;
        class: BaseAlgorithm<IAlgorithm<T>>;
    }

    /**
     * Інтерфейс елементу
     * @property {object} graphics - графічні елементи елементу (extends IGraphicable).
     * @property {BaseItem<IItem>} class - клас елементу.
     */
    export interface IItem extends IGraphicable{
        class: BaseItem<IItem>;
    }

    /**
     * Інтерфейс команди
     * @template {IStructure} T - структура команди.
     * @property {string} name - назва команди.
     * @property {Utils.PrimitiveObjectType} object - примітивний об'єкт з даними команди для збереження прогресу.
     * @property {BaseCommand<ICommand<T>>} class - клас команди.
     */
    export interface ICommand<T extends IStructure>{
        name: string;
        structure: T;
        object: Utils.PrimitiveObjectType;
        class: BaseCommand<ICommand<T>>;
    }
}
namespace StructVisorAPI.ASD{
    export abstract class BaseASD{
        private static readonly _instances: Partial<Record<string, BaseASD>> = {};
        private static _selected: BaseASD | null = null;

        public readonly name: string;

        public constructor(name: string){
            this.name = name;
            this._register();
        }

        public static get selected(): BaseASD | null{
            return this._selected;
        }

        public select(){
            if (BaseASD._selected !== this){
                if (BaseASD._selected !== null && !(this instanceof BaseAlgorithm && this.structure === BaseASD._selected)){
                    BaseASD._selected.unselect();
                }

                BaseASD._selected = this;
                Storage.setItem('current-asd', this.name);
            }
        }

        public unselect(){
            if (BaseASD._selected === this){
                BaseASD._selected = null;
                Storage.setItem('current-asd', null);
            }
        }

        private _register(){
            if (this.name in BaseASD._instances){
                throw new Errors.DesignError(`Структуру або алгоритм "${this.name}" вже було ініціалізовано.`);
            }
            
            BaseASD._instances[this.name] = this;
        }

        public static initialize(){
            for (const name of Object.keys(this._instances)){
                if (name === Storage.getItem('current-asd')){
                    this._instances[name]!.select();
                    break;
                }
            }
        }
    }
}
namespace StructVisorAPI.ASD{
    export abstract class BaseItem<T extends IItem>{
        public abstract readonly graphicsManager: BaseGraphicsManager<T>;

        protected constructor(){}
    }
}
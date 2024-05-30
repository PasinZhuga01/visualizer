namespace App.ASD.Structures{
    export abstract class NodeSequence<T extends INodeSequence> extends BaseStructure<T>{
        public abstract clear(): void;
    }
}
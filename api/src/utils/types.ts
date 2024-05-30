namespace StructVisorAPI.Utils{
    export type EventsObjectType = {[type: string]: (...args: any[]) => void};
    
    export type VectorObjectType = {x: number; y: number}
    export type BoundsObjectType = VectorObjectType & {width: number; height: number};
    
    export type PrimitiveObjectType = {
        [name: string]: boolean | boolean[] | number | number[] | string | string[] | null | null[] | PrimitiveObjectType | PrimitiveObjectType[];
    };

    export type ValidateMatchType<T extends object, S extends object> = T extends S ? T : never;
    
    export type PartialExceptType<T extends object, K extends keyof T> = Partial<T> & Pick<T, K>;
}
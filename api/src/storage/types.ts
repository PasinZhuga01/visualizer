namespace StructVisorAPI.Storage{
    export type ItemsType = Utils.ValidateMatchType<{
        'is-light-theme': boolean;
        'is-navigation-visible': boolean;
        'animation-speed': number;
        'current-asd': string | null;
        'progress': {
            [structure: string]: ASD.StackCommandsType<ASD.CommandObjectType<ASD.ICommand<ASD.IStructure>>>;
        };
    }, Utils.PrimitiveObjectType>;

    export type ItemNameType = keyof ItemsType;
}
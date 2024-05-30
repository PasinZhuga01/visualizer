namespace StructVisorAPI.ASD{
    /* Команди */

    export type CommandModeType = 'load' | 'start' | 'skip';
    export type CommandStatusType = 'executed' | 'paused' | 'ended';
    export type CommandObjectType<T extends IStructure['commands'][number]> = {name: T['name']} & Omit<T['object'], 'name'>;
    export type StackCommandsType<T extends IStructure['commands'][number]['class'] | CommandObjectType<IStructure['commands'][number]>> = {stack: T[], cancelCount: number};

    export type CommandsCallbacksType<T extends IStructure> = {
        [N in T['commands'][number]['name']]: (items: T['item']['class'][], obj: CommandObjectType<Extract<T['commands'][number], {name: N}>>) => Extract<T['commands'][number], {name: N}>['class'];
    };

    /* Контроли */

    export type ControlsBoxesStructuredType<T extends IControlable> = {
        [K in keyof T['controls']]: Visualizer.Controls.ControlBox;
    };

    export type ControlsStructuredType<T extends IControlable> = {
        [K in keyof T['controls']]: {
            title: string;
            items: T['controls'][K];
        }
    };

    /* Графіка */

    export type GraphicsManagerArgsType<T extends IStructure | IAlgorithm<IStructure> | IItem> = {
        element: T['class'],
        graphics: T['graphics']
    } & (T extends IStructure ? {viewSize: Utils.Vector} : T extends IAlgorithm<IStructure> ? {viewSize?: Utils.Vector} : {});

    /* Загальне */

    export type SelectedType = BaseStructure<IStructure> | BaseAlgorithm<IAlgorithm<IStructure>> | null;
}
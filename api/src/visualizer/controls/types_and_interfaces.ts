namespace StructVisorAPI.Visualizer.Controls{
    export type ControlStatusType = 'available' | 'executed' | 'disabled';
    export type BaseControlGeneral = BaseControl<HTMLElement, IBaseControlOptions>;

    export interface IBaseControlOptions{
        isVisible: boolean;
        status: ControlStatusType;
    }
}
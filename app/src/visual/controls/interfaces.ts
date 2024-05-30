namespace App.Visual.Controls{
    export interface ITextControlOptions extends IBaseControlOptions{
        placeholder: string;
        value: string;
    }

    export interface INumberControlOptions extends IBaseControlOptions{
        placeholder: string;
        value: number;
        min: number;
        max: number;
    }

    export interface IButtonControlOptions extends IBaseControlOptions{
        value: string;
        onclick: () => void;
    }

    export interface ISelectControlOptions<T> extends IBaseControlOptions{
        items: Items.SelectControlItem<T>[];
    }

    export interface ICheckboxControlOptions extends IBaseControlOptions{
        isChecked: boolean;
        value: string;
        oncheck: () => void;
    }
}
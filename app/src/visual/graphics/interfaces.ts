namespace App.Visual.Graphics{
    export interface ILinkRectangleOptions extends IBaseGraphicOptions{
        isCrossed: boolean;
    }

    export interface ITextOptions extends IBaseGraphicOptions{
        fontSize: number;
        horizontalAlign: HorizontalAlignType;
        verticalAlign: VerticalAlignType;
    }

    export interface ILineOptions extends IBaseGraphicOptions{
        countArrows: CountArrowsType;
        lengthArrows: number;
    }

    export interface ILinkedNodeOptions extends IBaseGraphicOptions{
        leftLinkState: LinkStateType;
        rightLinkState: LinkStateType;
    }

    export interface IEllipseOptions extends IBaseGraphicOptions{
        startAngle: number;
        endAngle: number;
    }
}
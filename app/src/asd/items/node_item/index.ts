/// <reference path="item.ts" />
/// <reference path="graphics_manager.ts" />

namespace App.ASD.Items{
    export interface INodeItem extends IItem{
        class: NodeItem;
        graphics: {
            'node': Visual.Graphics.LinkedNode;
            'text': Visual.Graphics.Text;
            'left-link': Visual.Graphics.Line;
            'right-link': Visual.Graphics.Line;
        }
    }
}
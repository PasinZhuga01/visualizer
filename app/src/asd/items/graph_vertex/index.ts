/// <reference path="item.ts" />
/// <reference path="graphics_manager.ts" />

namespace App.ASD.Items{
    export interface IGraphVertex extends IItem{
        class: GraphVertex;
        graphics: {
            'vertex': Visual.Graphics.Ellipse;
            'text': Visual.Graphics.Text;
            'connections-lines': Visual.Graphics.GraphicMap<GraphVertex, Visual.Graphics.Line | Visual.Graphics.Ellipse>;
            'connections-weights': Visual.Graphics.GraphicMap<GraphVertex, Visual.Graphics.Text>
        }
    }
}
/// <reference path="algorithm.ts" />
/// <reference path="graphics_manager.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Algorithms{
    export interface IDijkstra extends IGraphTraversal{
        class: Dijkstra;
        graphics: {
            'headers': Visual.Graphics.GraphicMap<Items.GraphVertex, Visual.Graphics.Text>;
            'distances': Visual.Graphics.GraphicCollection<Visual.Graphics.Text>;
            'line': Visual.Graphics.Line;

            'current-item-distance-text': Visual.Graphics.Text;
            'current-item-distance-value': Visual.Graphics.Text;
            
            'checked-item-distance-text': Visual.Graphics.Text;
            'checked-item-distance-value': Visual.Graphics.Text;

            'result-description': Visual.Graphics.Text;
            'path-length-value': Visual.Graphics.Text;
        }
    }
}
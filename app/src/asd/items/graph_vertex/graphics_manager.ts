namespace App.ASD.Items.Graphics{
    type GraphVertexDefaultGraphicsOptionsType = {
        vertex: {
            fillColor: Visual.Graphics.ColorType;
            strokeColor: Visual.Graphics.ColorType;
            strokeWidth: number;
        },
        connection: {
            endAngle: number;
            lengthArrows: number;
            strokeWidth: number;
            strokeColor: Visual.Graphics.ColorType;
        }
    };

    export class GraphVertexGraphicsManager extends BaseGraphicsManager<IGraphVertex>{
        public static readonly VERTEX_RADIUS: number = 16;

        private static readonly _DEFAULT_GRAPHICS_OPTIONS: Readonly<GraphVertexDefaultGraphicsOptionsType> = {
            vertex: {
                fillColor: null,
                strokeColor: Theme.dynamicColor,
                strokeWidth: 1
            },
            connection: {
                endAngle: 270,
                lengthArrows: 10,
                strokeWidth: 1,
                strokeColor: Theme.dynamicColor,
            }
        };

        private readonly _connections: GraphVertexConnectionsType;
        
        private _isVisibleConnectionsWeights: boolean;

        public constructor(element: GraphVertex, connections: GraphVertexConnectionsType){
            const bounds = new Utils.Bounds(
                GraphVertexGraphicsManager.VERTEX_RADIUS * 2,
                GraphVertexGraphicsManager.VERTEX_RADIUS * 2,
                element.center.x - GraphVertexGraphicsManager.VERTEX_RADIUS,
                element.center.y - GraphVertexGraphicsManager.VERTEX_RADIUS
            );

            super({
                element: element,
                graphics: {
                    'vertex': new Visual.Graphics.Ellipse(bounds, GraphVertexGraphicsManager._DEFAULT_GRAPHICS_OPTIONS.vertex),
                    'text': new Visual.Graphics.Text(bounds, element.title, {horizontalAlign: 'center', verticalAlign: 'center'}),
                    'connections-lines': new Visual.Graphics.GraphicMap(),
                    'connections-weights': new Visual.Graphics.GraphicMap()
                }
            });

            this._connections = connections;
            this._isVisibleConnectionsWeights = true;

            this._connectionsWeightsGraphics.addChangeListener((graphic) => graphic.isVisible = this._isVisibleConnectionsWeights);
        }

        public get fillColor(): Visual.Graphics.ColorType{
            return this._vertexGraphic.fillColor;
        }

        public set fillColor(color: Visual.Graphics.ColorType){
            this._vertexGraphic.fillColor = color;
        }

        public get strokeColor(): Visual.Graphics.ColorType{
            return this._vertexGraphic.strokeColor;
        }

        public set strokeColor(color: Visual.Graphics.ColorType){
            this._vertexGraphic.strokeColor = color;
        }

        public get strokeWidth(): number{
            return this._vertexGraphic.strokeWidth;
        }

        public set strokeWidth(width: number){
            this._vertexGraphic.strokeWidth = width;
        }

        private get _vertexGraphic(): Visual.Graphics.Ellipse{
            return this._getGraphic('vertex');
        }

        private get _connectionsLinesGraphics(): Visual.Graphics.GraphicMap<GraphVertex, Visual.Graphics.Line | Visual.Graphics.Ellipse>{
            return this._getGraphic('connections-lines');
        }

        private get _connectionsWeightsGraphics(): Visual.Graphics.GraphicMap<GraphVertex, Visual.Graphics.Text>{
            return this._getGraphic('connections-weights');
        }

        public checkCollide(position: Utils.Vector): boolean{
            return this._vertexGraphic.bounds.checkCollide(position);
        }

        public moveToFront(){
            Visual.Graphics.moveToFront(this._vertexGraphic);
        }

        public clearHighlight(filter?: 'vertex' | 'connections'){
            const {_DEFAULT_GRAPHICS_OPTIONS} = GraphVertexGraphicsManager;

            if (filter === undefined || filter === 'vertex'){
                this._vertexGraphic.setOptions(_DEFAULT_GRAPHICS_OPTIONS.vertex);
            }

            if (filter === undefined || filter === 'connections'){
                for (const entry of this._connectionsLinesGraphics){
                    entry[1].setOptions(_DEFAULT_GRAPHICS_OPTIONS.connection);
                }
                for (const entry of this._connectionsWeightsGraphics){
                    entry[1].setOptions(_DEFAULT_GRAPHICS_OPTIONS.vertex);
                }
            }
        }

        public setVisibleConnectionsWeights(isVisible: boolean){
            this._isVisibleConnectionsWeights = isVisible;

            for (const entry of this._connectionsWeightsGraphics){
                entry[1].isVisible = isVisible;
            }
        }
        
        public setConnectionStrokeColor(vertex: GraphVertex, color: Visual.Graphics.ColorType){
            const line = this._connectionsLinesGraphics.get(vertex);
            const weight = this._connectionsWeightsGraphics.get(vertex);

            if (line !== undefined && weight !== undefined){
                line.strokeColor = color;
                weight.strokeColor = color;
            }
        }

        public setConnectionStrokeWidth(vertex: GraphVertex, width: number){
            const line = this._connectionsLinesGraphics.get(vertex);
            const weight = this._connectionsWeightsGraphics.get(vertex);

            if (line !== undefined && weight !== undefined){
                line.strokeWidth = width;
                weight.strokeWidth = width;
            }
        }

        public connect(isOriented: boolean, weight: number, vertex: GraphVertex){
            const connection = this._connections.from.get(vertex);

            if (connection !== undefined && connection.isOriented === isOriented && connection.weight === weight){
                if (!this._connectionsLinesGraphics.hasKey(vertex) && !this._connectionsWeightsGraphics.hasKey(vertex)){
                    const lineGraphic = this._getConnectionLineGraphics(isOriented, vertex);
                    const weightGraphic = this._getConnectionWeightGraphic(isOriented, weight, vertex);

                    this._connectionsLinesGraphics.set(vertex, lineGraphic);
                    this._connectionsWeightsGraphics.set(vertex, weightGraphic)
                    
                    if (!isOriented){
                        vertex.graphicsManager._connectionsLinesGraphics.set(this._element, lineGraphic);
                        vertex.graphicsManager._connectionsWeightsGraphics.set(this._element, weightGraphic);
                    }
                }
            }
        }

        public disconnect(isOriented: boolean, vertex: GraphVertex){
            if (!this._connections.from.has(vertex) && this._connectionsLinesGraphics.hasKey(vertex) && this._connectionsWeightsGraphics.hasKey(vertex)){
                this._connectionsLinesGraphics.delete(vertex);
                this._connectionsWeightsGraphics.delete(vertex);

                if (!isOriented){
                    vertex.graphicsManager._connectionsLinesGraphics.delete(this._element);
                    vertex.graphicsManager._connectionsWeightsGraphics.delete(this._element);
                }
            }
        }

        private _getConnectionLineGraphics(isOriented: boolean, vertex: GraphVertex): Visual.Graphics.Line | Visual.Graphics.Ellipse{
            const {VERTEX_RADIUS, _DEFAULT_GRAPHICS_OPTIONS} = GraphVertexGraphicsManager;

            if (this._element === vertex){
                return new Visual.Graphics.Ellipse(
                    new Utils.Bounds(
                        VERTEX_RADIUS,
                        VERTEX_RADIUS,
                        this._element.center.x - VERTEX_RADIUS - VERTEX_RADIUS / 2,
                        this._element.center.y + VERTEX_RADIUS / 4
                    ),
                    {..._DEFAULT_GRAPHICS_OPTIONS.connection,
                        endAngle: 270
                    }
                );
            }

            const distance = this._element.center.getDistanceTo(vertex.center as Utils.Vector);
    
            const difference = new Utils.Vector(
                (vertex.center.x - this._element.center.x) / distance,
                (vertex.center.y - this._element.center.y) / distance
            );
    
            const position = new Utils.Vector(
                Math.min(this._element.center.x, vertex.center.x) - _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows,
                Math.min(this._element.center.y, vertex.center.y) - _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows
            );
    
            const size = new Utils.Vector(
                Math.max(this._element.center.x, vertex.center.x) - position.x + _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows * 2,
                Math.max(this._element.center.y, vertex.center.y) - position.y + _DEFAULT_GRAPHICS_OPTIONS.connection.lengthArrows * 2
            );
    
            return new Visual.Graphics.Line(
                new Utils.Bounds(size, position),
                new Utils.Vector(
                    this._element.center.x + difference.x * VERTEX_RADIUS,
                    this._element.center.y + difference.y * VERTEX_RADIUS
                ),
                new Utils.Vector(
                    vertex.center.x - difference.x * VERTEX_RADIUS,
                    vertex.center.y - difference.y * VERTEX_RADIUS
                ),
                {
                    ..._DEFAULT_GRAPHICS_OPTIONS.connection,
                    countArrows: isOriented ? 1 : 0
                }
            ); 
        }

        private _getConnectionWeightGraphic(isOriented: boolean, weight: number, vertex: GraphVertex): Visual.Graphics.Text{
            const {VERTEX_RADIUS} = GraphVertexGraphicsManager;
            const size = new Utils.Vector(50, 20);

            if (this._element === vertex){
                const position = new Utils.Vector(
                    this._element.center.x - VERTEX_RADIUS * 2,
                    this._element.center.y + VERTEX_RADIUS
                );

                return new Visual.Graphics.Text(
                    new Utils.Bounds(size, position),
                    String(weight),
                    {verticalAlign: 'top'}
                )
            }

            const distance = this._element.center.getDistanceTo(vertex.center as Utils.Vector);
            const denominator = isOriented ? 4 : 2;

            const difference = new Utils.Vector(
                (vertex.center.x - this._element.center.x) / distance,
                (vertex.center.y - this._element.center.y) / distance
            );

            const position = new Utils.Vector(
                this._element.center.x + difference.x * (distance / denominator),
                this._element.center.y + difference.y * (distance / denominator)
            );

            return new Visual.Graphics.Text(
                new Utils.Bounds(size, position),
                String(weight),
                {verticalAlign: 'top'}
            );
        }
    }
}
namespace App.ASD.Structures.Controls{
    export class GraphControlsManager extends BaseControlsManager<IGraph>{
        private static readonly _CONNECTION_TYPES = [
            new Visual.Controls.Items.SelectControlItem('Орієнтований'),
            new Visual.Controls.Items.SelectControlItem('Неорієнтований')
        ];

        private readonly _items: Items.GraphVertex[];

        private readonly _hoverInfo: {vertex: Items.GraphVertex | null, color: string | null}
        private readonly _selectInfo: {vertices: Items.GraphVertex[], color: string | null}

        private readonly _callbacks: {
            'add-vertex': (event: MouseEvent) => void;
            'remove-vertex': () => void;
            'connect-vertices': () => void;
            'disconnect-vertices': () => void;
            'hover-vertex': (event: MouseEvent) => void;
            'select-vertices': (event: MouseEvent) => void;
        };

        public constructor(asd: Graph, items: Items.GraphVertex[]){
            super({
                asd: asd,
                controls: {
                    'vertices': {
                        title: 'Вершини',
                        items: {
                            'input-vertex': new Visual.Controls.TextControl({placeholder: 'Вершина'}),
                            'add-vertex': new Visual.Controls.ButtonControl({value: 'Add Vertex', onclick: () => this._addVertex()}),
                            'remove-vertex': new Visual.Controls.ButtonControl({value: 'Remove Vertex', onclick: () => this._removeVertex()}),
                            'clear': new Visual.Controls.ButtonControl({value: 'Clear', onclick: () => this._asd.clearVertices()})
                        }
                    },
                    'connections': {
                        title: 'З\'вязки',
                        items: {
                            'toggle-visible-connections-weights': new Visual.Controls.CheckboxControl({value: 'Відображеня ваг', isChecked: true, oncheck: () => this._asd.setVisibleConnectionsWeights(this._toggleVisibleConnectionsWeight.isChecked)}),
                            'input-connection-type': new Visual.Controls.SelectControl({items: GraphControlsManager._CONNECTION_TYPES}),
                            'input-connection-weight': new Visual.Controls.NumberControl({placeholder: 'Вага', value: 1}),
                            'connect-vertices': new Visual.Controls.ButtonControl({value: 'Connect vertices', onclick: () => this._connectVertices()}),
                            'disconnect-vertices': new Visual.Controls.ButtonControl({value: 'Disconnect vertices', onclick: () => this._disconnectVertices()}),
                            'clear-connections': new Visual.Controls.ButtonControl({value: 'Clear', onclick: () => this._asd.clearConnections()}),
                        }
                    },
                    'highlight': {
                        title: 'Виділення',
                        items: {
                            'clear': new Visual.Controls.ButtonControl({value: 'Clear', onclick: () => this._asd.clearHighlight()}),
                        }
                    }
                }
            });

            this._items = items;

            this._hoverInfo = {vertex: null, color: null};
            this._selectInfo = {vertices: [], color: null};

            this._callbacks = {
                'add-vertex': (event) => this._addVertex(Visual.Graphics.convertToCanvasPosition(new Utils.Vector(event.offsetX, event.offsetY))),
                'remove-vertex': () => this._removeVertex(this._hoverInfo.vertex ?? undefined),
                'connect-vertices': () => this._connectVertices(this._selectInfo.vertices),
                'disconnect-vertices': () => this._disconnectVertices(this._selectInfo.vertices),
                'hover-vertex': (event) => this._hoverVertex(Visual.Graphics.convertToCanvasPosition(new Utils.Vector(event.offsetX, event.offsetY))),
                'select-vertices': (event) => this._selectVertices(Visual.Graphics.convertToCanvasPosition(new Utils.Vector(event.offsetX, event.offsetY)), true)
            };
        }

        private get _inputVertexControl(): Visual.Controls.TextControl{
            return this._getControl('vertices', 'input-vertex');
        }

        private get _addVertexControl(): Visual.Controls.ButtonControl{
            return this._getControl('vertices', 'add-vertex');
        }

        private get _removeVertexControl(): Visual.Controls.ButtonControl{
            return this._getControl('vertices', 'remove-vertex');
        }

        private get _inputConnectionTypeControl(): Visual.Controls.SelectControl<string>{
            return this._getControl('connections', 'input-connection-type');
        }

        private get _inputConnectionWeightControl(): Visual.Controls.NumberControl{
            return this._getControl('connections', 'input-connection-weight');
        }

        private get _connectVerticesControl(): Visual.Controls.ButtonControl{
            return this._getControl('connections', 'connect-vertices');
        }

        private get _disconnectVerticesControl(): Visual.Controls.ButtonControl{
            return this._getControl('connections', 'disconnect-vertices');
        }

        private get _toggleVisibleConnectionsWeight(): Visual.Controls.CheckboxControl{
            return this._getControl('connections', 'toggle-visible-connections-weights');
        }

        private _addVertex(position?: Utils.Vector){
            if (!this._isActionExecuting){
                Visual.Graphics.addEventListener('click', this._callbacks['add-vertex']);
                this._toggleActionExecuting(this._addVertexControl, this._inputVertexControl);
            }
            else if (position === undefined || this._asd.checkInViewSize(position)){
                if (position !== undefined){
                    this._asd.addVertex(this._inputVertexControl.value, position);
                }

                Visual.Graphics.removeEventListener('click', this._callbacks['add-vertex']);
                this._toggleActionExecuting(this._addVertexControl);
            }
        }

        private _removeVertex(vertex?: Items.GraphVertex){
            if (!this._isActionExecuting){
                this._hoverInfo.color = 'red';
                this._toggleActionExecuting(this._removeVertexControl);

                Visual.Graphics.addEventListener('click', this._callbacks['remove-vertex']);
                Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
            }
            else{
                if (vertex === undefined){
                    this._toggleActionExecuting(this._removeVertexControl);

                    Visual.Graphics.removeEventListener('click', this._callbacks['remove-vertex']);
                    Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                }
                else{
                    this._leaveVertex();
                    this._toggleActionExecuting(this._removeVertexControl);
                    
                    this._asd.removeVertex(vertex);
    
                    Visual.Graphics.removeEventListener('click', this._callbacks['remove-vertex']);
                    Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                }
            }
        }

        private _connectVertices(vertices?: Items.GraphVertex[]){
            if (vertices === undefined){
                if (!this._isActionExecuting){
                    this._hoverInfo.color = 'royalblue';
                    this._selectInfo.color = 'blue';

                    Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
                    Visual.Graphics.addEventListener('click', this._callbacks['select-vertices']);
                    Visual.Graphics.addEventListener('click', this._callbacks['connect-vertices']);
                }
                else{
                    this._unselectVertices();

                    Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                    Visual.Graphics.removeEventListener('click', this._callbacks['select-vertices']);
                    Visual.Graphics.removeEventListener('click', this._callbacks['connect-vertices']);
                }

                this._toggleActionExecuting(this._connectVerticesControl);
            }
            else if (vertices.length === 2){
                const isOriented = (this._inputConnectionTypeControl.selected === GraphControlsManager._CONNECTION_TYPES[0]);

                this._connectVertices();
                this._asd.connectVertices(isOriented, Number(this._inputConnectionWeightControl.value), vertices[0]!, vertices[1]!);
            }
        }

        private _disconnectVertices(vertices?: Items.GraphVertex[]){
            if (vertices === undefined){
                if (!this._isActionExecuting){
                    this._hoverInfo.color = 'orange';
                    this._selectInfo.color = 'orangered';

                    Visual.Graphics.addEventListener('mousemove', this._callbacks['hover-vertex']);
                    Visual.Graphics.addEventListener('click', this._callbacks['select-vertices']);
                    Visual.Graphics.addEventListener('click', this._callbacks['disconnect-vertices']);
                }
                else{
                    this._unselectVertices();

                    Visual.Graphics.removeEventListener('mousemove', this._callbacks['hover-vertex']);
                    Visual.Graphics.removeEventListener('click', this._callbacks['select-vertices']);
                    Visual.Graphics.removeEventListener('click', this._callbacks['disconnect-vertices']);
                }

                this._toggleActionExecuting(this._disconnectVerticesControl);
            }
            else if (vertices.length === 2){
                this._disconnectVertices();
                this._asd.disconnectVertices(vertices[0]!, vertices[1]!);
            }
        }

        private _leaveVertex(){
            if (this._hoverInfo.vertex !== null){
                this._hoverInfo.vertex.graphicsManager.fillColor = (this._selectInfo.vertices.includes(this._hoverInfo.vertex) ? this._selectInfo.color : null);
                this._hoverInfo.vertex = null;
            }
        }

        private _hoverVertex(position: Utils.Vector){
            const hoveredVertex = this._items[this._asd.findVertexIndex(position)] ?? null;

            if (hoveredVertex !== this._hoverInfo.vertex){
                this._leaveVertex();

                if (hoveredVertex !== null){
                    this._hoverInfo.vertex = hoveredVertex;
                    this._hoverInfo.vertex.graphicsManager.fillColor = this._hoverInfo.color;
                }
            }
        }

        private _unselectVertices(){
            for (const vertex of this._selectInfo.vertices){
                vertex.graphicsManager.fillColor = null;
            }

            this._selectInfo.vertices = [];
        }

        private _selectVertices(position: Utils.Vector, isMultiple: boolean){
            const selectedVertex = this._items[this._asd.findVertexIndex(position)] ?? null;

            if (selectedVertex !== null){
                if (!isMultiple){
                    this._unselectVertices();
                }

                this._selectInfo.vertices.push(selectedVertex);
                selectedVertex.graphicsManager.fillColor = this._selectInfo.color;
            }
        }
    }
}
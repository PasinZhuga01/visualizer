namespace App.ASD.Algorithms.Controls{
    export class GraphTraversalControlsManager extends BaseControlsManager<IGraphTraversal>{
        public constructor(asd: GraphTraversal){
            super({
                asd: asd,
                controls: {
                    'general': {
                        title: asd.title,
                        items: {
                            'input-start-item': new Visual.Controls.TextControl({placeholder: 'Початкова вершина'}),
                            'input-last-item': new Visual.Controls.TextControl({placeholder: 'Кінцева вершина'}),
                            'start': new Visual.Controls.ButtonControl({value: 'Start', onclick: () => this._start()})
                        }
                    }
                }
            });
        }

        private get _inputStartItemControl(): Visual.Controls.TextControl{
            return this._getControl('general', 'input-start-item');
        }

        private get _inputLastItemControl(): Visual.Controls.TextControl{
            return this._getControl('general', 'input-last-item');
        }

        public clearStartItemTitle(){
            this._inputStartItemControl.value = '';
        }
        
        public clearLastItemTitle(){
            this._inputLastItemControl.value = '';
        }

        private _start(){
            const startIndex = this._asd.structure.findVertexIndex(this._inputStartItemControl.value);
            const lastIndex = this._asd.structure.findVertexIndex(this._inputLastItemControl.value);

            this._asd.start(startIndex, lastIndex);
        }
    }
}
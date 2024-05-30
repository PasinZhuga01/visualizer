namespace App.ASD.Structures.Controls{
    export class QueueControlsManager extends BaseControlsManager<IQueue>{
        public constructor(asd: Queue){
            super({
                asd: asd,
                controls: {
                    'general': {
                        title: 'Загальне',
                        items: {
                            'input-item': new Visual.Controls.TextControl({placeholder: 'Елемент'}),
                            'enqueue': new Visual.Controls.ButtonControl({value: 'Enqueue', onclick: () => this._asd.enqueue(this._inputItemControl.value)}),
                            'dequeue': new Visual.Controls.ButtonControl({value: 'Dequeue', onclick: () => this._asd.dequeue()}),
                            'clear': new Visual.Controls.ButtonControl({value: 'Clear', onclick: () => this._asd.clear()})
                        }
                    }
                }
            });
        }

        private get _inputItemControl(): Visual.Controls.TextControl{
            return this._getControl('general', 'input-item');
        }
    }
}
namespace App.ASD.Structures.Controls{
    export class StackControlsManager extends BaseControlsManager<IStack>{
        public constructor(asd: Stack){
            super({
                asd: asd,
                controls: {
                    'general': {
                        title: 'Загальне',
                        items: {
                            'input-item': new Visual.Controls.TextControl({placeholder: 'Елемент'}),
                            'push': new Visual.Controls.ButtonControl({value: 'Push', onclick: () => this._asd.push(this._inputItemControl.value)}),
                            'pop': new Visual.Controls.ButtonControl({value: 'Pop', onclick: () => this._asd.pop()}),
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
namespace StructVisorAPI.Instructions{
    function close(){
        UI.Elements['instructions-section'].style.display = '';
        UI.Elements['dark-overlay'].style.display = '';
    }

    function open(target?: 'structure' | 'algorithm'){
        const asd = ASD.BaseASD.selected as ASD.SelectedType;
        const isVisibleTabs = (asd instanceof ASD.BaseStructure);
        
        let name = asd?.name;

        if (asd !== null){
            if (target === undefined){
                target = isVisibleTabs ? 'structure' : 'algorithm';
            }

            if (target === 'structure'){
                if (asd instanceof ASD.BaseAlgorithm){
                    name = asd.structure.name;
                }
            }
            
            UI.Elements['instructions-section'].style.display = 'block';
            UI.Elements['dark-overlay'].style.display = 'block';
            UI.Elements['instructions-tabs'].style.display = isVisibleTabs ? 'none' : '';
            
            UI.Elements['instructions-frame'].src = `../app/html/${target}s/${name}.html`;
        }
    }

    export function initialize(){
        UI.Elements['instructions-tab-structure'].addEventListener('click', () => open('structure'));
        UI.Elements['instructions-tab-algorithm'].addEventListener('click', () => open('algorithm'));
        
        UI.Elements['instructions-open'].addEventListener('click', () => open())
        UI.Elements['instructions-close'].addEventListener('click', () => close());
    }
}
namespace StructVisorAPI.Storage.Clear{
    function clearStructureProgress(){
        const asd = ASD.BaseASD.selected;
        
        const name = (asd instanceof ASD.BaseAlgorithm) ? asd.structure.name : asd?.name;
        const progress = getItem('progress');
        
        if (name !== undefined && name in progress){
            progress[name] = {stack: [], cancelCount: 0};
            setItem('progress', progress);
        }
    }

    function setVisible(isVisible: boolean){
        const display = isVisible ? 'block' : '';

        UI.Elements['dark-overlay'].style.display = display;
        UI.Elements['clear-storage-section'].style.display = display;
    }

    function perform(callback: () => void){
        callback();
        location.reload();
    }

    export function initialize(){
        UI.Elements['clear-storage-open'].addEventListener('click', () => setVisible(true));
        UI.Elements['clear-storage-close'].addEventListener('click', () => setVisible(false));

        UI.Elements['clear-storage-button'].addEventListener('click', () => perform(() => clear()));
        UI.Elements['clear-storage-progress-button'].addEventListener('click', () => perform(() => resetItem('progress')));
        UI.Elements['clear-storage-structure-progress-button'].addEventListener('click', () => perform(() => clearStructureProgress()));
    }
}
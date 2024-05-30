/// <reference path="types.ts" />
/// <reference path="spectrums.ts" />

namespace StructVisorAPI.Theme{
    export const dynamicColor = Symbol();

    let isLightTheme = true;

    function setLightThemeValue(value: boolean){
        isLightTheme = value;
        
        for (const type of Object.keys(Spectrums[0]) as SpectrumItemType[]){
            document.documentElement.style.setProperty(type, getColor(type));
        }
        
        Storage.setItem('is-light-theme', isLightTheme);
        Visualizer.Graphics.render();
    }

    export function getColor(type: SpectrumItemType): string{
        return Spectrums[Number(isLightTheme) as 0 | 1][type];
    }
    
    export function initialize(){
        setLightThemeValue(Storage.getItem('is-light-theme'));
        UI.Elements['theme-toggle'].addEventListener('click', () => setLightThemeValue(!isLightTheme));
    }
}
namespace StructVisorAPI.Theme{
    export type SpectrumType = {
        '--first-main-color': string;
        '--second-main-color': string;
        '--third-main-color': string;
        '--fourth-main-color': string;
        '--fifth-main-color': string;
        '--canvas-color': string;
    };

    export type SpectrumItemType = keyof SpectrumType;
}
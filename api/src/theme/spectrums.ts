namespace StructVisorAPI.Theme{
    export const Spectrums = [
        {
            '--first-main-color': '#1a365d',
            '--second-main-color': '#ffffff',
            '--third-main-color': '#3c3c3c',
            '--fourth-main-color': '#ffffff',
            '--fifth-main-color': '#59728d',
            '--canvas-color': '#000000',
        },
        {
            '--first-main-color': '#0664e3',
            '--second-main-color': '#ffffff',
            '--third-main-color': '#f0f0f0',
            '--fourth-main-color': '#000000',
            '--fifth-main-color': '#8eb7e3',
            '--canvas-color': '#ffffff',
        }
    ] as const satisfies Readonly<[SpectrumType, SpectrumType]>;
}
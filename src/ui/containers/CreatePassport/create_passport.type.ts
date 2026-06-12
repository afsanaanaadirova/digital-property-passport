export type HandleChangeFieldType = (
    v: string | number,
    name: string,
    stepperKey: string
) => Promise<void>;

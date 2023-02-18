export interface ElectronApi{
    a: number,
    b: number
}

// @ts-ignore
export const electronApi: ElectronApi = (window as { electronApi: ElectronApi }).electronApi;

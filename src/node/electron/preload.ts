import { contextBridge, ipcRenderer } from "electron"
import type {ElectronApi} from "../../electron-bridge.d";

// contextBridge.exposeInMainWorld('bridge',
//     {a: (callback: any) => ipcRenderer.on('a', callback)}
// )

const electronApi: ElectronApi = {
    a: 3,
    b: 4
}

contextBridge.exposeInMainWorld('electronApi', electronApi)

//contextBridge.exposeInMainWorld('electronApi', {b: 2})

export {}

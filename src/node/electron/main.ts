import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        center: true,
        title: "Selfcloud",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    win.webContents.openDevTools();
    win.loadURL('http://localhost:8300/#/test');
    //win.loadFile("dist/index.html");
    return win;
}

class A{
    a: number;
    b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }
}

app.whenReady().then(() => {
    const win = createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

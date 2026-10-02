import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("devdoctor", {
  runChecks: () => ipcRenderer.invoke("checks:run")
});

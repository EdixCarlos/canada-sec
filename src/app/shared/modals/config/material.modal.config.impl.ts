import { MatDialogConfig } from "@angular/material/dialog";
import { ModalConfiguration } from "./modal.config";

export class MaterialModalConfig implements ModalConfiguration {
    private dialogConfig: MatDialogConfig;
    
    constructor(){
        this.dialogConfig = new MatDialogConfig();
        this.commonConfig();
    }

    commonConfig(): void {        
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
    }

    buildModalConfig(size: string, data?: any): MatDialogConfig  {
        this.dialogConfig.width = size;
        this.dialogConfig.data = data;
        return this.dialogConfig;
    }
}
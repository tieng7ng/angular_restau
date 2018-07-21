import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  constructor() { }

  public loadJSON(filePath) {
    const json = this.loadTextFileAjaxSync(filePath, "application/json");
    return JSON.parse(json);
  }
  
  private loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      return xmlhttp.responseText;
    }
    else {
      return null;
    }
  }
  
  
}

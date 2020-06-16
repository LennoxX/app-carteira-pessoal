import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiPath = 'https://lightning-extreme-serpent.glitch.me/';



  getApiPath(): string {
    return this.apiPath;
  }

}



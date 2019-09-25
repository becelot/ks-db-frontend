import { Injectable } from '@angular/core';
import API, {APIClass} from '@aws-amplify/api';
import Amplify from '@aws-amplify/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: APIClass;

  constructor() {
    this.api = API;
  }

  public get API(): APIClass {
    return this.api;
  }
}

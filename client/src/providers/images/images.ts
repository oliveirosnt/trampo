import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ImagesProvider {

  constructor(public http: HttpClient) {  }



}

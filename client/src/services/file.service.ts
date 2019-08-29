import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import {File, FileEntry} from "@ionic-native/file/ngx";
import { v4 as uuid } from "uuid";
import {ImageModel} from "../models/image.model";

@Injectable()
export class FileService {

  constructor(public http: HttpClient, public file: File){
  }

  uploadImages(formData) {
    return this.http.post(`${API_CONFIG.baseUrl}/api/image/upload`, formData,{
      observe: 'response',
      responseType: 'json'
    });
  }


  startUpload(image: ImageModel) {
    const imagesEntry = image.currentFiles;

    let promises = [];
    const formData = new FormData();

    imagesEntry.map((imgEntry) => {
      const def = new Promise((resolve, reject) => {
        this.file.resolveLocalFilesystemUrl(imgEntry)
          .then(entry => {
            ( < FileEntry > entry).file(file => {
              this.readFile(file, formData,() => {
                resolve('Arquivo lido!');
              })
            })
          })
          .catch(err => {
            reject("Erro ao ler o arquivo");
          });
      });

      promises.push(def);
    });

    Promise.all(promises).then(() => {
      formData.append("filenames", JSON.stringify(image.identifications));
      this.uploadImages(formData).subscribe((response) => {
        console.log(response.body['message']);
      }, err => {
        console.log(err.error.message);
      })
    }, (err) => {
      console.log("Erro ao salvar arquivos " + err);
    })
  }

  generateIdentifications(image: ImageModel) {
    const num = image.currentFiles.length;
    let ids: any = [];

    for(let i = 0; i < num; i ++) {
      const identification = uuid();
      ids.push(identification);
    }

    image.identifications = ids;
    return ids;
  }

  readFile(file: any, formData: FormData, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);

      callback();
    };
    reader.readAsArrayBuffer(file);
  }


}

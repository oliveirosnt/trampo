import {Component, Input, ViewChild} from '@angular/core';
import {
  ActionSheetController, Content, FabButton,
  IonicPage,
  ItemSliding,
  ModalController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {ImagesProvider} from "../../providers/images/images";
import {Camera} from "@ionic-native/camera/ngx";
import {File} from "@ionic-native/file/ngx";
import {WebView} from "@ionic-native/ionic-webview/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {ImageModel} from "../../models/image.model";

/**
 * Generated class for the ImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

  @Input('image') image: ImageModel;

  data: any;
  events: any;

  @ViewChild(Content)
  content: Content;
  @ViewChild(FabButton)
  fabButton: FabButton;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private imagesProvider: ImagesProvider,
              private camera: Camera,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private file: File,
              private webview: WebView,
              private filePath: FilePath,
              private plt: Platform) {
    if(this.navParams.get('image')) {
      this.image = this.navParams.get('image');
    }
  }

  ionBackPage() {
    this.returnBack();
  }

  returnBack() {
    this.navCtrl.getPrevious()['image'] = this.image;
    this.navCtrl.pop();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a opção desejada',
      buttons: [
        {
          text: 'Carregar foto da galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      const myPhoto = this.webview.convertFileSrc(imagePath);
      let modal = this.modalCtrl.create('UploadModalPage', {data: myPhoto, save: true});
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.confirm) {
          this.image.hasPhoto = true;
          this.image.preview = myPhoto;
          if(this.image.currentFiles === null) {
            this.image.currentFiles = [];
          }
          this.image.currentFiles.push(imagePath);

        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });

  }

  getImagePreview(imagePath) {
    return this.webview.convertFileSrc(imagePath);
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }

  delete = (index: any): void => {
    //let index = this.image.currentFiles.indexOf(item);
    if (index > -1) {
      this.image.currentFiles.splice(index, 1);
      if(this.image.currentFiles.length === 0) {
        this.image.hasPhoto = false;
      }
    }
  }

  ngAfterViewInit() {
    if(this.image.style === 'list-servico') {
      this.content.ionScroll.subscribe((d) => {
        this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
      });
    }
  }

  openImage(file, e?) {
    if (e) {
      e.stopPropagation();
    }
    const myPhoto = this.getImagePreview(file);
    let modal = this.modalCtrl.create('UploadModalPage', {data: myPhoto, save: false});
    modal.present();
  }
}

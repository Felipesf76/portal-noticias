import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html'
})
export class PruebaComponent {
  file: File | null = null;
  previewUrl: any = null;
  isImage: boolean | null = false;
  isVideo: boolean | null = false;

  constructor(private http: HttpClient) { }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.previewUrl = null;
    this.isImage = false;
    this.isVideo = false;

    if (this.file != null) {
      const reader = new FileReader();
      const formData = new FormData();

      formData.append('archivo', this.file, this.file.name);

      console.log(formData);

      // this.http.post<Observable<any>>('http://147.93.114.243/api/upload', formData).subscribe(
      //   (response) => {
      //     console.log('Archivo subido correctamente:', response);
      //   },
      //   (error) => {
      //     console.error('Error al subir el archivo:', error);
      //   }
      // );

      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        // this.isImage = this.file.type.startsWith('image/');
        // this.isVideo = this.file.type.startsWith('video/');
      };

      reader.readAsDataURL(this.file);
    }
  }
}

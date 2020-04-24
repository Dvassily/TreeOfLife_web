import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  arbre;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  selectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.arbre = file;
      console.log('if select file' + this.arbre);
    }
  }

  async onSubmit() {


    let file = document.querySelector('#myfile')['files'][0];

    this.http.post('http://localhost:8888/user/bin', {
      name: file.name,
      content: await this.toBase64(file),
    }, {
      params: {
        accessToken: localStorage.getItem('token')
      }
    }).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}

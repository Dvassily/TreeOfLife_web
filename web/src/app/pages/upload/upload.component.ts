import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { BinariesService } from '../../services/binaries.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadForm : FormGroup;

  constructor(private http: HttpClient,
	      private formBuilder : FormBuilder,
              private authService: AuthenticationService,
	      private binariesService : BinariesService) {
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      binary : [ '' ]
    });
  }

  // toBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

  selectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('binary').setValue(file);
    }
  }

  onFileSubmit() {
    console.log("submit");
    const formData = new FormData();
    formData.append('binary', this.uploadForm.get('binary').value);
    formData.append('accessToken', localStorage.getItem('token'));
    this.binariesService.insert(formData).subscribe((res) =>  {
      location.reload();
      console.log(res)
    }, (err) => {
      console.log(err);
    });
  }
}

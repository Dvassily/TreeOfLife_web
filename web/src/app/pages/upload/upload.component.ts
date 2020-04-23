import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  arbre;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  selectFile(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.arbre = file;
      console.log("if select file"+this.arbre);
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file',this.arbre);
    console.log("File: "+formData);
    this.http.post<any>('http://localhost:8888/file',formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}

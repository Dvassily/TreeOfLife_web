import { Component, OnInit } from '@angular/core';
import {BinariesService} from '../../services/binaries.service';
import {AuthenticationService} from '../../services/authentication.service';
import * as moment from 'moment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-mytree',
  templateUrl: './mytree.component.html',
  styleUrls: ['./mytree.component.scss']
})
export class MytreeComponent implements OnInit {

  binaries: any = [];
  userBinaries = null;
  user: any = null;
  uploadForm: FormGroup;


  private userBinariesSub: Subscription = null;


  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private binariesService: BinariesService) {


  }

  async ngOnInit() {

  this.uploadForm = this.formBuilder.group({
    binary : [ '' ]
  });

    this.authService.user.pipe().subscribe(user => {
      this.user = user;
    });

    this.binariesService.findAll().subscribe(binaries => {
      this.binaries = binaries;
    });

    this.userBinariesSub = this.binariesService.findUserBinaries().subscribe(res => {
      this.userBinaries = res;
    });
  }

  selectFile(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('binary').setValue(file);
      this.onFileSubmit();
    }
  }

  onFileSubmit() {
    const formData = new FormData();

    console.log('uploaded file')


    if (this.uploadForm.get('binary').value) {

      formData.append('binary', this.uploadForm.get('binary').value);
      formData.append('accessToken', localStorage.getItem('token'));

      this.binariesService.insert(formData).subscribe((res) =>  {
        this.userBinariesSub.unsubscribe();
        this.userBinariesSub = this.binariesService.findUserBinaries().subscribe(res => {
          this.userBinaries = res;
        });
      }, (err) => {
        console.log(err);
      });
    }


  }


  onDeleteTree(path) {
    this.binariesService.delete(path).subscribe((res) =>  {
      this.userBinariesSub.unsubscribe();
      this.userBinariesSub = this.binariesService.findUserBinaries().subscribe(binRes => {
        this.userBinaries = binRes;
      });
    }, (err) => {
      console.log(err);
    });
  }

  download(file): string {
    return this.binariesService.binaryUrl(file);
  }

  toDate(isoDateString): string {
    const date = moment.utc(isoDateString).local();
    return date.format('DD/MM/YYYY HH:mm:ss');
  }
}

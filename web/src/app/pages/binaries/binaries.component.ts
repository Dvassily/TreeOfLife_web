import {Component, OnInit} from '@angular/core';
import {BinariesService} from '../../services/binaries.service';
import {AuthenticationService} from '../../services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-binaries',
  templateUrl: './binaries.component.html',
  styleUrls: ['./binaries.component.css']
})
export class BinariesComponent implements OnInit {
  binaries: any = [];
  userBinaries = null;
  user: any = null;

  constructor(private binariesService: BinariesService,
              private authService: AuthenticationService,
  ) {


  }

  async ngOnInit() {

    this.authService.user.pipe().subscribe(user => {
      this.user = user;
    });

    this.binariesService.findAll().subscribe(binaries => {
      this.binaries = binaries;
    });

    this.binariesService.findUserBinaries().subscribe(res => {
      this.userBinaries = res;
    });
  }

  download(file): string {
    return this.binariesService.binaryUrl(file);
  }

  toDate(isoDateString) : string {
    let date = moment.utc(isoDateString).local();
    return date.format('DD/MM/YYYY HH:mm:ss');
  }
}

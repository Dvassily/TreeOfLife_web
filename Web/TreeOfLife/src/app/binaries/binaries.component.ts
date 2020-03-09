import { Component, OnInit } from '@angular/core';
import { BinariesService } from '../binaries.service';

@Component({
  selector: 'app-binaries',
  templateUrl: './binaries.component.html',
  styleUrls: ['./binaries.component.css']
})
export class BinariesComponent implements OnInit {
  binaries : any = [];
  
  constructor(private binariesService : BinariesService) { }

  ngOnInit(): void {
    this.binariesService.findAll().subscribe(binaries => {
      this.binaries = binaries;
    });
  }
  
  download(file): string {
    return this.binariesService.binaryUrl(file);
  }
}

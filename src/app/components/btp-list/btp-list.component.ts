import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BtpItaliaService } from '../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../services/btp-italia/BtpItalia';
import { ExportFOIService } from '../../services/foi/export-foi.service';
import { FoiService } from '../../services/foi/foi.service';

@Component({
  selector: 'app-btp-list',
  templateUrl: './btp-list.component.html',
  styleUrls: ['./btp-list.component.scss']
})
export class BtpListComponent implements OnInit {
  btpItaliaList: BtpItalia[] = [];

  constructor(
    private btpItaliaService: BtpItaliaService,
  ) {}

  ngOnInit(): void {
    this.btpItaliaService.list()
      .subscribe(btpItaliaList => {
        this.btpItaliaList = btpItaliaList;
      });
  }
}

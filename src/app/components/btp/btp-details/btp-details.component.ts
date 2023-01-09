import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtpItalia } from '../../../services/btp-italia/BtpItalia';

@Component({
  selector: 'app-btp-details',
  templateUrl: './btp-details.component.html',
  styleUrls: ['./btp-details.component.scss']
})
export class BtpDetailsComponent implements OnInit {
  @Input()
  btp?: BtpItalia;

  @Input()
  month?: number;

  @Input()
  year?: number;

  permalinkPath = '';

  @Input()
  baseDate?: Date;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.permalinkPath = '/' + (this.activatedRoute.routeConfig?.path ?? '');
  }

  ngOnInit(): void {
  }
}

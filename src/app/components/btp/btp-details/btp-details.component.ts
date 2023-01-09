import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.permalinkPath = location.pathname;
  }
}

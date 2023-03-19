import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  url: string;
}

const MENU_LIST: MenuItem[] = [
  { label: 'Lista Foi', url: '/foi/list' },
  // { label: 'Lista CI per BTP', url: '/ci/list' },
  { label: 'BTP Quotati', url: '/btp/list' },
];

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  menuList = MENU_LIST;
}

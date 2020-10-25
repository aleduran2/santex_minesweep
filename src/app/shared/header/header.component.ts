import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/constants/global.constants';
import { LinkType } from 'src/app/common/types/types';

@Component({
  selector: 'st-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string;
  links: LinkType[];
  constructor() { }

  ngOnInit(): void {
    this.title = GlobalConstants.BRAND;
    this.links = [
      {
        title:  GlobalConstants.SETUP,
        url: '/setup'
      }, {
        title:  GlobalConstants.DASHBOARD,
        url: '/dashboard'
      }, {
        title:  GlobalConstants.FINISHED,
        url: '/finished'
      }
    ];
  }

}

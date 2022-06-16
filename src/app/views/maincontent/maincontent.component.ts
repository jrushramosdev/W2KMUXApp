import { Component, OnInit } from '@angular/core';

interface SideNavToggle {
  screeWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.scss']
})
export class MainContentComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screeWidth;
    this.isSideNavCollapsed = data.collapsed;
    console.log(this.screenWidth)
    console.log(this.isSideNavCollapsed)
  }
}

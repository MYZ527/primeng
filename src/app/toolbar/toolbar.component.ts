import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

const panelMenu: any[] = [
  //無下拉選單
  {
    label: '表單',
    icon: 'pi pi-fw pi-file-edit',
    routerLink: ['/form'],
  },
  {
    label: '表格',
    icon: 'pi pi-fw pi-table',
    routerLink: ['/table'],
  },
  {
    label: '問卷',
    icon: 'pi pi-fw pi-file-edit',
    routerLink: ['/survey'],
  },
  {
    label: 'crud',
    icon: 'pi pi-fw pi-search',
    routerLink: ['/crud'],
  },
  {
    label: '設備請購單',
    icon: 'pi pi-shopping-cart',
    routerLink: ['/puchase'],
  },
  //有下拉選單(範例)
  {
    label: '社群',
    icon: 'pi pi-fw pi-comments',
    items: [
      {
        label: 'Facebook',
        icon: 'pi pi-fw pi-facebook',
        items: [
          {
            label: 'Bookmark',
            icon: 'pi pi-fw pi-bookmark'
          },
          {
            label: 'Video',
            icon: 'pi pi-fw pi-video'
          }
        ]
      },
      {
        label: 'Twitter',
        icon: 'pi pi-fw pi-twitter'
      },
      {
        label: 'Instagram',
        icon: 'pi pi-fw pi-instagram'
      }
    ]
  },
];

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {
  panelMenu: MenuItem[] = [];
  showSidebar = false;
  ngOnInit(): void {
    this.panelMenu = panelMenu;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/auth';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { NavigationItem } from '../model/navigation-item';
import { Section } from '../model/section';
import { SubMenuItem } from '../model/submenu-item';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  currentUser$: Observable<SpsUser>;
  currentUser: SpsUser;

  constructor(
    private _authenticationService: AuthenticationService
  ) {
    this.setMenu(emptyMenuConfig);
    this.currentUser$ = this._authenticationService.user;
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.listenToCurrentUser();
  }

  private listenToCurrentUser() {
    this._authenticationService.currentUserValueObs.pipe(filter(x => x.policies != [])).subscribe(
      (currentUser) => {
        this.currentUser = currentUser;
        if (this.currentUser.policies) {
          this._authenticationService.setUserPolicies(this.currentUser.policies);
          this.loadMenu();
        }
      }
    );
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {

    let items: any[] = [];

    const section: Section = { section: 'CANADA SEC' };
    items.push(section);

    console.log('Loading menu')

    let item;

    // if (this.currentUser.policies
    // ) {
    //   item = new NavigationItem();
    //   item.title = 'MyTickets';
    //   item.page = '/my-tickets';
    //   item.translate = 'MENU.TICKETS';
    //   items.push(item);
    // }
    if (this.currentUser.policies.includes('GENERAL') ||
      this.currentUser.policies.includes('IS&C_Staff') ||
      this.currentUser.policies.includes('IS&C_Staff_Ejecutor')||
      this.currentUser.policies.includes('MANTENEDOR')||
      this.currentUser.policies.includes('ADMIN')||
      this.currentUser.policies
    ) {
      item = new NavigationItem();
      item.title = 'MyTickets';
      item.page = '/my-tickets';
      item.translate = 'MENU.TICKETS';
      items.push(item);
    }

    if (
      this.currentUser.policies.includes('IS&C_Staff') ||
      this.currentUser.policies.includes('IS&C_Staff_Ejecutor')
    ) {
      item = new NavigationItem();
      item.title = 'Dashboard';
      item.page = '/dashboard';
      item.translate = 'MENU.DASHBOARD';

      let submenu: SubMenuItem[] = [];
      let submenuItem = new SubMenuItem();
      submenuItem.title = 'Vulnerability Management';
      submenuItem.page = '/dashboard/service/1';
      submenuItem.translate = 'MENU.DASHBOARD.VM';
      submenu.push(submenuItem);

      submenuItem = new SubMenuItem();
      submenuItem.title = 'Advisory';
      submenuItem.page = '/dashboard/service/2';
      submenuItem.translate = 'MENU.DASHBOARD.AD';
      submenu.push(submenuItem);

      submenuItem = new SubMenuItem();
      submenuItem.title = 'Proyectos';
      submenuItem.page = '/dashboard/service/3';
      submenuItem.translate = 'MENU.DASHBOARD.PR';
      submenu.push(submenuItem);

      submenuItem = new SubMenuItem();
      submenuItem.title = 'Audits';
      submenuItem.page = '/dashboard/service/4';
      submenuItem.translate = 'MENU.DASHBOARD.AU';
      submenu.push(submenuItem);

      item.submenu = submenu;
      items.push(item);
    }

    // if (this.currentUser.policies.includes('GENERAL') ||
    //   this.currentUser.policies.includes('IS&C_Staff') ||
    //   this.currentUser.policies.includes('IS&C_Staff_Ejecutor')
    // ) {
    //   item = new NavigationItem();
    //   item.title = 'MyTickets';
    //   item.page = '/my-tickets';
    //   item.translate = 'MENU.TICKETS';
    //   items.push(item);
    // }

    if (this.currentUser.policies.includes('IS&C_Staff_Ejecutor')||
    this.currentUser.policies.includes('IS&C_Staff')
    ) {
      item = new NavigationItem();
      item.title = 'Tickets';
      item.page = '/exec-tickets/exec';
      item.translate = 'MENU.TICKETS_EJECUTOR';
      items.push(item);
    }

    if (this.currentUser.policies.includes('ADMIN')
    ) {
      item = new NavigationItem();
      item.title = 'ADMIN';
      item.page = '/empty';
      item.translate = 'MENU.ADMIN';
      items.push(item);
    }

    if (this.currentUser.policies.includes('MANTENEDOR')
    ) {
      item = new NavigationItem();
      item.title = 'Maintainers';
      item.page = '/maintainers';
      item.translate = 'MENU.MAINTAINERS';
      let submenu: SubMenuItem[] = [];
      let submenuItem = new SubMenuItem();
      submenuItem.title = 'General';
      submenuItem.page = '/maintainers/mnt-general';
      submenuItem.translate = 'MENU.MAINTAINERS.GENERAL';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      submenuItem.title = 'Servicios';
      submenuItem.page = '/maintainers/mnt-services';
      submenuItem.translate = 'MENU.MAINTAINERS.SERVICES';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      submenuItem.title = 'SLA';
      submenuItem.page = '/maintainers/mnt-sla';
      submenuItem.translate = 'MENU.MAINTAINERS.SLA';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      submenuItem.title = 'Aplicación';
      submenuItem.page = '/maintainers/mnt-app';
      submenuItem.translate = 'MENU.MAINTAINERS.APP';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      //
      submenuItem.title = 'Requesters';
      submenuItem.page = '/maintainers/mnt-req';
      submenuItem.translate = 'MENU.MAINTAINERS.REQUESTERS';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      //
      submenuItem.title = 'Relación';
      submenuItem.page = '/maintainers/mnt-relations';
      submenuItem.translate = 'MENU.MAINTAINERS.RELATIONS';
      submenu.push(submenuItem);
      submenuItem = new SubMenuItem();
      submenuItem.title = 'Formularios Dinamicos';
      submenuItem.page = '/maintainers/mnt-udf';
      submenuItem.translate = 'MENU.MAINTAINERS.UDF';
      submenu.push(submenuItem);
      item.submenu = submenu;
      items.push(item);
    }

    console.log(items)

    //DynamicAsideMenuConfig
    this.setMenu({ items });
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}

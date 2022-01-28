import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../modules/auth/_services/auth.guard';
import { EmptyComponent } from './empty/empty.component';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      // },
      {
        path: 'empty',
        component: EmptyComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
      //Olympus
      { 
        path: 'maintainers', 
        canActivate: [AuthGuard], 
        loadChildren: () => import('./maintainers/maintainers.module').then(m => m.MaintainersModule) 
      },
      { 
        path: 'my-tickets', 
        canActivate: [AuthGuard], 
        loadChildren: () => import('./my-tickets/my-tickets.module').then(m => m.MyTicketsModule) 
      }
      ,
      { 
        path: 'exec-tickets', 
        canActivate: [AuthGuard], 
        loadChildren: () => import('./my-tickets/my-tickets.module').then(m => m.MyTicketsModule) 
      },
      { 
        path: 'tickets', 
        canActivate: [AuthGuard], 
        loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule) 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintainersComponent } from './maintainers.component';

const routes: Routes = [
  { 
    path: '', 
    component: MaintainersComponent,
    children: [
      { 
        path: 'mnt-general', 
        loadChildren: () => import('./mnt-general/mnt-general.module').then(m => m.MntGeneralModule) 
      },
      { 
        path: 'mnt-udf', 
        loadChildren: () => import('./mnt-udf/mnt-udf.module').then(m => m.MntUdfModule) 
      },
      { 
        path: 'mnt-services', 
        loadChildren: () => import('./mnt-services/mnt-services.module').then(m => m.MntServicesModule) 
      },
      { 
        path: 'mnt-sla', 
        loadChildren: () => import('./mnt-sla/mnt-sla.module').then(m => m.MntSlaModule) 
      },
      { 
        path: 'mnt-app', 
        loadChildren: () => import('./mnt-app/mnt-app.module').then(m => m.MntAppModule) 
      },
      { 
        path: 'mnt-req', 
        loadChildren: () => import('./mnt-requesters/mnt-requesters.module').then(m => m.MntRequestersModule) 
      },
      { 
        path: 'mnt-relations', 
        loadChildren: () => import('./mnt-relations/mnt-relations.module').then(m => m.MntRelationsModule) 
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainersRoutingModule { }

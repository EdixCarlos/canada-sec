import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  { 
    path: '', 
    component: TicketsComponent,
    children: [
      { 
        path: 'vulnerability-management/app-vul-scan', 
        loadChildren: () => import('./vulnerability-management/app-vul-scan/app-vul-scan.module').then(m => m.AvsModule)
      },
      { 
        path: 'vulnerability-management/vul-asm', 
        loadChildren: () => import('./vulnerability-management/vul-ass/vul-ass.module').then(m => m.VulAssModule)
      },
      {
        path: 'vulnerability-management/fal-pos-ana', 
        loadChildren: () => import('./vulnerability-management/fal-pos-ana/fal-pos-ana.module').then(m => m.FalPosAnaModule)
      },
      {
        path: 'vulnerability-management/vul-rem-agi-str', 
        loadChildren: () => import('./vulnerability-management/rem-agi-str/rem-agi-str.module').then(m => m.RemAgiStrModule)
      },
      {
        path: 'vulnerability-management/mon-cyb-ale-clo', 
        loadChildren: () => import('./vulnerability-management/mon-cyb-ale/mon-cyb-ale.module').then(m => m.MonCybAleModule)
      },
      {
        path: 'advisory',
        loadChildren: () => import('./advisory/advisory.module').then(m => m.AdvisoryModule)
      },
      {
        path: 'proyectos',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'audits',
        loadChildren: () => import('./auditory/auditory.module').then(m => m.AuditoryModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }

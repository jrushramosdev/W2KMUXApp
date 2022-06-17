import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './views/maincontent/maincontent.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainContentComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'ppvmatch', loadChildren: () => import('./modules/ppv-match/ppv-match.module').then(m => m.PpvMatchModule) },
      { path: 'roster', loadChildren: () => import('./modules/roster/roster.module').then(m => m.RosterModule) },
      { path: 'superstars', loadChildren: () => import('./modules/superstars/superstars.module').then(m => m.SuperstarsModule) },
      { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule) },
      { path: 'teamhistory', loadChildren: () => import('./modules/team-history/team-history.module').then(m => m.TeamHistoryModule) },
      { path: 'champions', loadChildren: () => import('./modules/champions/champions.module').then(m => m.ChampionsModule) },
      { path: 'settings/showmanagement', loadChildren: () => import('./modules/settings/show-management/show-management.module').then(m => m.ShowManagementModule) },
      { path: 'settings/championshipmanagement', loadChildren: () => import('./modules/settings/championship-management/championship-management.module').then(m => m.ChampionshipManagementModule) },
      { path: 'settings/championshiptypemanagement', loadChildren: () => import('./modules/settings/championshiptype-management/championshiptype-management.module').then(m => m.ChampionshipTypeManagementModule) },
      { path: 'settings/teammanagement', loadChildren: () => import('./modules/settings/team-management/team-management.module').then(m => m.TeamManagementModule) },
      { path: 'settings/ppvmanagement', loadChildren: () => import('./modules/settings/ppv-management/ppv-management.module').then(m => m.PpvManagementModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

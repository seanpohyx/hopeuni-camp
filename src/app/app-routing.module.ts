import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/camper/home/home.component";
import { HomeAdminComponent } from "./pages/admin/home-admin/home-admin.component";

const routes: Routes = [
	{
		path: 'camper',
		component: HomeComponent
	}, 
	{
		path: 'admin',
		component: HomeAdminComponent
	}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

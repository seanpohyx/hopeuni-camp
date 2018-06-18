import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/camper/home/home.component";
import { HomeAdminComponent } from "./pages/admin/home-admin/home-admin.component";
import { LoginAdminComponent } from "./pages/admin/login-admin/login-admin.component";
import { RedirectAdminComponent } from "./pages/admin/redirect-admin/redirect-admin.component";

const routes: Routes = [
	{
		path: 'camper',
		component: HomeComponent
	}, 
	{
		path: 'admin',
		component: HomeAdminComponent
	}, 
	{
		path: 'admin/login',
		component: LoginAdminComponent
	},
	{
		path: 'admin/redirect',
		component: RedirectAdminComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

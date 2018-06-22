import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/camper/home/home.component";
import { HomeAdminComponent } from "./pages/admin/home-admin/home-admin.component";
import { LoginAdminComponent } from "./pages/admin/login-admin/login-admin.component";
import { RedirectAdminComponent } from "./pages/admin/redirect-admin/redirect-admin.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
	{
		path: '',
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
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DesktopComponent } from './desktop/desktop.component';
import { AppComponent } from './app.component';


const routes: Routes = [
	{ path: 'desktop-component', component: DesktopComponent },
	//{ path: '',   redirectTo: '/desktop-component', pathMatch: 'full' },
	{ path: 'app-component', component: AppComponent }
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

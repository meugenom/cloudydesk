import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DesktopComponent } from './desktop/desktop.component';
import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';


const routes: Routes = [
	{ path: 'desktop-component', component: DesktopComponent },
	//{ path: '',   redirectTo: '/desktop-component', pathMatch: 'full' },
	{ path: 'mobile-component', component: MobileComponent },
	{ path: 'app-component', component: AppComponent }
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

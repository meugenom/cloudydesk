import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WidgetPanel } from '../desktop/store/models/widgetPanel.model';
import { AuthStateInterface } from '../auth/store/models/auth.state.model'
import { OpenPanel } from '../desktop/store/actions/widgetPanel.action';

@Component({
	selector: 'app-widget-panel',
	styleUrls: ['./widget-panel.component.sass'],
	templateUrl: './widget-panel.component.html'

})
export class WidgetPanelComponent implements OnInit {

	isActive: boolean;
	isLoginForm: boolean;
	isRegisterForm: boolean;
	isSubmitting: boolean;

	constructor(
		private store: Store<{ widgetPanel: WidgetPanel, auth: AuthStateInterface }>
	) {
		this.isActive = false;
		this.isSubmitting = false;
		this.isLoginForm = true;
		this.isRegisterForm = false

		store.select('widgetPanel').subscribe(data => {
			//console.log(data);
			this.isActive = data.isActive;
			this.isLoginForm = data.isLoginForm;
			this.isRegisterForm = data.isRegisterForm
		})

		store.select('auth').subscribe(data => {
			console.log(data);
			this.isSubmitting = data.isSubmitting;
			if(this.isSubmitting){
				this.isLoginForm = false;
			}
		})
	}

	openRegisterForm(){
		
		this.isLoginForm = false;
		this.isRegisterForm = true;

		const widgetpanel: WidgetPanel = {
			isActive: this.isActive,
			isLoginForm: this.isLoginForm,
			isRegisterForm: this.isRegisterForm
		}

		this.store.dispatch(
			OpenPanel(
				widgetpanel))
	}

	openLoginForm(){
		
		this.isLoginForm = true;
		this.isRegisterForm = false;

		const widgetpanel: WidgetPanel = {
			isActive: this.isActive,
			isLoginForm: this.isLoginForm,
			isRegisterForm: this.isRegisterForm
		}

		this.store.dispatch(
			OpenPanel(
				widgetpanel))
	}

	ngOnInit(): void {

	}

}

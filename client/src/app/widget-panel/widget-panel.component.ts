import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WidgetPanel } from '../desktop/store/models/widgetpanel.model';
import { AuthStateInterface } from '../auth/store/models/auth.state.model'
import { OpenPanel } from '../desktop/store/actions/widgetpanel.action';
import {
	WIDGET_PANEL_OPEN_LOGIN_FORM,
	WIDGET_PANEL_OPEN_REGISTER_FORM,	
} from '../desktop/store/models/widgetpanel.constants'
import { User } from '../user/models/user';


@Component({
	selector: 'app-widget-panel',
	templateUrl: './widget-panel.component.html',
	styleUrls: ['./widget-panel.component.sass'],
})
export class WidgetPanelComponent implements OnInit {

	isActive: boolean;
	isLoginForm: boolean;
	isRegisterForm: boolean;
	isSubmitting: boolean;

	user: any;

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
			this.isRegisterForm = data.isRegisterForm;
		})

		store.select('auth').subscribe(data => {
			//console.log(data);
			this.isSubmitting = data.isSubmitting;

			if (this.isSubmitting) {
				this.isLoginForm = false;

				//add user info to widget panel
				this.user = data.user;
			}
		})
	}

	openRegisterForm() {

		this.isLoginForm = false;
		this.isRegisterForm = true;

		const widgetpanel: WidgetPanel = {
			isActive: this.isActive,
			isLoginForm: this.isLoginForm,
			isRegisterForm: this.isRegisterForm,
			lastAction: WIDGET_PANEL_OPEN_REGISTER_FORM,
			lastActionDate: new Date()
		}

		this.store.dispatch(
			OpenPanel(
				widgetpanel))
	}

	openLoginForm() {

		this.isLoginForm = true;
		this.isRegisterForm = false;

		const widgetpanel: WidgetPanel = {
			isActive: this.isActive,
			isLoginForm: this.isLoginForm,
			isRegisterForm: this.isRegisterForm,
			lastAction: WIDGET_PANEL_OPEN_LOGIN_FORM,
			lastActionDate: new Date()
		}

		this.store.dispatch(
			OpenPanel(
				widgetpanel))
	}

	ngOnInit(): void {

	}
}

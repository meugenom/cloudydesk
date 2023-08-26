import {
	Injectable,
	ViewContainerRef,
	ComponentFactoryResolver
} from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';

@Injectable()
export class ContextMenuService {

	private rootViewContainer: ViewContainerRef | undefined;


	//opened instances
	public contexts: any[] = [];

	constructor(private factoryResolver: ComponentFactoryResolver) {
		this.factoryResolver = factoryResolver;
	}

	setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.rootViewContainer = viewContainerRef;
	}
	addDynamicComponent(id: string, name: string) {

		// open popover specified by id
		const isContext = this.contexts.find(x => x === id);


		if (isContext != undefined) {
			//instance exists
			console.log('Instance <' + isContext + '> exists')
		} else {

			// /console.log('start new context menu in the service')
			//console.log(this.contexts)

			if (this.rootViewContainer != undefined) {

				const factory = this.factoryResolver.resolveComponentFactory(ContextMenuComponent);
				const component = factory.create(this.rootViewContainer.parentInjector);
				component.instance.id = id;
				component.instance.name = name;

				// Subscribe to the closeContextMenu event and destroy the component
				component.instance.closeContext.subscribe(() => this.removeDynamicComponent(component, id));  
				this.rootViewContainer.insert(component.hostView);


			}

			this.add(id);

		}
	}

	removeDynamicComponent(component: any, id: string) {

		//console.log('remove context menu in the service')
		//console.log(component);

		component.destroy();

		// remove modal from array of active modals
		this.contexts = this.contexts.filter(x => x != id);
	}


	add(context: any) {
		// add context to the array of contexts
		this.contexts.push(context);
		//console.log(this.contexts)
	}

	getContext() {
		return this.contexts;
	}
	
	/**
	 * hard code
	 * Remove all context menus, used when the user clicks outside the context menu
	 * @param context
	 */
	removeAllFromContext() {
		// remove context from the array of contexts
		this.contexts = [];
	}

}

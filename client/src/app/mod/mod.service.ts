import {
	Injectable,
	ViewContainerRef,
	ComponentFactoryResolver
} from '@angular/core';
import { ModComponent } from './mod.component';

@Injectable()
export class ModService {

	private rootViewContainer: ViewContainerRef | undefined;

	//opened instances
	public modals: any[] = [];

	constructor(private factoryResolver: ComponentFactoryResolver) {
		this.factoryResolver = factoryResolver;
	}

	setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.rootViewContainer = viewContainerRef;
	}
	addDynamicComponent(id: string, name: string) {

		// open modal specified by id
		const isMod = this.modals.find(x => x.id === id);
		if (isMod != undefined) {

			//instance exists or minimized
			//console.log('Instance <' + isMod.id.toUpperCase() + '> exists or window minimized')

			this.active(id);


		} else {

			//console.log('start new window in the service mod')
			//console.log(this.modals)

			if (this.rootViewContainer != undefined) {

				const factory = this.factoryResolver.resolveComponentFactory(ModComponent);
				const component = factory.create(this.rootViewContainer.parentInjector);
				component.instance.id = id;
				component.instance.name = name;

				// Subscribe to the closeModal event and destroy the component
				component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component, id));
				this.rootViewContainer.insert(component.hostView);

			}

		}
	}

	removeDynamicComponent(component: any, id: string) {
		component.destroy();

		// remove modal from array of active modals
		this.modals = this.modals.filter(x => x.id != id);
	}


	add(modal: any) {
		// add modal to array of active modals
		this.modals.push(modal);
	}

	active(id: string) {
		// open modal specified by id
		const modal = this.modals.find(x => x.id === id);
		//set active in the mod component
		modal.active();
	}

	minimize(id: string) {
		//minimize modal window
		const modal = this.modals.find(x => x.id === id);
		//mod component
		modal.minimize();
	}

	maximize(id: string) {
		//maximize modal window
		const modal = this.modals.find(x => x.id === id);
		//see mod component
		modal.maximize();
	}

}

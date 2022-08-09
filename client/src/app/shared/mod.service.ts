import {
	Injectable,
	ViewContainerRef,
	ComponentFactoryResolver
} from '@angular/core';
import { ModComponent } from '../mod/mod.component';

@Injectable()
export class ModService {

	private rootViewContainer: ViewContainerRef | undefined;


	constructor(private factoryResolver: ComponentFactoryResolver) { 
		this.factoryResolver = factoryResolver;
	}

	setRootViewContainerRef(viewContainerRef : ViewContainerRef) {
		this.rootViewContainer = viewContainerRef;
	}
	addDynamicComponent(modTitle: any, modText: any) {
		if(this.rootViewContainer != undefined){
			const factory = this.factoryResolver.resolveComponentFactory(ModComponent);
			const component = factory.create(this.rootViewContainer.parentInjector);
			component.instance.modTitle = modTitle;
			component.instance.modText = modText;
			
			// Subscribe to the closeModal event and destroy the component
			component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));
			this.rootViewContainer.insert(component.hostView);
		}
	}

	removeDynamicComponent(component : any) {
		component.destroy();
	}
}

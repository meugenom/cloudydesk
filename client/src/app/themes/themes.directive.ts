import { Directive,
    ElementRef,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
import { SpaceComponent } from './components/space/space.component';
import { AmongComponent } from './components/among/among.component';
import { MoonComponent } from './components/moon/moon.component'
import { OceanComponent } from './components/ocean/ocean.component';
import {Store} from "@ngrx/store";
import {EnvironmentState} from "../desktop/store/models/environment.state.model";


@Directive({
    selector: 'div[Themes]'
})
export class ThemesDirective {

    desktop: Element | any;


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private el: ElementRef,
        private store: Store<{ environment: EnvironmentState}>
    ) {

        //desktop by default
        const desktop = this.el.nativeElement;

        desktop.style.backgroundImage = 'url("../../../../assets/img/background-gary-scott-space-unsplash.jpg")';
        desktop.style.backgroundSize = 'contain';
        

        // Create a component factory for the SpaceComponent
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpaceComponent);

        // Create an instance of the SpaceComponent
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        // Append the component's root element to the desktop element
        desktop.appendChild(componentRef.location.nativeElement);


        //subscribe to theme change from redux store environment
        this.store.select('environment').subscribe((data:any) => {
            //console.log(data.theme);
            this.onThemeChange(data.theme);
        })

        }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    onThemeChange(theme: string) {

        console.log('Selected theme changed:', theme);
        const desktop = this.el.nativeElement;

        // Clear the view container
        this.viewContainerRef.clear();

        // set circles theme
        if(theme === "among"){

            desktop.style.backgroundImage = '';
            desktop.style.backgroundSize = '';
            desktop.style.background = 'black';

            // Create a component factory for the CirclesComponent
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmongComponent);

            // Create an instance of the CirclesComponent
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            // Append the component's root element to the desktop element
            desktop.appendChild(componentRef.location.nativeElement);

        } else if(theme === "space"){

            desktop.style.background = '';
            desktop.style.backgroundImage = 'url("../../../../assets/img/background-gary-scott-space-unsplash.jpg")';
            desktop.style.backgroundSize = 'contain';
            

            // Create a component factory for the CirclesComponent
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpaceComponent);

            // Create an instance of the CirclesComponent
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            // Append the component's root element to the desktop element
            desktop.appendChild(componentRef.location.nativeElement);


        } else if(theme === "moon"){
            desktop.style.backgroundImage = '';
            desktop.style.backgroundSize = '';
            desktop.style.background = '';

            // Create a component factory for the CirclesComponent
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MoonComponent);

            // Create an instance of the CirclesComponent
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            // Append the component's root element to the desktop element
            desktop.appendChild(componentRef.location.nativeElement);

        } else if(theme === "ocean"){

            desktop.style.backgroundImage = '';
            desktop.style.backgroundSize = '';
            desktop.style.background ='radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%)';

            // Create a component factory for the CirclesComponent
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OceanComponent);

            // Create an instance of the CirclesComponent
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            // Append the component's root element to the desktop element
            desktop.appendChild(componentRef.location.nativeElement);

        }



    }
}
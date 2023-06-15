import { Directive,
    ElementRef,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
import { SpaceComponent } from './components/space/space.component';
import { AmongComponent } from './components/among/among.component';
import { MoonComponent } from './components/moon/moon.component';
import { SolarSystemComponent } from './components/solarsystem/solarsystem.component';
import {Store} from "@ngrx/store";
import {EnvironmentState} from "../desktop/store/models/environment.state.model";
import { PersistanceService } from '../services/persistance.service';
import { Globals } from '../global';
import { AddEnvironment } from '../desktop/store/actions/environment.action';


@Directive({
    selector: 'div[Themes]'
})
export class ThemesDirective {

    desktop: Element | any;
    theme: string | any;


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private el: ElementRef,
        private store: Store<{ environment: EnvironmentState}>,
        private persistanceService: PersistanceService,
        private globals: Globals
    ) {

        if(persistanceService.getItem('theme')!= null){
            this.theme = persistanceService.getItem('theme');
            this.onThemeChange(this.theme);
        }else{
            this.theme = globals.currentTheme;
            this.onThemeChange(this.theme);
        }

        //set store for environment
        const environment: { theme: string } = {
            theme : this.theme!=null?this.theme:'space',
        }
  
      // add to the store
      this.store.dispatch( AddEnvironment(environment));


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

    onThemeChange(theme: any) {

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

        } else if(theme === "solarsystem"){

            desktop.style.backgroundImage = '';
            desktop.style.backgroundSize = '';
            desktop.style.background ='';

            // Create a component factory for the CirclesComponent
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SolarSystemComponent);

            // Create an instance of the CirclesComponent
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            // Append the component's root element to the desktop element
            desktop.appendChild(componentRef.location.nativeElement);

        }



    }
}
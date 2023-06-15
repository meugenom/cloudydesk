import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ThemesComponent} from "./themes.component";
import {SpaceComponent} from "./components/space/space.component";
import {AmongComponent} from "./components/among/among.component";
import {MoonComponent} from "./components/moon/moon.component";
import { OceanComponent } from "./components/ocean/ocean.component";
import { SolarSystemComponent } from "./components/solarsystem/solarsystem.component";

@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        

    ],
    declarations: [
        ThemesComponent,
        SpaceComponent,
        AmongComponent,
        MoonComponent,
        OceanComponent,
        SolarSystemComponent,
    ],
    exports: [
        ThemesComponent,
        SpaceComponent,
        AmongComponent,
        MoonComponent,
        OceanComponent,
        SolarSystemComponent, 
    ],
    providers: []

})
export class ThemesModule { }

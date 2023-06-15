import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { PersistanceService } from "../services/persistance.service";
import { Store } from "@ngrx/store";
import { EnvironmentState } from "../desktop/store/models/environment.state.model";
import { AddEnvironment } from "../desktop/store/actions/environment.action";


@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.sass']
})
export class ThemesComponent implements OnInit {

  selectedTheme: string | null = null;

  constructor(
    private globals: Globals,
    private persistanceService: PersistanceService,
    private store: Store<{ environment: EnvironmentState }>
  ) {

    //if theme exist on local storage then set it
    if (this.persistanceService.getItem('theme')) {
      this.selectedTheme = this.persistanceService.getItem('theme');      
    } else {
      this.selectedTheme = this.globals.currentTheme;
      persistanceService.setItem('theme', this.selectedTheme);
    }

    //set store for environment
    const environment: { theme: string } = {
      theme : this.selectedTheme!=null?this.selectedTheme:'space',
    }

    // add to the store
    this.store.dispatch( AddEnvironment(environment));

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  onSelectedThemeChange(theme: string) {
    //console.log('Selected theme changed:', theme);

    this.globals.currentTheme = theme;
    this.persistanceService.setItem('theme', theme);

    //set store for environment
    const environment: { theme: string } = {
      theme: theme,
    }

    this.store.dispatch(
      AddEnvironment(
        environment))

  }
}


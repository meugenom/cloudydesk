import { ActionReducerMap } from "@ngrx/store";
import { NavigatorReducer} from "./navigator.reducer";
import { WidgetPanelReducer } from './widgetPanel.reducer';
import {WidgetPanel} from '../models/widgetPanel.model'
import {Navigator} from '../models/navigator.model'

interface AppState {
  widgetPanel: WidgetPanel;
  navigator: Navigator;
}

export const reducers: ActionReducerMap<AppState> = {
	widgetPanel: WidgetPanelReducer,
  	navigator: NavigatorReducer
};
	
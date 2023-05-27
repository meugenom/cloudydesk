import { ActionReducerMap } from "@ngrx/store";

import { NavigatorReducer} from "./navigator.reducer";
import { WidgetPanelReducer } from './widgetpanel.reducer';

import {WidgetPanel} from '../models/widgetpanel.model'
import {Navigator} from '../models/navigator.model'

import {File} from '../models/file.model'
import { FileState } from "../models/file.state.model";
import {fileReducer} from './file.reducer'

export interface AppState {
  widgetPanel: WidgetPanel;
  navigator: Navigator;
  files: FileState
}

export const reducers: ActionReducerMap<AppState> = {
	widgetPanel: WidgetPanelReducer,
  	navigator: NavigatorReducer,
	files: fileReducer
};
	
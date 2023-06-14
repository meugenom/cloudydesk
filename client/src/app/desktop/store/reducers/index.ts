import { ActionReducerMap } from "@ngrx/store";

import {Navigator} from '../models/navigator.model'
import { NavigatorReducer} from "./navigator.reducer";

import {WidgetPanel} from '../models/widgetpanel.model'
import { WidgetPanelReducer } from './widgetpanel.reducer';

import { FileState } from "../models/file.state.model";
import {fileReducer} from './file.reducer'

import {Context} from '../models/context.model'
import {ContextReducer} from './context.reducer'

import {Environment} from "../models/environment.model";
import {EnvironmentReducer} from './environment.reducer'

export interface AppState {
  widgetPanel: WidgetPanel;
  navigator: Navigator;
  files: FileState,
  context: Context,
environment: Environment
}

export const reducers: ActionReducerMap<AppState> = {
    widgetPanel: WidgetPanelReducer,
  	navigator: NavigatorReducer,
    files: fileReducer,
    context: ContextReducer,
    environment: EnvironmentReducer
};
	
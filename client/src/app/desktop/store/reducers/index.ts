import { ActionReducerMap } from "@ngrx/store";

import { NavigatorReducer} from "./navigator.reducer";
import { WidgetPanelReducer } from './widgetpanel.reducer';

import {WidgetPanel} from '../models/widgetpanel.model'
import {Navigator} from '../models/navigator.model'

import {File} from '../models/file.model'
import { FileState } from "../models/file.state.model";
import {fileReducer} from './file.reducer'

import {Context} from '../models/context.model'
import { ContextState } from "../models/context.state.model";
import {ContextReducer} from './context.reducer'

export interface AppState {
  widgetPanel: WidgetPanel;
  navigator: Navigator;
  files: FileState,
  context: Context
}

export const reducers: ActionReducerMap<AppState> = {
	  widgetPanel: WidgetPanelReducer,
  	navigator: NavigatorReducer,
	  files: fileReducer,
    context: ContextReducer
};
	
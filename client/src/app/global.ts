import { Injectable } from '@angular/core';

/**
 * @description This class is used to store global variables
 * @class Globals
 * @export
 * @Injectable
 * @author meugenom
 * @date 11-06-2023
 */
Injectable()
export class Globals {
	public fullScreen: boolean = false;
	public selection: Object | undefined;
	public currentDesktopFolder: String = 'Desktop';
	public currentTheme: string = 'space';
}
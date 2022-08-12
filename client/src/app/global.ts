import { Injectable } from '@angular/core';

Injectable()
export class Globals{
    public fullScreen: boolean  = false;
	public selection : Object | undefined;
	public files: any = [{
		id: 0,
		name: 'example.txt',
		type: 'txt',
		uid: 2345689989,
		path: '/user/Desktop/example.txt',
		size: 108000,
		created: '08082022',
		modified: '09082022',
		charset: 'utf-8'
	},
	{
		id: 1,
		name: 'Java.pdf',
		type: 'pdf',
		uid: 2345689345,
		path: '/user/Desktop/Java.pdf',
		size: 108034500,
		created: '08082022',
		modified: '09082022',
		charset: 'utf-8'
	},
	{
		id: 2,
		name: 'set.png',
		type: 'png',
		uid: 234568229809,
		path: '/user/Desktop/set.png',
		size: 1080034340,
		created: '08082022',
		modified: '09082022',
		charset: 'utf-f'
	}]

}
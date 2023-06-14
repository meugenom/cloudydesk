import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PersistanceService {
	private storage$: Subject<StorageEvent>;

	constructor() {
		this.storage$ = new Subject<StorageEvent>();
		window.addEventListener('storage', (event) => {
			this.storage$.next(event);
		});
	}

	public getItem(key: string): string | null {
		return localStorage.getItem(key);
	}

	public setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	public removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	public clear(): void {
		localStorage.clear();
	}

	public getStorageChanges(): Observable<StorageEvent> {
		return this.storage$.asObservable();
	}
}


/*
import { Injectable } from '@angular/core';

//TODO: save properties in the localstorage 


@Injectable()
export class PersistanceService {

	setToken(key: string, data: any) {
		try {
			localStorage.setItem(key, JSON.stringify(data))
		} catch (e) {
			console.error('error saving to localStorage', e)
		}
	}

	getToken(key: string): any {
		try {
			return JSON.parse(localStorage.getItem(key)!)
		} catch (e) {
			console.error('error getting')
			return null
		}
	}

	removeToken(key: string) {
		try {
			localStorage.removeItem(key)
		} catch (e) {
			console.error('error removing key from localStorage', e)
		}
	}

}
*/
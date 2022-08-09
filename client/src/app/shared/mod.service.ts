import {
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModComponent } from '../mod/mod.component';

@Injectable({ providedIn: 'root' })
export class ModService {
  private componentRef!: ComponentRef<ModComponent>;
  private componentSubscriber!: Subject<string>;
  constructor() {}

  openMod(entry: ViewContainerRef, modTitle: string, modBody: string) {
	console.log('call openMod')
	this.componentRef = entry.createComponent(ModComponent);
    this.componentRef.instance.title = modTitle;
    this.componentRef.instance.body = modBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeMod());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeMod() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeMod();
  }
}

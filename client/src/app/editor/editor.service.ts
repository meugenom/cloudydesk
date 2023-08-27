import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from './editor.component';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadEditorComponent(container: ViewContainerRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(EditorComponent);
    const componentRef = container.createComponent(factory);
    // Here you can pass inputs to the component and set it up
  }
}

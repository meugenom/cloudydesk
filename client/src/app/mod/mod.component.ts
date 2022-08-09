import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-mod",
    templateUrl: "./mod.component.html",
    styleUrls: ["./mod.component.sass"]
})
export class ModComponent implements OnInit {
    @Input() modTitle: string | undefined;
    @Input() modText: string | undefined;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    close(event : MouseEvent) {
        this.closeModal.emit(event);
    }
}
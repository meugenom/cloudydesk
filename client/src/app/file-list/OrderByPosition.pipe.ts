import { Pipe, PipeTransform } from "@angular/core";

interface IPosition {
    position: number;
}

@Pipe({
    name: 'orderByPosition'
})
export class OrderByPosition implements PipeTransform {

    transform(array: Array<IPosition>): Array<IPosition> {
        return array.sort((a,b) => a.position-b.position);
    }
}

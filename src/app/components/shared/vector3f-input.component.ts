import {Component, Input} from '@angular/core';
import {Vector3f} from '../../model/interfaces/general/vector-3f.model';

@Component({
    selector: 'app-vector3f-input',
    template: `
        <mat-form-field style="width: 33%;">
            <input matInput placeholder="{{name}} (x)" type="number" [(ngModel)]="vector.x">
        </mat-form-field>
        <mat-form-field style="width: 33%;">
            <input matInput placeholder="{{name}} (y)" type="number" [(ngModel)]="vector.y">
        </mat-form-field>
        <mat-form-field style="width: 33%;">
            <input matInput placeholder="{{name}} (z)" type="number" [(ngModel)]="vector.z">
        </mat-form-field>
    `
})
export class Vector3fInputComponent {
    @Input('vector')
    private _vector: Vector3f = null;

    @Input('name')
    private _name: string;

    /**
     * Getter for the name of the {Vector3fInputComponent}.
     */
    get name() {
        return this._name;
    }

    /**
     * Getter for the vector value.
     */
    get vector() {
        return this._vector;
    }
}

import {Component, Input} from '@angular/core';
import {Vector3f} from '../../model/interfaces/general/vector-3f.model';

@Component({
    selector: 'app-vector3f-input',
    template: `
        <mat-form-field [style.width]="size" *ngIf="show[0]">
            <input matInput placeholder="{{labels[0] != null ? labels[0] : name + ' (x)'}}" type="number" [(ngModel)]="vector.x" [disabled]="disabled">
        </mat-form-field>
        <mat-form-field [style.width]="size" *ngIf="show[1]">
            <input matInput placeholder="{{labels[1] != null ? labels[1] : name + ' (y)'}}" type="number" [(ngModel)]="vector.y" [disabled]="disabled">
        </mat-form-field>
        <mat-form-field [style.width]="size" *ngIf="show[2]">
            <input matInput placeholder="{{labels[2] != null ? labels[2] : name + ' (z)'}}" type="number" [(ngModel)]="vector.z" [disabled]="disabled">
        </mat-form-field>
    `
})
export class Vector3fInputComponent {
    /** The {Vector3f} that is backing this {Vector3fInputComponent}. */
    @Input('vector')
    private _vector: Vector3f = null;

    /** Name label for this {Vector3fInputComponent}. */
    @Input('name')
    private _name: string;

    @Input('disabled')
    private _disabled: boolean = false;

    /** Determines which {Vector3f} components to show. */
    @Input('show')
    private _show: boolean[] = [true, true, true];

    /** Custom labels to use with this Vector3fInputComponent. */
    @Input('labels')
    private _labels: string[] = [null, null, null];

    /**
     * Getter for the show array.
     */
    get show() {
        return this._show;
    }

    /**
     *
     */
    get size() {
        return Math.floor((100/this.show.filter(v => v === true).length)) + '%';
    }

    /**
     * Getter for the custom labels.
     */
    get labels() {
        return this._labels;
    }

    /**
     * Returns the value of the disabled flag.
     */
    get disabled() {
        return this._disabled;
    }

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

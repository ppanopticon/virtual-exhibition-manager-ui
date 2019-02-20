import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../material.module';
import {Vector3fInputComponent} from './vector3f-input.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [ Vector3fInputComponent ],
    imports: [ BrowserModule, MaterialModule, FormsModule ],
    exports: [ Vector3fInputComponent ]
})
export class SharedComponentsModule {}

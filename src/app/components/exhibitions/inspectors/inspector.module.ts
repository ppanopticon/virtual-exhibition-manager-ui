import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../../material.module';
import {ExhibitionInspectorComponent} from './exhibition-inspector.component';

@NgModule({
    declarations: [ ExhibitionInspectorComponent ],
    imports: [ BrowserModule, MaterialModule ],
    exports: [ ExhibitionInspectorComponent ]
})
export class InspectorModule {}

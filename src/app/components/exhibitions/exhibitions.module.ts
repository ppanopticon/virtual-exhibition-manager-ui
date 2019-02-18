import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../material.module';
import {EditExhibitionComponent} from './edit-exhibition.component';
import {ListExhibitionComponent} from './list-exhibition.component';
import {InspectorModule} from './inspectors/inspector.module';

@NgModule({
    declarations: [ EditExhibitionComponent, ListExhibitionComponent ],
    imports: [ BrowserModule, MaterialModule, InspectorModule ],
    exports: [ EditExhibitionComponent, ListExhibitionComponent ]
})
export class ExhibitionsModule {}

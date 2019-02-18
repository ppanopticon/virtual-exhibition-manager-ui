import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../material.module';
import {EditExhibitionComponent} from './edit/edit-exhibition.component';
import {ListExhibitionComponent} from './list/list-exhibition.component';

@NgModule({
    declarations: [ EditExhibitionComponent, ListExhibitionComponent ],
    imports: [ BrowserModule, MaterialModule ],
    exports: [ EditExhibitionComponent, ListExhibitionComponent ]
})
export class ExhibitionsModule {}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../../material.module';
import {ExhibitionInspectorComponent} from './exhibition-inspector.component';
import {FormsModule} from '@angular/forms';
import {RoomInspectorComponent} from './room/room-inspector.component';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import {RoomCanvasComponent} from './room/room-canvas.component';

@NgModule({
    declarations: [ ExhibitionInspectorComponent, RoomInspectorComponent, RoomCanvasComponent ],
    imports: [ BrowserModule, MaterialModule, FormsModule, SharedComponentsModule ],
    exports: [ ExhibitionInspectorComponent, RoomInspectorComponent ]
})
export class InspectorModule {}

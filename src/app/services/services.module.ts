import {NgModule} from '@angular/core';
import {VremApiService} from './http/vrem-api.service';
import {HttpClientModule} from '@angular/common/http';
import {EditorService} from './editor/editor.service';

@NgModule({
    imports:      [ HttpClientModule ],
    exports:      [ ],
    declarations: [ ],
    providers:    [ VremApiService, EditorService ]
})
export class ServicesModule { }

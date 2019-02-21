import {Component, Input} from '@angular/core';
import {Textures} from '../../../../model/interfaces/general/textures.model';
import {Wall} from '../../../../model/implementations/wall.model';

@Component({
    selector: 'app-wall-inspector',
    templateUrl: 'wall-inspector.component.html',
    styleUrls: ['wall-inspector.component.scss']
})
export class WallInspectorComponent {
    @Input('wall')
    private _wall: Wall = null;

    /** List of available textures. */
    private _textures: string[] = Textures.map(v => v.toString());

    /**
     * Getter for available textures.
     */
    get textures() {
        return this._textures;
    }

    /**
     * Getter for {Wall}.
     */
    public get wall() {
        return this._wall;
    }
}

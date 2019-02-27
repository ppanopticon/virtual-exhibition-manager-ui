import {Component} from '@angular/core';
import {EditorService} from '../../services/editor/editor.service';
import {Exhibition} from '../../model/implementations/exhibition.model';
import {Room} from '../../model/implementations/room.model';
import {Wall} from '../../model/implementations/wall.model';
import {Exhibit} from '../../model/implementations/exhibit.model';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-edit-exhibitions',
    templateUrl: 'edit-exhibition.component.html',
    styleUrls: ['edit-exhibition.component.scss']
})
export class EditExhibitionComponent {

    /** The {NestedTreeControl} for the per-room tree list. */
    private _treeControl = new NestedTreeControl<any>(node => {
        if (node instanceof Room) {
            return [node.walls, node.exhibits];
        } else if (node instanceof Wall) {
            return node.exhibits;
        } else if (node instanceof Exhibit) {
            return [];
        } else {
            return node;
        }
    });

    /** The data source for the per-room tree list. */
    private _roomDataSources: Observable<Room[]>;

    /** Helper functions to render the tree list. */
    public readonly isWallFiller = (_: number, node: (Room | Wall | Exhibit)) => Array.isArray(node) && _ === 0;
    public readonly isExhibitFiller = (_: number, node: (Room | Wall | Exhibit)) => Array.isArray(node)  && _ === 1;
    public readonly isRoom = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Room;
    public readonly isWall = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Wall;
    public readonly isExhibit = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Exhibit;

    /**
     * Default constructor.
     *
     * @param _editor Reference to the {EditorService}
     */
    constructor(private _editor: EditorService) {
        this._roomDataSources = this._editor.currentObservable.pipe(map( e => e.rooms));
    }

    /**
     * Getter for the @type {Exhibition}.
     */
    get exhibition(): Observable<Exhibition> {
        return this._editor.currentObservable;
    }

    /**
     * Getter for the inspected element.
     */
    get inspected(): Observable<(Exhibition | Room | Wall | Exhibit)> {
        return this._editor.inspectedObservable;
    }

    /**
     * Getter for the tree control.
     */
    get treeControl(): NestedTreeControl<(Room | Wall | Exhibit)> {
        return this._treeControl;
    }

    /**
     * Creates and adds a new {Room} to the current {Exhibition}.
     */
    public addNewRoom() {
        this._editor.current.addRoom(Room.empty());
    }

    /**
     * Deletes the provided {Room} from the current {Exhibition}
     *
     * @param r The {Room} to delete.
     */
    public removeRoom(r: Room): void {
        this._editor.current.deleteRoom(r);
    }

    /**
     * Returns the name of type of the currently inspected element.
     *
     * @return Type of the inspected element.
     */
    get selectedType(): Observable<string> {
        return this.inspected.pipe(
            map(i => {
                if (i instanceof Exhibit) {
                    return 'Exhibit';
                } else if (i instanceof Exhibition) {
                    return 'Exhibition';
                } else if (i instanceof Room) {
                    return 'Room';
                } else if (i instanceof Wall) {
                    return 'Wall';
                } else {
                    return 'Nothing';
                }
            })
        );
    }

    /**
     *
     */
    get isSelectedExhibition(): Observable<boolean> {
        return this.inspected.pipe(map(e => e  instanceof Exhibition));
    }

    /**
     *
     */
    get isSelectedRoom() {
        return this.inspected.pipe(map(e => e  instanceof Room));
    }

    /**
     *
     */
    get isSelectedWall() {
        return this.inspected.pipe(map(e => e  instanceof Wall));
    }

    /**
     *
     */
    get isSelectedExhibit() {
        return this.inspected.pipe(map(e => e  instanceof Exhibit));
    }

    /**
     *
     * @param event
     * @param rw
     * @param e
     */
    public removeExhibitClicked(event: MouseEvent, e: Exhibit) {
        e._belongsTo.removeExhibit(e);
        event.stopPropagation();
    }

    /**
     * Called whenever a user clicks a {Exhibition}.
     * @param event The mouse event.
     * @param exhibition The {Exhibition} that has been clicked.
     */
    public exhibitionClicked(event: MouseEvent, exhibition: Exhibition) {
        this._editor.inspected = this._editor.current;
        event.stopPropagation();
    }

    /**
     * Called whenever a user clicks a {Exhibit}.
     * @param event The mouse event.
     * @param exhibit The {Exhibit} that has been clicked.
     */
    public exhibitClicked(event: MouseEvent, exhibit: Exhibit) {
        this._editor.inspected = exhibit;
        event.stopPropagation();
    }


    /**
     * Called whenever a user clicks a {Room}.
     * @param event The mouse event.
     * @param room The {Room} that has been clicked.
     */
    public roomClicked(event: MouseEvent, room: Room) {
        this._editor.inspected = room;
        event.stopPropagation();
    }

    /**
     * Called whenever a user clicks a {Wall}.
     * @param event The mouse event.
     * @param wall The {Wall} that has been clicked.
     */
    public wallClicked(event: MouseEvent, wall: Wall) {
        this._editor.inspected = wall;
        event.stopPropagation();
    }
}


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FillerNode {
    walls: Wall[];
    exhibits: Exhibit[];
}

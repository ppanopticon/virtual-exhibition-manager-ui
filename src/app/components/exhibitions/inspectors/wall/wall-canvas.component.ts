import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Wall} from '../../../../model/implementations/wall.model';
import {of} from 'rxjs';

@Component({
    selector: 'app-wall-canvas',
    template: `
        <table>
            <tr><td colspan="3" style="text-align: center;">UP</td></tr>
            <tr>
                <td>{{leftLabel}}</td>
                <td><canvas #canvas width="250" height="250"></canvas></td>
                <td>{{rightLabel}}</td>
            </tr>
            <tr><td colspan="3" style="text-align: center;">DOWN</td></tr>
        </table>
    `
})
export class WallCanvasComponent implements AfterViewInit {

    /** The room displayed by this {RoomCanvasComponent}. */
    @Input('wall')
    private _wall: Wall;

    /** The canvas used to draw the {Room} overview. */
    @ViewChild('canvas')
    private _canvas: ElementRef;

    /** Reference to the drawing context. */
    private _context: CanvasRenderingContext2D;

    /**
     * Lifecycle Hook (onInit): Initialises the drawing context.
     */
    public ngAfterViewInit() {
        const canvas = this._canvas.nativeElement;
        this._context = canvas.getContext('2d');
        this.update();
    }

    /**
     * Label for the left side of the canvas.
     */
    get leftLabel() {
        switch (this._wall.direction) {
            case 'NORTH':
                return 'W';
            case 'EAST':
                return 'N';
            case 'SOUTH':
                return 'E';
            case 'WEST':
                return 'S';
        }
    }

    /**
     * Label for the right side of the canvas.
     */
    get rightLabel() {
        switch (this._wall.direction) {
            case 'NORTH':
                return 'E';
            case 'EAST':
                return 'S';
            case 'SOUTH':
                return 'W';
            case 'WEST':
                return 'N';
        }
    }

    /**
     * Re-draws the room preview.
     */
    public update() {
        /* Get width and height of the canvas. */
        const cwidth = this._context.canvas.width;
        const cheight = this._context.canvas.height;

        /* Fill canvas with a black background. */
        this._context.fillStyle = '#000000';
        this._context.fillRect(0.0, 0.0, cwidth, cheight);

        /* Draw wall and exhibits. */
        this.drawWall(cwidth, cheight);
        this.drawExhibits(cwidth, cheight);

        /* Schedule next update. */
        setTimeout(() => this.update(), 200);
    }

    /**
     * Draws the individual exhibits.
     *
     * @param cwidth Width of the canvas.
     * @param cheight Width of the canvas.
     */
    public drawExhibits(cwidth: number, cheight: number) {

        /* Calculate unit-size. */
        let ds = 0.0;
        if (this._wall.width > this._wall.height) {
            ds = cwidth / this._wall.width;
        } else {
            ds = cheight / this._wall.height;
        }

        /* Set style for drawing the exhibits. */
        this._context.strokeStyle = '#FFB300';
        this._context.fillStyle = ' #FFB300';

        /* Calculate offsets. */
        let offsetX = (cwidth - this._wall.width * ds);
        let offsetY =  (cheight - this._wall.height * ds);

        for (let e of this._wall.exhibits) {
            /* Draw exhibit. */
            this._context.fillRect(offsetX / 2 + e.position.x * ds, offsetY / 2 + e.position.y * ds  , e.size.x * ds, e.size.y * ds);
        }
    }


    /**
     * Draws the actual wall.
     *
     * @param cwidth Width of the canvas.
     * @param cheight Width of the canvas.
     */
    public drawWall(cwidth: number, cheight: number) {
        /* Calculate unit-size. */
        let ds = 0.0;
        if (this._wall.width > this._wall.height) {
            ds = cwidth / this._wall.width;
        } else {
            ds = cheight / this._wall.height;
        }

        /* Calculate offsets. */
        let offsetX = (cwidth - this._wall.width * ds);
        let offsetY =  (cheight - this._wall.height * ds);

        /* Set style for room walls. */
        this._context.fillStyle = '#CC3300';
        this._context.fillRect(offsetX/2, offsetY/2, cwidth-offsetX, cheight-offsetY);
    }
}

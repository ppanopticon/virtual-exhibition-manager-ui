import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Room} from '../../../../model/implementations/room.model';

@Component({
    selector: 'app-room-canvas',
    template: `
        <table>
            <tr><td colspan="3" style="text-align: center;">N</td></tr>
            <tr>
                <td>W</td>
                <td><canvas #canvas width="250" height="250"></canvas></td>
                <td>E</td>
            </tr>
            <tr><td colspan="3" style="text-align: center;">S</td></tr>
        </table>
    `
})
export class RoomCanvasComponent implements AfterViewInit {

    /** The room displayed by this {RoomCanvasComponent}. */
    @Input('room')
    private _room: Room;

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
     * Re-draws the room preview.
     */
    public update() {
        /* Get width and height of the canvas. */
        const cwidth = this._context.canvas.width;
        const cheight = this._context.canvas.height;

        /* Fill canvas with a black background. */
        this._context.fillStyle = '#000000';
        this._context.fillRect(0.0, 0.0, cwidth, cheight);

        /* Draw the individual objects. */
        this.drawWalls(cwidth, cheight);
        this.drawEntrypoint(cwidth, cheight);

        /* Schedule next update. */
        setTimeout(() => this.update(), 200);
    }

    /**
     * Draws the entrypoint into the room.
     *
     * @param cwidth Width of the canvas.
     * @param cheight Height of the canvas.
     */
    private drawEntrypoint(cwidth: number, cheight: number) {

        /* Set style for entrypoint. */
        this._context.strokeStyle = '#00B300';
        this._context.fillStyle = ' #00B300';

        /* Coordinates of entrypoint. */
        let x = 0.0;
        let y = 0.0;

        if (this._room.size.x > this._room.size.z) {
            const rheight = cheight * (this._room.size.z / this._room.size.x);
            x = (this._room.entrypoint.x/ this._room.size.x) * cwidth;
            y = (this._room.entrypoint.z / this._room.size.z) * rheight + (cheight-rheight)/2;
        } else {
            const rwidth = cwidth * (this._room.size.x / this._room.size.z);
            x = (this._room.entrypoint.x / this._room.size.x) * rwidth + (cwidth-rwidth)/2;
            y = (this._room.entrypoint.z / this._room.size.z) * cheight;
        }

        this._context.beginPath();
            this._context.moveTo(x, y+10.0);
            this._context.lineTo(x+10, y-10.0);
            this._context.lineTo(x-10, y-10.0);
            this._context.lineTo(x, y+10.0);
        this._context.closePath();
        this._context.fill();
    }

    /**
     * Draws the walls delimiting the current {Room}.
     *
     * @param cwidth Width of the canvas.
     * @param cheight Height of the canvas.
     */
    private drawWalls(cwidth: number, cheight: number) {
        /* Array containing the room corners. */
        let corners: number[] = [];

        /* Draw room bounds. */
        if (this._room.size.x > this._room.size.z) {
            const rheight = cheight * (this._room.size.z/this._room.size.x);
            corners.push(0.0, (cheight-rheight)/2, cwidth, cheight-(cheight-rheight))
        } else {
            const rwidth = cwidth * (this._room.size.x / this._room.size.z);
            corners.push((cwidth-rwidth)/2, 0.0, cwidth-(cwidth-rwidth), cheight);
        }

        /* Set style for room walls. */
        this._context.strokeStyle = '#CC3300';
        this._context.lineWidth = 5.0;
        this._context.strokeRect(corners[0] + this._context.lineWidth/2, corners[1] + this._context.lineWidth/2, corners[2] - this._context.lineWidth, corners[3] - this._context.lineWidth);
    }
}

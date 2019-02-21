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


    /** */
    private static WALL_LINE_WIDTH = 5.0;

    /** */
    private static PAINTING_LINE_WIDTH = 2.5;

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
        this.drawWallExhibits(cwidth, cheight);

        /* Schedule next update. */
        setTimeout(() => this.update(), 200);
    }

    /**
     *
     * @param cwidth
     * @param cheight
     */
    private drawWallExhibits(cwidth: number, cheight: number) {
        this._context.beginPath();

        /* Set style for drawing the exhibits. */
        this._context.strokeStyle = '#FFB300';
        this._context.fillStyle = ' #FFB300';
        this._context.lineWidth = RoomCanvasComponent.PAINTING_LINE_WIDTH;

        /* Iterate throug all the walls. */
        for (const wall of this._room.walls) {
            /* Calculate unit-size. */
            let ds = 0.0;
            if (this._room.size.x > this._room.size.z) {
                ds = cwidth / this._room.size.x ;
            } else {
                ds = cheight / this._room.size.z;
            }

            /* Calculate offsets. */
            const offsetX = (cwidth - this._room.size.x * ds)/2;
            const offsetY =  (cheight - this._room.size.z * ds)/2;
            const wallOffset = RoomCanvasComponent.WALL_LINE_WIDTH;

            for (const exhibit of wall.exhibits) {
                this._context.beginPath();
                switch (wall.direction) {
                    case 'NORTH':
                        this._context.moveTo(offsetX + exhibit.position.x * ds, offsetY + wallOffset);
                        this._context.lineTo(offsetX + exhibit.position.x * ds + exhibit.size.y * ds, offsetY + wallOffset);
                        this._context.stroke();
                        break;
                    case 'EAST':
                        this._context.moveTo(cwidth - offsetX - wallOffset, offsetY + exhibit.position.x * ds);
                        this._context.lineTo(cwidth - offsetX - wallOffset, offsetY + exhibit.position.x * ds + exhibit.size.x * ds);
                        this._context.stroke();
                        break;
                    case 'SOUTH':
                        this._context.moveTo(offsetX + exhibit.position.x * ds, cheight - offsetY - wallOffset);
                        this._context.lineTo(offsetX + exhibit.position.x * ds + exhibit.size.y * ds, cheight - offsetY - wallOffset);
                        break;
                    case 'WEST':
                        this._context.moveTo(offsetX + wallOffset, offsetY + exhibit.position.x * ds);
                        this._context.lineTo(offsetX + wallOffset, offsetY + exhibit.position.x * ds + exhibit.size.x * ds);
                        this._context.stroke();
                        break;
                }
                this._context.stroke();
                this._context.closePath();
            }
        }
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
        this._context.fillStyle = '#00B300';

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
            this._context.fill();
        this._context.closePath()
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

        /* Set style for room walls. */
        this._context.strokeStyle = '#CC3300';
        this._context.lineWidth = RoomCanvasComponent.WALL_LINE_WIDTH;

        /* Draw room bounds. */
        if (this._room.size.x > this._room.size.z) {
            const rheight = cheight * (this._room.size.z/this._room.size.x);
            corners.push(0.0, (cheight-rheight)/2, cwidth, cheight-(cheight-rheight));
        } else {
            const rwidth = cwidth * (this._room.size.x / this._room.size.z);
            corners.push((cwidth-rwidth)/2, 0.0, cwidth-(cwidth-rwidth), cheight);
        }

        /* Do the drawing. */
        this._context.strokeRect(corners[0] + this._context.lineWidth/2, corners[1] + this._context.lineWidth/2, corners[2] - this._context.lineWidth, corners[3] - this._context.lineWidth);
    }
}

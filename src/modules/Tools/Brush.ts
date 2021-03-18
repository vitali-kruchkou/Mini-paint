import Tool from './Tool';

export default class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  mouseDown: boolean;

  listen() {
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
  }

  handleMouseDown(event: MouseEvent) {
    this.mouseDown = true;
    this.context?.beginPath();
    this.context?.moveTo(
      event.pageX - this.canvas.offsetLeft,
      event.pageY - this.canvas.offsetTop,
    );
  }

  handleMouseMove(event: MouseEvent) {
    if (this.mouseDown) {
      this.draw(
        event.pageX - this.canvas.offsetLeft,
        event.pageY - this.canvas.offsetTop,
      );
    }
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  draw(x: number, y: number) {
    this.context?.lineTo(x, y);
    this.context?.stroke();
    console.log('Draw brush');
  }
}

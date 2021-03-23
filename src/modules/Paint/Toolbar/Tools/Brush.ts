import Tool from './Tool';

export default class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  mouseDown: boolean;

  listen(): void {
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.ontouchstart = this.handleTouchDown.bind(this);
    this.canvas.ontouchmove = this.handleTouchMove.bind(this);
    this.canvas.ontouchend = this.handleTouchEnd.bind(this);
  }

  handleMouseDown(event: MouseEvent): void {
    this.mouseDown = true;
    this.context?.beginPath();
    this.context?.moveTo(
      event.pageX - this.canvas.offsetLeft,
      event.pageY - this.canvas.offsetTop,
    );
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.mouseDown) {
      this.draw(
        event.pageX - this.canvas.offsetLeft,
        event.pageY - this.canvas.offsetTop,
      );
    }
  }

  handleMouseUp(): void {
    this.mouseDown = false;
  }

  handleTouchDown(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleTouchMove(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX - this.canvas.clientLeft,
      clientY: touch.clientY - this.canvas.clientTop,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  draw(x: number, y: number): void {
    this.context.globalCompositeOperation = 'source-over';
    this.context?.lineTo(x, y);
    this.context?.stroke();
    console.log('Draw brush');
  }
}

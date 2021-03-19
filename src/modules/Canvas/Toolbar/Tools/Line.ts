import Tool from './Tool';

export default class Line extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  mouseDown: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  saved: any;

  listen(): void {
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.ontouchstart = this.handleTouchDown.bind(this);
    this.canvas.ontouchmove = this.handleTouchMove.bind(this);
    this.canvas.ontouchend = this.handleTouchEnd.bind(this);
  }

  handleMouseDown(e: MouseEvent): void {
    this.mouseDown = true;
    this.context?.beginPath();
    this.currentX = e.pageX - this.canvas.offsetLeft;
    this.currentY = e.pageY - this.canvas.offsetTop;
    this.context?.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  handleMouseMove(e: MouseEvent): void {
    if (this.mouseDown) {
      const currentX = e.pageX - this.canvas.offsetLeft;
      const currentY = e.pageY - this.canvas.offsetTop;
      this.draw(currentX, currentY);
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
    const rect = this.canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX - rect.left,
      clientY: touch.clientY - rect.top,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  draw(x: number, y: number): void {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.globalCompositeOperation = 'source-over';
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context?.beginPath();
      this.context?.moveTo(this.currentX, this.currentY);
      this.context?.lineTo(x, y);
      this.context?.stroke();
    };
  }
}

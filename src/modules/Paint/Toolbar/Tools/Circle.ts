import Tool from './Tool';

export default class Circle extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  mouseDown: boolean;
  startX: number;
  startY: number;
  saved: any;

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
    this.startX = event.pageX - this.canvas.offsetLeft;
    this.startY = event.pageY - this.canvas.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.mouseDown) {
      const currentX = event.pageX - this.canvas.offsetLeft;
      const currentY = event.pageY - this.canvas.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      const radius = Math.pow(width * width + height * height, 1 / 2);
      this.draw(this.startX, this.startY, radius);
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

  draw(x: number, y: number, radius: number): void {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.globalCompositeOperation = 'source-over';
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context?.beginPath();
      this.context?.arc(x, y, radius, 0, Math.PI * 2);
      this.context?.fill();
      this.context?.stroke();
    };
  }
}

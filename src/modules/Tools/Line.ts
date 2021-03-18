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

  listen() {
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e: MouseEvent) {
    this.mouseDown = true;
    this.context?.beginPath();
    this.currentX = e.pageX - this.canvas.offsetLeft;
    this.currentY = e.pageY - this.canvas.offsetTop;
    this.context?.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  handleMouseMove(e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - this.canvas.offsetLeft;
      const currentY = e.pageY - this.canvas.offsetTop;
      this.draw(currentX, currentY);
    }
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context?.beginPath();
      this.context?.moveTo(this.currentX, this.currentY);
      this.context?.lineTo(x, y);
      this.context?.stroke();
    };
  }
}

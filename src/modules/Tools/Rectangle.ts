import Tool from './Tool';

export default class Rectangle extends Tool {
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

  handleMouseDown(event: MouseEvent) {
    this.mouseDown = true;
    this.context?.beginPath();
    this.startX = event.pageX - this.canvas.offsetLeft;
    this.startY = event.pageY - this.canvas.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  handleMouseMove(event: MouseEvent) {
    if (this.mouseDown) {
      const currentX = event.pageX - this.canvas.offsetLeft;
      const currentY = event.pageY - this.canvas.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  draw(x: number, y: number, width: number, height: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context?.beginPath();
      this.context?.rect(x, y, width, height);
      this.context?.fill();
      this.context?.stroke();
    };
  }
}

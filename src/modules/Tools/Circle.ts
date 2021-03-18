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
      const radius = Math.pow(width * width + height * height, 1 / 2);
      this.draw(this.startX, this.startY, radius);
    }
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  draw(x: number, y: number, radius: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context?.beginPath();
      this.context?.arc(x, y, radius, 0, Math.PI * 2);
      this.context?.fill();
      this.context?.stroke();
    };
  }
}

import Tool from './Tool';

export default class ClearAll extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.draw();
  }

  draw(): void {
    this.context.globalCompositeOperation = 'destination-out';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }
}

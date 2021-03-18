export default class Tool {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    if (canvas != null) {
      const context = canvas.getContext('2d');
      this.canvas = canvas;
      this.context = context;
      this.endListen();
    }
  }

  endListen(): void {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }

  set fillColor(color: string) {
    this.context.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.context.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.context.lineWidth = width;
  }
}

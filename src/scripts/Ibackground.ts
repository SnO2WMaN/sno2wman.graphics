/* eslint no-undef:0 */
export default interface IBackground {
  rect: { width: number; height: number }
  draw(ctx: CanvasRenderingContext2D): void
  resize(rect: { width: number; height: number }): void
}

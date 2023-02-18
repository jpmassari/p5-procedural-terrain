import dynamic from 'next/dynamic';
import { SketchProps } from 'react-p5';
import p5Types from "p5"; 

const Sketch = dynamic<SketchProps>(() => import('react-p5').then((mod) => mod.default), {
  ssr: false
})

let cols = 0;
let rows = 0;
const scale = 10;
const w = 1000;
const h = 800;
/* const terrain = new Array(40).fill(0).map(() => new Array(50).fill(0)); */
let terrain:any[] = [];
let flying = 0;
/* let canvas:any; */

const Terrain: React.FC = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    /* canvas = p5.min(p5.windowWidth, p5.windowHeight-60); */
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    cols = w/scale;
    rows = h/scale;
  }
  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
  const draw = (p5: p5Types) => {
    flying -= 0.1;
    let yoff = flying;
    for(let y = 0; y < rows; y++) {
      terrain.push([]);
      let xoff = 0;
      for(let x = 0; x < cols; x++) {
      terrain[y][x] = p5.map(p5.noise(xoff,yoff), 0, 5, -800, 100);
      /* terrain[y][x] = p5.map(p5.noise(xoff,yoff), 0, 1, -100, 100); */
        xoff += 0.2;
     }
     yoff += 0.2;
    }
    p5.background(87, 170, 222);
    p5.stroke(1);
    p5.noFill();
    /* p5.translate(p5.width/2, p5.height/2 +50); */
    p5.rotateX(p5.PI/3);
    p5.translate(-w/2 , -h/2);
    for(let y = 0; y < rows - 1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p5.vertex(x*scale , y*scale, terrain[y][x]);
        p5.vertex(x*scale , (y+1)*scale, terrain[y+1][x]);
        /* p5.rect(x*scale , y*scale , scale , scale); */
      }
    p5.endShape();
   }
  }
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
export default Terrain;
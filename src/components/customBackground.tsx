import dynamic from 'next/dynamic';
import { SketchProps } from 'react-p5';
import p5Types from "p5"; 

const Sketch = dynamic<SketchProps>(() => import('react-p5').then((mod) => mod.default), {
  ssr: false
})

let maxRecursionDepth = 0;
let rad = 0;
let w:any;

const Hexagon: React.FC = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    w = p5.min(p5.windowWidth, p5.windowHeight-52);
    p5.createCanvas(p5.windowWidth,w).parent(canvasParentRef);
  
    maxRecursionDepth = 4;
    rad = w;
    
    p5.strokeJoin(p5.ROUND)
  }
  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight-52);
  }
  const draw = (p5: p5Types) => {
    p5.background(32);
    p5.translate(w/2, w/2)
  
    p5.stroke(0);
    p5.fill(87, 170, 222, 100);
    p5.strokeWeight(1);
  
    recursiveHexagon(p5, 0, 0, maxRecursionDepth, rad);
    p5.noLoop();
  }
  const drawHexagon = (p5:p5Types, cX:number, cY:number, r:number) => {
    p5.beginShape();
    for(let a = p5.TAU/12; a < p5.TAU + p5.TAU/12; a+= p5.TAU/6){
      let x1 = cX + r * p5.cos(a)
      let y1 = cY + r * p5.sin(a)
  
      p5.vertex(x1, y1)
    }
    p5.endShape(p5.CLOSE)
  }

  const recursiveHexagon = (p5:p5Types, cX:number, cY:number, depth:number, r:number) => {
    if(depth == 0){
      drawHexagon(p5, cX, cY, r);
      return;
    }
    recursiveHexagon(p5, cX, cY, depth-1, r/6)
    for(let a = 0; a < p5.TAU; a += p5.TAU/8) {
      let x = cX + r * p5.cos(a);
      let y = cY + r * p5.sin(a);
      if(depth > 0){
        recursiveHexagon(p5, x, y, depth-1, r/2);
      }
    }
  }
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}

export default Hexagon;
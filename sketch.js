const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 49;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          position: [u, v],
          radius: Math.abs(random.gaussian() * 0.005),
        });
      }
    }
    return points;
  };
  const margin = 400;
  random.setSeed(40);
  const points = createGrid().filter(() => random.value() * 100 < 50);
  console.log("points", points);
  return ({ context, width, height }) => {
    context.fillStyle = "#c7c5c3";
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const { position, radius } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, Math.PI * 2, false);
      context.fillStyle = "#ffdbac";
      context.lineWidth = 5;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);

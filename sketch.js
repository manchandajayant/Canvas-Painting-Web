const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes)).slice(1, 4);
  const createGrid = () => {
    const points = [];
    const count = 29;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v) * 0.09);
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius: radius,
          rotation: random.noise2D(u, v),
          // radius: Math.abs(0.01 + random.gaussian() * 0.01),
        });
      }
    }
    return points;
  };
  const margin = 400;

  const points = createGrid().filter(() => random.value() * 100 < 50);
  console.log("points", points);
  return ({ context, width, height }) => {
    const palette = random.shuffle(random.pick(palettes)).slice(1, 4);
    colorForFill = random.pick(palette);
    context.fillStyle = colorForFill;
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.lineWidth = 5;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("*", 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);

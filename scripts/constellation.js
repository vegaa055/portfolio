document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("constellation-canvas");
  const ctx = canvas.getContext("2d");
  let width, height;
  const stars = [];
  const numStars = 80;
  const maxDist = 120;
  const maxMouseDist = 200;

  let mouse = { x: null, y: null };

  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Create random stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Move and draw stars
    for (let i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > width) star.vx *= -1;
      if (star.y < 0 || star.y > height) star.vy *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#58a6ff";
      ctx.fill();
    }

    // Draw lines
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        let dx = stars[i].x - stars[j].x;
        let dy = stars[i].y - stars[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(88, 166, 255, ${1 - dist / maxDist})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw line to mouse
      if (mouse.x !== null) {
        let dx = stars[i].x - mouse.x;
        let dy = stars[i].y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxMouseDist) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDist})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
});

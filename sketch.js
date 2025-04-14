let particles = [];
let fireworks = [];
let speedMultiplier = 1; // 速度倍率
let fireworkInterval; // 煙火產生的計時器

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }

  // 每隔 2 秒在隨機位置產生煙火
  fireworkInterval = setInterval(() => {
    const x = random(width);
    const y = random(height); // 煙火出現在畫布上半部分
    fireworks.push(new Firework(x, y));
  }, 1500);
}

function draw() {
  background(0, 20); // 黑色背景，帶有透明度的效果

  // 更新並顯示星星
  for (let particle of particles) {
    particle.update();
    particle.show();
  }

  // 更新並顯示煙火
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1); // 移除已完成的煙火
    }
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(10, 25); // 調整星星的大小範圍
    this.color = color(random(100, 255), random(100, 255), random(100, 255), 150);
  }

  update() {
    this.x += this.vx * speedMultiplier; // 根據速度倍率更新位置
    this.y += this.vy * speedMultiplier;

    // 邊界檢查，讓粒子反彈
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  show() {
    noStroke();
    fill(this.color);
    this.drawStar(this.x, this.y, this.size / 2, this.size, 5); // 繪製星星
  }

  // 繪製星星的函式
  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new FireworkParticle(this.x, this.y));
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }

  isDone() {
    return this.particles.every(p => p.lifespan <= 0);
  }
}

class FireworkParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.lifespan = 255;
    this.color = color(random(200, 255), random(100, 255), random(100, 255), this.lifespan);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= 5; // 煙火粒子逐漸消失
    this.color.setAlpha(this.lifespan);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 5);
  }
}

function mousePressed() {
  speedMultiplier = 5; // 按下滑鼠左鍵後加速
}

function mouseReleased() {
  speedMultiplier = 1; // 放開滑鼠左鍵後恢復正常速度
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

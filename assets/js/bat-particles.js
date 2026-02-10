let bats = [];
let batImg;

function preload() {
    batImg = loadImage(halloweenData.batPath);
}

function setup() {
    // 1. Create the canvas
    let canvas = createCanvas(windowWidth, windowHeight);
    
    // 2. IMPORTANT: Attach it to your container
    canvas.parent('bat-container'); 
    
    // 3. Use 'fixed' so it stays in the viewport and doesn't stretch the page
    canvas.style('position', 'fixed'); 
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '0'); // Behind text, but visible
    canvas.style('pointer-events', 'none');
}

function draw() {
    clear();
    
    // Limit bats on mobile for performance
    let maxBats = windowWidth < 768 ? 15 : 30;

    if (frameCount % 25 === 0 && bats.length < maxBats) {
        bats.push(new Bat());
    }

    for (let i = bats.length - 1; i >= 0; i--) {
        bats[i].update();
        bats[i].display();
        if (bats[i].isOffScreen()) {
            bats.splice(i, 1);
        }
    }
}

class Bat {
    constructor() {
        this.x = random(width);
        // 4. Start just below the VISIBLE bottom, not the page bottom
        this.y = height + 50; 
        
        // Responsive sizing
        let minSize = windowWidth < 768 ? 15 : 20;
        let maxSize = windowWidth < 768 ? 35 : 50;
        this.size = random(minSize, maxSize);
        
        this.speedY = random(-1, -2.5);
        this.sinOffset = random(1000);
    }

    update() {
        this.y += this.speedY;
        this.x += sin(this.sinOffset + frameCount * 0.03) * 1.5;
    }

    display() {
        push();
        translate(this.x, this.y);
        let tilt = sin(this.sinOffset + frameCount * 0.03) * 0.2;
        rotate(tilt);
        
        imageMode(CENTER);
        if (batImg) {
            image(batImg, 0, 0, this.size, (this.size * batImg.height) / batImg.width);
        }
        pop();
    }

    isOffScreen() {
        // Remove if it goes off the top
        return this.y < -100;
    }
}

function windowResized() {
    // 5. This is crucial for DevTools! Resizes the "sky" when you change devices.
    resizeCanvas(windowWidth, windowHeight);
}
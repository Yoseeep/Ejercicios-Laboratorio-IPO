export class Car {
    constructor(canvasWidth, canvasHeight) {
        this.width = 50;
        this.height = 80;
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight - this.height - 20;
        this.speed = 7;
        this.canvasWidth = canvasWidth;
        this.color = '#3742fa';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // Simple car shape
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Windows/Details to make it look more like a car
        ctx.fillStyle = '#dfe4ea';
        ctx.fillRect(this.x + 5, this.y + 10, this.width - 10, 15); // Windshield
        ctx.fillRect(this.x + 5, this.y + 45, this.width - 10, 15); // Rear window
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x + this.width < this.canvasWidth) {
            this.x += this.speed;
        }
    }

    resize(newWidth, newHeight) {
        // Calculate relative position before resize
        const relativeX = this.x / this.canvasWidth;

        this.canvasWidth = newWidth;
        this.y = newHeight - this.height - 20; // Keep at bottom

        // Restore relative position
        this.x = relativeX * newWidth;

        // Clamp to bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvasWidth) this.x = this.canvasWidth - this.width;
    }
}
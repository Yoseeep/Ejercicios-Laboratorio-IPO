export class Obstacle {
    constructor(canvasWidth, speed = 4) {
        this.width = 60;
        this.height = 60;
        // Ensure obstacle stays within canvas bounds
        this.x = Math.random() * (canvasWidth - this.width);
        this.y = -this.height;
        this.speed = speed;
        this.markedForDeletion = false;
        this.color = '#ff6b81';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add some detail
        ctx.strokeStyle = '#2f3542';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(canvasHeight) {
        this.y += this.speed;
        // Mark for deletion if off screen
        if (this.y > canvasHeight) {
            this.markedForDeletion = true;
        }
    }
}
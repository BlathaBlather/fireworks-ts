"use strict";
const darkMode = true;
const g = [0.99, 0.013];
class Particle {
    constructor(x, y, x_bound, y_bound) {
        this.alive = true;
        this.x_bound = x_bound;
        this.y_bound = y_bound;
        this.x = x;
        this.y = y;
        this.fade = 1;
        this.x_velocity = (Math.floor(Math.random() * 50) - 25) / 8;
        this.y_velocity = (Math.floor(Math.random() * 20) - 5) / 5;
    }
    get_coords() {
        return [this.x, this.y];
    }
    update_coords() {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.fade = this.fade * 0.997;
        this.x_velocity = this.x_velocity * g[0];
        this.y_velocity = this.y_velocity + g[1];
        if (this.y > this.y_bound) {
            this.alive = false;
        }
    }
}
class Explosion {
    constructor(x, y, x_bound, y_bound) {
        this.particles = [];
        this.x = x;
        this.y = y;
        this.x_bound = x_bound;
        this.y_bound = y_bound;
        for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this.x, this.y, this.x_bound, this.y_bound));
        }
    }
}
;
class Firework {
    constructor(x, y, x_bound, y_bound) {
        this.x = x;
        this.y = y;
        this.x_bound = x_bound;
        this.y_bound = y_bound;
        this.alive = true;
        this.x_velocity = (Math.floor(Math.random() * 300) - 150) / 100;
        this.y_velocity = -3 + (Math.floor(Math.random() * 200) - 100) / 100;
    }
    update_coords() {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.x_velocity = this.x_velocity * g[0];
        this.y_velocity = this.y_velocity + g[1];
        if (this.y_velocity > 0) {
            explosions.push(new Explosion(this.x, this.y, this.x_bound, this.y_bound));
            this.alive = false;
        }
    }
    get_coords() {
        return [this.x, this.y];
    }
}
var explosions = [];
var fireworks = [];
function loop() {
    if (darkMode) {
        ctx.fillStyle = "black";
    }
    else {
        ctx.fillStyle = "white";
    }
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if (darkMode) {
        ctx.fillStyle = "white";
    }
    else {
        ctx.fillStyle = "black";
    }
    for (let i = 0; i < fireworks.length; i++) {
        var firework = fireworks[i];
        let x = firework.get_coords()[0];
        let y = firework.get_coords()[1];
        ctx.fillRect(x, y, 5, 5);
        firework.update_coords();
    }
    var k = fireworks.length;
    while (k--) {
        if (fireworks[k].alive == false) {
            fireworks.splice(k, 1);
            // var audio = new Audio('audio_file.mp3');
            // audio.play();
        }
    }
    for (let i = 0; i < explosions.length; i++) {
        var explosion = explosions[i];
        for (let j = 0; j < explosion.particles.length; j++) {
            var particle = explosion.particles[j];
            let x = particle.get_coords()[0];
            let y = particle.get_coords()[1];
            let fade = particle.fade;
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            ctx.fillStyle = "rgba(" + String(r) + "," + String(g) + "," + String(b) + "," + String(fade) + ")";
            ctx.fillRect(x, y, 2.5, 2.5);
            particle.update_coords();
            var k = explosion.particles.length;
            while (k--) {
                if (explosion.particles[k].alive == false) {
                    explosion.particles.splice(k, 1);
                }
            }
        }
    }
    var k = explosions.length;
    while (k--) {
        if (explosions[k].particles.length == 0) {
            explosions.splice(k, 1);
        }
    }
}
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
c.addEventListener('click', function (event) {
    var cLeft = c.offsetLeft + c.clientLeft;
    var cTop = c.offsetTop + c.clientTop;
    var x = event.pageX - cLeft, y = event.pageY - cTop;
    for (let i = 0; i < 10; i++) {
        fireworks.push(new Firework(x, y, window.innerWidth, window.innerHeight));
    }
});
window.addEventListener("resize", function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
});
var timer = setInterval(loop);

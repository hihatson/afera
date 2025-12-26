const container = document.querySelector('.circle-container');
const canvas = container.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

const centerText = document.querySelector('.center-text');

const radius = container.offsetWidth / 2;
const center = radius;

const dotsCount = 10;
const dots = [];

for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    container.appendChild(dot);

    dots.push({
        el: dot,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        flickerSpeed: Math.random() * 0.001 + 0.001,
        x: 0,
        y: 0
    });
}

const texts = [ "", "" ];

let index = 0;

centerText.addEventListener('click', () => {
    if(index < texts.length) {
        centerText.textContent = texts[index];
        index++;
    } else {
        centerText.textContent = "";
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(d => {
        d.angle += d.speed;

        d.x = center + Math.cos(d.angle) * (radius - 2);
        d.y = center + Math.sin(d.angle) * (radius - 2);

        d.el.style.left = `${d.x}px`;
        d.el.style.top = `${d.y}px`;

        const opacity = 0.3 + Math.abs(Math.sin(Date.now() * d.flickerSpeed)) * 0.7;
        d.el.style.opacity = opacity;
    });

    const maxDistance = 100;
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < maxDistance) {
                ctx.strokeStyle = `rgba(255,255,255,${1.1 - dist / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(dots[i].x + 2, dots[i].y + 2);
                ctx.lineTo(dots[j].x + 2, dots[j].y + 2);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

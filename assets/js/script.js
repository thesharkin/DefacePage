
const titles = [
    "Hacked By Sharkin",
    "System Compromised",
    "Security Breach",
    "Access Denied",
    "System Override",
    "Control: Failed",
    "Security: Bypassed"
];


const MATRIX_CONFIG = {
    chars: '01',
    fontSize: 12,
    speed: 1.2,
    spawnRate: 0.95,
    frameRate: 30
};


function initTitleAnimation() {
    let currentIndex = 0;
    setInterval(() => {
        document.title = titles[currentIndex];
        currentIndex = (currentIndex + 1) % titles.length;
    }, 200);
}


function initSecurityMeasures() {
    
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('mousedown', e => {
        if (e.detail > 1) e.preventDefault();
    });

    
    document.addEventListener('contextmenu', e => e.preventDefault());

    
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && ['+', '-', '0'].includes(e.key)) {
            e.preventDefault();
        }
        e.preventDefault();
    });

    document.addEventListener('wheel', e => {
        if (e.ctrlKey || e.metaKey) e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchstart', e => {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
}


class MatrixAnimation {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.columns = 0;
        
        this.initCanvas();
        window.addEventListener('resize', () => this.initCanvas());
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.ceil(this.canvas.width / MATRIX_CONFIG.fontSize);
        this.initDrops();
    }

    initDrops() {
        this.drops = Array(this.columns).fill().map(() => 
            Math.floor(Math.random() * -100)
        );
    }

    draw() {
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = `${MATRIX_CONFIG.fontSize}px monospace`;

        this.drops.forEach((drop, i) => {
            const char = MATRIX_CONFIG.chars[Math.floor(Math.random() * MATRIX_CONFIG.chars.length)];
            this.ctx.fillText(char, i * MATRIX_CONFIG.fontSize, drop * MATRIX_CONFIG.fontSize);

            
            if (drop * MATRIX_CONFIG.fontSize > this.canvas.height && Math.random() > MATRIX_CONFIG.spawnRate) {
                this.drops[i] = 0;
            }
            this.drops[i] += MATRIX_CONFIG.speed;
        });
    }

    start() {
        setInterval(() => this.draw(), 1000/MATRIX_CONFIG.frameRate);
    }
}


function init() {
    initTitleAnimation();
    initSecurityMeasures();
    const matrix = new MatrixAnimation();
    matrix.start();
}


document.addEventListener('DOMContentLoaded', init);

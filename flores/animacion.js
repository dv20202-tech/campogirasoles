const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const botonMusica = document.getElementById("botonMusica");
const musica = document.getElementById("musica");

let ancho;
let alto;
let girasoles = [];
let nubes = [];
let mariposas = [];
let particulas = [];

let tiempoAnterior = 0;


// ======================================================
// CONFIGURACIÓN
// ======================================================

const CONFIG = {
    cantidadGirasoles: 200,
    cantidadNubes: 200,
    cantidadMariposas: 50,
    cantidadParticulas: 700
};


// ======================================================
// CANVAS
// ======================================================

function ajustarCanvas() {

    const escala = window.devicePixelRatio || 1;

    ancho = window.innerWidth;
    alto = window.innerHeight;

    canvas.width = ancho * escala;
    canvas.height = alto * escala;

    canvas.style.width = ancho + "px";
    canvas.style.height = alto + "px";

    ctx.setTransform(
        escala,
        0,
        0,
        escala,
        0,
        0
    );
}


// ======================================================
// GIRASOL
// ======================================================

class Girasol {

    constructor(x, y, tamaño, profundidad) {

        this.x = x;
        this.y = y;

        this.tamaño = tamaño;

        this.profundidad = profundidad;

        this.fase =
            Math.random() * Math.PI * 2;

        this.velocidad =
            0.5 + Math.random() * 0.10;

        this.inclinacion =
            (Math.random() - 0.5) * 0.30;

        this.petaloVariacion =
            Math.random() * 0.30;

        this.colorPetalo =
            Math.random() > 0.5
                ? "#FFD92F"
                : "#FFC928";
    }


    dibujar(tiempo) {

        const altura =
            this.tamaño * 5.9;

        const viento =
            Math.sin(
                tiempo * this.velocidad +
                this.fase
            ) * 0.08 * this.profundidad;

        const inclinacion =
            viento + this.inclinacion;

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        // ==================================================
        // TALLO
        // ==================================================

        ctx.save();

        ctx.rotate(inclinacion);

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.bezierCurveTo(
            -this.tamaño * 0.15,
            -altura * 0.30,

            this.tamaño * 0.12,
            -altura * 0.70,

            0,
            -altura
        );

        ctx.strokeStyle = "#286B32";

        ctx.lineWidth =
            Math.max(
                2,
                this.tamaño * 0.11
            );

        ctx.lineCap = "round";

        ctx.stroke();


        // ==================================================
        // HOJA IZQUIERDA
        // ==================================================

        ctx.save();

        ctx.translate(
            -this.tamaño * 0.04,
            -altura * 0.43
        );

        ctx.rotate(-0.45);

        this.dibujarHoja(
            this.tamaño * 0.95
        );

        ctx.restore();


        // ==================================================
        // HOJA DERECHA
        // ==================================================

        ctx.save();

        ctx.translate(
            this.tamaño * 0.03,
            -altura * 0.63
        );

        ctx.rotate(0.50);

        this.dibujarHoja(
            this.tamaño * 0.82
        );

        ctx.restore();

        ctx.restore();


        // ==================================================
        // CABEZA DEL GIRASOL
        // ==================================================

        ctx.save();

        ctx.translate(
            0,
            -altura
        );

        ctx.rotate(inclinacion);

        this.dibujarFlor();

        ctx.restore();

        ctx.restore();
    }


    dibujarHoja(tamaño) {

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.bezierCurveTo(
            tamaño * 0.25,
            -tamaño * 0.30,

            tamaño * 0.75,
            -tamaño * 0.60,

            tamaño,
            -tamaño * 0.20
        );

        ctx.bezierCurveTo(
            tamaño * 0.72,
            tamaño * 0.10,

            tamaño * 0.30,
            tamaño * 0.18,

            0,
            0
        );

        ctx.fillStyle = "#398A3D";

        ctx.fill();


        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.lineTo(
            tamaño * 0.82,
            -tamaño * 0.20
        );

        ctx.strokeStyle = "#23672B";

        ctx.lineWidth = 1.2;

        ctx.stroke();
    }


    dibujarFlor() {

        const radio =
            this.tamaño;


        // ==================================================
        // PÉTALOS EXTERIORES
        // ==================================================

        const petalos = 30;

        for (let i = 0; i < petalos; i++) {

            const angulo =
                (Math.PI * 2 / petalos) * i;

            ctx.save();

            ctx.rotate(angulo);

            ctx.translate(
                0,
                -radio * 0.62
            );

            ctx.rotate(
                Math.sin(i * 1.7) *
                this.petaloVariacion
            );

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                radio * 0.23,
                radio * 0.55,
                0,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                i % 3 === 0
                    ? "#FFE044"
                    : this.colorPetalo;

            ctx.fill();

            ctx.restore();
        }


        // ==================================================
        // PÉTALOS INTERIORES
        // ==================================================

        const interiores = 18;

        for (let i = 0; i < interiores; i++) {

            const angulo =
                (Math.PI * 2 / interiores) * i +
                0.15;

            ctx.save();

            ctx.rotate(angulo);

            ctx.translate(
                0,
                -radio * 0.42
            );

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                radio * 0.17,
                radio * 0.37,
                0,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#EFA914";

            ctx.fill();

            ctx.restore();
        }


        // ==================================================
        // CENTRO
        // ==================================================

        const centro =
            radio * 0.42;

        const gradiente =
            ctx.createRadialGradient(
                0,
                0,
                1,
                0,
                0,
                centro
            );

        gradiente.addColorStop(
            0,
            "#9A5A1A"
        );

        gradiente.addColorStop(
            0.55,
            "#713B0E"
        );

        gradiente.addColorStop(
            1,
            "#3F2008"
        );


        ctx.beginPath();

        ctx.arc(
            0,
            0,
            centro,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = gradiente;

        ctx.fill();


        // ==================================================
        // SEMILLAS
        // ==================================================

        for (let i = 0; i < 65; i++) {

            const angulo =
                i * 2.399;

            const distancia =
                Math.sqrt(i / 65) *
                centro *
                0.86;

            const x =
                Math.cos(angulo) *
                distancia;

            const y =
                Math.sin(angulo) *
                distancia;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                Math.max(
                    0.8,
                    radio * 0.018
                ),
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                i % 2 === 0
                    ? "#301504"
                    : "#512708";

            ctx.fill();
        }
    }
}


// ======================================================
// CREAR CAMPO
// ======================================================

function crearCampo() {

    girasoles = [];

    for (
        let i = 0;
        i < CONFIG.cantidadGirasoles;
        i++
    ) {

        const profundidad =
            Math.random();

        const y =
            alto * 0.59 +
            profundidad *
            alto * 0.30;

        const tamaño =
            12 +
            profundidad * 32;

        const x =
            Math.random() * ancho;


        girasoles.push(
            new Girasol(
                x,
                y,
                tamaño,
                profundidad
            )
        );
    }


    // Los pequeños atrás.
    // Los grandes adelante.

    girasoles.sort(
        (a, b) =>
            a.profundidad -
            b.profundidad
    );
}


// ======================================================
// CIELO
// ======================================================

function dibujarCielo() {

    const gradiente =
        ctx.createLinearGradient(
            0,
            0,
            0,
            alto
        );

    gradiente.addColorStop(
        0,
        "#263B72"
    );

    gradiente.addColorStop(
        0.32,
        "#7D6BB0"
    );

    gradiente.addColorStop(
        0.62,
        "#E89B70"
    );

    gradiente.addColorStop(
        0.82,
        "#F7C96B"
    );

    gradiente.addColorStop(
        1,
        "#D98A46"
    );

    ctx.fillStyle = gradiente;

    ctx.fillRect(
        0,
        0,
        ancho,
        alto
    );
}


// ======================================================
// SOL
// ======================================================

function dibujarSol() {

    const x =
        ancho * 0.78;

    const y =
        alto * 0.32;

    const radio = 70;


    // Brillo exterior

    const brillo =
        ctx.createRadialGradient(
            x,
            y,
            10,
            x,
            y,
            radio * 2.5
        );

    brillo.addColorStop(
        0,
        "rgba(255,230,120,0.45)"
    );

    brillo.addColorStop(
        0.4,
        "rgba(255,190,90,0.18)"
    );

    brillo.addColorStop(
        1,
        "rgba(255,150,50,0)"
    );


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radio * 2.5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = brillo;

    ctx.fill();


    // Sol

    const sol =
        ctx.createRadialGradient(
            x - 15,
            y - 15,
            5,
            x,
            y,
            radio
        );

    sol.addColorStop(
        0,
        "#FFFBE0"
    );

    sol.addColorStop(
        0.6,
        "#FFD86B"
    );

    sol.addColorStop(
        1,
        "#F5A642"
    );


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radio,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = sol;

    ctx.fill();
}


// ======================================================
// NUBES
// ======================================================

function crearNubes() {

    nubes = [];

    for (
        let i = 0;
        i < CONFIG.cantidadNubes;
        i++
    ) {

        nubes.push({
            x: Math.random() * ancho,
            y:
                alto *
                (0.10 + Math.random() * 0.30),

            escala:
                0.5 +
                Math.random() * 0.9,

            velocidad:
                8 +
                Math.random() * 12
        });
    }
}


function dibujarNube(nube, tiempo) {

    let x =
        nube.x +
        tiempo *
        nube.velocidad;

    // Cuando sale por la derecha,
    // vuelve por la izquierda.

    if (x > ancho + 250) {

        x = -250;
    }


    ctx.save();

    ctx.translate(
        x,
        nube.y
    );

    ctx.scale(
        nube.escala,
        nube.escala
    );


    ctx.fillStyle =
        "rgba(255,255,255,0.22)";


    ctx.beginPath();

    ctx.arc(
        0,
        20,
        28,
        0,
        Math.PI * 2
    );

    ctx.arc(
        38,
        0,
        42,
        0,
        Math.PI * 2
    );

    ctx.arc(
        82,
        20,
        30,
        0,
        Math.PI * 2
    );

    ctx.arc(
        45,
        30,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}


// ======================================================
// MONTAÑAS DEL FONDO
// ======================================================

function dibujarMontañas() {

    const base =
        alto * 0.73;


    ctx.beginPath();

    ctx.moveTo(
        0,
        base
    );


    ctx.lineTo(
        ancho * 0.12,
        alto * 0.57
    );

    ctx.lineTo(
        ancho * 0.24,
        alto * 0.70
    );

    ctx.lineTo(
        ancho * 0.39,
        alto * 0.51
    );

    ctx.lineTo(
        ancho * 0.53,
        alto * 0.68
    );

    ctx.lineTo(
        ancho * 0.70,
        alto * 0.55
    );

    ctx.lineTo(
        ancho * 0.86,
        alto * 0.69
    );

    ctx.lineTo(
        ancho,
        alto * 0.58
    );

    ctx.lineTo(
        ancho,
        base
    );

    ctx.closePath();


    ctx.fillStyle =
        "rgba(50,65,65,0.55)";

    ctx.fill();
}


// ======================================================
// SUELO
// ======================================================

function dibujarSuelo() {

    const inicio =
        alto * 0.78;


    const gradiente =
        ctx.createLinearGradient(
            0,
            inicio,
            0,
            alto
        );

    gradiente.addColorStop(
        0,
        "#537B35"
    );

    gradiente.addColorStop(
        0.5,
        "#365E29"
    );

    gradiente.addColorStop(
        1,
        "#1E3D20"
    );


    ctx.fillStyle =
        gradiente;

    ctx.fillRect(
        0,
        inicio,
        ancho,
        alto - inicio
    );
}


// ======================================================
// PASTO
// ======================================================

function dibujarPasto(tiempo) {

    const inicio =
        alto * 0.80;

    ctx.lineWidth = 1;


    for (
        let x = 0;
        x < ancho;
        x += 9
    ) {

        const altura =
            8 +
            Math.random() * 18;

        const movimiento =
            Math.sin(
                tiempo * 2 +
                x * 0.05
            ) * 3;


        ctx.beginPath();

        ctx.moveTo(
            x,
            inicio + 25
        );

        ctx.lineTo(
            x + movimiento,
            inicio + 25 - altura
        );

        ctx.strokeStyle =
            "#294D25";

        ctx.stroke();
    }
}


// ======================================================
// MARIPOSAS
// ======================================================

function crearMariposas() {

    mariposas = [];

    for (
        let i = 0;
        i < CONFIG.cantidadMariposas;
        i++
    ) {

        mariposas.push({

            x:
                Math.random() * ancho,

            y:
                alto *
                (0.35 +
                    Math.random() * 0.35),

            velocidad:
                12 +
                Math.random() * 20,

            fase:
                Math.random() *
                Math.PI * 2,

            tamaño:
                4 +
                Math.random() * 4
        });
    }
}


function dibujarMariposa(
    mariposa,
    tiempo
) {

    const x =
        mariposa.x +
        Math.sin(
            tiempo *
            0.7 +
            mariposa.fase
        ) * 50;

    const y =
        mariposa.y +
        Math.sin(
            tiempo *
            1.8 +
            mariposa.fase
        ) * 25;

    const aleteo =
        Math.sin(
            tiempo * 10 +
            mariposa.fase
        );


    ctx.save();

    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        Math.sin(
            tiempo +
            mariposa.fase
        ) * 0.2
    );


    // Ala izquierda

    ctx.save();

    ctx.scale(
        1,
        0.5 +
        Math.abs(aleteo) * 0.5
    );

    ctx.beginPath();

    ctx.ellipse(
        -mariposa.tamaño,
        0,
        mariposa.tamaño,
        mariposa.tamaño * 0.7,
        -0.4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#F7D35A";

    ctx.fill();

    ctx.restore();


    // Ala derecha

    ctx.save();

    ctx.scale(
        1,
        0.5 +
        Math.abs(aleteo) * 0.5
    );

    ctx.beginPath();

    ctx.ellipse(
        mariposa.tamaño,
        0,
        mariposa.tamaño,
        mariposa.tamaño * 0.7,
        0.4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#EFAE4A";

    ctx.fill();

    ctx.restore();


    // Cuerpo

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        1.5,
        mariposa.tamaño * 0.8,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#3A2417";

    ctx.fill();


    ctx.restore();
}


// ======================================================
// PARTÍCULAS
// ======================================================

function crearParticulas() {

    particulas = [];

    for (
        let i = 0;
        i < CONFIG.cantidadParticulas;
        i++
    ) {

        particulas.push({

            x:
                Math.random() * ancho,

            y:
                alto *
                (0.30 +
                    Math.random() * 0.60),

            tamaño:
                0.7 +
                Math.random() * 2,

            velocidad:
                5 +
                Math.random() * 12,

            fase:
                Math.random() *
                Math.PI * 2
        });
    }
}


function dibujarParticulas(
    tiempo
) {

    for (
        const particula
        of particulas
    ) {

        const x =
            particula.x +
            Math.sin(
                tiempo +
                particula.fase
            ) * 15;

        const y =
            particula.y -
            tiempo *
            particula.velocidad;


        if (y < alto * 0.20) {

            particula.y =
                alto;

        }


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            particula.tamaño,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,235,160,0.55)";

        ctx.fill();
    }
}


// ======================================================
// ANIMACIÓN
// ======================================================

function animar(tiempo) {

    const segundos =
        tiempo * 0.001;


    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    // CIELO

    dibujarCielo();

    dibujarSol();


    // NUBES

    for (
        const nube
        of nubes
    ) {

        dibujarNube(
            nube,
            segundos
        );
    }


    // MONTAÑAS

    dibujarMontañas();


    // SUELO

    dibujarSuelo();


    // GIRASOLES

    for (
        const girasol
        of girasoles
    ) {

        girasol.dibujar(
            segundos
        );
    }


    // PASTO

    dibujarPasto(
        segundos
    );


    // MARIPOSAS

    for (
        const mariposa
        of mariposas
    ) {

        dibujarMariposa(
            mariposa,
            segundos
        );
    }


    // PARTÍCULAS

    dibujarParticulas(
        segundos
    );


    requestAnimationFrame(
        animar
    );
}


// ======================================================
// MÚSICA
// ======================================================

let reproduciendo = false;


botonMusica.addEventListener(
    "click",
    async () => {

        try {

            if (!reproduciendo) {

                await musica.play();

                reproduciendo = true;

                botonMusica.textContent =
                    "🔊 Pausar música";

            } else {

                musica.pause();

                reproduciendo = false;

                botonMusica.textContent =
                    "🎵 Reproducir música";
            }

        } catch (error) {

            console.error(
                error
            );

            botonMusica.textContent =
                "⚠️ Error con la música";
        }
    }
);


// ======================================================
// REDIMENSIONAR
// ======================================================

window.addEventListener(
    "resize",
    () => {

        ajustarCanvas();

        crearCampo();

        crearNubes();

        crearMariposas();

        crearParticulas();
    }
);


// ======================================================
// INICIO
// ======================================================

ajustarCanvas();

crearCampo();

crearNubes();

crearMariposas();

crearParticulas();

requestAnimationFrame(
    animar
);
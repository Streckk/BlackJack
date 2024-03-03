//Declaración de variables
let deck          = [];
const tipos       = ['C','D','H','S'];
const especiales  = ['A','J','Q','K'];
let puntosJugador = 0,
puntosComputadora = 0;
//Referencias del HTML con doom
const btnPedir          = document.querySelector('#btnPedir');
const puntaje           = document.querySelectorAll('small');
const jugadorCartas     = document.querySelector('#jugador-cartas');
const ComputadoraCartas = document.querySelector('#Computadora-cartas');
const btnDetener        = document.querySelector('#btnDetener');
const btnNuevo          = document.querySelector('#btnNuevo');
//Esta funcion crear una nueva baraja
const crearDeck = () => {
    /*
    Lo que hacemos aca es sacar las barajas
    de los numeros empezando desde el 2 teniendo
    un limite de 10 
    ejemplo
    2C,2D,2H,2S
    3C,3D,3H,3S
    Y asi concecutivamente hasta el numero 10
    10C,10D,10H,10S
    el otro for of lo utilizamos para leer nuestro arreglo
    de tipos con el cual asignaremos el numero y la letra
    que vaya recorriendo
    */
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
             deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    
    deck = _.shuffle(deck);
    return deck;
}
//Recuerda tenemos que mandar llamar a la función para utilizarla
crearDeck();

const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    return (isNaN(valor) ) ?
           (valor === 'A') ? 11: 10
           :valor * 1;
}

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntaje[1].innerText = `${puntosComputadora}`;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        ComputadoraCartas.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));
    setTimeout(() => {
        if (puntosJugador === puntosMinimos) {
            alert('Nadie gana');
        }else if (puntosMinimos > 21) {
            alert('El ganador es la computadora');
            
            }else if (puntosComputadora > 21) {
                alert('El ganador es el jugador');
            }else{
                alert('Computadora Gana!!')
            }
        }, 10);

}

//Eventos de botones
btnPedir.addEventListener('click',() => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntaje[0].innerText = `${puntosJugador}`;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        jugadorCartas.append(imgCarta);
 
        if (puntosJugador > 21) {
              btnPedir.disabled = true;
              btnDetener.disabled = true;
              turnoComputadora( puntosJugador );
        }else if (puntosJugador === 21) {
            console.warn('Ganaste!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    }
);

btnDetener.addEventListener('click',() => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
    
    },
    
);

btnNuevo.addEventListener('click', () => {
        deck                =[];
        deck                = crearDeck();
        puntosJugador       = 0;
        puntosComputadora   = 0;
        puntaje[0].innerText          = 0;
        puntaje[1].innerText          = 0;
        jugadorCartas.innerHTML       = '';
        ComputadoraCartas.innerHTML   = '';
        btnPedir.disabled             = false;
        btnDetener.disabled           = false;
    }
);
 


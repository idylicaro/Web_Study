function novoElemento(tagname, classname){
    const elem = document.createElement(tagname);
        elem.classList.add(classname);
        return elem;
}

function Barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira');

    const borda = novoElemento('div','borda');
    const corpo = novoElemento('div','corpo');

    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);
    
    this.setAltura = altura => corpo.style.height = `${altura}px`;
}

// const b = new Barreira(true);
// b.setAltura(900);
// document.querySelector('[wm-flappy]').appendChild(b.elemento);

function ParDeBarreiras(altura, abertura, xPos){
    this.elemento = novoElemento('div', 'par-de-barreiras');

    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random()*(altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
    this.setX = x => this.elemento.style.left = `${x}px`;
    this.getLargura = () => this.elemento.clientWidth;
    
    this.sortearAbertura();
    this.setX(xPos);
}

// const b = new ParDeBarreiras(600, 200, 400);
// document.querySelector('[wm-flappy]').appendChild(b.elemento);

// a largura aqui no caso é a posição inicial de inicialização da barreira (final da div )
function Barreiras(altura, largura, abertura, espaco, notificaPonto){
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3),
    ]
    
    this.deslocamento = 3;
    this.animar = () =>{
        this.pares.forEach(par => {
            par.setX(par.getX() - this.deslocamento);

            //quando sair da tela
            if(par.getX() < -par.getLargura()){
                par.setX(par.getX() + espaco * this.pares.length);
                par.sortearAbertura();
            }

            const meio = largura / 2;
            //isso aqui em baixo pode ser feito com if em vez desse &&
            const cruzouOMeio = par.getX() + this.deslocamento >= meio
                && par.getX() < meio
                if(cruzouOMeio){
                    notificaPonto();
                }
        });
    }
}

function Passaro(alturaJogo){
    let pulo = false;

    this.elemento = novoElemento('img','passaro');
    this.elemento.src = 'imgs/passaro.png';

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
    this.setY = y => this.elemento.style.bottom = `${y}px`;

    window.onkeydown = e =>  pulo = true;
    
    window.onkeyup = e => pulo = false;

    this.animar = () => {
        const novoY = this.getY() + (pulo ? 8 : -6); 
        const alturaMaxima = alturaJogo - this.elemento.clientHeight;

        if(novoY <= 0){
            this.setY(0);
        }else if(novoY >= alturaMaxima){
            this.setY(alturaMaxima);
        }else{
            this.setY(novoY);
        }
    }
    this.setY(alturaJogo / 2);
}

function Progresso() {
    this.elemento = novoElemento('span', 'progresso');
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos;
    }
    this.atualizarPontos(0);
}
    function estaoSobrepostos(elementoA,elementoB){
        const a = elementoA.getBoundingClientRect();
        const b = elementoB.getBoundingClientRect();
        
        const horizontal = a.left + a.width >= b.left
                            && b.left + b.width >= a.left
        
        const vertical = a.top + a.height >= b.top
                            && b.top + b.height >= a.top
        
        return horizontal && vertical;

    }

    function colidiu(passaro, barreira){
        let colidiu = false;
        barreira.pares.forEach(parDeBarreiras => {
            if(!colidiu){
                const superior = parDeBarreiras.superior.elemento;
                const inferior = parDeBarreiras.inferior.elemento;
                
                colidiu = estaoSobrepostos(passaro.elemento, superior)
                            || estaoSobrepostos(passaro.elemento, inferior);
                
            }
        });
        return colidiu;
    }



function FlappyBird(){
    let pontos = 0;

    const areaDoJogo = document.querySelector('[wm-flappy]');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    const barreiras = new Barreiras(altura, largura,200,400,
        () => {
            progresso.atualizarPontos(++pontos);
            barreiras.deslocamento += 0.10;
        });

    const passaro = new Passaro(altura);
    
    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);
    barreiras.pares.forEach(par => {
        areaDoJogo.appendChild(par.elemento);
    });
    this.start = () => {
        // loop do jogo
        const temporizador = setInterval(() =>{
            barreiras.animar();
            passaro.animar();

             if(colidiu(passaro, barreiras)){
                 clearInterval(temporizador);
             }
        },20);
    }
}

new FlappyBird().start();
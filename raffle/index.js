module.exports = function (itens){
    return itens[getRandomInt(0,itens.length)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

//console.log(Raffle(['Raul','Icaro','Igor']));

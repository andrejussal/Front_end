

var divSquare = '<div id="s$coord" class="square $color"></div>'; // mazoji "s" reiskia "square", "coord" - koordinate

$(function() {
    // $('.board').html('');
    // $('.board').append('<div class="square white"><div class="figure">&#9814</div></div>');
    // $('.board').append('<div class="square black"><div class="figure">&#9820</div></div>');

    addSquares();
});

function addSquares(){
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++) {
        // $('.board').append(divSquare.replace('$color', 'white'));
        // $('.board').append(divSquare.replace('$color', 'black'));
        $('.board').append(divSquare
            .replace('$coord', coord) // duodamos koordinates per ID
            .replace('$color', isBlackSquareAt(coord) ? 'black' : 'white'));
    }
}

function isBlackSquareAt(coord){
    return (coord % 8 + Math.floor(coord / 8)) % 2; // "Math.round" netinka, nes penkti langeliai kartoja ketvirtus
}

var map;
var divSquare = '<div id="s$coord" class="square $color"></div>'; // mazoji "s" reiskia "square", "coord" - koordinate
var divFigure = '<div id="f$coord" class="figure">$figure</div>'; // mazoji "f" reiskia "figure", "coord" - koordinate

$(function() { // Dolerio zenklas pries "function naudojamas tam, kad priristi f-ja prie ivykio!!!. Svarbu"
    start();
});

function start() { // Daug visur visko inicializuota, todel reikia naujos f-jos viskam, kas vyksta pacioje pradzioje
    map = new Array(64);
    // $('.board').html('');
    // $('.board').append('<div class="square white"><div class="figure">&#9814</div></div>');
    // $('.board').append('<div class="square black"><div class="figure">&#9820</div></div>');

    addSquares();
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');

    // Is https://lichess.org/editor (kaip "FEN") imamos reiksmes figuroms. Svarbu, kad butu 64 simboliai
    // Virsutine f-ja yra parasyta vietoj apacioje esanciu
    // showFigureAt(0, 'r');
    // ...
    // showFigureAt(63, 'R');

    setDraggable ();
}

function setDraggable() {
    $('.figure').draggable();
}

function setDroppable() {
    $('.square').droppable( {
        drop: function(event,ui) {
                var frCoord = ui.draggable.attr('id').substring(1); // "substring(1)" nuima pirma raide pries $
                var toCoord = this.id.substring(1);
                console.log(event);
                console.log(ui);
                moveFigure(frCoord, toCoord);
              }
    }); 
}

function moveFigure(frCoord, toCoord) {
    console.log('// ---');
    console.log('move from: '+ frCoord +' to: '+ toCoord);
    figure = 'P'; // Visada eiti pradeda baltas pestininkas "P"
    showFigureAt(frCoord, '1');
    showFigureAt(toCoord, figure);
    setDraggable();
}

function addSquares(){
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++) {
        // $('.board').append(divSquare.replace('$color', 'white'));
        // $('.board').append(divSquare.replace('$color', 'black'));
        $('.board').append(divSquare
            .replace('$coord', coord) // duodamos koordinates per ID
            .replace('$color', isBlackSquareAt(coord) ? 'black' : 'white'));
    }
        setDroppable ();
}

function showFigures(figures) {
    for (var coord = 0; coord < 64; coord++) {
        showFigureAt(coord, figures.charAt(coord));
    }
}

function isBlackSquareAt(coord){
    return (coord % 8 + Math.floor(coord / 8)) % 2; // "Math.round" netinka, nes penkti langeliai kartoja ketvirtus
}

function showFigureAt(coord, figure) {
    $('#s' + coord).html(divFigure
        .replace('$coord', coord)
        .replace('$figure', getChessSymbol(figure)));
}

function getChessSymbol(figure) {
    switch (figure) {
        case 'K' : return '&#9812;';
        case 'Q' : return '&#9813;';
        case 'R' : return '&#9814;';
        case 'B' : return '&#9815;';
        case 'N' : return '&#9816;';
        case 'P' : return '&#9817;';
        case 'k' : return '&#9818;';
        case 'q' : return '&#9819;';
        case 'r' : return '&#9820;';
        case 'b' : return '&#9821;';
        case 'n' : return '&#9822;';
        case 'p' : return '&#9823;';
        default  : return '';
    }
}
var map;
var divSquare = '<div id="s$coord" class="square $color"></div>';
var divFigure = '<div id="f$coord" class="figure">$figure</div>';

$(function() { 
    start();
});

//------------------------ Daug visur visko inicializuota, todel reikia naujos f-jos viskam, kas vyksta pacioje pradzioje
function start() { 
    map = new Array(64);    
    setHeaderSidesFooter();                            
    addSquares();
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    setDraggable ();
}

//---------------------------- Prasideda raidziu is skaiciu spanai ------------------------
function setHeaderSidesFooter() {
    var letter = ('abcdefgh');
    var numbers = ('87654321');
    $('.header').html('');
    $('.footer').html('');
    $('.left-side').html('');
    $('mid-side').html('');
    for (var i=0; i<8; i++) { 
        $('.header').append('<span class="letter">'+ letter[i] +'</span>');
        $('.footer').append('<span class="letter">'+ letter[i] +'</span>');
        $('.left-side').append('<span class="numbers">'+ numbers[i] +'</span>');
        $('.mid-side').append('<span class="numbers">'+ numbers[i] +'</span>');        
    }
}

//---------------------------- Prasideda darbas su sachmatu lenta, figuromis, draginimu --
function setDraggable() {
    $('.figure').draggable();
}

function setDroppable() {
    $('.square').droppable( {
        drop: function(event,ui) {
            var frCoord = ui.draggable.attr('id').substring(1); // "substring(1)" nuima pirma raide pries $
            var toCoord = this.id.substring(1);
            moveFigure(frCoord, toCoord);
        }
    }); 
}

function whatMove ( ) {
    var figureName = '';
    if (figure === 'P' || figure === 'p') { figureName = 'pėstininkas'; }
    if (figure === 'K' || figure === 'k') { figureName = 'Karalius'; }
    if (figure === 'Q' || figure === 'q') { figureName = 'Karalienė'; }
    if (figure === 'R' || figure === 'r') { figureName = 'bokštas'; }
    if (figure === 'B' || figure === 'b') { figureName = 'rikis'; }
    if (figure === 'N' || figure === 'n') { figureName = 'žirgas'; }
    if (figure == figure.toUpperCase()) { 
        $('.left-p').append('<p>'+ figureName +' : '+ event +'</p>');
    } else {
        $('.right-p').append('<p>'+ figureName +' : '+ event +'</p>');
    }
}

function moveFigure(frCoord, toCoord) {
    var letters = ('bcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgha');
    var numbers = ('8888888877777777666666665555555544444444333333332222222211111111');
    var move_from = '';
    var move_to = '';
    for (var i = 0; i < frCoord; i++) {
        if (i+1 == frCoord){
            move_from = letters[i] + numbers[i];
        }
    }
        for (var i = 0; i < toCoord; i++) {
            if (i+1 == toCoord) {
                move_to = letters[i] + numbers[i];
            }
        }
    event = move_from +' - '+ move_to;
    figure = map[frCoord];
    showFigureAt(frCoord, '1');
    showFigureAt(toCoord, figure);
    setDraggable();
    whatMove ();
}

function addSquares() {
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++) {
        $('.board').append(divSquare
            .replace('$coord', coord) // duodamos koordinates per ID
            .replace('$color', isBlackSquareAt(coord) ? 'black' : 'white'));
    }
}

function showFigures(figures) {
    for (var coord = 0; coord < 64; coord++) {
        showFigureAt(coord, figures.charAt(coord));
    }
}

function isBlackSquareAt(coord) {
    return (coord % 8 + Math.floor(coord / 8)) % 2; // "Math.round" netinka, nes penkti langeliai kartoja ketvirtus
}

function showFigureAt(coord, figure) {
    map[coord] = figure;
    $('#s' + coord).html(divFigure
        .replace('$coord', coord)
        .replace('$figure', getChessSymbol(figure)));
        setDroppable ();
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
//---------------------------- Baigiasi darbas su sachmatu lenta, figuromis, draginimu --
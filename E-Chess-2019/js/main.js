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
var players_symbols = ['X', 'O']; // symbols used by players
var turn_of = 0; //this is used to define which player's turn it is
var game_over = false; // this helps in checking if the game is over
var message_game_over = ""; // message shown at the end of the game
var victory; // this helps identify how to win (row, column or diagonal)
var limit_turns; // this is used to set the maximum number of moves depending on the size of the board
var number_turn = 1;// turn counter used to check tie
var dimension_board = 2; // the board size is defined by dimension_board + 1
var score0 = document.getElementById('player0_score');
var score1 = document.getElementById('player1_score');

//the game starts by default with a 3x3 board -> 2+1 = 3
(function () {
    restart(2);
})();

// if you want, you can use this function to generate boards of different sizes
function custom_board() {
    dimension = parseInt(document.getElementById('custom_board').value);
    if ((dimension) > 1) {
        restart(dimension - 1);
    }
    else {
        alert("you need to enter an integer value greater than 1")
    }
}

function create_board(dimension) {
    let new_board = "";
    board = [];
    for (x = 0; x <= dimension; x++) {
        new_board += "<tr>\n";
        board.push([]);
        for (y = 0; y <= dimension; y++) {
            new_board += "<td id='" + x + y + "' onclick='turn(this.id)'></td>\n";
            board[x].push('');
        }
        new_board += "</tr>\n";
    }
    game_over = false;
    document.getElementById('board').innerHTML = new_board;
}

function restart(change) {
    number_turn = 0;
    document.getElementById('output').innerHTML = "";
    if (!change === false) dimension_board = change;
    create_board(dimension_board);
    limit_turns = (dimension_board + 1) ** 2;
}

function change_player() {
    if (turn_of == 0) turn_of = 1;
    else turn_of = 0;
}
// the move coordinates are identified by the id, which is passed as a string
function turn(id_coord) {
    if (!game_over) {
        row = parseInt(id_coord[0]);
        col = parseInt(id_coord[1]);
        if (board[row][col] == "") {
            document.getElementById(id_coord).innerHTML = players_symbols[turn_of];
            board[row][col] = players_symbols[turn_of];
            change_player();
            number_turn++;
        }
        check_game_over();
    }
}
function coloring_board(type_victory) {
    if (type_victory[0] == 'c') {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(type_victory[1]);
            document.getElementById(id_to_color).classList.add('bg-success', 'text-white');

        }
        return 0;
    }
    if (type_victory[0] == 'r') {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(type_victory[1]) + String(x);
            document.getElementById(id_to_color).classList.add('bg-success', 'text-white');
        }
        return 0;

    }
    if (type_victory[0] == 'd' && type_victory[1] == 0) {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(x);
            document.getElementById(id_to_color).classList.add('bg-success', 'text-white');
        }
        return 0;
    }
    if (type_victory[0] == 'd' && type_victory[1] == 1) {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(dimension_board - x);
            document.getElementById(id_to_color).classList.add('bg-success', 'text-white');
        }
        return 0;
    }
}

function uptade_score(winner) {
    if (winner == 0) score0.innerHTML = 1 + parseInt(score0.innerHTML);
    else if (winner == 1) score1.innerHTML = 1 + parseInt(score1.innerHTML);
}

function check_game_over() {

    // checking win in rows
    for (x = 0; x <= dimension_board; x++) {
        count_player0_row = 0;
        count_player1_row = 0;
        for (y = 0; y < dimension_board && !game_over; y++) {
            if (board[x][y] == board[x][y + 1]) {
                if (board[x][y] == players_symbols[0]) count_player0_row++;
                if (board[x][y] == players_symbols[1]) count_player1_row++;
            }
            if (count_player0_row == dimension_board) {
                message_game_over = "The player with " + players_symbols[0] + " won!";
                game_over = true;
                victory = ["r", x, 0];
            }
            if (count_player1_row == dimension_board) {
                message_game_over = "The player with " + players_symbols[1] + " won!";
                game_over = true;
                victory = ["r", x, 1];
            }
        }

    }
    // checking win in cols
    for (x = 0; x <= dimension_board; x++) {
        count_player0_col = 0;
        count_player1_col = 0;
        for (y = 0; y < dimension_board && !game_over; y++) {
            if (board[y][x] == board[y + 1][x]) {
                if (board[y][x] == players_symbols[0]) count_player0_col++;
                if (board[y][x] == players_symbols[1]) count_player1_col++;
            }
            if (count_player0_col == dimension_board) {
                message_game_over = "The player with " + players_symbols[0] + " won!";
                game_over = true;
                victory = ["c", x, 0];
            }
            if (count_player1_col == dimension_board) {
                message_game_over = "The player with " + players_symbols[1] + " won!";
                game_over = true;
                victory = ["c", x, 1];
            }
        }
    }

    // checking principal diagonal
    count_player0_principal_diagonal = 0;
    count_player1_principal_diagonal = 0;
    for (x = 0; x < dimension_board; x++) {
        if (board[x][x] == board[x + 1][x + 1]) {
            if (board[x][x] == players_symbols[0]) count_player0_principal_diagonal++;
            if (board[x][x] == players_symbols[1]) count_player1_principal_diagonal++;
        }
        if (count_player0_principal_diagonal == dimension_board) {
            message_game_over = "The player with " + players_symbols[0] + " won!";
            game_over = true;
            victory = ["d", 0, 0];
        }
        if (count_player1_principal_diagonal == dimension_board) {
            message_game_over = "The player with " + players_symbols[1] + " won!";
            game_over = true;
            victory = ["d", 0, 1];
        }
    }

    // checking secundary diagonal
    count_player0_secundary_diagonal = 0;
    count_player1_secundary_diagonal = 0;
    for (x = 0; x < dimension_board; x++) {
        if (board[x][dimension_board - x] == board[x + 1][dimension_board - x - 1]) {
            if (board[x][dimension_board - x] == players_symbols[0]) count_player0_secundary_diagonal++;
            if (board[x][dimension_board - x] == players_symbols[1]) count_player1_secundary_diagonal++;
        }
        if (count_player0_secundary_diagonal == dimension_board) {
            message_game_over = "The player with " + players_symbols[0] + " won!";
            game_over = true;
            victory = ["d", 1, 0];
        }
        if (count_player1_secundary_diagonal == dimension_board) {
            message_game_over = "The player with " + players_symbols[1] + " won!";
            game_over = true;
            victory = ["d", 1, 1];
        }
    }
    if (number_turn == limit_turns && !game_over) {
        game_over = true;
        message_game_over = "It's a draw!"
        victory = 0;
    }
    if (game_over) {
        document.getElementById('output').innerHTML = message_game_over;
        coloring_board(victory);
        uptade_score(victory[2]);
    }
}
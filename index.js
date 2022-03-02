// the player1 always plays first - MAS NÃO PRECISA SER SEMPRE ASSIM, PARSA
var players_symbols = ['X', 'O'];
var turn_of = 0;
var game_over = false;
var message_game_over = "";
var victory;
// the board size is defined by dimension_board + 1, for example if the dimension is 2, the board will be 3x3
var dimension_board = 2;
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
function create_board() {

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
        }
        check_game_over();
    }
}
function coloring_board(type_victory) {
    if (type_victory[0] == 'c') {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(type_victory[1]);
            document.getElementById(id_to_color).classList.add('bg-success');
        }
    }
    if (type_victory[0] == 'r') {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(type_victory[1]) + String(x);
            document.getElementById(id_to_color).classList.add('bg-success');
        }
    }
    if (type_victory[0] == 'd' && type_victory[1] == 0) {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(x);
            document.getElementById(id_to_color).classList.add('bg-success');
        }
    }
    if (type_victory[0] == 'd' && type_victory[1] == 1) {
        for (x = 0; x <= dimension_board; x++) {
            id_to_color = String(x) + String(dimension_board - x);
            document.getElementById(id_to_color).classList.add('bg-success');
        }
    }
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
    if (game_over) {
        console.log(message_game_over);
        coloring_board(victory);
    }
}
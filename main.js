const cells = document.querySelectorAll('.cell');
const status_text = document.querySelector('#status-text');
const restart_btn = document.querySelector('#restart-btn');
const win_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const options = ['', '', '', '', '', '', '', '', ''];
let current_player = 'X';
let running = false;

const initialize_game = () => {
  cells.forEach((cell) => cell.addEventListener('click', cell_clicked));
  restart_btn.addEventListener('click', restart_btn);
  status_text.textContent = `${current_player}'s turn`;
  running = true;
};

const cell_clicked = () => {
  const cell_index = this.getAttribute(cell_index);
  if (options[cell_index] != '' || !running) {
    return;
  }
  update_cell(this, cell_index);
  check_winner();
};

const update_cell = (cell, index) => {
  options[index] = current_player;
  cell.textContent = current_player;
};

const change_player = () => {
  current_player = current_player == 'X' ? 'O' : 'X';
  status_text.textContent = `${current_player}'s turn`;
};

const check_winner = () => {
  let round_won = false;
  for (let i = 0; i < win_conditions.length; i++) {
    const condition = win_conditions[i];
    const cell_a = options[condition][0];
    const cell_b = options[condition][1];
    const cell_c = options[condition][2];
    if (cell_a == '' || cell_b == '' || cell_c == '') {
      continue;
    }
    if (cell_a == cell_b && cell_b == cell_c) {
      round_won = true;
      break;
    }
  }
  if (round_won) {
    status_text.textContent = `${current_player} wins!`;
    running = false;
  } else if (options.includes('')) {
    status_text.textContent = 'Draw!';
    running = false;
  } else {
    change_player();
  }
};

const restart_game = () => {
  current_player = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  status_text.textContent = `${current_player}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
};

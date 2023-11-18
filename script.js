const game = (() => {
	const gameOverDOM = document.getElementById('game-over');
	const winner = document.getElementById('winner');
	const playAgain = document.getElementById('play-again');

	// Initalize Game Board
	const gameBoard = (() => {
		// const newBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
		const newBoard = ['', '', '', '', '', '', '', '', ''];
		let board = [...newBoard];

		const updateBoard = (symbol, move) => {
			board[move] = symbol;
			updateDOM();
			if (checkWin() !== '') {
				console.log('winner');
				gameOverDOM.classList.remove('hidden');
				winner.textContent = `${checkWin()} Wins!`;
			}
		};

		const resetBoard = () => {
			board = [...newBoard];
			player.resetPlayer();
			updateDOM();
		};

		// Click Event Listeners
		const addListeners = () => {
			const squares = [...document.getElementsByClassName('square')];
			squares.forEach((square, index) => {
				square.addEventListener('click', () => {
					// Need to find way to change board array then reflect it to the board not the other way arround?
					// Update text content, update board array using array of dom elements?
					player.makeMove(index);
				});
			});
		};

		const updateDOM = () => {
			// Create the Skeleton for the game-board rows
			const DOMBoard = document.getElementById('game-board');
			const row0 = document.createElement('div');
			const row1 = document.createElement('div');
			const row2 = document.createElement('div');

			row0.setAttribute('id', 'row-0');
			row1.setAttribute('id', 'row-1');
			row2.setAttribute('id', 'row-2');

			DOMBoard.textContent = '';
			DOMBoard.appendChild(row0);
			DOMBoard.appendChild(row1);
			DOMBoard.appendChild(row2);

			// Reference the board array to create squares
			const cells = board.map((cell, index) => {
				const square = document.createElement('div');
				square.classList.add('square');
				square.setAttribute('id', `square-${index}`);
				square.textContent = cell;
				return square;
			});

			// Loop through the array to append to each row
			for (let i = 0; i < 3; i++) {
				row0.appendChild(cells[i]);
			}

			for (let i = 3; i < 6; i++) {
				row1.appendChild(cells[i]);
			}

			for (let i = 6; i < 9; i++) {
				row2.appendChild(cells[i]);
			}

			addListeners();
		};

		const getBoard = () => {
			return board;
		};

		const checkWin = () => {
			// Come back to this
			let gameWinner = '';

			const xWin = 'XXX';
			const oWin = 'OOO';
			const verticalWin1 = board[0] + board[1] + board[2];
			const verticalWin2 = board[3] + board[4] + board[5];
			const verticalWin3 = board[6] + board[7] + board[8];

			const horizontalWin1 = board[0] + board[3] + board[6];
			const horizontalWin2 = board[1] + board[4] + board[7];
			const horizontalWin3 = board[2] + board[5] + board[9];

			const diagonalWin1 = board[0] + board[4] + board[8];
			const diagonalWin2 = board[6] + board[4] + board[2];

			const winArray = [
				verticalWin1,
				verticalWin2,
				verticalWin3,
				horizontalWin1,
				horizontalWin2,
				horizontalWin3,
				diagonalWin1,
				diagonalWin2,
			];

			winArray.forEach((winCondition) => {
				if (winCondition === xWin) {
					gameWinner = 'X';
				} else if (winCondition === oWin) {
					console.log('o should win here');
					gameWinner = 'O';
				}
			});

			return gameWinner;
		};

		return {
			updateBoard,
			resetBoard,
			getBoard,
			updateBoard,
			checkWin,
		};
	})();

	// Player Logic
	const player = (() => {
		let playerOneTurn = true;
		const playerOne = 'X';
		const playerTwo = 'O';

		const resetPlayer = () => {
			playerOneTurn = true;
		};

		const makeMove = (move) => {
			if (playerOneTurn) {
				gameBoard.updateBoard(playerOne, move);
			} else {
				gameBoard.updateBoard(playerTwo, move);
			}
			playerOneTurn = !playerOneTurn;
		};

		return { playerOneTurn, makeMove, resetPlayer };
	})();

	// Start game
	gameBoard.resetBoard();

	document.getElementById('reset').addEventListener('click', () => {
		gameBoard.resetBoard();
	});

	playAgain.addEventListener('click', () => {
		gameBoard.resetBoard();
		gameOverDOM.classList.add('hidden');
		winner.textContent = '';
	});
})();

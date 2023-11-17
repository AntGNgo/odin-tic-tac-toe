const gameLogic = (() => {
	// Initalize Game Board
	const gameBoard = (() => {
		const newBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
		const board = newBoard;

		const updateBoard = (symbol, move) => {
			board[move] = symbol;
			checkWin();
		};

		const resetBoard = () => {
			board = newBoard;
		};

		const getBoard = () => {
			return board;
		};

		const checkWin = () => {
			// Come back to this
			let gameWon = false;

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
				if (winCondition === xWin || winCondition === oWin) {
					gameWon = true;
				}
			});

			return gameWon;
		};

		return {
			updateBoard,
			resetBoard,
			getBoard,
			checkWin,
		};
	})();

	const newPlayer = (symbol) => {
		const makeMove = (move) => {
			gameBoard.updateBoard(symbol, move);
		};

		return { symbol, makeMove };
	};

	// Create Players
	const playerX = newPlayer('X');
	const playerO = newPlayer('O');

	let currentPlayer = 'X';
})();

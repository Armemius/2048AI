<script lang="ts">
  import { onMount } from "svelte";

  export let score = 0;
  export let best = 0;

  
  export let ai = false;

  type BoardCell = null | number;

  let gameOver = false;

  // type CellState = {
  //   x: number;
  //   y: number;
  //   value: number | null;
  //   birth: number;
  // };

  // type ScheduledAnimation = {
  //   type: "merge" | "move" | "upgrade";
  //   from: CellState;
  //   to: CellState;
  // };

  let board: Array<Array<BoardCell>>;
  const BOARD_SIZE = 4;
  const BEST_SCORE_ID = "best_score"

  const encrypt = (value: number) => {
    return btoa(String((value << 7) ^ 0xDEADBEEF));

  }

  const decrypt = (value: string) => {
    return (Number(atob(value)) ^ 0xDEADBEEF) >> 7;
  }

  const saveBest = () => {
    localStorage.setItem(BEST_SCORE_ID, encrypt(best))
  }

  const loadBest = () => {
    let value = localStorage.getItem(BEST_SCORE_ID);
    best = value ? decrypt(value) : 0;
  }

  export const resetBoard = () => {
    score = 0;
    board = new Array<Array<BoardCell>>();
    for (let it = 0; it < BOARD_SIZE; ++it) {
      board[it] = new Array<BoardCell>();

      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        board[it][jt] = null;
      }
    }

    genNewCell(board);
    genNewCell(board);
    gameOver = false;
  };

  onMount(() => {
    loadBest();
    resetBoard();
    setInterval(() => {
      if (!ai || gameOver) {
        return;
      }

      let factor = Math.random();
      if (factor > 0.75) {
        moveUp(board);
      } else if (factor > 0.5) {
        moveDown(board);
      } else if (factor > 0.25) {
        moveLeft(board);
      } else {
        moveRight(board);
      }
      genNewCell(board);
      gameOver = !canContinue(board);

      board = [...board];
      board = [...board];
    }, 50);
  });

  const moveUp = (board: Array<Array<BoardCell>>) => {
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        moveCellUp(board, it, jt);
      }
    }
  };

  const moveDown = (board: Array<Array<BoardCell>>) => {
    for (let it = BOARD_SIZE - 1; it >= 0; --it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        moveCellDown(board, it, jt);
      }
    }
  };

  const moveLeft = (board: Array<Array<BoardCell>>) => {
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        moveCellLeft(board, jt, it);
      }
    }
  };

  const moveRight = (board: Array<Array<BoardCell>>) => {
    for (let it = BOARD_SIZE - 1; it >= 0; --it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        moveCellRight(board, jt, it);
      }
    }
  };

  // const cloneBoard = (board: Array<Array<BoardCell>>) => {
  //   const boardCopy: Array<Array<BoardCell>> = [];
  //   for (let it = 0; it < BOARD_SIZE; ++it) {
  //     boardCopy[it] = [...board[it]];
  //   }
  //   return boardCopy;
  // };

  const genNewCell = (board: Array<Array<BoardCell>>) => {
    const freeCells: Array<Array<number>> = [];

    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        if (!board[it][jt]) {
          freeCells.push([it, jt]);
        }
      }
    }

    if (!freeCells.length) {
      return false;
    }

    const index = (freeCells.length * Math.random()) | 0;
    let number = Math.random() > 0.9 ? 4 : 2;

    let x = freeCells[index][0];
    let y = freeCells[index][1];
    board[x][y] = number;
    return true;
  };

  const moveCellUp = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number
  ) => {
    if (!board[it][jt] || it <= 0) {
      return;
    }

    const number = board[it][jt];

    if (board[it - 1][jt] === null) {
      board[it][jt] = null;
      board[it - 1][jt] = number;
      moveCellUp(board, it - 1, jt);
    } else if (board[it - 1][jt] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it - 1][jt] = number * 2;
    }
  };

  const moveCellDown = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number
  ) => {
    if (!board[it][jt] || it >= BOARD_SIZE - 1) {
      return;
    }

    const number = board[it][jt];

    if (board[it + 1][jt] === null) {
      board[it][jt] = null;
      board[it + 1][jt] = number;
      moveCellDown(board, it + 1, jt);
    } else if (board[it + 1][jt] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it + 1][jt] = number * 2;
    }
  };

  const moveCellLeft = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number
  ) => {
    if (!board[it][jt] || jt <= 0) {
      return;
    }

    const number = board[it][jt];

    if (board[it][jt - 1] === null) {
      board[it][jt] = null;
      board[it][jt - 1] = number;
      moveCellLeft(board, it, jt - 1);
    } else if (board[it][jt - 1] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it][jt - 1] = number * 2;
    }
  };

  const moveCellRight = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number
  ) => {
    if (!board[it][jt] || jt >= BOARD_SIZE - 1) {
      return;
    }

    const number = board[it][jt];

    if (board[it][jt + 1] === null) {
      board[it][jt] = null;
      board[it][jt + 1] = number;
      moveCellRight(board, it, jt + 1);
    } else if (board[it][jt + 1] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it][jt + 1] = number * 2;
    }
  };

  const applyReset = (code: string) => {
    if (code === "Enter" && gameOver) {
      resetBoard();
      return true;
    }
    return false;
  };

  const applyMovement = (code: string, board: Array<Array<BoardCell>>) => {
    if (code === "ArrowUp" || code === "KeyW") {
      moveUp(board);
    } else if (code === "ArrowDown" || code === "KeyS") {
      moveDown(board);
    } else if (code === "ArrowLeft" || code === "KeyA") {
      moveLeft(board);
    } else if (code === "ArrowRight" || code === "KeyD") {
      moveRight(board);
    } else {
      return false;
    }
    return true;
  };

  const checkCellMoving = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number
  ) => {
    if (board[it][jt] === undefined) {
      return false;
    }
    if (board[it][jt] === null) {
      return true;
    }
    if (it > 0 && board[it - 1][jt] === board[it][jt]) {
      return true;
    }
    if (it < BOARD_SIZE - 1 && board[it + 1][jt] === board[it][jt]) {
      return true;
    }
    if (jt > 0 && board[it][jt - 1] === board[it][jt]) {
      return true;
    }
    if (jt < BOARD_SIZE - 1 && board[it][jt + 1] === board[it][jt]) {
      return true;
    }

    return false;
  };

  const canContinue = (board: Array<Array<BoardCell>>) => {
    let movable = false;
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        movable ||= checkCellMoving(board, it, jt);
        console.log(it, jt, checkCellMoving(board, it, jt));
      }
    }
    return movable;
  };

  const processKeyDown = (ev: KeyboardEvent) => {
    if (applyReset(ev.code)) {
      return;
    }

    if (ai) {
      return;
    }

    if (applyMovement(ev.code, board)) {
      genNewCell(board);
      gameOver = !canContinue(board);
    }

    board = [...board];

    if (score > best) {
      best = score;
      saveBest();
    }
  };
</script>

<svelte:window on:keydown={processKeyDown} />
<div class="board">
  {#each board as rows}
    {#each rows as cell}
      <div class={`board-cell ${cell ? `cell-${cell}` : ``}`}>{cell ?? ""}</div>
    {/each}
  {/each}
  <div class={`msg-container ${gameOver ? "active" : "hidden"}`}>
    Игра окончена!
  </div>
</div>

<style lang="scss">
  .board {
    position: relative;
    width: 500px;
    height: 500px;
    background: #bbada0;
    border-radius: 6px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 7.5px;
  }

  .msg-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: #eee4da80;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 50px;

    transition: 0.4s;
    opacity: 0;

    &.active {
      opacity: 100%;
    }
  }

  .board-cell {
    color: #776e65;
    background: rgba(238, 228, 218, 0.35);
    box-shadow:
      0 0 30px 10px rgba(243, 215, 116, 0),
      inset 0 0 0 1px rgba(255, 255, 255, 0);
    margin: 7.5px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 50px;
  }

  .cell-2 {
    color: #776e65;
    background: #eee4da;
  }

  .cell-4 {
    color: #776e65;
    background: #ede0c8;
  }

  .cell-8 {
    color: #f9f6f2;
    background: #f2b179;
  }

  .cell-16 {
    color: #f9f6f2;
    background: #f59563;
  }

  .cell-32 {
    color: #f9f6f2;
    background: #f67c5f;
  }

  .cell-64 {
    color: #f9f6f2;
    background: #f65e3b;
  }

  .cell-128 {
    color: #f9f6f2;
    background: #edcf72;
  }

  .cell-256 {
    color: #f9f6f2;
    background: #edcc61;
  }

  .cell-512 {
    color: #f9f6f2;
    background: #edc850;
  }

  .cell-1024 {
    color: #f9f6f2;
    background: #edc53f;
    font-size: 35px;
  }

  .cell-2048 {
    color: #f9f6f2;
    background: #edc22e;
    font-size: 35px;
  }

  .cell-4096 {
    color: #f9f6f2;
    background: #ed676d;
    font-size: 35px;
  }

  .cell-8192 {
    color: #f9f6f2;
    background: #ec4d59;
    font-size: 35px;
  }

  .cell-16384 {
    color: #f9f6f2;
    background: #e14338;
    font-size: 25px;
  }

  .cell-32768 {
    color: #f9f6f2;
    background: #71b4d6;
    font-size: 25px;
  }

  .cell-65536 {
    color: #f9f6f2;
    background: #5ca0df;
    font-size: 25px;
  }

  .cell-131072 {
    color: #f9f6f2;
    background: #027abf;
    font-size: 15px;
  }
</style>

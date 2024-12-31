<script lang="ts">
  import { onMount } from "svelte";

  export let score = 0;
  export let best = 0;

  export let ai = false;
  let isInteractive = true;

  type BoardCell = null | number;

  let gameOver = false;
  let step = 0;

  type CellState = {
    x: number;
    y: number;
    value: number | null;
  };

  type ScheduledAnimation = {
    type: "move" | "upgrade" | "create";
    from: CellState;
    to: CellState;
  };

  let animationQueue: Array<ScheduledAnimation> = [];

  let board: Array<Array<BoardCell>>;
  const BOARD_SIZE = 4;
  const BEST_SCORE_ID = "best_score";

  let boardDivContainer: HTMLDivElement | null = null;

  const getCell = (x: number, y: number) => {
    return boardDivContainer?.children[x * BOARD_SIZE + y] as HTMLDivElement;
  };

  const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const processAnimations = async () => {
    if (!animationQueue.length) {
      return;
    }

    while (true) {
      const animation = animationQueue.shift();
      if (!animation) {
        break;
      }

      if (animation.type == "create") {
        const cell = getCell(animation.to.x, animation.to.y);
        // alert(cell.innerText);
        cell.classList.add("cell-created");
        setTimeout(() => {
          cell.classList.remove("cell-created");
        }, 210);
      }

      if (animation.type == "move") {
        console.log("Animation", animation);
        const cell = getCell(animation.from.x, animation.from.y);
        const getDirection = (from: CellState, to: CellState) => {
          if (from.x === to.x) {
            return from.y > to.y ? "left" : "right";
          } else {
            return from.x > to.x ? "up" : "down";
          }
        };
        const getDistance = (from: CellState, to: CellState) => {
          return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
        };
        const className = `cell-move-${getDirection(
          animation.from,
          animation.to
        )}-${getDistance(animation.from, animation.to)}`;
        cell.classList.add(className);
        setTimeout(() => {
          cell.classList.remove(className);
        }, 210);
      }
      if (animation.type == "upgrade") {
        const cell = getCell(animation.to.x, animation.to.y);
        cell.classList.add("cell-upgraded");
        setTimeout(() => {
          cell.classList.remove("cell-upgraded");
        }, 210);
      }
    }
  };

  const updateBoard = (newBoard: Array<Array<BoardCell>>) => {
    board = [...newBoard];
  };

  const encrypt = (value: number) => {
    return btoa(String((value << 7) ^ 0xdeadbeef));
  };

  const decrypt = (value: string) => {
    return (Number(atob(value)) ^ 0xdeadbeef) >> 7;
  };

  const saveBest = () => {
    localStorage.setItem(BEST_SCORE_ID, encrypt(best));
  };

  const loadBest = () => {
    let value = localStorage.getItem(BEST_SCORE_ID);
    best = value ? decrypt(value) : 0;
  };

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
    step = 0;
    animationQueue = [];
  };

  const compareBoards = (
    a: Array<Array<BoardCell>>,
    b: Array<Array<BoardCell>>
  ) => {
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        if (a[it][jt] !== b[it][jt]) {
          return false;
        }
      }
    }
    return true;
  };

  onMount(() => {
    loadBest();
    resetBoard();
    setInterval(() => {
      if (!ai || gameOver) {
        return;
      }

      const newBoard = cloneBoard(board);
      let factor = Math.random();
      if (factor > 0.75) {
        moveUp(newBoard);
      } else if (factor > 0.5) {
        moveDown(newBoard);
      } else if (factor > 0.25) {
        moveLeft(newBoard);
      } else {
        moveRight(newBoard);
      }
      if (compareBoards(board, newBoard)) {
        return;
      }

      genNewCell(newBoard);
      gameOver = !canContinue(newBoard);

      animationQueue = [];
      board = [...newBoard];
    }, 50);
  });

  const moveUp = (board: Array<Array<BoardCell>>) => {
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        animationQueue.push(...moveCellUp(board, it, jt));
        board = [...board];
      }
    }
  };

  const moveDown = (board: Array<Array<BoardCell>>) => {
    for (let it = BOARD_SIZE - 1; it >= 0; --it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        animationQueue.push(...moveCellDown(board, it, jt));
        board = [...board];
      }
    }
  };

  const moveLeft = (board: Array<Array<BoardCell>>) => {
    for (let it = 0; it < BOARD_SIZE; ++it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        animationQueue.push(...moveCellLeft(board, jt, it));
        board = [...board];
      }
    }
  };

  const moveRight = (board: Array<Array<BoardCell>>) => {
    for (let it = BOARD_SIZE - 1; it >= 0; --it) {
      for (let jt = 0; jt < BOARD_SIZE; ++jt) {
        animationQueue.push(...moveCellRight(board, jt, it));
        board = [...board];
      }
    }
  };

  const cloneBoard = (board: Array<Array<BoardCell>>) => {
    const boardCopy: Array<Array<BoardCell>> = [];
    for (let it = 0; it < BOARD_SIZE; ++it) {
      boardCopy[it] = [...board[it]];
    }
    return boardCopy;
  };

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

    animationQueue.push({
      type: "create",
      from: { x, y, value: null },
      to: { x, y, value: number },
    });

    return true;
  };

  const moveCellUp = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number,
    animation?: ScheduledAnimation
  ): Array<ScheduledAnimation> => {
    if (!board[it][jt] || it <= 0) {
      if (animation) {
        return [animation];
      }
      return [];
    }

    if (!animation) {
      animation = {
        type: "move",
        from: { x: it, y: jt, value: board[it][jt] },
        to: { x: it, y: jt, value: board[it][jt] },
      };
    }

    const number = board[it][jt];

    if (board[it - 1][jt] === null) {
      board[it][jt] = null;
      board[it - 1][jt] = number;
      animation.to = { x: it - 1, y: jt, value: number };
      return moveCellUp(board, it - 1, jt, animation);
    } else if (board[it - 1][jt] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it - 1][jt] = number * 2;
      animation.to = { x: it - 1, y: jt, value: number };
      return [
        animation,
        {
          type: "upgrade",
          from: { x: it - 1, y: jt, value: number },
          to: { x: it - 1, y: jt, value: number * 2 },
        },
      ];
    } else {
      return [animation];
    }
  };

  const moveCellDown = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number,
    animation?: ScheduledAnimation
  ): Array<ScheduledAnimation> => {
    if (!board[it][jt] || it >= BOARD_SIZE - 1) {
      if (animation) {
        return [animation];
      }
      return [];
    }

    if (!animation) {
      animation = {
        type: "move",
        from: { x: it, y: jt, value: board[it][jt] },
        to: { x: it, y: jt, value: board[it][jt] },
      };
    }

    const number = board[it][jt];
    if (board[it + 1][jt] === null) {
      board[it][jt] = null;
      board[it + 1][jt] = number;
      animation.to = { x: it + 1, y: jt, value: number };
      return moveCellDown(board, it + 1, jt, animation);
    } else if (board[it + 1][jt] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it + 1][jt] = number * 2;
      animation.to = { x: it + 1, y: jt, value: number };
      return [
        animation,
        {
          type: "upgrade",
          from: { x: it + 1, y: jt, value: number },
          to: { x: it + 1, y: jt, value: number * 2 },
        },
      ];
    } else {
      return [animation];
    }
  };

  const moveCellLeft = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number,
    animation?: ScheduledAnimation
  ): Array<ScheduledAnimation> => {
    if (!board[it][jt] || jt <= 0) {
      if (animation) {
        return [animation];
      }
      return [];
    }

    if (!animation) {
      animation = {
        type: "move",
        from: { x: it, y: jt, value: board[it][jt] },
        to: { x: it, y: jt, value: board[it][jt] },
      };
    }

    const number = board[it][jt];

    if (board[it][jt - 1] === null) {
      board[it][jt] = null;
      board[it][jt - 1] = number;
      animation.to = { x: it, y: jt - 1, value: number };
      return moveCellLeft(board, it, jt - 1, animation);
    } else if (board[it][jt - 1] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it][jt - 1] = number * 2;
      animation.to = { x: it, y: jt - 1, value: number };
      return [
        animation,
        {
          type: "upgrade",
          from: { x: it, y: jt - 1, value: number },
          to: { x: it, y: jt - 1, value: number * 2 },
        },
      ];
    } else {
      return [animation];
    }
  };

  const moveCellRight = (
    board: Array<Array<BoardCell>>,
    it: number,
    jt: number,
    animation?: ScheduledAnimation
  ): Array<ScheduledAnimation> => {
    if (!board[it][jt] || jt >= BOARD_SIZE - 1) {
      if (animation) {
        return [animation];
      }
      return [];
    }

    if (!animation) {
      animation = {
        type: "move",
        from: { x: it, y: jt, value: board[it][jt] },
        to: { x: it, y: jt, value: board[it][jt] },
      };
    }

    const number = board[it][jt];

    if (board[it][jt + 1] === null) {
      board[it][jt] = null;
      board[it][jt + 1] = number;
      animation.to = { x: it, y: jt + 1, value: number };
      return moveCellRight(board, it, jt + 1, animation);
    } else if (board[it][jt + 1] === number) {
      board[it][jt] = null;
      score += number * 2;
      board[it][jt + 1] = number * 2;
      animation.to = { x: it, y: jt + 1, value: number };
      return [
        animation,
        {
          type: "upgrade",
          from: { x: it, y: jt + 1, value: number },
          to: { x: it, y: jt + 1, value: number * 2 },
        },
      ];
    } else {
      return [animation];
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
    animationQueue = animationQueue.filter(
      (animation) =>
        animation.type !== "move" ||
        (animation.type === "move" &&
          (animation.from.x !== animation.to.x ||
            animation.from.y !== animation.to.y))
    );
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
      }
    }
    return movable;
  };

  const processKeyDown = async (ev: KeyboardEvent) => {
    if (!isInteractive) {
      return;
    }

    if (applyReset(ev.code)) {
      return;
    }

    if (ai) {
      return;
    }

    isInteractive = false;
    const newBoard = cloneBoard(board);

    if (applyMovement(ev.code, newBoard)) {
      if (compareBoards(board, newBoard)) {
        isInteractive = true
        return;
      }

      step += 1;
      console.log("Step:", step);
      console.log([...animationQueue]);

      await processAnimations();
      await delay(200);
      updateBoard(newBoard);

      const movedBoard = cloneBoard(newBoard);
      genNewCell(movedBoard);

      updateBoard(movedBoard);
      setTimeout(async () => {
        await processAnimations();
      });
      await delay(100);

      gameOver = !canContinue(movedBoard);
    }

    if (score > best) {
      best = score;
      saveBest();
    }

    isInteractive = true;
  };
</script>

<svelte:window on:keydown={processKeyDown} />
<div class="board" bind:this={boardDivContainer}>
  {#each board as rows}
    {#each rows as cell}
      <div class={`board-cell ${cell ? `cell-${cell}` : ``}`}>{cell ?? ""}</div>
    {/each}
  {/each}
  <div class={`msg-container ${gameOver ? "active" : "hidden"}`}>
    Игра окончена!
  </div>
  <div class="board-layout">
    {#each board as rows}
      {#each rows as cell}
        <div class={`cell-${cell}`}></div>
      {/each}
    {/each}
  </div>
</div>

<style lang="scss">
  .board {
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 6px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 7.5px;
  }

  .board-layout {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #bbada0;
    border-radius: 6px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 7.5px;
    z-index: -100;

    div {
      z-index: -80;
      background: rgba(238, 228, 218, 0.35);
      border-radius: 3px;
      margin: 7.5px;
    }
  }

  .msg-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: #eee4da80;
    z-index: 9000;

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

  .cell-created {
    opacity: 0;
    animation: cell-created 0.2s forwards;
  }

  .cell-upgraded {
    animation: cell-upgraded 0.2s forwards;
    z-index: 2000;
  }

  .cell-move-up-1 {
    animation: move-1-up 0.2s forwards;
  }
  .cell-move-up-2 {
    animation: move-2-up 0.2s forwards;
  }
  .cell-move-up-3 {
    animation: move-3-up 0.2s forwards;
  }

  .cell-move-down-1 {
    animation: move-1-down 0.2s forwards;
  }
  .cell-move-down-2 {
    animation: move-2-down 0.2s forwards;
  }
  .cell-move-down-3 {
    animation: move-3-down 0.2s forwards;
  }

  .cell-move-left-1 {
    animation: move-1-left 0.2s forwards;
  }
  .cell-move-left-2 {
    animation: move-2-left 0.2s forwards;
  }
  .cell-move-left-3 {
    animation: move-3-left 0.2s forwards;
  }

  .cell-move-right-1 {
    animation: move-1-right 0.2s forwards;
  }
  .cell-move-right-2 {
    animation: move-2-right 0.2s forwards;
  }
  .cell-move-right-3 {
    animation: move-3-right 0.2s forwards;
  }

  @keyframes cell-created {
    0% {
      transform: scale(0.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes cell-upgraded {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes move-1-up {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-125px);
    }
  }

  @keyframes move-2-up {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-250px);
    }
  }

  @keyframes move-3-up {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-375px);
    }
  }

  @keyframes move-1-down {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(125px);
    }
  }

  @keyframes move-2-down {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(250px);
    }
  }

  @keyframes move-3-down {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(375px);
    }
  }

  @keyframes move-1-left {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-125px);
    }
  }

  @keyframes move-2-left {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-250px);
    }
  }

  @keyframes move-3-left {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-375px);
    }
  }

  @keyframes move-1-right {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(125px);
    }
  }

  @keyframes move-2-right {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(250px);
    }
  }

  @keyframes move-3-right {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(375px);
    }
  }
</style>

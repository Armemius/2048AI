import random


class Game2048:
    def __init__(self, board_size=4):
        self.BOARD_SIZE = board_size
        self.board = []
        self.gameOver = False
        self.score = 0
        self.resetBoard()

    def resetBoard(self):
        self.score = 0
        self.board = [
            [None for _ in range(self.BOARD_SIZE)]
            for _ in range(self.BOARD_SIZE)
        ]
        self.genNewCell()
        self.genNewCell()
        self.gameOver = False

    def cloneBoard(self, src):
        return [row[:] for row in src]

    def compareBoards(self, a, b):
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE):
                if a[i][j] != b[i][j]:
                    return False
        return True

    def genNewCell(self):
        freeCells = []
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE):
                if self.board[i][j] is None:
                    freeCells.append((i, j))
        if not freeCells:
            return False
        x, y = random.choice(freeCells)
        self.board[x][y] = 4 if random.random() > 0.9 else 2
        return True

    def moveUp(self):
        merged = set()
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE):
                self.moveCellUp(i, j, merged)

    def moveCellUp(self, it, jt, merged):
        if not self.board[it][jt] or it <= 0:
            return
        currVal = self.board[it][jt]
        newI = it - 1
        while newI > 0 and not self.board[newI][jt]:
            newI -= 1
        if not self.board[newI][jt]:
            self.board[newI][jt] = currVal
            self.board[it][jt] = None
            self.moveCellUp(newI, jt, merged)
        elif (
            self.board[newI][jt] == currVal
            and (newI * self.BOARD_SIZE + jt) not in merged
        ):
            merged.add(newI * self.BOARD_SIZE + jt)
            self.board[newI][jt] = currVal * 2
            self.score += currVal * 2
            self.board[it][jt] = None
        elif newI + 1 != it:
            self.board[newI + 1][jt] = currVal
            self.board[it][jt] = None

    def moveDown(self):
        merged = set()
        for i in range(self.BOARD_SIZE - 1, -1, -1):
            for j in range(self.BOARD_SIZE):
                self.moveCellDown(i, j, merged)

    def moveCellDown(self, it, jt, merged):
        if not self.board[it][jt] or it >= self.BOARD_SIZE - 1:
            return
        currVal = self.board[it][jt]
        newI = it + 1
        while newI < self.BOARD_SIZE - 1 and not self.board[newI][jt]:
            newI += 1
        if not self.board[newI][jt]:
            self.board[newI][jt] = currVal
            self.board[it][jt] = None
            self.moveCellDown(newI, jt, merged)
        elif (
            self.board[newI][jt] == currVal
            and (newI * self.BOARD_SIZE + jt) not in merged
        ):
            merged.add(newI * self.BOARD_SIZE + jt)
            self.board[newI][jt] = currVal * 2
            self.score += currVal * 2
            self.board[it][jt] = None
        elif newI - 1 != it:
            self.board[newI - 1][jt] = currVal
            self.board[it][jt] = None

    def moveLeft(self):
        merged = set()
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE):
                self.moveCellLeft(i, j, merged)

    def moveCellLeft(self, it, jt, merged):
        if not self.board[it][jt] or jt <= 0:
            return
        currVal = self.board[it][jt]
        newJ = jt - 1
        while newJ > 0 and not self.board[it][newJ]:
            newJ -= 1
        if not self.board[it][newJ]:
            self.board[it][newJ] = currVal
            self.board[it][jt] = None
            self.moveCellLeft(it, newJ, merged)
        elif (
            self.board[it][newJ] == currVal
            and (it * self.BOARD_SIZE + newJ) not in merged
        ):
            merged.add(it * self.BOARD_SIZE + newJ)
            self.board[it][newJ] = currVal * 2
            self.score += currVal * 2
            self.board[it][jt] = None
        elif newJ + 1 != jt:
            self.board[it][newJ + 1] = currVal
            self.board[it][jt] = None

    def moveRight(self):
        merged = set()
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE - 1, -1, -1):
                self.moveCellRight(i, j, merged)

    def moveCellRight(self, it, jt, merged):
        if not self.board[it][jt] or jt >= self.BOARD_SIZE - 1:
            return
        currVal = self.board[it][jt]
        newJ = jt + 1
        while newJ < self.BOARD_SIZE - 1 and not self.board[it][newJ]:
            newJ += 1
        if not self.board[it][newJ]:
            self.board[it][newJ] = currVal
            self.board[it][jt] = None
            self.moveCellRight(it, newJ, merged)
        elif (
            self.board[it][newJ] == currVal
            and (it * self.BOARD_SIZE + newJ) not in merged
        ):
            merged.add(it * self.BOARD_SIZE + newJ)
            self.board[it][newJ] = currVal * 2
            self.score += currVal * 2
            self.board[it][jt] = None
        elif newJ - 1 != jt:
            self.board[it][newJ - 1] = currVal
            self.board[it][jt] = None

    def checkCellMoving(self, i, j):
        val = self.board[i][j]
        if val is None:
            return True
        if i > 0 and (
            self.board[i - 1][j] is None or self.board[i - 1][j] == val
        ):
            return True
        if i < self.BOARD_SIZE - 1 and (
            self.board[i + 1][j] is None or self.board[i + 1][j] == val
        ):
            return True
        if j > 0 and (
            self.board[i][j - 1] is None or self.board[i][j - 1] == val
        ):
            return True
        if j < self.BOARD_SIZE - 1 and (
            self.board[i][j + 1] is None or self.board[i][j + 1] == val
        ):
            return True
        return False

    def canContinue(self):
        for i in range(self.BOARD_SIZE):
            for j in range(self.BOARD_SIZE):
                if self.checkCellMoving(i, j):
                    return True
        return False

    def printBoard(self):
        print(f"\nScore: {self.score}")
        for row in self.board:
            print(
                " ".join(
                    str(cell).rjust(2, " ") if cell else "." for cell in row
                )
            )

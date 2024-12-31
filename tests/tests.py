import unittest
from src.game import Game2048 as Game


class TestGame(unittest.TestCase):
    def setUp(self):
        self.game = Game()

    def test_can_continue_true(self):
        self.game.board = [
            [None, 4, 8, 16],
            [256, 128, 64, 32],
            [512, 1024, 2048, 4096],
            [65536, 32768, 16384, 8192],
        ]
        self.assertTrue(self.game.canContinue())

        self.game.board = [
            [2, 4, 8, 16],
            [256, 128, 64, 32],
            [512, 1024, 2, 2],
            [65536, 32768, 16384, 8192],
        ]
        self.assertTrue(self.game.canContinue())

        self.game.board = [
            [2, 4, 8, 16],
            [256, 128, 2, 32],
            [512, 1024, 2, 4096],
            [65536, 32768, 16384, 8192],
        ]
        self.assertTrue(self.game.canContinue())

        self.game.board = [
            [2, 4, 8, 16],
            [256, 128, 64, 32],
            [512, 2, 2, 4096],
            [65536, 32768, 16384, 8192],
        ]
        self.assertTrue(self.game.canContinue())

        self.game.board = [
            [2, 4, 8, 16],
            [256, 128, 64, 32],
            [512, 1024, 2, 4096],
            [65536, 32768, 2, 8192],
        ]
        self.assertTrue(self.game.canContinue())

    def test_can_continue_false(self):
        self.game.board = [
            [2, 4, 8, 16],
            [256, 128, 64, 32],
            [512, 1024, 2048, 4096],
            [65536, 32768, 16384, 8192],
        ]
        self.assertFalse(self.game.canContinue())

    def test_move_left(self):
        self.game.board = [
            [2, 2, None, None],
            [4, 4, 4, 4],
            [None, None, 8, 8],
            [16, 16, 16, 16],
        ]
        self.game.moveLeft()
        self.assertEqual(
            self.game.board,
            [
                [4, None, None, None],
                [8, 8, None, None],
                [16, None, None, None],
                [32, 32, None, None],
            ],
        )

    def test_move_right(self):
        self.game.board = [
            [2, 2, None, None],
            [4, 4, 4, 4],
            [None, None, 8, 8],
            [16, 16, 16, 16],
        ]
        self.game.moveRight()
        self.assertEqual(
            self.game.board,
            [
                [None, None, None, 4],
                [None, None, 8, 8],
                [None, None, None, 16],
                [None, None, 32, 32],
            ],
        )

    def test_move_up(self):
        self.game.board = [
            [2, 2, None, None],
            [2, 2, 4, 4],
            [None, None, 4, 4],
            [None, None, 8, 8],
        ]
        self.game.moveUp()
        self.assertEqual(
            self.game.board,
            [
                [4, 4, 8, 8],
                [None, None, 8, 8],
                [None, None, None, None],
                [None, None, None, None],
            ],
        )

    def test_move_down(self):
        self.game.board = [
            [2, 2, None, None],
            [2, 2, 4, 4],
            [None, None, 4, 4],
            [None, None, 8, 8],
        ]
        self.game.moveDown()
        self.assertEqual(
            self.game.board,
            [
                [None, None, None, None],
                [None, None, None, None],
                [None, None, 8, 8],
                [4, 4, 8, 8],
            ],
        )

    def test_score(self):
        initial_score = self.game.score
        self.game.board = [
            [2, 2, None, None],
            [4, 4, 4, 4],
            [None, None, 8, 8],
            [16, 16, 16, 16],
        ]
        self.game.moveLeft()
        self.assertEqual(
            self.game.score, initial_score + 4 + 8 + 8 + 16 + 32 + 32
        )


if __name__ == "__main__":
    unittest.main()

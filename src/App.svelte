<script lang="ts">
  import Board from "./lib/Board.svelte";

  let score = 0;
  let best = 0;
</script>

<main>
  <div class="title">
    <div class="header">
      <h1>2048</h1>
    </div>
    <div class="score-container">
      <section class="score">
        <div>Счёт</div>
        <div>{score}</div>
      </section>
      <section class="score">
        <div>Лучший</div>
        <div>{best}</div>
      </section>
    </div>
  </div>
  <Board bind:score bind:best />
</main>

<style lang="scss">
  main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    display: flex;
    width: 500px;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    font-size: 30px;
    line-height: 30px;
  }

  .score-container {
    display: flex;
    gap: 5px;
  }

  .score {
    display: flex;
    width: 80px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: #bbada0;
    border-radius: 4px;
    padding: 5px;

    :first-child {
      font-weight: bold;
      color: #eee4da;
      font-size: 15px;
    }

    :last-child {
      font-weight: bold;
      color: white;
      font-size: 25px;
    }
  }

</style>

<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Brain from "./lib/icons/Brain.svelte";
  import Restart from "./lib/icons/Restart.svelte";

  let score = 0;
  let best = 0;
  let ai = false;

  let resetBoard: () => void;

  const switchAiMode = () => {
    ai = !ai;
    alert('AI in NIY!')
    ai = false;
  };
</script>

<main>
  <div class="title">
    <div class="header">
      <h1>2048</h1>
    </div>
    <div class="icon-container">
      <button class="icon" on:click={resetBoard}>
        <Restart />
      </button>
      <button class={`icon ${ai ? "active" : ""}`} on:click={switchAiMode}>
        <Brain />
      </button>
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
  <Board bind:score bind:best bind:resetBoard bind:ai />
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
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;

    .icon {
      overflow: hidden;
      margin-top: 10px;
      opacity: 0.5;
      cursor: pointer;
    }

    .icon.active {
      opacity: 0.9;
    }

    .icon:hover {
      opacity: 1;
    }
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

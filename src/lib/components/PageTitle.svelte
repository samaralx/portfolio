<script>
  export let title;
  export let description = '';
</script>

<div>
  <h2>{title}</h2>

  {#if description}
    <span>{description}</span>
  {/if}

  <hr />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    margin: 3rem auto;
  }

  span {
    font-size: 0.875;
    line-height: 0.875;
    color: #848484;
  }

  hr {
    width: 123px;
    margin-top: 1rem;
    border-top: 1px solid var(--accent-color);
  }
</style>

<script>
  import PageTitle from '$lib/components/PageTitle.svelte';

  const storyInfos = [
    {
      id: 'one',
      thumbnailUrl: '/images/bk-00_1000px.webp',
      title: 'Thanks for the fish',
      description: 'Iceland',
    },
    {
      id: 'two',
      thumbnailUrl: '/images/bj-00_1000px.webp',
      title: 'Thanks for the ink dragon',
      description: 'Beijing',
    },
  ];
</script>

<PageTitle title="Story" />

<div class="stories-container">
  {#each storyInfos as story}
    <a href={`/story/${story.id}`}>
      <div class="image-container">
        <div>
          <img src={story.thumbnailUrl} alt="" />
        </div>
      </div>

      <span>{story.title}, {story.description}</span>
    </a>
  {/each}
</div>

<style>
  .stories-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .stories-container {
      gap: 1rem;
    }
  }

  @media (max-width: 640px) {
    .stories-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 16/9;
    background: #fbfbfb;
  }

  .image-container div {
    width: 85%;
    overflow: hidden;
  }

  a:hover img {
    transform: scale(1.2);
  }

  img {
    object-fit: cover;
    transition: transform 0.5s ease-in-out;
  }
</style>

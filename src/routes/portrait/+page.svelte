<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';

  import PageTitle from '$lib/components/PageTitle.svelte';
  import {
    CATEGORY_ALL,
    CATEGORY_B_AND_W,
    CATEGORY_COLOR,
    imgInfos,
  } from './imageInfo';

  import 'photoswipe/style.css';

  let filteredImgInfos = $state([...imgInfos]);
  let activeFilterName = $state(CATEGORY_ALL);

  const onAllFilterButtonClick = () => {
    activeFilterName = CATEGORY_ALL;
    filteredImgInfos = imgInfos;
  };

  const onColorFilterButtonClick = () => {
    activeFilterName = CATEGORY_COLOR;
    filteredImgInfos = imgInfos.filter(
      ({ category }) => category === CATEGORY_COLOR
    );
  };

  const onBAndWFilterButtonClick = () => {
    activeFilterName = CATEGORY_B_AND_W;
    filteredImgInfos = imgInfos.filter(
      ({ category }) => category === CATEGORY_B_AND_W
    );
  };

  const galleryId = 'portrait-gallery';

  // initialize lightbox
  onMount(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryId,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
  });
</script>

<PageTitle title="Portrait" />

<div class="filter-buttons-container">
  <button
    onclick={onAllFilterButtonClick}
    class:active={activeFilterName === CATEGORY_ALL}>all</button
  >
  <button
    onclick={onColorFilterButtonClick}
    class:active={activeFilterName === CATEGORY_COLOR}>color</button
  >
  <button
    onclick={onBAndWFilterButtonClick}
    class:active={activeFilterName === CATEGORY_B_AND_W}>b & w</button
  >
</div>

<div class="images-container pswp-gallery" id={galleryId}>
  {#each filteredImgInfos as imgInfo (imgInfo.thumbnailUrl)}
    <a
      animate:flip={{ duration: 500, easing: quintOut }}
      transition:scale
      href={imgInfo.largeUrl}
      data-pswp-width={imgInfo.width}
      data-pswp-height={imgInfo.height}
      target="_blank"
      rel="noreferrer"
    >
      <img src={imgInfo.thumbnailUrl} alt="" />
    </a>
  {/each}
</div>

<style>
  .filter-buttons-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3rem 0;
    gap: 2rem;
  }

  button {
    padding: 1rem 1.5rem;
  }

  .active {
    border: 1px solid #000;
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-content: start;
  }

  @media (max-width: 768px) {
    .images-container {
      gap: 1rem;
    }
  }

  @media (max-width: 640px) {
    .images-container {
      grid-template-columns: 1fr;
    }
  }

  a {
    overflow: hidden;
  }

  a:hover img {
    transform: scale(1.5);
  }

  img {
    object-fit: contain;
    height: auto;
    transition: transform 0.5s ease-in-out;
  }
</style>

<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';

  import ArrowLeftIcon from '$lib/assets/ArrowLeftIcon.svelte';
  import ArrowRightIcon from '$lib/assets/ArrowRightIcon.svelte';

  const imgUrls = [
    '/images/bg-01.webp',
    '/images/bg-02.webp',
    '/images/bg-03.webp',
    '/images/bg-04.webp',
  ];

  // Embla Slider configuration
  const options = { loop: true };
  const plugins = [Autoplay()];

  let emblaApi;

  function onInit(event) {
    emblaApi = event.detail;
  }

  function scrollPrev() {
    if (emblaApi) emblaApi.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi) emblaApi.scrollNext();
  }
</script>

<div
  class="container"
  use:emblaCarouselSvelte={{ options, plugins }}
  onemblaInit={onInit}
>
  <div class="slider">
    {#each imgUrls as imgUrl}
      <div class="slide">
        <img src={imgUrl} alt="" fetchpriority="high" />
      </div>
    {/each}
  </div>

  <button class="prev" onclick={scrollPrev}><ArrowLeftIcon /></button>
  <button class="next" onclick={scrollNext}><ArrowRightIcon /></button>
</div>

<style>
  .container {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .slider {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  img {
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 50%;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    padding: 0.825rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.212);
  }

  .prev {
    left: 1rem;
  }

  .next {
    right: 1rem;
  }
</style>

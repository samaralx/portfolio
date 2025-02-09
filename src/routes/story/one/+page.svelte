<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte';

  import PageTitle from '$lib/components/PageTitle.svelte';
  import ArrowLeftIcon from '$lib/assets/ArrowLeftIcon.svelte';
  import ArrowRightIcon from '$lib/assets/ArrowRightIcon.svelte';

  const imgUrls = [
    '/images/bk-01.webp',
    '/images/bk-03.webp',
    '/images/bk-04.webp',
    '/images/bk-05.webp',
    '/images/bk-06.webp',
    '/images/bk-07.webp',
    '/images/bk-08.webp',
    '/images/bk-09.webp',
    '/images/bk-10.webp',
    '/images/bk-11.webp',
    '/images/bk-12.webp',
    '/images/bk-13.webp',
    '/images/bk-14.webp',
    '/images/bk-15.webp',
    '/images/bk-16.webp',
    '/images/bk-17.webp',
    '/images/bk-18.webp',
    '/images/bk-19.webp',
    '/images/bk-20.webp',
    '/images/bk-21.webp',
    '/images/bk-22.webp',
    '/images/bk-23.webp',
    '/images/bk-24.webp',
    '/images/bk-25.webp',
    '/images/bk-26.webp',
    '/images/bk-27.webp',
    '/images/bk-28.webp',
    '/images/bk-29.webp',
    '/images/bk-30.webp',
  ];

  // Embla Slider configuration
  let options = { loop: true };

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

<PageTitle title="Thanks for the fish" description="Iceland 2023" />

<p>
  Where the fish goes, we follow. They led us into the unknown wonders of
  nature. Together, we stepped into Iceland's secret sanctuary, a mystical realm
  where the fish's rhythm reigns. Day and night blurred, the weather shifting
  unpredictably. Yet we pursued, driven by the desire for a fleeting encounter.
  Then, with a quiet release, we awaited the next serendipitous meeting. I love
  the roaring wind, strong spirits, the solitude of freedom, and the promised
  big fish.
</p>

<div
  class="container"
  use:emblaCarouselSvelte={{ options }}
  onemblaInit={onInit}
>
  <div class="slider">
    {#each imgUrls as imgUrl}
      <div class="slide">
        <img src={imgUrl} alt="" loading="lazy" />
      </div>
    {/each}
  </div>

  <button class="prev" onclick={scrollPrev}><ArrowLeftIcon /></button>
  <button class="next" onclick={scrollNext}><ArrowRightIcon /></button>
</div>

<style>
  p {
    width: 75%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    p {
      width: 85%;
    }
  }

  @media (max-width: 640px) {
    p {
      width: 100%;
    }
  }

  .container {
    margin-top: 2rem;
    overflow: hidden;
    position: relative;
    margin-left: calc(var(--main-padding-left-right) * -1);
    margin-right: calc(var(--main-padding-left-right) * -1);
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
    top: calc(50% - 3rem * 0.5);
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

<script>
  import { onMount } from 'svelte';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';

  import PageTitle from '$lib/components/PageTitle.svelte';
  import { imgInfos } from './imgInfos';

  import 'photoswipe/style.css';
  import '../storyDetailStyles.css';

  const galleryId = 'story-gallery-1';

  // initialize lightbox
  onMount(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
  });
</script>

<PageTitle title="Thanks for the fish" description="Iceland 2023" />

<div class="story-content-container">
  <p>
    Where the fish goes, we follow. They led us into the unknown wonders of
    nature. Together, we stepped into Iceland's secret sanctuary, a mystical
    realm where the fish's rhythm reigns. Day and night blurred, the weather
    shifting unpredictably. Yet we pursued, driven by the desire for a fleeting
    encounter. Then, with a quiet release, we awaited the next serendipitous
    meeting. I love the roaring wind, strong spirits, the solitude of freedom,
    and the promised big fish.
  </p>

  <div class="story-images-container pswp-gallery" id={galleryId}>
    {#each imgInfos as imgInfo}
      <a
        href={imgInfo.largeUrl}
        data-pswp-width={imgInfo.width}
        data-pswp-height={imgInfo.height}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={imgInfo.thumbnailUrl}
          alt=""
          loading="lazy"
          width={imgInfo.width}
          height={imgInfo.height}
        />
      </a>
    {/each}
  </div>
</div>

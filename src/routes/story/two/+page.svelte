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

<PageTitle title="Thanks for the ink dragon" description="Beijing 2024" />

<div class="story-content-container">
  <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>

  <div class="story-images-container pswp-gallery" id={galleryId}>
    {#each imgInfos as imgInfo}
      <a
        href={imgInfo.largeUrl}
        data-pswp-width={imgInfo.width}
        data-pswp-height={imgInfo.height}
        target="_blank"
        rel="noreferrer"
      >
        <img src={imgInfo.thumbnailUrl} alt="" loading="lazy" />
      </a>
    {/each}
  </div>
</div>

<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import InstagramIcon from '$lib/assets/InstagramIcon.svelte';
</script>

<PageTitle title="About" />

<div class="container">
  <div class="profile-image-container">
    <img src="/images/XinSH.webp" alt="Xin Liu" />
  </div>

  <div class="description">
    <p>
      Hi, I'm Xin Liu, a passionate photographer with a deep love for capturing
      life's authentic moments. My journey with photography began during my
      university days in China when I used my very first paycheck to buy a Nikon
      COOLPIX 4600. That little camera opened my eyes to the beauty of everyday
      life and ignited a dream: to travel, explore the world, and document it
      through my lens.
    </p>

    <p>
      After graduating from university in China, I pursued a master's degree in
      chemical engineering in Germany - a leap that reflected my desire to
      explore the world beyond my comfort zone. Along the way, my camera
      remained my faithful companion, helping me preserve the stories of my
      adventures and the people I met.
    </p>

    <p>
      However, my photography truly evolved when I returned to China. It was
      here that I learned to capture not just the surface of life but its
      deeper, more genuine stories. Through my lens, I began to explore life
      inwardly, using photography as a tool to reflect, connect, and tell
      meaningful narratives.
    </p>

    <p>
      For me, photography is more than a passion - it's a journey of discovery,
      both outward and inward. Each photo is a piece of a larger story, and I
      hope to share those stories with you.
    </p>
  </div>
</div>

<a href="https://www.instagram.com/samara_lx/" target="blank" class="qrcode">
  <InstagramIcon />
</a>

<style>
  .container {
    display: flex;
    align-items: flex-start;
    width: var(--main-content-width);
    margin: 0 auto;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    .container {
      width: var(--main-content-width-tablet);
      gap: 2rem;
    }
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
      width: var(--main-content-width-mobile);
    }
  }

  .profile-image-container {
    position: relative;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .qrcode {
    width: 2rem;
    display: block;
    margin: 80px auto 0;
  }
</style>

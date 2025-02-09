<script>
  import { page } from '$app/state';
  import { fly } from 'svelte/transition';
  import { Hamburger } from 'svelte-hamburgers';

  import Logo from '$lib/assets/Logo.svelte';
  import CloseIcon from '$lib/assets/CloseIcon.svelte';

  import './app.css';

  let { children } = $props();

  let isHomePage = $derived(page.url.pathname === '/');

  let isMenuOpen = $state(false);
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    isMenuOpen = false;
  };
</script>

<header class={isHomePage ? 'homepage-header' : ''}>
  <nav>
    <!-- Left section: Logo -->
    <a href="/" class="logo-container" onclick={closeMenu}>
      <Logo
        fillColor={isHomePage && !isMenuOpen ? '#FFF' : '#000'}
        class="w-4 h-4"
      />
    </a>

    <!-- Right section: Desktop menu -->
    <ul class={`desktop-menu ${isHomePage ? 'text-white' : ''}`}>
      <li><a href="/story">Story</a></li>
      <li><a href="/portrait">Portrait</a></li>
      <li><a href="/about">About</a></li>
    </ul>

    <!-- Hamburger icon (mobile only) -->
    <div class="mobile-menu-trigger">
      <Hamburger
        bind:isMenuOpen
        type="slider"
        title="Toggle navigation"
        ariaControls="nav"
        onclick={toggleMenu}
        --color={isHomePage && !isMenuOpen ? '#FFF' : '#000'}
      />
    </div>
  </nav>
</header>

<!-- Fullscreen overlay for mobile menu -->
{#if isMenuOpen}
  <div
    class="mobile-menu-container"
    transition:fly={{ y: '-100%', duration: 500 }}
  >
    <ul class="mobile-menu">
      <li>
        <a href="/story" onclick={closeMenu}>Story</a>
      </li>

      <li>
        <a href="/portrait" onclick={closeMenu}>Portrait</a>
      </li>

      <li>
        <a href="/about" onclick={closeMenu}>About</a>
      </li>
    </ul>
  </div>
{/if}

<main>
  {@render children()}
</main>

<footer class={isHomePage ? 'homepage-footer' : ''}>
  <div>
    <!-- Left Link -->
    <a href="/impressum"> Impressum </a>

    <!-- Center Text -->
    <span> © samaralx 2025 </span>

    <!-- Right Link -->
    <a href="/datenschutz"> Datenschutzerklärung </a>
  </div>
</footer>

<style>
  header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    background: #fff;
    z-index: 1000;
  }

  nav {
    width: 80%;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    header {
      padding: 0 1.5rem;
    }

    nav {
      width: 100%;
    }
  }

  .homepage-header {
    background: transparent;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .logo-container {
    width: 140px;
  }

  ul {
    list-style: none;
  }

  .desktop-menu {
    display: flex;
    gap: 2rem;
  }

  .desktop-menu.text-white a {
    color: white;
  }

  .desktop-menu a:hover,
  .mobile-menu a:hover {
    color: var(--accent-color);
  }

  .mobile-menu-trigger {
    display: none;
    width: 48px;
    height: 48px;
  }

  @media (max-width: 640px) {
    .desktop-menu {
      display: none;
    }

    .mobile-menu-trigger {
      display: block;
    }
  }

  .mobile-menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 2rem;
  }

  main {
    padding: 0 1.5rem;
  }

  footer {
    width: 100%;
    margin-top: 80px;
    padding: 0 0 56px;
  }

  footer div {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    footer {
      padding: 0 2rem 1.5rem;
    }

    footer div {
      width: 100%;
      flex-direction: column;
      gap: 1rem;
    }
  }

  footer a {
    font-size: 0.875rem;
  }

  footer a:hover {
    text-decoration: underline;
  }

  .homepage-footer {
    position: fixed;
    margin-top: 0;
    bottom: 0;
    color: #fff;
  }

  .homepage-footer a {
    color: #fff;
  }
</style>

<template>
  <header>
    <nav>
      <NuxtLink to="/articles">
        Articles
      </NuxtLink>
      <NuxtLink to="/leaves">
        Leaves
      </NuxtLink>
    </nav>
  </header>
  <main><slot /></main>
  <footer>Footer</footer>
</template>

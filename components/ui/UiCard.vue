<template>
  <header>
    <slot name="header">
      Header
    </slot>
  </header>
  <p><slot>Content</slot></p>
  <footer>
    <slot name="footer">
      Footer
    </slot>
  </footer>
</template>

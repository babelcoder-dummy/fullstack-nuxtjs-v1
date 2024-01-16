<template>
  <header class="flex h-16 border-b p-4 items-center">
    <ULink to="/">
      <UAvatar src="/assets/images/logo.png" size="md" alt="Logo" />
    </ULink>
    <ULink to="/admin" active-class="text-primary" class="mx-4">
      Admin
    </ULink>
    <ULink to="/leaves" active-class="text-primary" class="mx-4">
      Leaves
    </ULink>
    <ULink to="/articles" active-class="text-primary" class="mx-4">
      Articles
    </ULink>
    <ULink to="/announcements" active-class="text-primary" class="mx-4">
      Announcements
    </ULink>
    <ULink to="/auth/login" active-class="text-primary" class="mr-4 ml-auto">
      Login
    </ULink>
  </header>
</template>

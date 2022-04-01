<template>
  <main class="w-full bg-white px-6 pb-12 antialiased">
    <section class="mx-auto max-w-7xl">
      <nav class="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
        <div class="container relative mx-auto flex h-24 flex-wrap items-center justify-between overflow-hidden border-b border-gray-200 font-medium sm:px-4 md:overflow-visible md:px-2 lg:justify-center">
          <div class="flex h-full w-1/4 items-center justify-start pr-4">
            <a href="javascript:void(0)" class="inline-block py-4 md:py-0">
              <span class="p-1 text-xl font-black leading-none text-gray-900"><span>tails</span><span class="text-indigo-600">.</span></span>
            </a>
          </div>
          <div class="top-0 left-0 hidden h-full w-full items-start bg-gray-900 bg-opacity-50 p-4 text-sm md:absolute md:relative md:flex md:w-3/4 md:items-center md:bg-transparent md:p-0 lg:text-base" :class="{ 'fixed flex': showMenu, hidden: !showMenu }">
            <div class="h-auto w-full flex-col overflow-hidden rounded-lg bg-white md:relative md:flex md:flex-row md:overflow-visible md:rounded-none md:bg-transparent">
              <a href="javascript:void(0)" class="block inline-flex h-16 w-auto items-center px-6 text-xl font-black leading-none text-gray-900 md:hidden">tails<span class="text-indigo-600">.</span></a>
              <div class="flex w-full flex-col items-start justify-center space-x-6 text-center md:mt-0 md:w-2/3 md:flex-row md:items-center lg:space-x-8">
                <!-- <a href="javascript:void(0)" class="mx-0 inline-block w-full py-2 text-left font-medium text-indigo-600 md:mx-2 md:ml-0 md:w-auto md:px-0 md:text-center lg:mx-3">Home</a> -->
                <router-link :to="n.href" class="mx-0 inline-block w-full py-2 text-left font-medium text-gray-700 hover:text-indigo-600 md:mx-2 md:w-auto md:px-0 md:text-center lg:mx-3" v-for="(n, $n) in navs" :key="$n">{{ n.name }}</router-link>
                <a href="javascript:void(0)" class="absolute top-0 left-0 mt-6 ml-10 mr-2 hidden py-2 text-gray-600 md:relative md:mt-0 md:ml-2 lg:mx-3 lg:inline-block">
                  <svg class="inline h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </a>
              </div>
              <div class="flex w-full flex-col items-start justify-end pt-4 md:w-1/3 md:flex-row md:items-center md:py-0">
                <a href="#" class="mr-0 w-full px-6 py-2 text-gray-700 md:mr-4 md:w-auto md:px-0 lg:mr-5 lg:pl-2">Sign In</a>
                <a href="javascript:void(0)" class="inline-flex w-full items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium leading-4 text-white hover:bg-indigo-500 focus:outline-none focus:ring-0 focus:ring-indigo-600 focus:ring-offset-2 md:w-auto md:px-3 md:focus:ring-2 lg:px-5">Sign Up</a>
              </div>
            </div>
          </div>
          <div @click="showMenu = !showMenu" class="absolute right-0 flex h-10 w-10 cursor-pointer flex-col items-end items-center justify-center rounded-full bg-white hover:bg-gray-100 md:hidden">
            <svg class="h-6 w-6 text-gray-700" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg class="h-6 w-6 text-gray-700" x-show="showMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      </nav>
    </section>

    <router-view @setLayout="$emit('setLayout', $event)"></router-view>
  </main>
</template>

<script>
export default {
  name: "Guest",
  inject: ["$_", "$APP"],
  data: () => ({
    navs: [
      { name: "Home", href: "/" },
      { name: "Features", href: "/features" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" }
    ]
  })
};
</script>

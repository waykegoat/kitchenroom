<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FeatureList from '@/components/home/FeatureList.vue'
import CallToAction from '@/components/home/CallToAction.vue'
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <FeatureList />
    <CallToAction />
  </DefaultLayout>
</template>

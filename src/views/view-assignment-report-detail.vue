<template>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useMeta } from '@/composables/use-meta';

  useMeta({ title: 'Nhận xét bài làm chi tiết' });

  function getStudents() {
    
  }

  onMounted(() => {
      getStudents();
  });
</script>

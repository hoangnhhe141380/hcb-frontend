<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="panel">
            <h5 class="font-semibold text-lg dark:text-white-light">Tải lên tệp tin chứa danh sách <span
                    class="text-lime-500">học sinh</span></h5>
            <form action="">
                <div class="my-5">
                    <div class="grid grid-cols-1 space-y-2">
                        <input type="file" id="myfile" name="studentExcel"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    </div>
                </div>
            </form>
        </div>
        <div class="panel">
            <h5 class="font-semibold text-lg dark:text-white-light">Tải lên tệp tin chứa danh sách <span
                    class="text-lime-500">nhận xét học sinh</span>
            </h5>
            <div class="my-5">
                <div class="grid grid-cols-1 space-y-2">
                    <input type="file" id="myfile" name="myfile"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Tải lên tệp tin' });



</script>
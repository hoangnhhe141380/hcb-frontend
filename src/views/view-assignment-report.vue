<template>
    <div>
        <div class="panel pb-0 my-6">
            <div class="mb-5">
                <flat-pickr @change="getStudents" :config="config" placeholder="Chọn ngày" v-model="today" class="form-input w-1/3"></flat-pickr>
            </div>
            <div class="datatable">
                <vue3-datatable
                    :rows="students"
                    :columns="cols"
                    :totalRows="students?.length"
                    :search="search"
                    :sortable="true"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #details="data">
                        <router-link :to="{ name: 'nhan-xet-bai-lam', params: { id: data.value.id, date: today } }" class="text-primary hover:underline"> Chi tiết </router-link>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import { localStorageHelper } from '@/utils/helper';
    import { LOCAL_STORAGE_AUTH } from '@/utils/constants';
    import { Student } from './add-assignment-report.vue';
    import dayjs from 'dayjs';
    import flatPickr from 'vue-flatpickr-component';

    useMeta({ title: 'Nhận xét bài làm' });
    let today = ref(dayjs().format('DD/MM/YYYY'));
    const config = ref({
        dateFormat: 'd/m/Y',
    });

    const search = ref('');
    const cols =
        ref([
            { field: 'studentId', title: 'STT' },
            { field: 'fullName', title: 'Họ Tên' },
            { field: 'detail', title: 'Chi Tiết' },
        ]) || [];
    const students = ref<Student[]>([]);

    function getStudents() {
        students.value = [];

        const [date, month, year] = today.value.split('/');

        const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/reports/session?date=${date}-${month}-${year}`;

        const headers = {
            Authorization: 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };

        axios.get(apiUrl, { headers }).then((response) => {
            let data = response.data.data;
            if (data.length == 0) {
                students.value = [];
            } else {
                students.value = data.map((item: Student) => ({
                    studentId: item.studentId,
                    fullName: item.fullName,
                    hasAssignmentReport: item.hasAssignmentReport,
                }));
            }
        });
    }

    onMounted(() => {
        getStudents();
    });
</script>

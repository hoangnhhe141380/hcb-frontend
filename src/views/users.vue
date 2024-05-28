<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <router-link to="/nguoi-dung/them" class="btn btn-success w-1/6">Thêm
                </router-link>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Tìm theo tên" />
                </div>
            </div>
            <div class="datatable">
                <vue3-datatable :rows="rows" :columns="cols" :totalRows="rows?.length" :search="search" :sortable="true"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import axios from 'axios';
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';

useMeta({ title: 'Người dùng' });
const search = ref('');
const cols =
    ref([
        { field: 'no', title: 'STT', isUnique: true },
        { field: 'fullName', title: 'Họ tên' }
    ]) || [];


const rows = ref(
    [
    ] || []
);

const fetchData = () => {

    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/users';

    const headers = {
        'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
    };

    axios.get(apiUrl, { headers })
        .then((response) => {
            const data = response.data.data;
            // Map the data to match the 'cols' structure
            const mappedData = data.map((item, index) => ({
                no: index + 1,
                fullName: item.fullName
            }));

            rows.value = mappedData;

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

// Call the fetchData function to fetch and populate data when needed
// onMounted(() => {
//     fetchData();
// })
fetchData();
</script>
<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="table-responsive">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Chi tiết</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in tableData" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">{{ data.name }}</td>
                                <td>{{ data.date }}</td>
                                <td>{{ data.sale }}</td>
                                <td class="text-center whitespace-nowrap" :class="{
                                    'text-success': data.status === 'Complete',
                                    'text-secondary': data.status === 'Pending',
                                    'text-info': data.status === 'In Progress',
                                    'text-danger': data.status === 'Canceled',
                                }">
                                    {{ data.status }}
                                </td>
                                <td class="text-center">
                                    <button type="button" v-tippy:delete>
                                        <svg> ... </svg>
                                    </button>
                                    <tippy target="delete">Delete</tippy>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const tableData = ref([
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    }
]);
</script>
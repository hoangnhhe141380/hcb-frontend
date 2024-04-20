<template>
    <div class="panel">
        <div class="mb-5">
            <form @submit.prevent="submitStudent" class="space-y-5">
                <div class="flex items-center justify-between">
                    <h5 class="font-semibold text-2xl dark:text-white-light">Học sinh</h5>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label>Họ tên</label>
                        <input v-model="studentData.fullName" type="text" class="form-input" required />
                    </div>
                    <div>
                        <label>Ngày sinh</label>
                        <flat-pickr :config="config" placeholder="Chọn ngày" v-model="studentData.dateOfBirth"
                            class="form-input"></flat-pickr>
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input v-model="studentData.phoneNumber" type=" text" class="form-input" />
                    </div>
                    <div>
                        <label>Ngày gia nhập</label>
                        <flat-pickr :config="config" placeholder="Chọn ngày" v-model="studentData.joinDate"
                            class="form-input"></flat-pickr>
                    </div>
                    <div>
                        <label>Trường</label>
                        <input v-model="studentData.school" type=" text" class="form-input" />
                    </div>
                </div>
                <hr>
                <div class="flex items-center justify-between mt-5">
                    <h5 class="font-semibold text-2xl dark:text-white-light">Phụ huynh</h5>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <div class="mb-4">
                            <label>Tên phụ huynh 1</label>
                            <input v-model="parentData1.name" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>SĐT phụ huynh 1</label>
                            <input v-model="parentData1.phoneNumber" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Facebook phụ huynh 1</label>
                            <input v-model="parentData1.facebook" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Xưng hô bản thân</label>
                            <input v-model="parentData1.self" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Xưng hô với phụ huynh</label>
                            <input v-model="parentData1.other" type=" text" class="form-input" />
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label>Tên phụ huynh 2</label>
                            <input v-model="parentData2.name" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>SĐT phụ huynh 2</label>
                            <input v-model="parentData2.phoneNumber" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Facebook phụ huynh 2</label>
                            <input v-model="parentData2.facebook" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Xưng hô bản thân</label>
                            <input v-model="parentData2.self" type=" text" class="form-input" />
                        </div>
                        <div class="mb-4">
                            <label>Xưng hô với phụ huynh</label>
                            <input v-model="parentData2.other" type=" text" class="form-input" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary w-1/4">Xác nhận</button>
            </form>
        </div>
    </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useMeta } from '@/composables/use-meta';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';
import { showFailureAlert, showSuccessAlert } from '@/components/alert';

useMeta({ title: 'Thêm học sinh' });

const config = ref({
    dateFormat: 'd/m/Y'
});

const parentData1 = ref({
    name: '',
    phoneNumber: '',
    facebook: '',
    self: '',
    other: ''
})

const parentData2 = ref({
    name: '',
    phoneNumber: '',
    facebook: '',
    self: '',
    other: ''
})

function addParentData() {
    parents.value = [];
    if (parentData1.value.name) { // Check if the first parent's name is not empty
        parents.value.push({ ...parentData1.value });
    }
    if (parentData2.value.name) { // Check if the second parent's name is not empty
        parents.value.push({ ...parentData2.value });
    }
}

const parents = ref([]);

const studentData = ref({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    joinDate: '',
    school: '',
    parents: parents
})

function formatDate(date) {
    if (date == '') return '';
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}`;
}

async function submitStudent() {

    addParentData();
    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/students'
    const headers = {
        'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
    };
    try {
        studentData.value.dateOfBirth = formatDate(studentData.value.dateOfBirth);
        studentData.value.joinDate = formatDate(studentData.value.joinDate);
        console.log(studentData.value);
        const response = await axios.post(apiUrl, studentData.value, { headers }); // Make the POST request

        showSuccessAlert('Thêm học sinh thành công');
    }
    catch (error) {
        showFailureAlert('');
        console.error('Error adding student:', error);
    }
}

</script>
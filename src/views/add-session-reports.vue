<template>
    <div class="panel mx-auto">
        <div class="flex items-center justify-between mb-5 text-center">
            <h3 class="font-semibold text-2xl dark:text-white-light mx-auto">Nhận xét sau buổi học</h3>
        </div>
        <div class="mb-5">
            <flat-pickr @input="getStudents" v-model="today" class="form-input text-center w-1/6"></flat-pickr>
        </div>
        <h5 class="text-red-600">Lưu ý: Không được để trống các trường</h5>
        <h5 class="text-lime-600">Màu này là những học sinh đã được nhận xét</h5>
        <form @submit.prevent="sendReports" class="flex flex-col">
            <div class="table-responsive overflow-x">
                <table class='table-auto overflow-scroll w-full'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Làm BTVN đầy đủ</th>
                            <th>Đi học đúng giờ</th>
                            <th>Thái độ học</th>
                            <th>Nhận xét buổi học</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(student, index) in students" :key="student.id">
                            <tr>
                                <td hidden><input type="text" v-model="student.id"></td>
                                <td>{{ index + 1 }}</td>
                                <td class="whitespace-nowrap" :class="{ ' text-lime-600': student.hasReport }">{{
                                    student.fullName }}</td>

                                <td>
                                    <div>
                                        <select class="form-select" v-model="student.homeworkCompletion">
                                            <option>Làm bài tập đầy đủ</option>
                                            <option>Chưa làm bài tập về nhà</option>
                                            <option>Làm bài tập về nhà chưa cẩn thận</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <select class="form-select" v-model="student.onTime">
                                            <option>Đúng giờ</option>
                                            <option>Muộn</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <select class="form-select" v-model="student.att1">
                                            <option>Chủ động làm bài</option>
                                            <option>Chưa chủ động làm bài</option>
                                            <option>Tích cực học tập</option>
                                            <option>Chưa tích cực học tập</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select class="form-select my-3" v-model="student.att2">
                                            <option>Tiếp thu bài nhanh</option>
                                            <option>Tập trung làm bài</option>
                                            <option>Chưa tập trung làm bài</option>
                                            <option>Chưa tập trung làm bài</option>
                                            <option>Ra ngoài nhiều</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select class="form-select" v-model="student.att3">
                                            <option>Chịu khó chữa lại các câu sai</option>
                                            <option>Chưa chịu khó chữa bài</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="w-1/3">
                                    <div>
                                        <textarea id="ctnTextarea" rows="3" class="form-textarea"
                                            placeholder="Enter Textarea" v-model="student.generalComment"></textarea>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <button type="submit" class="btn btn-primary mt-6 w-1/3 mx-auto">Xác nhận</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAppStore } from '@/stores/index';

//flatpickr
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';

const store = useAppStore();


let today = ref();
let dataBlank = false;
let students = ref([]);

function getStudents() {
    students.value = [];
    let day = today.value.split('-')[2];
    let month = today.value.split('-')[1];
    let year = today.value.split('-')[0];
    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/attendances?date=${day}-${month}-${year}`;

    const headers = {
        'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
    };

    axios
        .get(apiUrl, { headers })
        .then(response => {
            let data = response.data.data;
            data.forEach(item => {
            });
            if (data.length == 0)
                students.value = [];

            // Loop through the data array
            data.forEach(item => {
                // Create a student object with id and fullName properties
                const student = {
                    id: item.studentId,
                    fullName: item.fullName,
                    hasReport: item.hasSessionReport
                };
                // Push the student object to the students array
                students.value.push(student);
                console.log(student);

            });

        });
}

async function sendReports() {
    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/reports/session'

    let day = today.value.split('-')[2];
    let month = today.value.split('-')[1];
    let year = today.value.split('-')[0];

    const dataToSend = students.value.map(s => ({
        studentId: s.id,
        date: day + '-' + month + '-' + year,
        homeworkCompletion: s.homeworkCompletion,
        onTime: s.onTime,
        studyingAttitude: s.att1 + '\n' + s.att2 + '\n' + s.att3,
        generalComment: s.generalComment ? s.generalComment : ''
    }))

    try {

        const headers = {
            'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };
        const response = await axios.post(apiUrl, dataToSend, { headers }); // Make the POST request

        if (response.data.status.displayMessage === "Success.") {
            showSuccessAlert();
        }
    }
    catch (error) {
        // Handle errors (e.g., display error message, retry logic)
        showFailureAlert();
    }

}

const showFailureAlert = async () => {
    Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
}

const showSuccessAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: 'Gửi nhận xét thành công',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
}


</script>
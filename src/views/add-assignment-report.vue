// @ts-nocheck
<template>
    <div class="panel m-auto">
        <div class="flex items-center justify-between mb-5 text-center">
            <h3 class="font-semibold text-2xl dark:text-white-light mx-auto">Nhận xét bài làm học sinh</h3>
        </div>
        <div class="mb-5">
            <flat-pickr @change="getStudents" :config="config" placeholder="Chọn ngày" v-model="today"
                class="form-input w-1/3"></flat-pickr>
        </div>
        <h5 class="text-red-600 mb-2">Lưu ý: Các trường nhập link Google Drive phải dưới dạng <span
                class="italic font-semibold">https://drive.google.com/file/</span> hoặc <span
                class="italic font-semibold">https://drive.google.com/open?id=</span></h5>
        <hr class=" h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <!-- <label>Chọn học sinh</label> -->
        <div class="mb-5">
            <multiselect v-model="student" :options="students" class="custom-multiselect" :searchable="true"
                placeholder="Chọn học sinh" :label="'fullName'" select-label="" deselect-label=""
                :close-on-select="true">
                <template slot="singleLabel" slot-scope="{ item }">{{ item.fullName }}</template>
            </multiselect>
        </div>
        <h4 class="text-red-600" v-if="student?.hasAssignmentReport">Học sinh này đã được nhận xét</h4>
        <hr class=" h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <div>
            <form @submit.prevent="sendData">
                <div class="flex flex-col md:flex-row justify-around">
                    <div class="w-11/12 md:w-custom">
                        <h4 class="font-semibold text-xl text-center mb-4 text-blue-600">Nhận xét bài làm trên lớp</h4>
                        <div>
                            <label>Link đề bài</label>
                            <input v-model="report.classwork.worksheetUrl" type="text" class="form-input my-1"
                                required />
                        </div>
                        <div>
                            <label>Link đáp án</label>
                            <input v-model="report.classwork.solutionUrl" type="text" class="form-input my-1"
                                required />
                        </div>
                        <div>
                            <label>Số câu làm đúng/Số câu làm được/Tổng số câu</label>
                            <div class="flex justify-between">
                                <input v-model="report.classwork.correctAnswers" type="text"
                                    class="form-input my-1 w-3/12" />
                                <input v-model="report.classwork.answers" type="text" class="form-input my-1 w-3/12" />
                                <input v-model="report.classwork.totalQuestions" type="text"
                                    class="form-input my-1 w-3/12" />
                            </div>
                        </div>
                        <div>
                            <label>Link scan bài làm</label>
                            <input v-model="report.classwork.url" type="text" class="form-input my-1" required />
                        </div>
                        <div>
                            <label>Nhận xét bài làm</label>
                            <textarea v-model="report.classwork.comment" rows="3" class="form-textarea"
                                required></textarea>
                        </div>
                        <div>
                            <label>Yêu cầu</label>
                            <textarea v-model="report.classwork.requirement" rows="3" class="form-textarea"
                                required></textarea>
                        </div>
                    </div>
                    <div class="w-11/12 md:w-custom">
                        <h4 class="font-semibold text-xl text-center mb-4 text-pink-600">Nhận xét bài tập về nhà</h4>
                        <div>
                            <label>Số câu làm đúng/Số câu làm được/Tổng số câu</label>
                            <div class="flex justify-between">
                                <input v-model="report.homework.correctAnswers" type="text"
                                    class="form-input my-1 w-3/12" />
                                <input v-model="report.homework.answers" type="text" class="form-input my-1 w-3/12" />
                                <input v-model="report.homework.totalQuestions" type="text"
                                    class="form-input my-1 w-3/12" />
                            </div>
                        </div>
                        <div>
                            <label>Link scan bài làm</label>
                            <input v-model="report.homework.url" type="text" class="form-input my-1" />
                        </div>
                        <div>
                            <label>Nhận xét bài làm</label>
                            <textarea v-model="report.homework.comment" rows="3" class="form-textarea"></textarea>
                        </div>
                        <div>
                            <label>Yêu cầu</label>
                            <textarea v-model="report.homework.requirement" rows="3" class="form-textarea"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-6 w-1/3 mx-auto">Xác nhận</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { useMeta } from '@/composables/use-meta';
import dayjs from 'dayjs';
import { showFailureAlert, showSuccessAlert } from '@/components/alert';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';

useMeta({ title: 'Thêm nhận xét bài làm' });

const config = ref({
    dateFormat: 'd/m/Y'
});

let today = ref(dayjs().format('DD/MM/YYYY'));

interface Report {
    studentId: string,
    date: string,
    homework: {
        correctAnswers: string,
        answers: string,
        totalQuestions: string,
        url: string,
        comment: string,
        requirement: string
    },
    classwork: {
        correctAnswers: string,
        answers: string,
        totalQuestions: string,
        url: string,
        comment: string,
        requirement: string,
        worksheetUrl: string,
        solutionUrl: string
    }
}

export interface Student {
    studentId: string,
    fullName: string,
    hasAssignmentReport: boolean
}
const students = ref<Student[]>([]);
const student = ref<Student>();
const report = ref<Report>({
    studentId: '',
    date: '',
    homework: {
        correctAnswers: '',
        answers: '',
        totalQuestions: '',
        url: '',
        comment: '',
        requirement: ''
    },
    classwork: {
        correctAnswers: '',
        answers: '',
        totalQuestions: '',
        url: '',
        comment: '',
        requirement: '',
        worksheetUrl: '',
        solutionUrl: ''
    }

});

async function sendData() {
    const [day, month, year] = today.value.split('/');


    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/reports/assignment`;

    const data: Report = {

        studentId: student.value.studentId,
        date: year + '-' + month + '-' + day,
        homework: {
            correctAnswers: report.value.homework.correctAnswers,
            answers: report.value.homework.answers,
            totalQuestions: report.value.homework.totalQuestions,
            url: extractGoogleDriveId(report.value.homework.url),
            comment: report.value.homework.comment,
            requirement: report.value.homework.requirement,
        },
        classwork: {
            correctAnswers: report.value.classwork.correctAnswers,
            answers: report.value.classwork.answers,
            totalQuestions: report.value.classwork.totalQuestions,
            url: extractGoogleDriveId(report.value.classwork.url),
            comment: report.value.classwork.comment,
            requirement: report.value.classwork.requirement,
            worksheetUrl: extractGoogleDriveId(report.value.classwork.worksheetUrl),
            solutionUrl: extractGoogleDriveId(report.value.classwork.solutionUrl),
        }

    };

    try {

        const headers = {
            'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };

        const response = await axios.post(apiUrl, data, { headers });

        if (response.data.status.displayMessage === "Success.") {
            showSuccessAlert('Gửi nhận xét thành công');
        }
    }
    catch (error) {
        // Handle errors (e.g., display error message, retry logic)
        showFailureAlert("Không thể gửi nhận xét");
    }

}

function getStudents() {
    students.value = [];

    const [date, month, year] = today.value.split('/');

    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/attendances?date=${date}-${month}-${year}`;


    const headers = {
        'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
    };

    axios
        .get(apiUrl, { headers })
        .then(response => {
            let data = response.data.data;
            if (data.length == 0)
                students.value = [];
            data.forEach(item => {
                const student: Student = {
                    studentId: item.studentId,
                    fullName: item.fullName,
                    hasAssignmentReport: item.hasAssignmentReport
                };
                students.value.push(student);
            });
            console.log(students.value);

        });

}

function extractGoogleDriveId(url) {
    const regex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^/&?#]+).*/;
    const match = url.match(regex);
    return match ? match[1] : null;
}



onMounted(() => {
    getStudents();
});
</script>
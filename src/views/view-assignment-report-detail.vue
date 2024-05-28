<template>
    <div class="panel py-0 pt-5 flex justify-start">
        <button @click.prevent="handleBack" class="btn btn-danger w-1/6">Trờ về</button>
    </div>
    <div class="panel m-auto">
        <div class="flex items-center justify-between mb-5 text-center">
            <h3 class="font-semibold text-2xl dark:text-white-light mx-auto">Nhận xét bài làm học sinh {{ report.studentName }} ngày {{ report.date }}</h3>
        </div>
        <div class="flex flex-col md:flex-row justify-around">
            <div class="w-11/12 md:w-custom">
                <h4 class="font-semibold text-xl text-center mb-4 text-blue-600">Nhận xét bài làm trên lớp</h4>
                <div>
                    <label>Link đề bài</label>
                    <input v-model="report.classwork.worksheetUrl" type="text" class="form-input my-1" required />
                </div>
                <div>
                    <label>Link đáp án</label>
                    <input v-model="report.classwork.solutionUrl" type="text" class="form-input my-1" required />
                </div>
                <div>
                    <label>Số câu làm đúng/Số câu làm được/Tổng số câu</label>
                    <div class="flex justify-between">
                        <input v-model="report.classwork.correctAnswers" type="text" class="form-input my-1 w-3/12" />
                        <input v-model="report.classwork.answers" type="text" class="form-input my-1 w-3/12" />
                        <input v-model="report.classwork.totalQuestions" type="text" class="form-input my-1 w-3/12" />
                    </div>
                </div>
                <div>
                    <label>Link scan bài làm</label>
                    <input v-model="report.classwork.url" type="text" class="form-input my-1" required />
                </div>
                <div>
                    <label>Nhận xét bài làm</label>
                    <textarea v-model="report.classwork.comment" rows="3" class="form-textarea" required></textarea>
                </div>
                <div>
                    <label>Yêu cầu</label>
                    <textarea v-model="report.classwork.requirement" rows="3" class="form-textarea" required></textarea>
                </div>
            </div>
            <div class="w-11/12 md:w-custom">
                <h4 class="font-semibold text-xl text-center mb-4 text-pink-600">Nhận xét bài tập về nhà</h4>
                <div>
                    <label>Số câu làm đúng/Số câu làm được/Tổng số câu</label>
                    <div class="flex justify-between">
                        <input v-model="report.homework.correctAnswers" type="text" class="form-input my-1 w-3/12" />
                        <input v-model="report.homework.answers" type="text" class="form-input my-1 w-3/12" />
                        <input v-model="report.homework.totalQuestions" type="text" class="form-input my-1 w-3/12" />
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
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { Report } from './add-assignment-report.vue';
    import dayjs from 'dayjs';
    import { localStorageHelper } from '@/utils/helper';
    import { LOCAL_STORAGE_AUTH } from '@/utils/constants';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';

    useMeta({ title: 'Nhận xét bài làm chi tiết' });

    const route = useRoute();
    const router = useRouter();

    let dateView = route.params.date as string;

    interface ReportWithStudentName extends Report {
        studentName: string;
    }

    const report = ref<ReportWithStudentName>({
        studentId: '',
        studentName: '',
        date: '',
        homework: {
            correctAnswers: '',
            answers: '',
            totalQuestions: '',
            url: '',
            comment: '',
            requirement: '',
        },
        classwork: {
            correctAnswers: '',
            answers: '',
            totalQuestions: '',
            url: '',
            comment: '',
            requirement: '',
            worksheetUrl: '',
            solutionUrl: '',
        },
    });

    const getAssignmentReportDetail = async () => {
        const [date, month, year] = dateView.split('/');

        const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/reports/assignment?date=${date}-${month}-${year}&studentId=${route.params.id}`;

        const headers = {
            Authorization: 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };

        axios.get(apiUrl, { headers }).then((response) => {
            let data = response.data.data;
            report.value = {
                ...data,
            };
        });
    };

    const handleBack = () => router.push('/nhan-xet-bai-lam');

    onMounted(() => {
        getAssignmentReportDetail();
    });
</script>

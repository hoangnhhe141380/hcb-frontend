// @ts-nocheck
<template>
    <!-- <div v-if="!correctSecretCode" class="container h-screen grid place-items-center">
        <div class="panel m-auto py-10 w-full lg:w-5/12">
            <form @submit.prevent="getReportsBySlug">
                <div class="mt-4">
                    <label>Mã bí mật</label>
                    <input type="text" autocomplete="secretCode" v-model="secretCode" class="form-input" required />
                    <p v-if="submittedOnce && !correctSecretCode" class="text-red-600">Sai mã bí mật</p>
                </div>
                <div class="w-full">
                    <button type="submit" class="btn btn-primary mt-6 mx-auto w-6/12">Xác nhận</button>
                </div>
            </form>
        </div>
    </div> -->

    <!-- <div v-if="correctSecretCode" class="container xl:mx-auto w-95 xl:w-8/12"> -->
    <div class="container xl:mx-auto w-95 xl:w-8/12">
        <div class="panel my-6 text-lg mx-3">
            <p><span class="font-bold">Họ tên: </span>{{ student[0] }}</p>
            <p v-if="student[1] === null"><span class="font-bold">Ngày sinh: </span></p>
            <p v-else><span class="font-bold">Ngày sinh: </span>{{ dayjs(student[1]).format('DD/MM/YYYY') }}</p>
        </div>
        <div class="panel my-6 mx-3 px-2 md:px-6">
            <div v-for="(report, index) in reports" class="space-y-2 mb-5 font-semibold">
                <div>
                    <div class="border rounded border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <button type="button" class="p-4 w-full flex items-center dark:bg-[#1b2e4b]"
                            :class="{ '!text-primary': accordians1 === index }"
                            @click="accordians1 === index ? (accordians1 = null) : (accordians1 = index)">
                            Ngày {{ report.date }}
                            <div class="ltr:ml-auto rtl:mr-auto" :class="{ 'rotate-180': accordians1 === index }">
                                <icon-caret-down />
                            </div>
                        </button>
                        <vue-collapsible :isOpen="accordians1 === index">

                            <div
                                class="space-y-2 py-4 px-6 md:px-10 text-[18px] font-medium border-t border-[#d3d3d3] ">
                                <h4 class="font-bold text-xl text-blue-800">I. Nội dung bài học</h4>
                                <ol class="list-decimal font-semibold">
                                    <li>Link đề bài:
                                        <p class="font-normal" v-if="report.classwork.worksheetUrl === ''">(Chưa có
                                            thông tin)</p>
                                        <span v-else class="font-normal"><a target="_blank"
                                                class="underline text-blue-600 hover:text-blue-800"
                                                :href="'https://drive.google.com/file/d/' + report.classwork.worksheetUrl">{{
                                                    'https://drive.google.com/file/d/' +
                                                    report.classwork.worksheetUrl
                                                }}</a></span>
                                    </li>
                                    <li>Link đáp án:
                                        <p class="font-normal" v-if="report.classwork.solutionUrl === ''">(Chưa có thông
                                            tin)</p>
                                        <span v-else class="font-normal"><a target="_blank"
                                                class="underline text-blue-600 hover:text-blue-800"
                                                :href="'https://drive.google.com/file/d/' + report.classwork.solutionUrl">{{
                                                    'https://drive.google.com/file/d/' + report.classwork.solutionUrl }}</a>
                                        </span>
                                    </li>
                                </ol>
                            </div>
                            <div
                                class="space-y-2 py-4 px-6 md:px-10 text-[18px] font-medium border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <h4 class="font-bold text-xl text-blue-800">II. Thái độ học tập</h4>
                                <p v-if="!report.homeworkCompletion">(Chưa có thông tin)</p>
                                <ol v-else class=" list-decimal font-semibold">
                                    <li>Bài tập về nhà: <span class="font-normal">{{ report.homeworkCompletion }}</span>
                                    </li>
                                    <li>Đi học đúng giờ: <span class="font-normal">{{ report.onTime }}</span> </li>
                                    <li v-if="report.studyingAttitude === ''">Thái độ học tập:</li>
                                    <li v-else>Thái độ học tập:
                                        <ul class="ml-3 !md:ml-6 font-normal list-disc">
                                            <li v-for="cmt in report.studyingAttitude.split('\n') " :key="cmt">{{ cmt }}
                                            </li>

                                        </ul>
                                    </li>
                                    <li v-if="report.generalComment === ''">Nhận xét chung:</li>
                                    <li v-else>Nhận xét chung:
                                        <ul class="ml-3 !md:ml-6 font-normal list-disc">
                                            <li v-for="cmt in report.generalComment.split('\n') " :key="cmt">{{ cmt
                                                }}
                                            </li>

                                        </ul>
                                    </li>
                                </ol>
                            </div>

                            <div
                                class="space-y-2 py-4 px-6 md:px-10 text-[18px] font-medium border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <h4 class="font-bold text-xl text-blue-800">III. Kết quả bài làm</h4>
                                <ol class="list-decimal">
                                    <li class="font-semibold">Bài tập về nhà
                                        <p class="font-normal" v-if="report.homework.result === '//'">(Chưa
                                            có thông tin)</p>
                                        <ul v-else class="!md:ml-6 ml-3 font-normal" style="list-style-type: circle">
                                            <li>Số câu đúng/Số câu làm được/Tổng số câu:
                                                {{ report.homework.result }}
                                            </li>
                                            <li>Link scan bài làm:
                                                <a target="_blank" class="underline text-blue-600 hover:text-blue-800"
                                                    :href="'https://drive.google.com/file/d/' + report.homework.url">{{
                                                        'https://drive.google.com/file/d/'
                                                        +
                                                        report.homework.url }}</a>
                                            </li>
                                            <li>Nhận xét bài làm:
                                                <ul class="ml-3 !md:ml-6 font-normal list-disc">
                                                    <li v-for="cmt in report.homework.comment ? report.homework.comment.split('\n') : []"
                                                        :key="cmt">
                                                        {{ cmt }}
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Yêu cầu:
                                                <ul class="ml-3 !md:ml-6 font-normal list-disc">
                                                    <li v-for="cmt in report.homework.requirement ? report.homework.requirement.split('\n') : []"
                                                        :key="cmt">
                                                        {{ cmt }}
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="font-semibold mt-4">Bài làm trên lớp
                                        <ul class="!ml-6 font-normal" style="list-style-type: circle">
                                            <li v-if="report.homework.result === '//'">Số câu đúng/Số câu làm được/Tổng
                                                số câu: (Chưa có thông tin)
                                            </li>
                                            <li v-else>Số câu đúng/Số câu làm được/Tổng số câu:
                                                {{ report.classwork.result }}
                                            </li>
                                            <li>Link scan bài làm:
                                                <a target="_blank" class="underline text-blue-600 hover:text-blue-800"
                                                    :href="'https://drive.google.com/file/d/' + report.classwork.url">{{
                                                        'https://drive.google.com/file/d/'
                                                        +
                                                        report.classwork.url
                                                    }}</a>
                                            </li>
                                            <li>Nhận xét bài làm:
                                                <ul class="!ml-6 font-normal list-disc">
                                                    <li v-for="cmt in report.classwork.comment ? report.classwork.comment.split('\n') : []"
                                                        :key="cmt">
                                                        {{ cmt }}
                                                    </li>
                                                </ul>
                                            </li>
                                            <li v-if="report.classwork.requirement === ''">Yêu cầu: (Chưa có
                                                thông
                                                tin)
                                            </li>
                                            <li v-else>Yêu cầu:
                                                <ul class="!ml-6 font-normal list-disc">
                                                    <li v-for="cmt in report.classwork.requirement.split('\n') "
                                                        :key="cmt">{{
                                                            cmt
                                                        }}
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>


                        </vue-collapsible>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios';
import IconLink from '@/components/icon/icon-link.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import VueCollapsible from 'vue-height-collapsible/vue3';
import { useMeta } from '@/composables/use-meta';
import dayjs from 'dayjs'
import { showFailureAlert } from '@/components/alert';

useMeta({ title: 'Nhận xét học sinh' });

const route = useRoute();

const correctSecretCode = ref(false);
const submittedOnce = ref(false);
const secretCode = ref('');
const accordians1: any = ref(1);

const student = ref([]);


interface Report {
    date: string,
    generalComment: string,
    homeworkCompletion: string,
    onTime: string,
    studyingAttitude: string,
    homework: {
        result: string
        url: string,
        comment: string,
        requirement: string,
    },
    classwork: {
        result: string,
        url: string,
        comment: string,
        requirement: string,
        worksheetUrl: string,
        solutionUrl: string
    }

};

const reports = ref<Report[]>([]);

interface NameDob {
    studentId: string,
    dateOfBith: Date
};

async function getReportsBySlug(slug) {

    const apiUrl = import.meta.env.VITE_APP_API_URL + `guest/reports/${slug}`;

    const studentInfoUrl = import.meta.env.VITE_APP_API_URL + 'guest/name-dob?id=';

    await axios.get(apiUrl)
        .then(res => {
            const response = res.data.data;

            response.map(rep => {

                const report: Report = {
                    date: dayjs(rep.date).format('DD/MM/YYYY'),
                    generalComment: rep.generalComment !== null ? rep.generalComment : '',
                    homeworkCompletion: rep.homeworkCompletion !== null ? rep.homeworkCompletion : '',
                    onTime: rep.onTime !== null ? rep.onTime : '',
                    studyingAttitude: rep.studyingAttitude !== null ? rep.studyingAttitude : '',
                    homework: {
                        result: `${rep?.homework.correctAnswers}/${rep?.homework.answers}/${rep?.homework.totalQuestions}`,
                        url: rep.homework.url !== null ? rep.homework.url : '',
                        comment: rep?.homework.comment,
                        requirement: rep?.homework.requirement,
                    },
                    classwork: {
                        result: `${rep.classwork.correctAnswers}/${rep.classwork.answers}/${rep.classwork.totalQuestions}`,
                        url: rep.classwork.url,
                        comment: rep.classwork.comment,
                        requirement: rep.classwork.requirement,
                        worksheetUrl: rep.classwork.worksheetUrl,
                        solutionUrl: rep.classwork.solutionUrl,
                    }

                }
                console.log('report hw: ' + report.homework.result);
                reports.value.push(report);
            });

            const studentId = response[0].studentId; // Assuming studentId is the same for all reports
            return axios.get(studentInfoUrl + studentId);

        }
        )
        .then((res2) => {
            // @ts-ignore
            student.value.push(res2.data.data[0][0], res2.data.data[0][1]);
        })
}

// async function getReportsBySlug() {
//     submittedOnce.value = true;
//     const slug = route.params.slug;
//     const jsonData = {
//         secretCode: secretCode.value,
//     };

//     const apiUrl = import.meta.env.VITE_APP_API_URL + `guest/reports/${slug}`;

//     const studentInfoUrl = import.meta.env.VITE_APP_API_URL + 'guest/name-dob?id=';

//     await axios.post(apiUrl, jsonData)
//         .then(res => {
//             correctSecretCode.value = true;
//             const isSuccessful = res.status == 200;

//             if (isSuccessful) {
//                 const response = res.data.data;
//                 console.log(response);

//                 if (response.length === 0) {
//                     showFailureAlert("Học sinh chưa có nhận xét");
//                 } else {
//                     response.map(rep => {

//                         const report: Report = {
//                             date: dayjs(rep.date).format('DD/MM/YYYY'),
//                             generalComment: rep.generalComment !== null ? rep.generalComment : '',
//                             homeworkCompletion: rep.homeworkCompletion !== null ? rep.homeworkCompletion : '',
//                             onTime: rep.onTime !== null ? rep.onTime : '',
//                             studyingAttitude: rep.studyingAttitude !== null ? rep.studyingAttitude : '',
//                             homework: {
//                                 result: `${rep?.homework.correctAnswers}/${rep?.homework.answers}/${rep?.homework.totalQuestions}`,
//                                 url: rep.homework.url !== null ? rep.homework.url : '',
//                                 comment: rep?.homework.comment,
//                                 requirement: rep?.homework.requirement,
//                             },
//                             classwork: {
//                                 result: `${rep.classwork.correctAnswers}/${rep.classwork.answers}/${rep.classwork.totalQuestions}`,
//                                 url: rep.classwork.url,
//                                 comment: rep.classwork.comment,
//                                 requirement: rep.classwork.requirement,
//                                 worksheetUrl: rep.classwork.worksheetUrl,
//                                 solutionUrl: rep.classwork.solutionUrl,
//                             }

//                         }
//                         console.log('report: ' + report.classwork.requirement);
//                         reports.value.push(report);
//                     });

//                     const studentId = response[0].studentId; // Assuming studentId is the same for all reports
//                     return axios.get(studentInfoUrl + studentId);
//                 }
//             }
//         })
//         .then((res2) => {
//             // @ts-ignore
//             student.value.push(res2.data.data[0][0], res2.data.data[0][1]);
//         })
// }

onMounted(() => {
    getReportsBySlug(route.params.slug)
})


</script>
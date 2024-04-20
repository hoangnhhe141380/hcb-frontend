<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Components</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Tabs</span>
            </li>
        </ul>
        <div class="pt-5 space-y-8">
            <div class="grid gap-6">
                <div class="panel">
                    <TabGroup as="div" class="mb-5">
                        <TabList class="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
                            <Tab as="template" v-slot="{ selected }">
                                <a href="javascript:;"
                                    class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
                                    :class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }">Thông
                                    tin cá nhân</a>
                            </Tab>
                            <Tab as="template" v-slot="{ selected }">
                                <a href="javascript:;"
                                    class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
                                    :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }">Lịch
                                    sử học
                                    phí</a>
                            </Tab>
                            <Tab as="template" v-slot="{ selected }">
                                <a href="javascript:;"
                                    class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
                                    :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }">Nhận
                                    xét sau buổi học</a>
                            </Tab>
                            <Tab as="template" v-slot="{ selected }">
                                <a href="javascript:;"
                                    class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
                                    :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }">Nhận
                                    xét bài làm</a>
                            </Tab>
                            <Tab as="template" v-slot="{ selected }">
                                <a href="javascript:;"
                                    class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
                                    :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }">Mục
                                    tiêu phấn đấu</a>
                            </Tab>
                        </TabList>
                        <TabPanels class="pt-5 flex-1 text-base">
                            <!-- Personal Information -->
                            <TabPanel>
                                <div>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <h5 hidden>{{ studentData.id }}</h5>
                                        <div>
                                            <label>Họ tên</label>
                                            <input v-model="studentData.fullName" type="text" class="form-input"
                                                :disabled="!isEditing" />
                                        </div>
                                        <div>
                                            <label>Ngày sinh</label>
                                            <input v-model="studentData.dateOfBirth" type="date" class="form-input"
                                                :disabled="!isEditing" />
                                        </div>
                                        <div>
                                            <label>Số điện thoại</label>
                                            <input v-model="studentData.phoneNumber" type=" text" class="form-input"
                                                :disabled="!isEditing" />
                                        </div>
                                        <div>
                                            <label>Ngày gia nhập</label>
                                            <input v-model="studentData.joinDate" type="date" class="form-input"
                                                :disabled="!isEditing" />
                                        </div>
                                        <div>
                                            <label>Trường</label>
                                            <input v-model="studentData.school" type="text" class="form-input"
                                                :disabled="!isEditing" />
                                        </div>
                                        <div>
                                            <label>Trạng thái</label>
                                            <select v-model="studentData.status" class="form-select"
                                                :disabled="!isEditing">
                                                <option :value="true">Đang học</option>
                                                <option :value="false">Đã nghỉ</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label>Link tổng hợp nhận xét</label>
                                            <a class="underline text-blue-600 hover:text-blue-800"
                                                :href="`${domain}/nhan-xet/${studentData.slug}`" target="_blank"
                                                rel="noopener noreferrer">{{ `${domain}/nhan-xet/${studentData.slug}`
                                                }}</a>
                                        </div>
                                        <div>
                                            <label>Code</label>
                                            <div class="flex flex-row">
                                                <input v-model="studentData.secretCode" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                                <button v-if="!copied" class="btn btn-primary"
                                                    @click="copyToClipboard">Copy</button>
                                                <button v-else class="btn btn-primary">Copied</button>
                                            </div>
                                        </div>
                                        <br>
                                        <!-- <div>
                                            <label>Lịch học</label>
                                        </div> -->
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                                        <div>
                                            <div class="mb-4">
                                                <label>Tên phụ huynh 1</label>
                                                <input v-model="parentData1.name" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>SĐT phụ huynh 1</label>
                                                <input v-model="parentData1.phoneNumber" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Facebook phụ huynh 1</label>
                                                <input v-model="parentData1.facebook" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Xưng hô bản thân</label>
                                                <input v-model="parentData1.self" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Xưng hô với phụ huynh</label>
                                                <input v-model="parentData1.other" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="mb-4">
                                                <label>Tên phụ huynh 2</label>
                                                <input v-model="parentData2.name" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>SĐT phụ huynh 2</label>
                                                <input v-model="parentData2.phoneNumber" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Facebook phụ huynh 2</label>
                                                <input v-model="parentData2.facebook" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Xưng hô bản thân</label>
                                                <input v-model="parentData2.self" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                            <div class="mb-4">
                                                <label>Xưng hô với phụ huynh</label>
                                                <input v-model="parentData2.other" type=" text" class="form-input"
                                                    :disabled="!isEditing" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-5">
                                        <button v-if="!isEditing" @click="edit" class="btn btn-success w-1/6">Chỉnh
                                            sửa</button>
                                        <button v-if="isEditing" @click="updateStudentById"
                                            class="btn btn-primary w-1/6">Lưu</button>
                                    </div>
                                </div>
                            </TabPanel>


                            <!-- Fees -->
                            <TabPanel>
                                <div class="mb-5">
                                    <div class="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Năm</th>
                                                    <th>Tháng</th>
                                                    <th>Số tiền</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="data in tableData" :key="data.id">
                                                    <tr>
                                                        <td>{{ data.no }}</td>
                                                        <td>{{ data.year }}</td>
                                                        <td>{{ data.month }}</td>
                                                        <td>{{ data.amount }}.000₫</td>
                                                        <td class="text-center whitespace-nowrap" :class="{
                                                            'text-success': data.status == true,
                                                            'text-info': data.status == false,
                                                        }">
                                                            {{ getStatusText(data.status) }}
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabPanel>

                            <!-- Report -->
                            <TabPanel>
                                <div class="mb-5">
                                    <div class="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Ngày</th>
                                                    <th>Thái độ học tập</th>
                                                    <th>Nhận xét</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>23/01/2024</td>
                                                    <td class="w-2/5">
                                                        <div class="flex">
                                                            <text-clamp class="demo" text="" :max-lines="2" auto-resize>
                                                                <template #before>
                                                                    <span
                                                                        class="featured label label-rounded label-primary"></span>
                                                                </template>
                                                                <template #after="{ toggle, expanded, clamped }">
                                                                    <button v-if="expanded || clamped" class="toggle"
                                                                        @click="toggle" style="color: red">
                                                                        Đọc thêm
                                                                    </button>
                                                                </template>
                                                            </text-clamp>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabPanel>

                            <!---->
                            <TabPanel>
                                <div class="mb-5">
                                    <div class="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Ngày</th>
                                                    <th>Số câu làm đúng</th>
                                                    <th>Số câu làm được</th>
                                                    <th>Tổng số câu</th>
                                                    <th>Link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="(data, index) in reports" :key="data.id">
                                                    <tr class="text-center">
                                                        <td>{{ index + 1 }}</td>
                                                        <td>{{ data.date }}</td>
                                                        <td>
                                                            <div><span class="font-bold">BTVN:</span></div>
                                                            <div><span class="font-bold">Ở lớp:</span></div>
                                                            <div><span class="font-bold">Kiểm tra:</span></div>
                                                        </td>
                                                        <td>
                                                            <div>{{
                                                                data.homeworkCorrectAnswers }}
                                                            </div>
                                                            <div>{{
                                                                data.classworkCorrectAnswers }}</div>
                                                            <div>{{
                                                                data.testCorrectAnswers }}</div>
                                                        </td>
                                                        <td>
                                                            <div>{{
                                                                data.homeworkAnswers }}</div>
                                                            <div>{{
                                                                data.classworkAnswers }}</div>
                                                            <div>{{
                                                                data.testAnswers }}</div>
                                                        </td>
                                                        <td>
                                                            <div>{{
                                                                data.homeworkTotalQuestions }}</div>
                                                            <div>{{
                                                                data.classworkTotalQuestions }}</div>
                                                            <div>{{
                                                                data.testTotalQuestions }}</div>
                                                        </td>
                                                        <td>
                                                            <div><a :href="data.homeworkUrl" target="_blank"
                                                                    rel="noopener noreferrer">
                                                                    Link
                                                                </a>
                                                            </div>
                                                            <div><a :href="data.classworkUrl" target="_blank"
                                                                    rel="noopener noreferrer">
                                                                    Link
                                                                </a></div>
                                                            <div><a :href="data.testUrl" target="_blank"
                                                                    rel="noopener noreferrer">
                                                                    Link
                                                                </a></div>
                                                        </td>
                                                        <td>
                                                            <div>{{
                                                                data.homeworkComment }}</div>
                                                            <div>{{
                                                                data.classworkComment }}</div>
                                                            <div>{{
                                                                data.testComment }}</div>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabPanel>

                        </TabPanels>


                    </TabGroup>
                </div>

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useMeta } from '@/composables/use-meta';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from "vue-router";
import { useClipboard } from '@vueuse/core';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';


useMeta({ title: 'Thông tin chi tiết' });

const route = useRoute();
let id = route.params.id;

interface ParentData {
    name: string;
    phoneNumber: string;
    facebook: string;
    self: string;
    other: string;
}

const parentData1 = ref<ParentData>({
    name: '',
    phoneNumber: '',
    facebook: '',
    self: '',
    other: ''
})

const parentData2 = ref<ParentData>({
    name: '',
    phoneNumber: '',
    facebook: '',
    self: '',
    other: ''
})

const studentData = ref({
    fullName: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    joinDate: new Date(),
    school: '',
    slug: '',
    secretCode: '',
    status: true,
    parents: [
        parentData1.value,
        parentData2.value
    ]
});

const domain = window.location.origin;

const isEditing = ref(false);

function edit() {
    isEditing.value = true;
}


const headers = {
    'Authorization': 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
};

function updateStudentById() {
    isEditing.value = false;
    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/students/${id}`;

    console.log(studentData.value);
    // reset the list
    studentData.value.parents = [];
    studentData.value.parents.push(parentData1.value);

    // only push parent 2 into list if their name is not empty 
    if (parentData2.value.name !== '') {
        studentData.value.parents.push(parentData2.value);
    }

    axios
        .put(apiUrl, studentData.value, { headers })
        .then(() => {
            alert("Cập nhật thông tin học sinh thành công!");
        })
        .catch(() => {
            alert("Đã có lỗi xảy ra! Không thể cập nhật học sinh");
        })
}



function fetchStudentById(studentId) {

    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/students/${studentId}`;


    axios
        .get(apiUrl, { headers })
        .then((response) => {
            studentData.value = response.data.data;
            console.log(studentData.value);

            if (studentData.value.parents.length == 2) {
                parentData1.value = studentData.value.parents[0];
                parentData2.value = studentData.value.parents[1];
            } if (studentData.value.parents.length == 1) {
                parentData1.value = studentData.value.parents[0];
            }
        })
        .catch((error) => {
            console.error('Error fetching student data:', error);
        });
};

const tableData = ref<Array<{ year: number; month: number; amount: number; isPaid: boolean }>>([]);

const reports = ref([]);
const fetchReportsByStudentId = (studentId) => {
    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/students/${studentId}/reports`;

    axios
        .get(apiUrl)
        .then((response) => {
            reports.value = response.data.data;
        })

        .catch((error) => {
            console.error('Error fetching student data:', error);
        });
};

const fetchFeesByStudentId = (studentId) => {
    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/students/${studentId}/fees`;

    axios
        .get(apiUrl)
        .then((response) => {
            const data = response.data.data;

            const mappedData = data.map((item, index) => ({
                no: index + 1,
                year: item.id.year,
                month: item.id.month,
                amount: item.amount.toLocaleString('vi-VN'),
                status: item.isPaid,
            }));

            tableData.value.push(...mappedData);
        })
        .catch((error) => {
            console.error('Error fetching student fees:', error);
        });
};

const getStatusText = (status) => {
    return status ? 'Đã đóng' : 'Chưa đóng';
};


const copied = ref(false);

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(studentData.value.secretCode);
        copied.value = true;
        setTimeout(() => copied.value = false, 1500);
    } catch (err) {
        alert('Failed to copy: ' + err);
    }
};

onMounted(() => {

    fetchStudentById(id);

});

</script>

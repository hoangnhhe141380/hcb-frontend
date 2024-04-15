<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Users</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Profile</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                <div class="panel">
                    <div class="flex items-center justify-between mb-5">
                        <h5 class="font-semibold text-lg dark:text-white-light">Profile</h5>
                        <router-link to="/users/user-account-settings"
                            class="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                            <icon-pencil-paper />
                        </router-link>
                    </div>
                    <div class="mb-5">
                        <div class="flex flex-col justify-center items-center">
                            <img src="/assets/images/profile-34.jpeg" alt=""
                                class="w-24 h-24 rounded-full object-cover mb-5" />
                            <p class="font-semibold text-primary text-xl">Jimmy Turner</p>
                        </div>
                        <ul class="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                            <li class="flex items-center gap-2">
                                <icon-coffee class="shrink-0" />
                                Web Developer
                            </li>
                            <li class="flex items-center gap-2">
                                <icon-calendar class="shrink-0" />
                                Jan 20, 1989
                            </li>
                            <li class="flex items-center gap-2">
                                <icon-map-pin class="shrink-0" />
                                New York, USA
                            </li>
                            <li>
                                <a href="javascript:;" class="flex items-center gap-2">
                                    <icon-mail class="w-5 h-5 shrink-0" />
                                    <span class="text-primary truncate">jimmy@gmail.com</span></a>
                            </li>
                            <li class="flex items-center gap-2">
                                <icon-phone />
                                <span class="whitespace-nowrap" dir="ltr">+1 (530) 555-12121</span>
                            </li>
                        </ul>
                        <ul class="mt-7 flex items-center justify-center gap-2">
                            <li>
                                <a class="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0"
                                    href="javascript:;">
                                    <icon-twitter class="w-5 h-5" />
                                </a>
                            </li>
                            <li>
                                <a class="btn btn-danger flex items-center justify-center rounded-full w-10 h-10 p-0"
                                    href="javascript:;">
                                    <icon-dribbble />
                                </a>
                            </li>
                            <li>
                                <a class="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0"
                                    href="javascript:;">
                                    <icon-github />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';

import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconCoffee from '@/components/icon/icon-coffee.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconTwitter from '@/components/icon/icon-twitter.vue';
import IconDribbble from '@/components/icon/icon-dribbble.vue';
import IconGithub from '@/components/icon/icon-github.vue';
import IconShoppingBag from '@/components/icon/icon-shopping-bag.vue';
import IconTag from '@/components/icon/icon-tag.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';

useMeta({ title: 'User Profile' });
const store = useAppStore();
</script>

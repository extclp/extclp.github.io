<template>
    <div class="work-time">
        <van-field v-model="text" is-link readonly label="班次" @click="show = true" />
        <van-popup v-model:show="show" round position="bottom">
            <van-picker title="请选择班次" :columns="options" @cancel="show = false" @confirm="onConfirm" />
        </van-popup>
        <van-calendar title="日历" :poppable="false" :show-confirm="false" :formatter="formatter" />
    </div>
</template>
<script setup lang="ts">
import { CalendarDayItem } from 'vant';

const text = ref("白班");
const value = ref(0);

const options = [
    { text: "白班", value: 0 },
    { text: "夜班", value: 1 },
    { text: "休息", value: 2 }
]

const show = ref(false)

const onConfirm = (a: any) => {
    show.value = false;
    text.value = a.selectedOptions[0].text;
    value.value = a.selectedOptions[0].value;
};

const now = new Date().getTime();

const formatter = (day: CalendarDayItem) => {
    var dayjs = Math.ceil((day.date!.getTime() - now) / 86400000);
    const i = (dayjs + value.value) % 3
    if(i == 0) {
        day.bottomInfo = "白班"
    } else if(i == 1) {
        day.bottomInfo = "夜班"
    } else {
        day.bottomInfo = "休息"
    }
    return day;
}
</script>
<style>
.work-time {
    padding-top: 4rem;
    background: var(--van-gray-1);
}

.work-time .van-field {
    margin-bottom: 2rem
}
</style>
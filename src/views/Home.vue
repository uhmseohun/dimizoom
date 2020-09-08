<script lang='ts'>
import Vue from 'vue';
import timetables from '../data/timetables.json';
import lessons from '../data/lessons.json';

export default Vue.extend({
  name: 'GetCurrentLesson',
  computed: {
    todayLessons() {
      const today = [
        null, 'mon', 'tue', 'wed', 'thu', 'fri', null,
      ][new Date().getDay()];
      const mappedTimetable = timetables[today]
        .map((v) => lessons.find((_v) => _v.name === v));
      return mappedTimetable;
    },
  },
  methods: {
    getMeetingURL(meetingCode) {
      return `zoommtg://zoom.us/join?action=join&pwd=dimigo&confno=${meetingCode}`;
    },
  },
});
</script>

<template>
<div class="container">
  <h1 class="service-title">오늘의 온라인 수업</h1>
  <div class="card-wrapper">
    <div class="card">
      <h4 class="card__title">아침 조회 및 종례</h4>
      <div class="card__meta-wrapper">
        <span class="card__description">이재민 선생님</span>
      </div>

      <a
        class="card__link"
        :href="getMeetingURL(7864104388)"
        target="__blank"
      >
        바로가기 &#xE001;
      </a>
      <a
        class="card__link"
        href="https://hcs.eduro.go.kr"
        target="__blank"
      >
        건강상태 자가진단 &#xE001;
      </a>
      <a
        class="card__link"
        href="http://benedu.co.kr/StudentStudy/TaskList"
        target="__blank"
      >
        베네듀 일일학습 &#xE001;
      </a>
    </div>

    <div
      class="card"
      v-for="(lesson, index) in todayLessons"
      :key="index"
    >
      <h4 class="card__title">{{ index + 1 }}교시</h4>
      <div class="card__meta-wrapper">
        <span
          v-if="lesson.teacher"
          class="card__description"
        >
          {{ lesson.name }} | {{ lesson.teacher }} 선생님
        </span>
        <span
          v-else
          class="card__description"
        >
          {{ lesson.name }}
        </span>
      </div>

      <a
        v-if="lesson.code"
        class="card__link"
        :href="getMeetingURL(lesson.code)"
        target="__blank"
      >
        바로가기 &#xE001;
      </a>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.service-title {
  margin-top: 0;
  margin-bottom: 0;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
}

.card {
  border-radius: 35px;
  background: #f8cad2;
  box-shadow: 15px 15px 50px #d3acb3, -15px -15px 50px #ffe8f2;
  padding: 20px 25px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  &__title {
    margin: 0;
  }

  &__description {}

  &__meta-wrapper {
    display: flex;
    flex-direction: row;
  }

  &__link {
    margin-left: auto;
    text-decoration: none;
    color: #417BF4;
  }
}
</style>

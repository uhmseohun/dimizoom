<script lang='ts'>
import Vue from 'vue';
import timetables from '../data/timetables.json';
import lessons from '../data/lessons.json';

export default Vue.extend({
  name: 'GetCurrentLesson',
  data() {
    return { displayMode: 'dark' };
  },
  computed: {
    todayLessons() {
      const today = [
        null, 'mon', 'tue', 'wed', 'thu', 'fri', null,
      ][new Date().getDay()];
      const mappedTimetable = timetables[today]
        .map((v) => lessons.find((_v) => _v.name === v));
      return mappedTimetable;
    },
    currentDisplayModeString() {
      return this.displayMode === 'dark' ? '다크' : '라이트';
    },
    changeTargetDisplayModeString() {
      return this.displayMode === 'dark' ? '라이트' : '다크';
    },
    computedDisplayModeStyle() {
      const textColor = this.displayMode === 'dark' ? '#d7d7d7' : '#000000';
      return {
        'color': textColor,
        'margin-left': 'auto',
        'cursor': 'pointer',
      };
    },
    computedServiceTitleStyle() {
      const textColor = this.displayMode === 'dark' ? '#dc5773' : '#000000';
      return {
        'color': textColor,
        'margin-top': '0',
        'margin-bottom': '0',
      };
    },
    computedCardStyle() {
      const backgroundColor = this.displayMode === 'dark' ? '#1e1e1e' : '#f8cad2';
      const boxShadowColor = this.displayMode === 'dark' ?
        '15px 15px 50px #1a1a1a, -15px -15px 50px #232323' :
        '15px 15px 50px #d3acb3, -15px -15px 50px #ffe8f2';
      return {
        'background': backgroundColor,
        'box-shadow': boxShadowColor,
      };
    },
    computedCardTitleStyle() {
      const textColor = this.displayMode === 'dark' ? '#d7d7d7' : '#000000';
      return {
        'color': textColor,
        'margin': '0',
      };
    },
    computedCardDescriptionStyle() {
      const textColor = this.displayMode === 'dark' ? '#d0d0dd' : '#000000';
      return { 'color': textColor };
    },
    computedCardLinkStyle() {
      const textColor = this.displayMode === 'dark' ? '#dc5773' : '#417bf4';
      return {
        'color': textColor,
        'margin-left': 'auto',
        'text-decoration': 'none',
      };
    },
  },
  methods: {
    getMeetingURL(meetingCode) {
      return `zoommtg://zoom.us/join?action=join&pwd=dimigo&confno=${meetingCode}`;
    },
    toggleDisplayMode() {
      if (this.displayMode === 'dark') this.displayMode = 'light';
      else this.displayMode = 'dark';
      localStorage.setItem('displayMode', this.displayMode);
      this.refreshContainerStyle();
    },
    refreshContainerStyle() {
      const backgroundColor = this.displayMode === 'dark' ? '#1e1e1e' : '#f8cad2';
      document.body.style.backgroundColor = backgroundColor;
    },
  },
  created() {
    if (new Date().getMonth() === 10) {
      if (new Date().getDate() === 19) {
       timetables[today] = [
         '성공적인 직업생활',
         '수학 II',
         '수학 II',
         '화학 I',
         '중국어 I',
         '문학',
         'HR',
        ];
      }
    }
    const displayMode = localStorage.getItem('displayMode');
    if (displayMode) this.displayMode = displayMode;
    this.refreshContainerStyle();
  },
});
</script>

<template>
<div class="container">
  <div class="header">
    <h1 :style="computedServiceTitleStyle">오늘의 온라인 수업</h1>
    <span
      :style="computedDisplayModeStyle"
      @click="toggleDisplayMode"
    >
      {{ changeTargetDisplayModeString }} 모드로 전환
    </span>
  </div>
  <div class="card-wrapper">
    <div
      class="card"
      :style="computedCardStyle"
    >
      <h4 :style="computedCardTitleStyle">아침 조회 및 종례</h4>
      <div class="card__meta-wrapper">
        <span :style="computedCardDescriptionStyle">이재민 선생님</span>
      </div>

      <a
        :style="computedCardLinkStyle"
        :href="getMeetingURL(7864104388)"
        target="__blank"
      >
        바로가기 &#xE001;
      </a>
      <a
        :style="computedCardLinkStyle"
        href="https://hcs.eduro.go.kr"
        target="__blank"
      >
        건강상태 자가진단 &#xE001;
      </a>
      <a
        :style="computedCardLinkStyle"
        href="http://benedu.co.kr/StudentStudy/TaskList"
        target="__blank"
      >
        베네듀 일일학습 &#xE001;
      </a>
    </div>

    <div
      class="card"
      :style="computedCardStyle"
      v-for="(lesson, index) in todayLessons"
      :key="index"
    >
      <h4 :style="computedCardTitleStyle">{{ index + 1 }}교시</h4>
      <div class="card__meta-wrapper">
        <span
          v-if="lesson.teacher"
          :style="computedCardDescriptionStyle"
        >
          {{ lesson.name }} | {{ lesson.teacher }} 선생님
        </span>
        <span v-else :style="computedCardDescriptionStyle">
          {{ lesson.name }}
        </span>
      </div>

      <a
        v-if="lesson.code"
        :style="computedCardLinkStyle"
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
.header {
  display: flex;
  align-items: center;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
}

.card {
  border-radius: 35px;
  padding: 20px 25px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  &__meta-wrapper {
    display: flex;
    flex-direction: row;
  }
}
</style>

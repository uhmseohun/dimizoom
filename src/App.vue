<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app {
  width: 95vw;
  max-width: 450px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
  padding: 30px 0;
}

* { user-select: none; }
</style>

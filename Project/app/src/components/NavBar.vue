<!-- NavBar.vue -->
<template>
  <div class="header">
    <a href="../index.html">Home</a>
    <div class="dropdown">
      <a href="dng.html">DNG</a>
      <div class="dropdownContent">
        <a href="dng.html">Intro</a>
        <a href="ifds.html">IFDs</a>
      </div>
    </div>
    <a href="tutorial.html">Tutorial</a>
    <a href="About.html">About</a>

    <div class="dropdown">
      <a href="dng.html">{{ $t("navbar.language") }}</a>
      <div class="dropdownContent">
        <a href="#" @click="changeLanguage('en')">{{
          $t("navbar.english")
        }}</a>
        <a href="#" @click="changeLanguage('de')">{{
          $t("navbar.deutsch")
        }}</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    changeLanguage(locale) {
      // Change the language using Vue I18n
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  width: 60%;
  left: 20%;
  text-align: center;
  background-color: black;
  margin-top: 0px;
}

.header a {
  display: inline-block;
  padding-left: 27px;
  padding-right: 27px;
  padding-top: 3px;
  padding-bottom: 3px;
  text-decoration: none;
  color: white;
}

.header a:hover {
  background-color: #666;
}

.dropdown {
  display: inline-block;
}

.dropdownContent {
  display: none;
  position: absolute;
  background-color: #555;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdownContent a {
  float: none;
  color: white;
  padding: 12px 7.9px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover {
  background-color: #555;
}

.dropdown:hover .dropdownContent {
  display: block;
}
</style>

<template>
  <div id="app">
    <NavBar />
    <div class="content">
      <img class="logoImage" src="../public/images/logo.png" alt="Logo Image">
      <div id="inputBox" class="inputBox">
        <ImageUpload @image-uploaded="updatePreviewUrl" @image-tags="updateImageTags" />
        <div class="columns-container">
          <div class="column image-info" :class="{ 'hidden': !previewUrl }">
            <ImageInfo :tags="imageTags" />
          </div>
          <div class="column image-display" :class="{ 'hidden': !previewUrl }">
            <ImagePreview :previewUrl="previewUrl" />
          </div>
          <div class="column image-display" :class="{ 'hidden': !previewUrl }">
          </div>
        </div>
        <div class="column start-decoding" :class="{ 'hidden': !previewUrl }">
          <ButtonsGroup :previewUrl="previewUrl" />
        </div>
      </div>
      <FooterDescription />
    </div>
  </div>
</template>


<script>
import axios from 'axios';

import NavBar from './components/NavBar.vue';
import ImageUpload from './components/ImageUpload.vue';
import ImageInfo from './components/ImageInfo.vue';
import ImagePreview from './components/ImagePreview.vue';
import ButtonsGroup from './components/ButtonsGroup.vue';
import FooterDescription from './components/FooterDescription.vue';

export default {
  components: {
    NavBar,
    ImageUpload,
    ImageInfo,
    ImagePreview,
    ButtonsGroup,
    FooterDescription,
  },
  data() {
    return {
      previewUrl: '',
      imageTags: {},
    };
  },
  methods: {
    updatePreviewUrl(url) {
      this.previewUrl = url;
    },
    updateImageTags(tags) {
      this.imageTags = tags;
    },
  },
  created() {
    // Make a GET request to the /clean endpoint when the App component is created
    axios.get('http://127.0.0.1:3000/clean')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error emptying storage:', error);
      });
  },
};
</script>

<style>
/* Reset some default styles */
html,
body,
h1,
h2,
h3,
p,
ul,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  list-style: none;
}

/* Global styles */
body {
  background: #ddd;
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
}

/* Header and navigation */
nav ul {
  list-style: none;
  background-color: #333;
  padding: 5px 0;
  margin: 0;
  position: relative;
  width: 60%;
  left: 20%;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
  padding: 8px;
}

nav ul li a:hover {
  background-color: #666;
}

/* Submenu */
nav ul li ul.submenu {
  display: none;
  position: absolute;
  background-color: #555;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  margin: 0;
}

nav ul li:hover ul.submenu {
  display: block;
}

nav ul li ul.submenu li {
  color: white;
  padding: 12px 7.9px;
  text-decoration: none;
  text-align: left;
  display: block;
  margin: 5px 0;
}

/* Content container */
.content {
  padding-bottom: 164px;
  position: relative;
  background: #eee;
  width:60%; /*60%;*/
  margin: 30px auto;
  margin-top: 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.decoded-image {
  width: 20rem;
}

/* Logo and Input Box */
.logoImage {
  width: 9rem; /*12rem;*/
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.inputBox{
	position: relative;
	width: 100%-4px;
	align-content: center;
	margin-top: 30px;
	padding-top: 50px;
	padding-bottom: 50px;
	background-color: #ccc;
	border: 2px solid black;
	overflow: hidden;
}
.uploadLabel {
  font-family: Arial, sans-serif;
  font-size: 15px;
  background-color: black;
  padding: 15px 30px;
  border-radius: 10px;
  color: white;
  margin-top: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.uploadLabel:hover {
  background-color: #222;
  /* Change to your desired hover color */
}

/*.dropzone {
  margin-bottom: 20px;
}*/

/* Introduction section */
.intro {
  text-align: left;
  padding: 40px 0;
}

.intro p {
  font-size: 18px;
  line-height: 1.6;
}

.intro a {
  color: #ff8c00;
  /* Change to your desired link color */
  text-decoration: underline;
  transition: color 0.3s;
}

.intro a:hover {
  color: #ff6f00;
  /* Change to your desired hover color */
}

/* Image and File Input */

.fileInput {
  display: none;
}

/* Columns and Image Display */
.columns-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
  padding: 0 20px;
}

.hidden {
  display: none;
}

.column {
  flex: 1;
  padding: 10px;
  margin: 1rem;
  box-sizing: border-box;
  margin-top: 0px;
  padding-top: 0px;
}

.image-display {
  text-align: center;
  padding: 10px;
}

/* Clear Floats 
.clear {
  clear: both;
}*/

/* Download Buttons */
.download-buttons {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Start Decoding Buttons */
.start-decoding {
  text-align: center;
  padding: 10px;
}

.start-decoding button {
  background-color: #000;
  padding: 14px;
  color: #fff;
  border-radius: 11px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 4px;
}

.start-decoding button:hover {
  background-color: #333;
  /* Change to your desired hover color */
}

.start-decoding button a {
  color: #fff;
  text-decoration: none;
}

/* Responsive Styles */
@media (max-width: 768px) {

  /* Adjust styles for smaller screens here */
  nav ul li {
    margin-right: 10px;
  }

  .content {
    width: 90%;
    padding: 20px;
  }

  .columns-container {
    flex-direction: column;
    align-items: center;
  }

  .column {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
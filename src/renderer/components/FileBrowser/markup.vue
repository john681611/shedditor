<template>
  <div>
    <div class="title">File Browser</div>
    <div class="items">
      <div class="item">
        <v-btn class="name" v-on:click="openFolder()">Select Folder</v-btn>
        <v-btn class="value" v-if='sourcePath' v-on:click="goUp()">up</v-btn>
      </div>
      <div v-if='sourcePath' class="item">
        <div class="name">Source:</div>
        <div class="value">{{sourcePath}}</div>
      </div>
      <div class="item">
        <ul class="value">
          <li v-for="file in fileList">
          <v-btn v-if='isDir(file)' v-on:click='selectFolder(file)'>{{file}}</v-btn>
          <v-btn v-else v-on:click="openFile(file)">{{file}}</v-btn>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src='./script.js'></script>
<style src='./style.css' scoped></style>


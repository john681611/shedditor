<template>
  <div id="wrapper">
    <v-toolbar absolute tabs dark>
      <v-icon v-on:click.stop="drawer = !drawer" >folder</v-icon>
      <v-toolbar-title>Shedditor</v-toolbar-title>
      <p style='margin: 0 20px'>
      &nbsp;&nbsp;&nbsp;&nbsp;Finally a editor more awkward than vim\s
      </p>
      <v-tabs v-if='files.length' v-model="active" slot="extension" centered show-arrows>
        <v-tab v-for="file in files" ripple>
          {{file.name}} <v-icon v-on:click='files.splice(files.indexOf(file),1)'>close</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary absolute dark>
      <file-browser v-on:open-file="openFile($event)"></file-browser>
    </v-navigation-drawer>
    <main>
    <v-tabs-items v-if='files.length' v-model="active">
          <v-tab-item v-for="file in files">
            <editor :open-file='file.path'></editor>
          </v-tab-item>
        </v-tabs-items>
      <dir v-else class='center'>
        <h1>Looks like you have nothing open</h1>
        <v-btn v-on:click.stop="drawer = !drawer">TAKE ME TO MY FILES DAMN IT!</v-btn>
        <p>Can't think of anything? Here is some music to listen to while you decide.</p>
        <iframe class='videoContainer' width="560" height="315" src="https://www.youtube.com/embed/-b5X69vREAg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </dir>
    </main>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>

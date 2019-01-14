<template>
  <div id="wrapper">
    
    <v-toolbar absolute tabs dark>
      <v-icon v-on:click.stop="drawer = !drawer">folder</v-icon>
      <v-toolbar-title>Shedditor</v-toolbar-title>
      <p style='margin: 0 20px'>
      &nbsp;&nbsp;&nbsp;&nbsp;Finally an editor more awkward than vim\s
      </p>
      <v-tabs v-if='files.length' v-model="active" slot="extension" centered show-arrows>
        <v-tab v-for="(file, index) in files" :key="index" ripple>
          {{file.name}}<span v-if="file.saveState" class="unsaved"></span> <v-icon v-on:click='updateFile(null, index)'>close</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary absolute dark>
      <file-browser v-on:close='drawer=false' v-on:open-file="openFile($event)" v-on:notify="notify"></file-browser>
    </v-navigation-drawer>
    <main>
    <v-snackbar v-model="showNote" :bottom="true" multi-line auto-height :timeout="6000">
      <v-alert :value="showNote" :type="note.type">
        {{note.message}}
      <v-btn flat v-on:click="showNote = false" class="close-note"><v-icon>close</v-icon></v-btn>
    </v-alert>
      </v-btn>
    </v-snackbar>
    <v-tabs-items v-if='files.length' v-model="active">
          <v-tab-item v-for="(file, index) in files" :key="index">
            <editor :open-file='file.path' v-on:notify="notify" v-on:saveState="updateState($event, index)" v-on:updateFile="updateFile($event, index)"></editor>
          </v-tab-item>
        </v-tabs-items>
      <dir v-else class='center'>
        <h1>Looks like you have nothing open</h1>
        <v-btn v-on:click.stop="drawer = !drawer">TAKE ME TO MY FILES DAMN IT</v-btn>
        <v-btn v-on:click.stop="openFile(null)">I WANNA DO SOMETHING NEW</v-btn>
        <div id='terminal'></div>
      </dir>
    </main>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>

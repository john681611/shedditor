<template>
  <div id="wrapper">
    <v-toolbar absolute>
      <v-icon v-on:click.stop="drawer = !drawer" >folder</v-icon>
      <v-toolbar-title>Shedditor</v-toolbar-title>
      <p style='margin: 0 20px'>
      &nbsp;&nbsp;&nbsp;&nbsp;Finally a editor more awkward than vim\s
      </p>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary absolute>
      <file-browser v-on:open-file="openFile = $event"></file-browser>
    </v-navigation-drawer>
    <main>
      <editor v-bind:open-file='openFile'></editor>
    </main>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>

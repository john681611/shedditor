<template>
  <div>
    <div class="title">File Browser</div>
    <v-btn v-on:click="openFolder()" open-on-click>Select Folder</v-btn>
    <v-treeview :items="fileList" expand-icon='' open-on-click>
    <template slot="prepend" slot-scope="{ item, open, leaf }" >
      <v-icon v-if='item.folder'>
        {{ open ? 'folder_open' : 'folder' }}
      </v-icon>
      <v-btn v-else flat v-on:click='openFile(item.name)'>
        <v-icon>
          description
        </v-icon>
        {{item.name}}
      </v-btn>
    </template>
    </v-treeview>
  </div>
</template>
<script src='./script.js'></script>
<style src='./style.css'></style>


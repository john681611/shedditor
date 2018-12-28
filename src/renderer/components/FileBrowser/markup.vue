<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
          <v-btn  flat v-on:click="openFolder()" open-on-click class='file-button'><v-icon>folder_open</v-icon>Open</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn  flat v-on:click="openFolder()" open-on-click class='file-button'><v-icon>create_new_folder</v-icon>New</v-btn>
        </v-flex>
     </v-layout>
    <v-treeview dark :items="fileList" expand-icon='' open-on-click class='tree'>
    <template slot="prepend" slot-scope="{ item, open, leaf }" >
      <v-icon v-if='item.folder'>
        {{ open ? 'folder_open' : 'folder' }}
      </v-icon>
      <v-btn v-else flat v-on:click='openFile(item.filePath)' class='file-button'>
        <v-icon>
          description
        </v-icon>
        {{item.name}}
      </v-btn>
    </template>
    </v-treeview>
    </v-container>
</template>
<script src='./script.js'></script>
<style src='./style.css'></style>


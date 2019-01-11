<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
          <v-btn  flat v-on:click="openFolder()" class='file-button'><v-icon>folder_open</v-icon>Open</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn  flat v-on:click="openFile(null); close()" class='file-button'><v-icon>open_in_new</v-icon>New</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn  flat v-on:click="refreshFile();" class='file-button'><v-icon>refresh</v-icon></v-btn>
        </v-flex>
     </v-layout>
     <v-divider dark></v-divider>
     <h2>{{folderName}}</h2>
    <v-divider dark></v-divider>
    <v-treeview v-model="tree" :items="items" open-on-click activatable item-key="name" >
    <template slot="prepend" slot-scope="{ item, open, leaf }" >
        <v-icon v-if='item.folder'>
          {{ open ? 'folder_open' : 'folder' }}
        </v-icon>
        <v-btn v-else flat v-on:click='openFile(item.filePath)' v-on:dblclick='openFile(item.filePath); close()' class='file-button'>
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


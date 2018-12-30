<template>
    <dir>
        <div>
           <v-icon v-on:click='saveFile'>save</v-icon>
           <v-icon v-on:click='refeshFile'>refresh</v-icon>
           <v-icon v-on:click='deleteFile'>delete</v-icon>
        </div>
        <monaco-editor
    class="editor"
    v-model="content"
    :language="getFileType(openFile)"
    theme='vs-dark'>
  </monaco-editor>
    </dir>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>
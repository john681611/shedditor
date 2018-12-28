<template>
    <dir>
        <div>
            <v-btn flat v-on:click='saveFile'><v-icon>save</v-icon></v-btn>
            <v-btn flat v-on:click='refeshFile'><v-icon>refresh</v-icon></v-btn>
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
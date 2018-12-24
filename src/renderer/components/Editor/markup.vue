<template>
    <dir>
        <h3>{{openFile}}</h3>
        <prism-editor class='full-size' v-bind:code="content" v-bind:language="getFileType(openFile)" lineNumbers></prism-editor>
    </dir>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>
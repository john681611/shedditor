<template>
    <dir>
        <h2>{{fileName}}</h2>
        <div>
            <v-btn flat v-on:click='saveFile'><v-icon>save</v-icon></v-btn>
        </div>
        <prism-editor v-if='content' class='full-size' v-model:code="content" v-bind:language="getFileType(openFile)" lineNumbers></prism-editor>
    </dir>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>

import MonacoEditor from './monaco';
const {dialog} = require('electron').remote;
import fileMapping from './fileMapping';
const fs = require('fs-extra');
export default {
    components: {MonacoEditor},
    props:['openFile'],
    data() {
        return {
            originalFile:null,
            content: null,
            active: null
        };
    },
    methods: {
        getFileType(file) {
            if(file) {
                return fileMapping[file.split('.').pop()];
            }
            return null;
        },
        saveFile() {
            const data = new Uint8Array(Buffer.from(this.content));
            if(!this.originalFile){
                this.originalFile = dialog.showSaveDialog({title: 'Save File'});
                this.$emit('updateFile', {name: this.originalFile.split('/').pop(), path:this.originalFile});
            }
            fs.writeFile(this.originalFile, data, (err) => {
                if (err) {
                    console.log(err);
                    this.$emit('notify', {message:'Save Failed', type:'error'});
                }
                this.$emit('notify', {message:`Saved ${this.originalFile}`, type:'success'});
            });
        },
        async deleteFile() {
            if(this.originalFile){
                await fs.unlink(this.originalFile);
            }
            this.$emit('updateFile',null);
        },
        async refeshFile() {
            if(this.originalFile){
                this.content = await fs.readFile(this.originalFile, 'utf8');
                this.$emit('notify', {message:`Refreshed: ${this.originalFile}`, type:'success'});
            } else {
                this.$emit('notify', {message:'No saved File', type:'error'});
            }
        },
        close() {
            this.$emit('open-file', null);
        }
    },
    watch: {
        openFile: {
            immediate: true,
            async handler(newFile) {
                this.originalFile = newFile;
                if(newFile) {
                    this.content = await fs.readFileSync(newFile, 'utf8');
                } else {
                    this.content = '';
                }
            }
        }
    }
};
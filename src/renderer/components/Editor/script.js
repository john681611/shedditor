
import MonacoEditor from './monaco';
const {dialog} = require('electron').remote;
import fileMapping from './fileMapping';
const fs = require('fs-extra');
const {platform} = require('os');


const setContent =  async (newFile, state) => {
    const content = await fs.readFileSync(newFile, 'utf8');
    state.originalcontent = content;
    state.content = content;
    state.$emit('saveState', false);
};

export default {
    components: {MonacoEditor},
    props:['openFile'],
    data() {
        return {
            originalFile:null,
            originalcontent: null,
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
                this.$emit('updateFile', {name: this.originalFile.split((platform() === 'win32'? '\\' : '/')).pop(), path:this.originalFile});
            }
            fs.writeFile(this.originalFile, data, (err) => {
                if (err) {
                    console.log(err);
                    this.$emit('notify', {message:'Save Failed', type:'error'});
                }
                this.$emit('notify', {message:`Saved ${this.originalFile}`, type:'success'});
                this.$emit('saveState', false);
            });
        },
        async deleteFile() {
            if(this.originalFile){
                await fs.unlink(this.originalFile);
            }
            this.$emit('updateFile', null);
        },
        async refeshFile() {
            if(this.originalFile){
                await setContent(this.originalFile, this);
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
                   await setContent(this.originalFile, this);
                } else {
                    this.content = '';
                }
            }
        },
        content: {
            immediate: true,
            handler(newContent) {
                if(this.originalcontent !== newContent) {
                    this.$emit('saveState', true);
                }

            }
        }
    }
};
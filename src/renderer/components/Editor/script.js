
import MonacoEditor from './monaco';
import fileMapping from './fileMapping';
const fs = require('fs');
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
            return fileMapping[file.split('.').pop()];
        },
        saveFile() {
            const data = new Uint8Array(Buffer.from(this.content));
            fs.writeFile(this.originalFile, data, (err) => {
                if (err) {
                    console.log(err);
                    this.$emit('notify', {message:'Save Failed', type:'error'});
                }
                this.$emit('notify', {message:`Saved ${this.originalFile}`, type:'success'});
            });
        },
        refeshFile() {
            this.content = fs.readFileSync(this.originalFile, 'utf8');
            this.$emit('notify', {message:`Refreshed: ${this.originalFile}`, type:'success'});
        },
        close() {
            this.$emit('open-file', null);
        }
    },
    watch: {
        openFile: {
            immediate: true,
            handler(newFile) {
                this.originalFile = newFile;
                this.content = fs.readFileSync(newFile, 'utf8');
            }
        }
    }
};
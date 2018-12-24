const PrismEditor = require('vue-prism-editor');
import 'prismjs';
import 'prismjs/themes/prism.css';
import 'vue-prism-editor/dist/VuePrismEditor.css'; // import the styles
const fs = require('fs');
export default {
    components: {PrismEditor},
    props:['openFile'],
    data() {
        return {
            content: null,
            fileName: null,
            active: null
        };
    },
    methods: {
        getFileType(file) {
            let type =  file.split('.').pop();
            type  = ['ejs', 'vue'].indexOf(type) !== -1 ? 'html': type;
            return type;
        },
        saveFile() {
            console.log(this.content);
            // const data = new Uint8Array(Buffer.from(this.content));
            // fs.writeFile(this.originalFile, data, (err) => {
            //     if (err) {throw err;}
            //     console.log('The file has been saved!');
            // });
        }
    },
    watch: {
        openFile: {
            immediate: true,
            handler(newFile) {
                this.originalFile = newFile; 
                this.content = fs.readFileSync(newFile, 'utf8');
                this.fileName = newFile.split('/').pop();
            }
        }
    }
};
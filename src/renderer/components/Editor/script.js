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
            content:'EMPTY'
        };
    },
    methods: {
        getFileType(file) {
            console.log(file.split('.').pop());
            return file.split('.').pop();
        }
    },
    watch: {
        openFile: {
            immediate: true,
            handler(newFile) {
                this.content = fs.readFileSync(newFile, 'utf8');
            }
        }
    }
};
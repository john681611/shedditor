import FileBrowser from '../FileBrowser/markup';
import Editor from '../Editor/markup';
export default {
    data () {
        return {
            active: null,
            drawer: null,
            files:[]
        };
    },
    name: 'landing-page',
    components: { FileBrowser, Editor },
    methods: {
        openFile (newFile) {
            const fileObj = {name: newFile.split('/').pop(), path:newFile};
            const found = this.files.find(file => file.path === newFile);
            if(found) {
                this.active = this.files.indexOf(found);
            } else {
                this.files.push(fileObj);
                this.active = this.files.length -1;
            }
        }
    }
};
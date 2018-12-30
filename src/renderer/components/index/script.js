import FileBrowser from '../FileBrowser/markup';
import Editor from '../Editor/markup';
export default {
    data () {
        return {
            active: null,
            drawer: null,
            files:[],
            note: {type:'info', message:''},
            showNote: false
        };
    },
    name: 'landing-page',
    components: { FileBrowser, Editor },
    methods: {
        openFile (newFile) {
            const fileObj = {name: '!new', path:newFile};
            if(newFile) {
                fileObj.name = newFile.split('/').pop();
            }
            const found = this.files.find(file => file.path === newFile);
            if(found) {
                this.active = this.files.indexOf(found);
            } else {
                this.files.push(fileObj);
                this.active = this.files.length -1;
            }
        },
        notify(notification) {
            this.note = notification;
            this.showNote = true;
        }
    }
};
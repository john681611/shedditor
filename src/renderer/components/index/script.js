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
            const fileObj = {name: 'Mr No-name.null', path:newFile};
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
        updateFile(file, index) {
            if(file) {
                this.files[index] = file;
            } else {
                this.files.splice(index, 1);
            }
        },
        notify(notification) {
            this.note = notification;
            this.showNote = true;
        }
    },
    watch: {
        files: {
            handler: function (val, oldVal) {
                localStorage.files = JSON.stringify(val);
            },
            deep: true
        }
    },
    beforeMount(){
        if(localStorage.files) {
            this.files = JSON.parse(localStorage.files);
        }
    }
};
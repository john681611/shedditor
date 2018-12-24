import FileBrowser from './FileBrowser/markup';
import Editor from './Editor/markup';
export default {
    data () {
        return {
            drawer: null,
            openFile:''
        };
    },
    name: 'landing-page',
    components: { FileBrowser, Editor }
};
const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require('path');

const setFolder = (filePath, state) => {
    state.sourcePath = filePath;
    state.fileList = fs.readdirSync(filePath);
};

export default {
    data () {
        return {
            fileList:[]
        };
    },
    methods: {
        openFolder () {
            dialog.showOpenDialog({
                title:'Select a folder',
                properties: ['openDirectory']
            }, (folderPaths) => {
                if(folderPaths === undefined){
                    return;
                }
                setFolder(folderPaths[0], this);
            });
        },
        selectFolder(folderName) {

            setFolder(path.join(this.sourcePath, folderName), this);
        },
        goUp(){
            setFolder(this.sourcePath.substring(0, this.sourcePath.lastIndexOf('/')), this);
        },
        isDir(folderName) {
            const stats = fs.statSync(path.join(this.sourcePath, folderName));
            return stats.isDirectory();
        },
        openFile(fileName) {
            this.$emit('open-file', path.join(this.sourcePath, fileName));
        }
    }
};
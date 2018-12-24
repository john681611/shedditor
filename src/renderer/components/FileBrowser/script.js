const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require('path');


const walkSync = (dir, fileList) =>  {
    const files = fs.readdirSync(dir);
    files.forEach(function(file) {
        const filePath = path.join(dir, file);
        const fileObj = {
            name: file,
            children:[]
        };
        if (fs.statSync(filePath).isDirectory()) {
            fileObj.children = walkSync(filePath, []);
            fileObj.folder = true;
        }
        fileList.push(fileObj);
    });
    return fileList;
};

const setFolder = (filePath, state) => {
    state.sourcePath = filePath;
    state.fileList = walkSync(filePath, []);
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
        openFile(fileName) {
            console.log(fileName);
            this.$emit('open-file', path.join(this.sourcePath, fileName));
        }
    }
};
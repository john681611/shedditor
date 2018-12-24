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
        try {
            const stats =  fs.statSync(filePath);
            if (stats.isDirectory()) {
                fileObj.children = walkSync(filePath, []);
                fileObj.folder = true;
            }
            fileList.push(fileObj);
        } catch (e) {
            console.log(e);
        }

    });
    return fileList;
};

const setFolder = (filePath, state) => {
    state.sourcePath = filePath;
    state.fileList = [{name: filePath.split('/').pop(), folder: true, children:walkSync(filePath, [])}];
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
            this.$emit('open-file', path.join(this.sourcePath, fileName));
        }
    }
};
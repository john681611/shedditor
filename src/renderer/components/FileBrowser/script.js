const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require('path');


const walkSync = (dir, fileList, state) =>  {
    const files = fs.readdirSync(dir);
    files.forEach(function(file) {
        const filePath = path.join(dir, file);
        const fileObj = {
            name: file,
            filePath,
            children:[]
        };
        try {
            const stats =  fs.statSync(filePath);
            if (stats.isDirectory() && !filePath.includes('node_modules')) {
                fileObj.children = walkSync(filePath, [], state);
                fileObj.folder = true;
            }
            fileList.push(fileObj);
        } catch (e) {
            console.error(e);
            state.$emit('notify', {message:'Tree build failed', type:'error'});
        }

    });
    return fileList;
};

const setFolder = (filePath, state) => {
    state.fileList = [{name: filePath.split('/').pop(), folder: true, children:walkSync(filePath, [], state)}];
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
            this.$emit('open-file', fileName);
        }
    }
};
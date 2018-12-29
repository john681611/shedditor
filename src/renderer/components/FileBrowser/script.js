const {dialog} = require('electron').remote;
const fs = require('fs-extra');
const path = require('path');


const walkDir = async (dir, fileList, state) =>  {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileObj = {
            name: file,
            filePath,
            children:[]
        };
        try {
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                if(!filePath.includes('node_modules')) {
                    fileObj.children = await walkDir(filePath, [], state);
                    fileObj.folder = true;
                }
            }
            fileList.push(fileObj);
        } catch (e) {
            console.error(e);
            state.$emit('notify', {message:'Tree build failed', type:'error'});
        }

    }
    return fileList;
};

const setFolder = async (filePath, state) => {
    state.fileList = [{name: filePath.split('/').pop(), folder: true, children: await walkDir(filePath, [], state)}];
};

export default {
    data () {
        return {
            fileList:[]
        };
    },
    computed: {
        items () {
            return this.fileList;
        }
    },
    methods: {
        async openFolder () {
            const folderPaths = dialog.showOpenDialog({
                title:'Select a folder',
                properties: ['openDirectory']
            });
            if(folderPaths === undefined){
                return;
            }
            await setFolder(folderPaths[0], this);
        },
        openFile(fileName) {
            this.$emit('open-file', fileName);
        }
    }
};
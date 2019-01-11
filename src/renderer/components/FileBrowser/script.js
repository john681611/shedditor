const {dialog} = require('electron').remote;
const fs = require('fs-extra');
const path = require('path');
const {platform} = require("os");

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
    fileList.sort(function(x, y) {
        const result =  x.folder === y.folder? 0 : x.folder? -1 : 1;
        if(result === 0 ) {
            return x.name.localeCompare(y.name);
        }
        return result;
    });
    return fileList;
};

const setFolder = async (filePath, state) => {
    state.folderName = filePath.split((platform() === 'win32'? '\\' : '/')).pop();
    state.fileList = await walkDir(filePath, [], state);
};

export default {
    data () {
        return {
            folderName: null,
            fileList:[],
            tree:[]
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
            localStorage.folderPath = folderPaths[0];
            await setFolder(folderPaths[0], this);
        },
        openFile(fileName) {
            this.$emit('open-file', fileName);
        },
        close () {
            this.$emit('close');
        },
        async refreshFile () {
            this.fileList = await walkDir(localStorage.folderPath, [], this);
        }
    },
    async beforeMount(){
        if(localStorage.folderPath) {
            await setFolder(localStorage.folderPath, this);
        }
    }
};
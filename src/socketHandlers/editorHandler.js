
import fs from "fs/promises";

export const handleEditorSocketEvents = (socket,editorNameSpace) => {

    socket.on('writeFile', async ({data,pathToFileOrFolder}) => {
        try {
            const response = await fs.writeFile(pathToFileOrFolder,data);
            editorNameSpace.emit('writeFileSuccess',{
                data:'File written successfully',
                path:pathToFileOrFolder
            })
            
        } catch (error) {
            console.log('Error writing the file',error);
            socket.emit('error',{
                data:'Error writing the file'
            });
        }
    })

    socket.on('createFile',async ({pathToFileOrFolder})=> {
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
            if (isFileAlreadyPresent){
                socket.emit('error',{
                    data :'File already exists',

                });
                return;
            }
        try {
            const response = await fs.writeFile(pathToFileOrFolder,"");
            socket.emit('createFIleSuccess',{
                data :'File created successfully'
            });
            
        } catch (error) {
            console.log('Error creating the file',error);
            socket.emit('error',{
                data : "Error creating the file",
            });
        }
    })
    socket.on('readFile', async ({pathToFileOrFolder}) => {
         try {
            const response = await fs.readFile(pathToFileOrFolder);
            socket.emit("readFileSuccess",{
                data:response.toString()
            })
         } catch (error) {
            console.log("Error reading file",error);
            socket.emit("error",{
                data:'Error reading the file',
            });
         }
    })
    socket.on('deleteFile',async ({pathToFileOrFolder})=>{
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data:"File deleted successfully"
            });
        } catch (error) {
            console.log("Error deleting the file",error);
            socket.emit('error',{
                data:"Error deleting the file",
            });
        }   
    });

    socket.on('createFolder',async ({pathToFileOrFolder}) => {
        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit('createFolderSuccess',{
                data:"Folder created successfully",
            });
        } catch (error) {
            console.log('Error creating the folder',error);
            socket.emit('error',{
                data:"Error creating the folder"
            });
        }
    });

    socket.on('deleteFolder', async ({pathToFileOrFolder}) => {
       try {
            const response = await fs.rmdir(pathToFileOrFolder,{recursive:true});
            socket.emit('deletFolderSuccess',{
                data:'Folder data successfully'
            });
       } catch (error) {
            console.log('Error deleting the folder',error);
            socket.emit('error',{
                data :'Error deleting the folder'
            })
       }
    });

  
}

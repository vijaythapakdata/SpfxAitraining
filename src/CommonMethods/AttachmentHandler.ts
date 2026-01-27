export const handleAttachment=
(event:React.ChangeEvent<HTMLInputElement>,setAttachement:React.Dispatch<React.SetStateAction<File[]>>)=>{
    const files=event.target.files;
    if(!files) return;
    //convert fileList-File[]
    const newFiles=Array.from(files);
    setAttachement(prev=>({...prev,...newFiles}));
}
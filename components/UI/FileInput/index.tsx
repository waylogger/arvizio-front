import React, { useEffect, useState } from 'react';
import styles from './fileInput.module.css'
import inputStyles from '../MyInput/MyInput.module.css'
export default function FileInput (

  props: {
    accept: string,
    onUpload(files: File[]): void
  } 
){

    const [files,setFiles] = useState([])
    const [filesSize,setFilesSize] = useState(0)
    const [fileInputText,setFileInputText] = useState('Материалы (опционально)')
    useEffect(()=>{
        
        props.onUpload(files)
        const text = files.length && filesSize ? `Загружено ${files.length} файла(ов) (${(filesSize/1024).toFixed(0)} КБ)` : 'Материалы (опционально)'
       
        setFileInputText(text)
    },[files])
    return (

        <>
          <button className={
            [inputStyles.myInput,styles.uploadButton].join(', ')
          }
          onClick={
            (event) =>{
                event.preventDefault()
                const input = document.getElementById('fileInput')
                input.click()

            }
          }
          >
            {fileInputText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.021 15.8043 14.55 16 14 16H2ZM7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7Z" fill="#C7C7C7"/>
                        </svg>
        </button>
        <input accept={props.accept} onChange={
            (event) => {
                const files = event.target.files
                const filesArr = Array.from(files)
                props.onUpload(filesArr)
                setFiles(filesArr)

               
                
                let size = 0;
                for (const file of filesArr) {
                    size += file.size
                }
                setFilesSize(size)
             

                
            }
        } multiple type='file' id="fileInput" className={
            styles.fileInput
        } />
        </>
      
    )
}

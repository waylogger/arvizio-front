import inputStyles from '../MyInput/MyInput.module.css';
import styles from './fileInput.module.css';
export function fileInputMessage(files: File[]) {
    if (!files || !files.length) return 'Выберите файлы для загрузки';

    let sz = 0;
    for (const file of files) sz += file.size;
    const kb = sz / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;

    if (kb < 1) {
        return `Выбрано ${files.length} файлов на ${sz.toFixed(0)} байт`;
    }
    if (mb < 1) {
        return `Выбрано ${files.length} файлов на ${kb.toFixed(0)} Кбайт`;
    }
    if (gb < 1) {
        return `Выбрано ${files.length} файлов на ${mb.toFixed(0)} Мбайт`;
    }
    return `Выбрано ${files.length} файлов на ${gb.toFixed(0)} Гбайт`;
}

export default function FileInput(props: {
    accept: string;
    onUpload(files: File[]): void;
    name: string;
    children;
}) {
    return (
        <div>
            <button
                className={[inputStyles.myInput, styles.uploadButton].join(
                    ', '
                )}
                onClick={(event) => {
                    event.preventDefault();
                    const input = document.getElementById(props.name);
                    input.click();
                }}
            >
                {props.children}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.021 15.8043 14.55 16 14 16H2ZM7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7Z"
                        fill="#C7C7C7"
                    />
                </svg>
            </button>
            <input
                key={props.name}
                name={props.name}
                accept={props.accept}
                onChange={(event) => {
                    const files = event.target.files;
                    const filesArr = Array.from(files);

                    props.onUpload(filesArr);
                }}
                multiple
                type="file"
                id={props.name}
                className={styles.fileInput}
            />
        </div>
    );
}

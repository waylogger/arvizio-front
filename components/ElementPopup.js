import MyButton from "../components/UI/MyButton/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import styles from "@/styles/app.module.css";

const ElementPopup = () => {

    return (
        <div>
            <div className={styles.formProjectTitle}>Выберите тип медиа-контента</div>
            <div className={styles.formElement}>
                <div className={styles.formLeft}>
                    <div className={styles.elementRadio}>
                        <input  type="radio"  id="1" name="radio" value="1" checked/>
                            <label htmlFor="1">Изображение</label>
                    </div>
                    <div className={styles.elementRadio}>
                        <input  type="radio"  id="2" name="radio" value="2" />
                        <label htmlFor="2">Видео</label>
                    </div>
                    <div className={styles.elementRadio}>
                        <input  type="radio"  id="3" name="radio" value="3" />
                        <label htmlFor="3">Аудио</label>
                    </div>
                    <div className={styles.elementRadio}>
                        <input  type="radio"  id="4" name="radio" value="4" />
                        <label htmlFor="4">Панорама</label>
                    </div>
                    <div className={styles.elementRadio}>
                        <input  type="radio"  id="5" name="radio" value="5" />
                        <label htmlFor="5">Псевдо 3D</label>
                    </div>
                </div>
                <div className={styles.formRight}>
                    <img src="/image1.jpg" />
                </div>
            </div>
            <form className={styles.formLogin}>
                <MyInput type="text" placeholder="Файлы для загрузки"/>
                <MyButton>Создать проект</MyButton>
            </form>
        </div>
    );
};

export default ElementPopup;
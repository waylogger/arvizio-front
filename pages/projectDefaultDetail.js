import styles from "../styles/app.module.css";
import MyModal from "../components/UI/MyModal/MyModal";
import React, { useState } from 'react';
import Block from "../components/UI/Block/Block";
import ElementPopup from "@/components/ElementPopup";

function ProjectDefaultDetail() {

    const [blockBottom, setBlockBottom] = React.useState(false);
    const [modalElement, setModalElement] = React.useState(false);

    return (
        <div className={styles.newProject}>
            <div className={styles.newProjectTitle}>
                Ryazan_preview
            </div>
            <div className={styles.newProjectBlock}>
                <div className={styles.newProjectBlockDefault}>
                    Загрузите файл
                </div>
            </div>
            <div className={styles.newProjectBlockControls}>
                <div className={styles.btnReposts}>
                    <button>Поделиться</button>
                    <button>Редактировать</button>
                </div>
            </div>
            <div className={styles.blockBtnBottom} setVisible={setBlockBottom}>
                <div className={styles.blockBottom}>
                    <button className={styles.BlockButton} onClick={() => setBlockBottom(true)}>Навигация</button>
                    <Block visible={blockBottom} setVisible={setBlockBottom}>
                        <div className={styles.AddElementList} setVisible={setBlockBottom}>
                        </div>
                        <button className={styles.AddElement} onClick={() => setModalElement(true)}><img src="/add.svg"/></button>
                    </Block>
                </div>
            </div>
            <MyModal visible={modalElement} setVisible={setModalElement}>
                <ElementPopup/>
            </MyModal>
        </div>
    );
}

export default ProjectDefaultDetail;
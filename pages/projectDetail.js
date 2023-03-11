import styles from "../styles/app.module.css";
import swiper from 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MyModal from "../components/UI/MyModal/MyModal";
import React, { useState } from 'react';
import Block from "../components/UI/Block/Block";
import ElementPopup from "@/components/ElementPopup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper';
import ReactAudioPlayer from 'react-audio-player';

function ProjectDeatil() {

    const [blockBottom, setBlockBottom] = React.useState(false);
    const [modalElement, setModalElement] = React.useState(false);

    return (
        <div className={styles.newProject}>
            <div className={styles.newProjectTitle}>
                Ryazan_preview
            </div>
            <div className={styles.newProjectControls}>
                <div className={styles.newProjectControlsBtn}>
                    <button className={styles.ControlsDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.99992 16.6673V10.0007M9.99992 10.0007V3.33398M9.99992 10.0007H16.6666M9.99992 10.0007H3.33325" stroke="#242424" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button className={styles.ControlsDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1875 3.28125C12.1875 3.15693 12.2369 3.0377 12.3248 2.94979C12.4127 2.86189 12.5319 2.8125 12.6562 2.8125H17.3438C17.4681 2.8125 17.5873 2.86189 17.6752 2.94979C17.7631 3.0377 17.8125 3.15693 17.8125 3.28125V5.625H12.1875V3.28125ZM20.625 3.28125V5.625H24.8438C25.2167 5.625 25.5744 5.77316 25.8381 6.03688C26.1018 6.3006 26.25 6.65829 26.25 7.03125C26.25 7.40421 26.1018 7.7619 25.8381 8.02562C25.5744 8.28934 25.2167 8.4375 24.8438 8.4375H5.15625C4.78329 8.4375 4.4256 8.28934 4.16188 8.02562C3.89816 7.7619 3.75 7.40421 3.75 7.03125C3.75 6.65829 3.89816 6.3006 4.16188 6.03688C4.4256 5.77316 4.78329 5.625 5.15625 5.625H9.375V3.28125C9.375 1.47 10.845 0 12.6562 0H17.3438C19.155 0 20.625 1.47 20.625 3.28125ZM8.43 12.5156C8.41595 12.3285 8.36459 12.1461 8.27894 11.9791C8.19329 11.8121 8.07509 11.664 7.93129 11.5434C7.7875 11.4228 7.62103 11.3322 7.44168 11.277C7.26234 11.2217 7.07375 11.2029 6.88703 11.2217C6.70031 11.2405 6.51923 11.2964 6.35447 11.3863C6.18971 11.4761 6.0446 11.598 5.92769 11.7448C5.81078 11.8916 5.72443 12.0603 5.67373 12.241C5.62304 12.4217 5.60902 12.6107 5.6325 12.7969L6.87 25.1719C6.95134 25.9812 7.33035 26.7314 7.93351 27.277C8.53668 27.8227 9.32102 28.1249 10.1344 28.125H19.8656C21.5531 28.125 22.9631 26.8481 23.13 25.17L24.3675 12.795C24.3938 12.4297 24.2765 12.0687 24.0407 11.7885C23.8048 11.5084 23.469 11.3313 23.1046 11.2949C22.7402 11.2585 22.376 11.3657 22.0894 11.5936C21.8028 11.8216 21.6165 12.1524 21.57 12.5156L20.3325 24.8906C20.3209 25.0063 20.2666 25.1136 20.1804 25.1915C20.0941 25.2695 19.9819 25.3126 19.8656 25.3125H10.1344C10.0181 25.3126 9.90591 25.2695 9.81963 25.1915C9.73335 25.1136 9.67913 25.0063 9.6675 24.8906L8.43 12.5156Z" fill="#242424"/>
                        </svg>
                    </button>
                </div>
                <div className={styles.ControlsAudioName}>
                    Propeller.mp3
                </div>
                <ReactAudioPlayer
                    src="my_audio_file.ogg"
                    autoPlay
                    controls
                    preload="auto"
                />
            </div>
            <div className={styles.newProjectBlock}>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="mySwiper"
                >
                    <SwiperSlide><img src="/slider-one.jpg" alt="alt"/></SwiperSlide>
                    <SwiperSlide><img src="/slider-one.jpg" alt="alt"/></SwiperSlide>
                    <SwiperSlide><img src="/slider-one.jpg" alt="alt"/></SwiperSlide>
                    <SwiperSlide><img src="/slider-one.jpg" alt="alt"/></SwiperSlide>
                    ...
                </Swiper>
            </div>
            <div className={styles.newProjectBlockControls}>
                <div className={styles.newProjectSpots}>
                    <div className={styles.newProjectSpotsName}>Споты</div>
                    <div className={styles.ProjectSpotsItem}>
                        <label className={styles.checkboxGoogle}>
                            <input type="checkbox" className={styles.checkSwith}  />
                            <span className={styles.checkboxGoogleSwitch}></span>
                            spot1.jpeg
                        </label>
                    </div>
                    <div className={styles.ProjectSpotsItem}>
                        <label className={styles.checkboxGoogle}>
                            <input type="checkbox" className={styles.checkSwith}  />
                            <span className={styles.checkboxGoogleSwitch}></span>
                            spot1.jpeg
                        </label>
                    </div>
                    <div className={styles.ProjectSpotsItem}>
                        <label className={styles.checkboxGoogle}>
                            <input type="checkbox" className={styles.checkSwith}  />
                            <span className={styles.checkboxGoogleSwitch}></span>
                            spot1.jpeg
                        </label>
                    </div>
                </div>
                <div className={styles.btnReposts}>
                    <button>Поделиться</button>
                    <button>Редактировать</button>
                </div>
            </div>
            <div className={styles.blockBtnBottom}>
                <div className={styles.blockBottom}>
                    <button className={styles.BlockButton} onClick={() => setBlockBottom(true)}>Навигация</button>
                    <Block visible={blockBottom} setVisible={setBlockBottom}>
                        <div className={styles.AddElementList}>
                            <div className={styles.AddElementBlock}>
                                <img src="/elemet.jpg" />
                                <span>Ryazan_...V1_0001.jpg</span>
                            </div>
                            <div className={styles.AddElementBlock}>
                                <img src="/elemet.jpg" />
                                <span>Ryazan_...V1_0001.jpg</span>
                            </div>
                            <div className={styles.AddElementBlock}>
                                <img src="/elemet.jpg" />
                                <span>Ryazan_...V1_0001.jpg</span>
                            </div>
                            <div className={styles.AddElementBlock}>
                                <img src="/elemet.jpg" />
                                <span>Ryazan_...V1_0001.jpg</span>
                            </div>
                        </div>
                        <button className={styles.AddElement} onClick={() => setModalElement(true)}><img src="/add.svg" /></button>
                    </Block>
                </div>
            </div>
            <MyModal visible={modalElement} setVisible={setModalElement}>
                <ElementPopup/>
            </MyModal>
        </div>
    );
}

export default ProjectDeatil;
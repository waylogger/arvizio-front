


import style from './image-player.module.css'

export default function P3DPlayer(props: {
    url: string
}){
    return (
        <div className={style.imagePlayer} style={{
            backgroundImage: `url(${props.url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}></div>
    )
}

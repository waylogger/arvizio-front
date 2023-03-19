


import style from './image-player.module.css'

export default function ImagePlayer(props: {
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

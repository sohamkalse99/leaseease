import icon from './icon.png';
import icon_light from './icon-white.png'
export const ICON = ({height=700, width=700}) =>{
    return <img src={icon} height={height} width={width} alt="icon"/>
}

export const ICON_LIGHT = ({height=700, width=700}) =>{
    return <img src={icon_light} height={height} width={width} alt="icon_light"/>
}


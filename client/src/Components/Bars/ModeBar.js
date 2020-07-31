import React from 'react'

export default ({ mode, setMode }) => {
    return (
        <div className='modebar'>
            <span onClick={() => setMode('freeplay')} className={`modebar__item ${mode === 'freeplay' ? 'current' : ''}`}>Freeplay</span>
            <span onClick={() => setMode('presets')} className={`modebar__item ${mode === 'presets' ? 'current' : ''}`}>Presets</span>
        </div>
    )
}

export const FreeplayList = ({ ShapeTypes, mode, clickShape, setShape }) => {
    return (
        <ul className='modelist' style={{
            display: mode === 'freeplay' ? 'flex' : 'none'
        }}>
            {
                ShapeTypes.map((item, indx) => <li className={`modelist__item ${clickShape === item ? 'current' : ''}`} onClick={() => setShape(item)} key={indx}>{ item.toLowerCase().split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") }</li>)
            }
        </ul>
    )
}

export const PresetList = ({ PresetTypes, mode, currentPreset, setPreset }) => {
    return (
        <ul className='modelist' style={{
            display: mode === 'presets' ? 'flex' : 'none'
        }}>
            {
                PresetTypes.map((item, indx) => <li className={`modelist__item ${currentPreset === item ? 'current' : ''}`} onClick={() => setPreset(item)} key={indx}>{ item.toLowerCase().split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") }</li>)
            }
        </ul>
    )
}
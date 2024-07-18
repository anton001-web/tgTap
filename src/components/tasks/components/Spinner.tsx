import {FC} from 'react'

interface SpinnerProps {
    variant?: string
}

export const Spinner:FC<SpinnerProps> = ({variant}) => {
    return (
        <div className={`loader ${variant === 'black' && 'loader-black'}`}></div>
    )
}
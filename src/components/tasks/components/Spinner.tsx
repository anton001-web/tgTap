import {FC} from 'react'

interface SpinnerProps {}

export const Spinner:FC<SpinnerProps> = () => {
    return (
        <div className="loader"></div>
    )
}
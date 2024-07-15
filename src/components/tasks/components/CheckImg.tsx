import {useEffect, useState} from 'react'
import img1 from '../../../assets/images/taskImg1.png'
import img2 from '../../../assets/images/taskImg2.png'
import img3 from '../../../assets/images/taskImg3.png'

function getRandomElement(array: { src: string; }[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const noDataArr = [
    {src: img1},
    {src: img2},
    {src: img3},
]

function checkImage(url:string, callback:any) {
    const img = new Image();

    img.onload = () => {
        callback(true);
    };

    img.onerror = () => {
        callback(false);
    };

    img.src = url;
}

export const CheckImg = ({imageUrl}:any) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        checkImage(imageUrl, (isLoaded:any) => {
            if (isLoaded) {
                setStatus('success');
            } else {
                setStatus('fail');
            }
        });
    }, [imageUrl]);

    return (
        <>
            {status === 'success' ? (
                <img src={imageUrl} />
            ) : status === 'fail' ? (
                <img src={getRandomElement(noDataArr).src} />
            ) : (
                <p>Loading image...</p>
            )}
        </>
    )
}
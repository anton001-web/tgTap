import {Dispatch, FC, SetStateAction, useContext} from 'react'
import styles from './styles.module.scss'
import { TokenContext } from '../../providers/Auth';
import tokenIco  from '../../assets/images/tokenRed.webp'
import Odometer from 'react-odometerjs';

interface ClaimBlockProps {
    claimValue: number | string | any;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    isActive: boolean;
    zero: boolean;
    onClick: () => void;
    claimFn: () => void;
    setZero: Dispatch<SetStateAction<boolean>>;
}

export const ClaimBlock:FC<ClaimBlockProps> = ({claimValue, onClick, claimFn, setZero, zero, isActive}) => {
    const {token}:any = useContext(TokenContext)


    const handler = async () => {

        if(claimValue !== 0) {
            token && claimFn()
            setTimeout(() => {
                setZero(false)
            }, 2000)
            return null
        } 

        token && onClick()
    }

    return (
        <div className={styles.claimBLock} onClick={handler} >
            <span className={`${styles.claimTitle} ${styles.claimLol} ${isActive && styles.claimTitleRight}`}>
                <span className={styles.claimFarm}>Start farming</span>
                <span className={styles.claimClaim}>Claim</span>
            </span>
            <span className={`${styles.claimTitle} ${styles.claimValue} ${isActive && styles.claimValueVisible}`}>
                <> 
                
                {zero && <span className={styles.zero}>
                        0
                        {/* <span className='zeroComa'>,0</span> */}
                    </span>}<Odometer duration={900} value={claimValue} format="(.ddd),dd" /> <img className={styles.tokenIco} src={tokenIco} 
                />
                </>
            </span>
        </div>
    )
}
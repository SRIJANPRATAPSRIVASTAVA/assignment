/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./banner.css"
import hideImage from '../assets/hide.png';

const Banner = ({ bannerData, setBannerData, timer, setTimer }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(async () => {
                setTimer(prevTimer => prevTimer - 1);
                setBannerData(prevData => {
                    return ({
                        ...prevData,
                        timer: prevData.timer > 0 ? prevData.timer - 1 : 0
                    })
                });
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            if (bannerData?.visible)
                setBannerData(prevData => {
                    return ({
                        ...prevData,
                        visible: false
                    })
                });
        }
    }, [bannerData, setBannerData, setTimer, timer]);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
        const min = Math.floor((seconds % 3600) / 60);
        const sec = Math.floor(seconds % 60);
        return `${days}d : ${hrs}h : ${min}m : ${sec}s`;
    };

    const handleRedirect = () => {
        navigate('/dashboard');
    };

    return (
        <>
            {<div className="container">
                <div className="banner">
                    {
                        bannerData?.visible ?
                            <>
                                <p>{bannerData?.description}</p>
                                {timer >= 0 && <p className="timer">Time remaining: {formatTime(bannerData?.timer)}</p>}
                                {bannerData?.link && <a href={bannerData?.link}>Click here</a>}
                            </>
                            : <img src={hideImage} />
                    }
                </div>
                <button onClick={handleRedirect} className="admin-button">
                    Go to Dashboard
                </button>
            </div>}
        </>
    );
}

export default Banner;

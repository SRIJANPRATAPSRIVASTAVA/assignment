/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark' });

const Dashboard = ({ bannerData, onUpdateBanner }) => {
    const [bannerVisible, setBannerVisible] = useState(bannerData?.visible || true);
    const [description, setDescription] = useState(bannerData?.description || '');
    const [time, setTime] = useState(bannerData?.time || 10);
    const [link, setLink] = useState(bannerData?.link || '');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description) {
            return toast("description can't be empty")
        }
        if (!link) {
            return toast("link can't be empty")
        }

        setLoading(true);
        try {
            const updatedBannerData = {
                description,
                link,
                timer: Number.isNaN(Number(time)) ? 0 : Number(time),
                visible: bannerVisible,
            };
            await axios.post('/api/banner', updatedBannerData);
            onUpdateBanner(updatedBannerData);
        } catch (error) {
            console.error('Error updating banner:', error);
        } finally {
            setLoading(false);
            navigate("/");
        }
    };

    return (
        <div className="dashboard">
            <form onSubmit={handleSubmit}>
                <label className="toggle-container">
                    <span className="toggle-label">Banner Visible:</span>
                    <div className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={bannerVisible}
                            onChange={(e) => setBannerVisible(e.target.checked)}
                        />
                        <span className="slider"></span>
                    </div>
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='provide some description'
                    />
                </label>
                <label>
                    Link:
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder='www.flikart.com/mens/tshirt/1382482848'
                    />
                </label>
                <label>
                    Timer (seconds):
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(parseInt(e.target.value, 10))}
                        placeholder='100'
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    className={loading ? 'loading-button' : ''}
                >
                    {loading ? <span className="loader">Wait...</span> : 'Update Banner'}
                </button>
            </form>
        </div>
    );
};

export default Dashboard;

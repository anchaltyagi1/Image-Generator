import React, { useContext, useState } from 'react';
import './ImageGenerator.css';
import Navbar from '../Navbar/Navbar';
import PointsContext from '../../context/pointsContext';

const ImageGenerator = () => {
    const [data, setData] = useState("");
    const points = useContext(PointsContext);

    const getRandomImage = async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('authToken')
            },
        });
        const d = await res.json();
        if (d?.status === 'success') {
            setData(d.data.url);
            points.setUserPoints(points.userPoints - 1);
        }
    };

    return (
        <>
            <Navbar page="image" />
            <div className='image-generator-main-container'>
                <h2>Image Generator</h2>
                <div>
                    <button  style={ {width:"100px"}} onClick={getRandomImage}>Generate</button>
                </div>
                {data && (
                    <img 
                        src={data} 
                        alt='' 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }} 
                    />
                )}
            </div>
        </>
    );
}

export default ImageGenerator;

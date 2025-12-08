import { useState } from 'react';
import './App.css';

const stages = [
    { name: 'Nebula', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Protostar', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Main Sequence', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Red Supergiant', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Supernova', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Black Hole', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
    { name: 'Heat Death', image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif' },
];

function App() {
    const [currentStage, setCurrentStage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNextStage = () => {
        if (currentStage < stages.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStage(currentStage + 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const goToPreviousStage = () => {
        if (currentStage > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStage(currentStage - 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    return (
        <div className='app-container'>
            <div className='info-section'>
                <h1 className={isTransitioning ? 'fade-out' : 'fade-in'}>
                    {stages[currentStage].name}
                </h1>
                <div className='controls'>
                    <button
                        onClick={goToPreviousStage}
                        disabled={currentStage === 0}
                    >
                        Previous
                    </button>
                    <span>
                        {currentStage + 1} / {stages.length}
                    </span>
                    <button
                        onClick={goToNextStage}
                        disabled={currentStage === stages.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='image-section'>
                <img
                    src={stages[currentStage].image}
                    alt={stages[currentStage].name}
                    className={`stage-image ${
                        isTransitioning ? 'fade-out' : 'fade-in'
                    }`}
                />
            </div>
        </div>
    );
}

export default App;

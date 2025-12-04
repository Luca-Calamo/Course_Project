import { useState } from 'react';
import './App.css';

const stages = [
    { name: 'Nebula', image: '/images/nebula.png' },
    { name: 'Protostar', image: '/images/protostar.png' },
    { name: 'Main Sequence', image: '/images/main-sequence.png' },
    { name: 'Red Supergiant', image: '/images/red-supergiant.png' },
    { name: 'Supernova', image: '/images/supernova.png' },
    { name: 'Black Hole', image: '/images/black-hole.png' },
    { name: 'Heat Death', image: '/images/heat-death.png' },
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
            <div
                className={`stage-display ${
                    isTransitioning ? 'fade-out' : 'fade-in'
                }`}
            >
                <img
                    src={stages[currentStage].image}
                    alt={stages[currentStage].name}
                    className='stage-image'
                />
                <h1>{stages[currentStage].name}</h1>
            </div>

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
    );
}

export default App;

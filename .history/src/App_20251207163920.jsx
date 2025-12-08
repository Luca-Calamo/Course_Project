import { useState, useEffect } from 'react';
import './App.css';
import { fairyDustCursor } from 'cursor-effects';

const stages = [
    {
        name: 'Nebula',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'A nebula is a vast cloud of gas and dust in space, primarily hydrogen and helium. It serves as the birthplace of stars when gravity pulls the material together, causing regions of higher density to collapse under their own weight.',
    },
    {
        name: 'Protostar',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'As the nebula collapses, the gas and dust condense into a dense core called a protostar. Gravitational energy converts into heat, and the core temperature rises, but nuclear fusion has not yet begun.',
    },
    {
        name: 'Main Sequence',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'When the core reaches about 10 million Kelvin, hydrogen fusion ignites. The star enters the main sequence, producing energy steadily by fusing hydrogen into helium. Massive stars burn hotter and brighter but live much shorter lives than smaller stars.',
    },
    {
        name: 'Red Supergiant',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'After exhausting hydrogen in the core, fusion moves outward into surrounding layers. The core contracts and heats up while the outer layers expand, forming a red supergiant. Heavier elements like carbon, oxygen, and silicon begin to form through successive fusion stages.',
    },
    {
        name: 'Supernova',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'When the core’s fusion stops at iron, it can no longer resist gravity. The core collapses instantly, triggering a massive explosion called a supernova. This event blasts heavy elements into space and briefly outshines an entire galaxy.',
    },
    {
        name: 'Black Hole',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'If the remaining core after the supernova is more than about three solar masses, gravity overwhelms all other forces, compressing matter into an infinitely dense point—a black hole—from which not even light can escape.',
    },
    {
        name: 'Heat Death',
        image: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif',
        description:
            'Over unimaginable timescales, black holes slowly evaporate through Hawking radiation. When the last black hole vanishes, the universe will reach heat death—a state of maximum entropy where no usable energy remains and all processes cease. There will be no stars, no matter, nothing.',
    },
];

function App() {
    const [showIntro, setShowIntro] = useState(true);
    const [currentStage, setCurrentStage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const cursorEffect = fairyDustCursor();
        
        return () => {
            cursorEffect.destroy();
        };
    }, []);

    const startJourney = () => {
        setShowIntro(false);
    };

    const startAgain = () => {
        setCurrentStage(0);
        setShowIntro(true);
    };

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
        if (currentStage === 0) {
            setShowIntro(true);
        } else if (currentStage > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStage(currentStage - 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    if (showIntro) {
        return (
            <div className='app-container'>
                <div className='info-section'>
                    <h1>The life cycle of a massive star</h1>
                    <button onClick={startJourney} className='start-button'>
                        Start your journey
                    </button>
                </div>

                <div className='image-section'>
                    <img
                        src='https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2018/10/STScI-01EVS3HXBA56TEHDMRRFRCT9F9.mp4/jcr:content/renditions/1024x953.gif'
                        alt='Introduction'
                        className='stage-image'
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='app-container'>
            <div className='info-section'>
                <h1 className={isTransitioning ? 'fade-out' : 'fade-in'}>
                    {stages[currentStage].name}
                </h1>
                <p className={isTransitioning ? 'fade-out' : 'fade-in'}>
                    {stages[currentStage].description}
                </p>
                <div className='controls'>
                    <button onClick={goToPreviousStage}>Previous</button>
                    <span>
                        {currentStage + 1} / {stages.length}
                    </span>
                    {currentStage === stages.length - 1 ? (
                        <button onClick={startAgain}>Start Again</button>
                    ) : (
                        <button onClick={goToNextStage}>Next</button>
                    )}
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

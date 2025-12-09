import { useState, useEffect, useRef } from 'react';
import './App.css';
import Loading from './Loading';
import InfoBox from './InfoBox';

const introVideo = '/assets/video/intro.mp4';

const stages = [
    {
        name: 'Nebula',
        image: '/assets/video/nebulae.mp4',
        description:
            'A nebula is a massive cloud of gas and dust made mostly of hydrogen and helium.Within it, gravity slowly pulls material together into denser regions.These regions continue collapsing under their own weight over long timescales.This process marks the beginning of star formation inside the cloud.',
    },
    {
        name: 'Protostar',
        image: '/assets/video/protostar.mp4',
        description:
            'As part of the nebula collapses, gas and dust gather into a dense central core. The core heats up as gravitational energy converts into thermal energy. Although it glows warmly, nuclear fusion has not yet begun inside. The object is still forming and is not considered a true star yet.',
    },
    {
        name: 'Main Sequence',
        image: '/assets/video/main%20sequence.mp4',
        description:
            'When the core reaches extreme temperatures, hydrogen fusion finally starts. The star becomes stable as gravity and internal pressure reach equilibrium. It steadily produces energy by turning hydrogen into helium. Most of a star’s lifetime is spent in this long, balanced phase.',
    },
    {
        name: 'Red Supergiant',
        image: '/assets/video/red_giant.mp4',
        description:
            'After the core runs out of hydrogen, fusion shifts into outer layers. The core contracts and heats up while the outer layers expand dramatically. The star becomes an enormous red supergiant with a cooler surface. Heavier elements like carbon and oxygen form through new fusion stages.',
    },
    {
        name: 'Supernova',
        image: '/assets/video/supernova.mp4',
        description:
            'Fusion stops when the core fills with iron, which cannot release energy. The core collapses suddenly under its own intense gravitational pull. This collapse triggers an enormous explosion called a supernova. The blast ejects heavy elements into space and briefly outshines galaxies.',
    },
    {
        name: 'Black Hole',
        image: '/assets/video/supernova.mp4',
        description:
            'If the leftover core is massive enough, gravity overwhelms all resistance. It collapses into a point of extreme density called a singularity. Around it forms an event horizon where not even light can escape. This marks the birth of a black hole with intense gravitational effects.',
    },
    {
        name: 'Heat Death',
        image: '/assets/video/intro.mp4',
        description:
            'Over unimaginable spans of time, black holes slowly evaporate away. With no stars or energy sources remaining, the universe grows cold. It eventually reaches maximum entropy, where no processes can occur. This final state is known as the heat death of the universe.',
    },
];

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [currentStage, setCurrentStage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showIntroText, setShowIntroText] = useState(false);
    const [startVideo, setStartVideo] = useState(false);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const videoRef = useRef(null);
    const stageVideoRef = useRef(null);
    const [playStageVideo, setPlayStageVideo] = useState(false);
    const [stageVideoEnded, setStageVideoEnded] = useState(false);
    const [showSupernovaFlash, setShowSupernovaFlash] = useState(false);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        // Start video 1 second after loading completes
        setTimeout(() => {
            setStartVideo(true);
        }, 400);
    };

    useEffect(() => {
        if (startVideo && videoRef.current) {
            videoRef.current.play();
        }
    }, [startVideo]);

    // Effect to handle returning to intro after seeing it once
    useEffect(() => {
        if (showIntro && hasSeenIntro && videoRef.current) {
            // Set video to end and show text immediately
            videoRef.current.currentTime = videoRef.current.duration || 999;
        }
    }, [showIntro, hasSeenIntro]);

    useEffect(() => {
        if (playStageVideo && stageVideoRef.current) {
            stageVideoRef.current.play();
        }
    }, [playStageVideo]);

    // Effect to handle stage video delay when currentStage changes
    useEffect(() => {
        if (!showIntro) {
            setPlayStageVideo(false);
            setStageVideoEnded(false); // Reset video ended state
            setShowSupernovaFlash(false); // Reset flash state
            
            // Special handling for supernova stage (stage 4)
            if (currentStage === 4) {
                // Supernova stage: 1s delay -> flash -> video during fade
                setTimeout(() => {
                    setShowSupernovaFlash(true);
                    // Start video as flash begins to fade (after 1.5s of flash)
                    setTimeout(() => {
                        setPlayStageVideo(true);
                    }, 1000);
                }, 800);
            } else {
                // All other stages: normal 1s delay
                setTimeout(() => {
                    setPlayStageVideo(true);
                }, 1000);
            }
        }
    }, [currentStage, showIntro]);

    const startJourney = () => {
        setShowIntro(false);
        setShowIntroText(false);
        setHasSeenIntro(true);
    };

    const startAgain = () => {
        setCurrentStage(0);
        setShowIntro(true);
        // If user has seen intro before, show text immediately
        if (hasSeenIntro) {
            setShowIntroText(true);
        } else {
            setShowIntroText(false);
        }
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
            // If user has seen intro before, show text immediately
            if (hasSeenIntro) {
                setShowIntroText(true);
            }
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
                <div className='image-section'>
                    <video
                        ref={videoRef}
                        src={introVideo}
                        className='stage-image'
                        muted
                        playsInline
                        preload='auto'
                        onEnded={() => {
                            setShowIntroText(true);
                        }}
                    />
                </div>

                {isLoading && <Loading onComplete={handleLoadingComplete} />}

                {showIntroText && (
                    <div className='intro-section intro-fade-in'>
                        <h1>The Life Cycle of a Massive Star</h1>
                        <button onClick={startJourney} className='start-button'>
                            Start your journey
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='app-container'>
            <div className='image-section'>
                <video
                    ref={stageVideoRef}
                    src={stages[currentStage].image}
                    className={`stage-image ${
                        isTransitioning ? 'fade-out' : 'fade-in'
                    }`}
                    muted
                    playsInline
                    preload="auto"
                    onEnded={() => setStageVideoEnded(true)}
                />
                
                {/* InfoBox for Nebula stage - only show after video ends */}
                {currentStage === 0 && stageVideoEnded && (
                    <>
                        <InfoBox
                            text="Nebulae are recycled material formed from the remains of older stars that exploded long ago."
                            lineLength={200}
                            angle={200}
                            position={{ x: 900, y: 300 }}
                            className="nebula-info"
                        />
                        <InfoBox
                            text="Some nebulae glow because nearby stars energize the gas, making it shine."
                            lineLength={150}
                            angle={120}
                            position={{ x: 500, y: 600 }}
                            className="nebula-info-2"
                        />
                    </>
                )}
                {/* InfoBox for protostar stage - only show after video ends */}
                {currentStage === 1 && stageVideoEnded && (
                    <>
                        <InfoBox
                            text="The core heats up because of gravity, not fusion. It’s like a star still ‘under construction."
                            lineLength={200}
                            angle={200}
                            position={{ x: 790, y: 450 }}
                            className="nebula-info"
                        />
                    </>
                )}
                {/* InfoBox for main sequence stage - only show after video ends */}
                {currentStage === 2 && stageVideoEnded && (
                    <>
                        <InfoBox
                            text="Most stars spend about 90% of their lives in this stable phase."
                            lineLength={200}
                            angle={200}
                            position={{ x: 820, y: 470 }}
                            className="nebula-info"
                        />
                    </>
                )}
                {/* InfoBox for red Giant stage - only show after video ends */}
                {currentStage === 3 && stageVideoEnded && (
                    <>
                        <InfoBox
                            text="The star expands to hundreds of times its original size — it would engulf many planets in its system."
                            lineLength={200}
                            angle={150}
                            position={{ x: 820, y: 470 }}
                            className="nebula-info"
                        />
                        <InfoBox
                            text="Red supergiants are unstable and lose mass rapidly through stellar winds."
                            lineLength={200}
                            angle={200}
                            position={{ x: 902, y: 200 }}
                            className="nebula-info"
                        />
                    </>
                )}
                {/* InfoBox for supernova stage - only show after video ends */}
                {currentStage === 4 && stageVideoEnded && (
                    <>
                        <InfoBox
                            text="For a brief moment, a supernova can shine brighter than an entire galaxy."
                            lineLength={200}
                            angle={200}
                            position={{ x: 600, y: 470 }}
                            className="nebula-info"
                        />
                        <InfoBox
                            text="Elements like gold, silver, and iron are formed and released in the explosion."
                            lineLength={200}
                            angle={320}
                            position={{ x: 850, y: 350 }}
                            className="nebula-info"
                        />
                    </>
                )}
                
                {/* Supernova Flash Effect */}
                {currentStage === 4 && showSupernovaFlash && (
                    <div className="supernova-flash"></div>
                )}
            </div>

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
        </div>
    );
}

export default App;

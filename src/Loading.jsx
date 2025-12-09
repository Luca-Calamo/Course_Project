import { useState, useEffect } from 'react';
import './Loading.css';

const Loading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing stellar formation...');
    const [phase, setPhase] = useState('loading'); // 'loading', 'fading', 'star', 'complete'

    const loadingMessages = [
        'Initializing stellar formation...',
        'Gathering cosmic dust and gas...',
        'Calculating gravitational forces...',
        'Igniting nuclear fusion processes...',
        'Mapping stellar evolution pathway...',
        'Preparing stellar lifecycle journey...',
        'Generating star sequence...'
    ];

    useEffect(() => {
        const duration = 4000; // 4 seconds total loading time
        const interval = 50; // Update every 50ms
        const increment = 100 / (duration / interval);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + increment;
                
                // Update loading text based on progress
                const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
                setLoadingText(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
                
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    // Start fade transition
                    setTimeout(() => {
                        setPhase('fading');
                        // After fade completes, complete immediately
                        setTimeout(() => {
                            setPhase('complete');
                            onComplete();
                        }, 800); // Just the fade duration
                    }, 300); // Brief pause at 100%
                    return 100;
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(progressInterval);
    }, [onComplete]);

    return (
        <div className={`loading-container ${phase === 'fading' ? 'fade-out' : ''}`}>
            {phase === 'loading' && (
                <div className="loading-content">
                    <h1 className="loading-title">The Life Cycle of a Massive Star</h1>
                    
                    <div className="loading-progress-section">
                        <div className="progress-percentage">
                            {Math.round(progress)}%
                        </div>
                        
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar-fill" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        
                        <div className="loading-text">
                            {loadingText}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loading;
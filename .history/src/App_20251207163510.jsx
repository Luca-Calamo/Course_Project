import { useState, useEffect } from 'react';
import './App.css';

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
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) return;

        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const cursor = { x: 0, y: 0 };
        const particles = [];
        const particleCount = 15;
        const rate = 0.4;
        let cursorsInitted = false;

        class Particle {
            constructor(x, y) {
                this.position = { x, y };
            }

            move(context) {
                // Draw star shape
                this.drawStar(context, this.position.x, this.position.y, 5, 8, 4);
            }

            drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
                let rot = Math.PI / 2 * 3;
                let x = cx;
                let y = cy;
                const step = Math.PI / spikes;

                ctx.beginPath();
                ctx.moveTo(cx, cy - outerRadius);
                
                for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                }
                
                ctx.lineTo(cx, cy - outerRadius);
                ctx.closePath();
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }

        const onMouseMove = (e) => {
            cursor.x = e.clientX;
            cursor.y = e.clientY;

            if (!cursorsInitted) {
                cursorsInitted = true;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(cursor.x, cursor.y));
                }
            }
        };

        const onWindowResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const updateParticles = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            let x = cursor.x;
            let y = cursor.y;

            particles.forEach((particle, index) => {
                const nextParticle = particles[index + 1] || particles[0];

                particle.position.x = x;
                particle.position.y = y;
                particle.move(context);
                x += (nextParticle.position.x - particle.position.x) * rate;
                y += (nextParticle.position.y - particle.position.y) * rate;
            });
        };

        const loop = () => {
            updateParticles();
            requestAnimationFrame(loop);
        };

        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
        loop();

        return () => {
            canvas.remove();
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
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

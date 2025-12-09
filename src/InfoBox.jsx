import { useState } from 'react';
import './InfoBox.css';

const InfoBox = ({ 
    text, 
    lineLength = 100, 
    angle = 45,
    position = { x: 0, y: 0 },
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div 
            className={`info-box fade-in ${className}`}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
            }}
        >
            {/* White Circle */}
            <div 
                className={`info-circle ${isExpanded ? 'expanded' : ''}`}
                onClick={handleClick}
            >
                <div className="circle-inner"></div>
            </div>

            {/* Animated Line */}
            {isExpanded && (
                <div 
                    className="info-line"
                    style={{
                        width: `${lineLength}px`,
                        transform: `rotate(${angle}deg)`,
                    }}
                ></div>
            )}

            {/* Text Box */}
            {isExpanded && (() => {
                const textBoxWidth = 200;
                const textBoxHeight = 60; // Approximate height
                
                // Calculate line end point
                const lineEndX = lineLength * Math.cos(angle * Math.PI / 180);
                const lineEndY = lineLength * Math.sin(angle * Math.PI / 180);
                
                // Position text box center on a circle to avoid overlap completely
                const gap = 30; // Gap between line end and text box center
                const textBoxRadius = lineLength + gap;
                
                // Calculate circle position where text box center should be
                const circleX = textBoxRadius * Math.cos(angle * Math.PI / 180);
                const circleY = textBoxRadius * Math.sin(angle * Math.PI / 180);
                
                // Position text box so its center is at the circle point
                const textBoxX = circleX - textBoxWidth / 2;
                const textBoxY = circleY - textBoxHeight / 2;
                
                return (
                    <div 
                        className="info-text-box"
                        style={{
                            left: `${textBoxX}px`,
                            top: `${textBoxY}px`,
                        }}
                    >
                        {text}
                    </div>
                );
            })()}
        </div>
    );
};

export default InfoBox;
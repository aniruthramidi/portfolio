import React from 'react';
import './Marquee.css';

const Marquee = () => {
  const items = [
    'UI Design',
    'UX Research',
    'Design Systems',
    'Prototyping',
    'Frontend Dev',
    'Interaction Design',
    'Figma',
    'Motion Design',
  ];

  // We repeat items twice to facilitate a seamless scroll loop in CSS
  const marqueeContent = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-inner">
          {marqueeContent.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              <span className="marquee-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

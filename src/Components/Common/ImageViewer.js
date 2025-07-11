import React, { useEffect, useRef, useState } from 'react';

const ImageViewer = ({ attributes, device }) => {
  const { paver, align } = attributes;
  const { strtPosition, position, failedMsg, isFailedMsg, isOverly, title, description, isHoverMouse } = paver;
  const panoramaRef = useRef(null);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isActivated || isHoverMouse) {
      const $panorama = window.jQuery(panoramaRef.current);

      const options = {
        failureMessage: failedMsg,
        failureMessageInsert: position,
        gracefulFailure: isFailedMsg,
        meta: false,
        responsive: true,
        startPosition: strtPosition,
        minimumOverflow: 200,
        grain: 3,
        cursorThrottle: (1000 / 60),
        gyroscopeThrottle: (1000 / 60),
        panningThrottle: 125,
        resizeThrottle: 500,
        mouseSmoothingFunction: 'linear',
        tilt: true,
        tiltSensitivity: 0.1,
        tiltScrollerPersistence: 500,
        tiltSmoothingFunction: 'gaussian',
        tiltThresholdPortrait: 12,
        tiltThresholdLandscape: 24
      }

      // Initialize Paver with new image URL
      $panorama.paver(options);


      return () => {
        if ($panorama.data('paver')) {
          $panorama.paver('destroy');
        }
      }
    }
  }, [isActivated, isHoverMouse, paver.imgUrl, paver.height[device], align]);


  // const handleActivation = () => {
  //   if (isActiveClicked && !isActivated) {
  //     setIsActivated(true);
  //   }
  // };

  const handleActivation = () => {
    if (!isHoverMouse && !isActivated) {
      setIsActivated(true);
    }
  };


  return (
    <div className="hero-section-container"
      // onClick={handleActivation}
      onClick={!isHoverMouse ? handleActivation : null}
      onMouseEnter={isHoverMouse ? handleActivation : null}
    >
      <div data-paver className="panorama paver--initialized paver--ready paver--off" ref={panoramaRef} key={paver.imgUrl} >
        <img src={paver?.imgUrl} alt="Panorama" />

        {/* Title and description overlay */}
        {
          isOverly && (
            <div className="hero-overlay">
              <div className="hero-content">
                <h3 className='title'>{title}</h3>
                <h5 className='description'>{description}</h5>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ImageViewer;

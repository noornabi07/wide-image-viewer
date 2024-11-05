import React, { useEffect, useRef } from 'react';

const ImageViewer = ({ attributes, device }) => {
  const { paver } = attributes;
  const { strtPosition, position, failedMsg, isFailedMsg } = paver;
  const panoramaRef = useRef(null);

  useEffect(() => {
    const $panorama = window.jQuery(panoramaRef.current);

    // Destroy previous Paver instance if it exists
    if ($panorama.data('paver')) {
      $panorama.paver('destroy');
    }

    // Initialize Paver with new image URL
    $panorama.paver({
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
    });
  }, [paver.imgUrl, paver.height[device]]);





  return (
    <div data-paver className="panorama paver--initialized paver--ready paver--off" ref={panoramaRef} key={paver.imgUrl} >
      <img src={paver?.imgUrl} alt="Panorama" />
    </div>
  );
};

export default ImageViewer;

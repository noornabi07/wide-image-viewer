import React, { useEffect, useRef } from 'react';

const ImageViewer = ({ attributes, device }) => {
  const { paver, align } = attributes;
  const { strtPosition, position, failedMsg, isFailedMsg } = paver;
  const panoramaRef = useRef(null);

  useEffect(() => {
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
  }, [paver.imgUrl, paver.height[device], align]);





  return (
    <div data-paver className="panorama paver--initialized paver--ready paver--off" ref={panoramaRef} key={paver.imgUrl} >
      <img src={paver?.imgUrl} alt="Panorama" />
    </div>
  );
};

export default ImageViewer;

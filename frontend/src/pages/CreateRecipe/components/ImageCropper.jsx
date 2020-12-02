import { Button } from '@material-ui/core';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CameraIcon from '@material-ui/icons/CameraAlt';

export const ImageCropper = ({ setRecipeImageFile }) => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  // Increase pixel density for crop preview quality on retina screens.
  const pixelRatio = window.devicePixelRatio || 1;

  // We resize the canvas down when saving on retina devices otherwise the image
  // will be double or triple the preview size.
  function getResizedCanvas(canvas, newWidth, newHeight) {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext('2d');

    try {
      if (canvas.width > 0 && canvas.height > 0) {
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);
      }
    } catch (err) {
      alert(err);
    }

    return tmpCanvas;
  }

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        let file = new File([blob], 'png', { type: 'image/png' });

        setRecipeImageFile(file);
      },
      'image/png',
      1
    );
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    generateDownload(previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  return (
    <div className='App'>
      <div>
        <input style={{ display: 'none' }} type='file' id='raised-button-file' accept='image/*' onChange={onSelectFile} />
        <label htmlFor='raised-button-file'>
          <Button endIcon={<CameraIcon />} style={{ borderRadius: 0, marginTop: 10 }} variant='contained' component='span'>
            Upload Photo
          </Button>
        </label>
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            display: 'none'
          }}
        />
      </div>
    </div>
  );
};

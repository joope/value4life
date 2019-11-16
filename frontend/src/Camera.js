import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import Tesseract from 'tesseract.js';

function CameraWrapper(props) {
  const [value, setValue] = useState();

  const recognize = (dataUrl) => {
    // console.log('data', dataUrl)
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    ).then((data) => {
      console.log(data);
    })
    // Tesseract.recognize(
    //   Buffer.from(dataUrl, 'base64'),
    //   'fi',
    //   { logger: m => console.log(m) }
    // ).then(({ data }) => {
    //   console.log('results ', data);
    //   // setValue(text);
    // }).catch((err) => console.log('terr ', err));
  }

  return (
    <div>
      <h1>Upload</h1>
      <div>{value}</div>
      <Camera
        isImageMirror={false}
        onTakePhoto = { (dataUri) => { recognize(dataUri) } }
      />
    </div>
  )
}

export default CameraWrapper;
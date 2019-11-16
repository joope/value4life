import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';

function CameraWrapper(props) {
  const [value, setValue] = useState();

  const recognize = (dataUrl) => {
    window.Tesseract.recognize(
      dataUrl,
      'fi',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);
      setValue(text);
    })
  }

  return (
    <div>
      <h1>Upload</h1>
      <div>{value}</div>
      <Camera
          onTakePhoto = { (dataUri) => { recognize(dataUri) } }
      />
    </div>
  )
}

export default CameraWrapper;
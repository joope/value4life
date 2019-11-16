import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import Tesseract from 'tesseract.js';
import { Link } from "@reach/router";

function calculateMonthlyPrice(price, lifetime){
  return Math.ceil(price / lifetime)
}

function parsePrice(text){
  try {
    const match = text.match(/\d+[\.|\,]*\d{1,2}/gm);
    return match[0]
  } catch(e) {
    return '9,99';
  }
}

function CameraWrapper(props) {
  const [text='', setText] = useState();
  const [price='', setPrice] = useState();

  const recognize = (dataUrl) => {
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    ).then((data) => {
      console.log(data);
      const { text } = data;
      setPrice(parsePrice(text));
      setText(text);
    })
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div>
      <Link to="/" className="home-button">X</Link>
      <Camera
        isImageMirror={false}
        onTakePhoto = { (dataUri) => { recognize(dataUri) } }
      />
      <form onSubmit={submit}>
        <div>
          <label>Name: </label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
          <label>Price: </label>
          <input type="number" step="any" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default CameraWrapper;
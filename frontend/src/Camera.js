import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import Tesseract from 'tesseract.js';
import { Link } from "@reach/router";
import Select from 'react-select';

import Fuse from 'fuse.js';

import data from './data/verkkokauppa.json';

const fuse = new Fuse(data, {
  keys: ['name']
})

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function calculateMonthlyPrice(price, lifetime){
  return Math.ceil(price / lifetime)
}

function parsePrice(text){
  try {
    const match = text.match(/\d+[\.|\,]\d{1,2}/gm);
    return match[0]
  } catch(e) {
    console.log(e);
    return '';
  }
}

function CameraWrapper(props) {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [timespan, setTimespan] = useState('chocolate');
  const [products, setProducts] = useState([]);

  const recognize = (dataUrl) => {
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    ).then((data) => {
      console.log(data);
      const { text } = data;
      const results = fuse.search(text).map(e => ({
        value: e.name, 
        label: e.name,
      }));
      console.log(results);
      setProducts(results);
      setPrice(parsePrice(text));
      setText(text);
    })
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
    const searchTerm = text.substring(0, 20);
    const results = fuse.search(searchTerm).map(e => ({
      value: e.name, 
      label: e.name,
    }));
    console.log(results);
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
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <div>
          <Select 
            className="selector"
            value={products} 
            onChange={(value) => setProducts(value)}
            options={products}
          />
        </div>
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default CameraWrapper;
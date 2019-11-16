import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import Tesseract from 'tesseract.js';
import { Link } from "@reach/router";
import Select from 'react-select';

import Fuse from 'fuse.js';

import data from './data/verkkokauppa.json';

import { getBudget } from './Home';

const fuse = new Fuse(data, {
  keys: ['name']
})

const timespanOptions = [
  { value: 0.25, label: '1 Week' },
  { value: 0.5, label: '2 Weeks' },
  { value: 1, label: '1 Month' },
  { value: 2, label: '2 Months' },
  { value: 3, label: '3 Months' },
  { value: 4, label: '4 Months' },
  { value: 5, label: '5 Months' },
  { value: 6, label: '6 Months' },
  { value: 12, label: '1 Year' },
  { value: 24, label: '2 Years' },
  { value: 36, label: '3 Years' },
  { value: 48, label: '4 Years' },
  { value: 60, label: '5 Years' },
  { value: 120, label: '10 Years' },
];

function calculateMonthlyPrice(price, { value }) {
  console.log(price, value)
  return Math.ceil(price / value)
}

function parsePrice(text){
  try {
    const match = text.replace(/ /g, '').match(/\d+[\.|\,]\d{1,2}/gm);
    return match[0].replace(/,/g, '.');
  } catch(e) {
    console.log(e);
    return 0;
  }
}

function CameraWrapper(props) {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [timespan, setTimespan] = useState(timespanOptions[2]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);

  const recognize = (dataUrl) => {
    setLoading(true);
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    ).then((data) => {
      console.log(data);
      const { text } = data;
      const searchTerm = text.substring(0, 20);
      const results = fuse.search(searchTerm).map(e => ({
        value: e.name, 
        label: e.name,
      }));
      console.log(results);
      setProducts(results);
      setProduct(results[0]);
      setPrice(parsePrice(text));
      setText(text);
      setLoading(false);
    })
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  const estimatedCost = calculateMonthlyPrice(price, timespan);

  return (
    <div>
      <Link to="/" className="home-button">X</Link>
      <Camera
        isImageMirror={false}
        onTakePhoto = { (dataUri) => { recognize(dataUri) } }
      />
      <form onSubmit={submit}>
        {loading && <div className="spinner">Searching products...</div>}
        <div>
          {/* <label>Product: </label> */}
          <Select 
            className="selector"
            value={product} 
            onChange={(value) => setProduct(value)}
            options={products}
            isSearchable={true}
            placeholder="Product name"
          />
        </div>
        <div>
          {/* <label>Price: </label> */}
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <div>
          {/* <label>Lifespan: </label> */}
          <Select 
            className="selector"
            value={timespan} 
            onChange={(value) => setTimespan(value)}
            options={timespanOptions}
          />
        </div>
        {/* <input type="submit" value="Search" /> */}
      </form>
      <h2>Estimated cost: {estimatedCost}€/month</h2>
    </div>
  )
}

export default CameraWrapper;
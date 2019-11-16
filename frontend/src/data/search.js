const Fuse = require('fuse.js');

const data = require('./verkkokauppa.json');


const main = () => {
  var options = {
    keys: ['name']
  }
  const fuse = new Fuse(data, options)

  const result = fuse.search('macbook')
  console.log(result);

}

main()
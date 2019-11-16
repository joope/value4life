const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { ProductSchema } = require('./models/product');

const db = mongoose.connection;

const ebay_headphone_sony = require('./json/ebay_headphone_sony.json');
ebay_headphone_sony.filter(item => item.condition === 'Pre-Owned').map(item => {
  item.type = 'headphone'
  item.lifespan = 730
})
const ebay_laptop = require('./json/ebay_laptop.json');
const ebay_playstation_game = require('./json/ebay_playstation_game_console.json');
const ebay_wireless_headphone_over30 = require('./json/ebay_wireless_headphone_over30.json');
const ebay_xbox_game_console = require('./json/ebay_xbox_game_console.json');

const tori_kannettava_tietokone = require('./json/tori_kannettava_tietokone.json');
tori_kannettava_tietokone.map(item => item.type = 'laptop_used');

const tori_pelikonsoli = require('./json/tori_pelikonsoli.json');
const tori_sony_kuuloke = require('./json/tori_sony_kuuloke.json');

const verkkokauppa_kannettava_tietokone = require('./json/verkkokauppa_kannettava_tietokone.json');
verkkokauppa_kannettava_tietokone.map(item => item.type = 'laptop');

const verkkokauppa_langaton_kuuloke = require('./json/verkkokauppa_langaton_kuuloke.json');
verkkokauppa_langaton_kuuloke.map(item => {
  item.type = 'headphone'
  item.lifespan = 0
})
const verkkokauppa_pelikonsoli = require('./json/verkkokauppa_pelikonsoli.json');
const verkkokauppa_televisio = require('./json/verkkokauppa_televisio.json');

const main = async () => {

  // Insert new laptops
  ProductSchema.insertMany(verkkokauppa_langaton_kuuloke, (err, done) => {
    console.log('err', err);
    console.log('done', done);
  });
};

main();
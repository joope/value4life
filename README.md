# value4life - *Check Before Checkout!*
Junction 2019 app for [Improving your financial future](https://2019.hackjunction.com/challenges/improving-your-financial-future) challenge by Blackrock

![value4life screenshot](/value4life.png)


## Prototype
During the hackathon we implemented the layout and initial design for the purchase process. This consists of scanning a product name and price with the phone camera. The scanned image is passed through a simple text recognition process where the resulting text is used to search a product match from the database, while the product price is inputted into a price field. After the process has completed a summary of spending details is displayed in order to help the user in making the purchase decision.

Live demo: http://value4.life

# Planning

### What is the metric for cost-per-lifetime?
### Student meals per day/week/netflix/ ?

## Data
- Receipts
- Warranty & Mainentance
- Resell value

Pick one item:
Electronics, mobile device, car, furniture

## User interface & UX
- Mobile app / PWA
- Browser extension

Name for our team: Tieto intro song


# How to get backend up and running

### Mongo

Install mongo globally https://docs.mongodb.com/manual/administration/install-community/

Or run in docker

```
mkdir ~/data
sudo docker run -d -p 27017:27017 -v ~/data:/data/db mongo
```

### Node

Install node

```
npm i -g nodemon

```

const Hotel = require("../models/hotel");
const Room = require("../models/room");

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.statusCode = 200;
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.postSearch = (req, res, next) => {
  const destination = req.body.destination.replace(/(^\w|\s\w)/g, (m) =>
    m.toUpperCase()
  );
  const numOfPeople = req.body.options.adult + req.body.options.children;

  Room.find({ maxPeople: { $gte: numOfPeople } })
    .then((rooms) => {
      const roomIds = rooms.map((room) => room._id.toString());

      Hotel.find({ city: destination }).then((hotels) => {
        const results = hotels.filter((h) => {
          for (let i = 0; i < roomIds.length; i++) {
            if (h.rooms.includes(roomIds[i])) {
              return h;
            }
          }
        });
        res.send(results);
      });
    })
    .catch((err) => console.log(err));
};

exports.postRoom = (req, res, next) => {
  const { id } = req.body;
  const numOfPeople = req.body.options.adult + req.body.options.children;

  Room.find({ _id: { $in: id } })
    .then((hotel) => {
      res.status(200).send(hotel.filter((h) => (h.maxPeople = numOfPeople)));
    })
    .catch((err) => console.log(err));
};

const apiServer = require('./api');
const bodyParser = require('body-parser');

function listen(io) {
  const tracking = io.of('/tracking');
  tracking.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    // tracking.emit('point', 'point: 7687678');
    apiServer.use(bodyParser.json({ extended: false }));
    apiServer.post('/update', (req, res) => {
      const lat = req.body.lat;
      const lng = req.body.lng;
      // update DB

      tracking.emit('updateLocation', {
        lat,
        lng,
      });

      res.json({ message: 'done' });
    });

    // socket.on('points recived', () => {
    //   console.log('points recived from', socket.id);

    //   // tracking.emit('point', 'point: 7687678');
    // });

    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
  });
}

module.exports = {
  listen,
};

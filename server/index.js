const mongoose = require('mongoose');
const io = require('socket.io');
const Docuement = require('./Docuement.modal');
const Document = require('./Docuement.modal');

mongoose.connect('mongodb://localhost/google-doc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const ioo = io(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const defaultValue = '';
const findOrCreatre = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  const createDefaultDocument = await Document.create({ _id: id, data: defaultValue });
  return createDefaultDocument;
};

ioo.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreatre(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('recive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await Docuement.findByIdAndUpdate(documentId, { data });
    });
  });
});

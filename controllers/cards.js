const Card = require('../models/card');

// Поиск всех карточек
module.exports.findCards = (req, res) => {

  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Создание новой карточки
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Удаление карточки по идентификатору
module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
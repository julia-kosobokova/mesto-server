const User = require('../models/user');

// Поиск всех пользователей
module.exports.findUsers = (req, res) => {

  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Поиск пользователя по Id
module.exports.findUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Обновление профиля
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  // обновим имя и описание найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { name, about },
  {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true // если пользователь не найден, он будет создан
  })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Обновление аватара
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  // обновим аватар найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { avatar },
  {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true // если пользователь не найден, он будет создан
  })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
class Game {
  constructor() {
    this.categories = [
      {
        name: 'Wiedźmin',
        passwords: [
          'Ciri',
          'Ravix z CzteroRoga',
          'Rębacze z Crinfrid',
          'Somne',
          'Aretuza',
          'Borch Trzy Kawki',
          'Doppler',
          'Regis',
          'Rzeźnik z Blaviken',
          'Kear Morhen',
          'Visenna',
          'Hen Ichaer',
          'Kuroliszek',
          'Jaskier',
          'Dziki Gon',
          'Ostatnie życzenie',
          'Vesemir',
          'Triss Merigold',
          'Yennefer z Vengbergu',
          'Temeria',
          'Niebieskie pasy',
        ],
      },
      {
        name: 'Harry Potter',
        passwords: [
          'Hermiona',
          'Hagrid',
          'Dumbledore',
          'Ginny',
          'Zakon Feniksa',
          'Gryffindor',
          'Privet Drive',
          'Czara Ognia',
          'szukający',
          'Jęcząca Marta',
          'Especto Patronum',
          'Peter Pettigrew',
          'Insygnia Śmierci',
          'Czarna różdżka',
          'Kamień wskrzeszenia',
          'Peleryna niewidka',
          'Norbert',
          'Gruap',
          'Pióro feniksa',
          'Nagini',
          'Veritaserum',
          'Dziurawy Kocioł',
          'Hardodziob',
        ],
      },
      {
        name: 'Gra o tron',
        passwords: [
          'Lannister',
          'Stark',
          'Targaryen',
          'Tarly',
          'Eddard Stark',
          'Zbieramy siły',
          'Casterly Rock',
          'Winterfell',
          'Nasz jest furia',
          'Królobójca',
          'Viserion',
          'Drogon',
          'Rhaegal',
          'Jon Snow',
          'Miecz Długi Pazur',
          'Jorah Mormont',
          'Warg',
          'Duch',
          'Valar Morghulis',
          'Tyrion Lannister',
        ],
      },
    ];
    this.currentCategory = '';
    this.currentPassword = '';
    this.countMistake = 0;
    this.maxNumberMistake = 8;
    this.score = 0;
    this.averageTime = 0;
    this.pastPasswords = [];
  }

  getMaxNumberMistake() {
    return this.maxNumberMistake;
  }

  setCurrentPassword(newPassword) {
    this.currentPassword = newPassword;
  }

  getCurrentPassword() {
    return this.currentPassword;
  }

  setCurrentCategory(category) {
    this.currentCategory = category;
  }

  getCurrentCategory() {
    return this.currentCategory;
  }

  pushPastPasswords(newPassword) {
    this.pastPasswords.push(newPassword);
  }

  setPastPasswords(length) {
    this.pastPasswords.length = length;
  }

  getPastPasswords() {
    return this.pastPasswords;
  }

  increaseMistake() {
    this.countMistake += 1;
  }

  setMistake(number) {
    this.countMistake = number;
  }

  getMistake() {
    return this.countMistake;
  }

  increaseScore() {
    this.score += 1;
  }

  setScore(number) {
    this.score = number;
  }

  getScore() {
    return this.score;
  }

  randomPasswords() {
    this.currentCategory = this.getCurrentCategory();
    this.indexCurrentCategories = this.categories.findIndex(
      (category) => category.name === this.currentCategory,
    );
    this.lengthPasswords = this.categories[
      this.indexCurrentCategories
    ].passwords.length;
    this.randomIndex = Math.round(Math.random() * (this.lengthPasswords - 1));
    this.currentPassword = this.categories[
      this.indexCurrentCategories
    ].passwords[this.randomIndex];
    this.itWas = this.pastPasswords.findIndex(
      (password) => password === this.currentPassword,
    );

    if (this.itWas === -1) {
      this.setCurrentPassword(this.currentPassword);
    } else {
      this.randomPasswords();
    }
  }
}

export default Game;

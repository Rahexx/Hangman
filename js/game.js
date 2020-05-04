class Game {
  constructor() {
    this.categories = [
      { name: 'programowanie', passwords: ['React', 'Angular', 'Vue', 'Java'] },
      {
        name: 'Harry Potter',
        passwords: ['Hermiona', 'Hagrid', 'Dumbledore', 'Ginny'],
      },
      {
        name: 'Gra o tron',
        passwords: ['Lannister', 'Stark', 'Targaryen', 'Tarly'],
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
      this.pushPastPasswords(this.currentPassword);
      this.setCurrentPassword(this.currentPassword);
    } else {
      this.randomPasswords();
    }
  }
}

export default Game;

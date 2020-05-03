class Game {
  constructor() {
    this.categories = [
      { name: 'programowanie', passwords: ['React', 'Angular', 'Vue', 'Java'] },
      {
        name: 'Harry Potter',
        passwords: ['Hermiona', 'Hagrin', 'Dumbledore', 'Ginny'],
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
    this.scor = 0;
    this.averageTime = 0;
  }
}

export default Game;

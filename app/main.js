var app = new Vue({
  el: '#app',
  data: {
    // minNumber: 0,
    maxNumber: 24,
    // number: [],
    number: [],
    currentNumber: '',
    numberAllComplete: false,
    numberList: 0,
    chosenNumber: [{}],
    maxId: 0,
    setNumberComplete: false,
    maxNumberValidationError: false,
  },
  methods: {
    setNumber: function() {
      this.maxNumber = Number(this.maxNumber);
      if (this.maxNumber < 1 || this.maxNumber > 101) {
        this.maxNumberValidationError = true;
        return;
      } else {
        this.maxNumberValidationError = false;
      }

      // 番号セット完了
      this.setNumberComplete = true;

      for (let i = 0; i < this.maxNumber; i++) {
        this.number.push({
          id: Number([i]) + 1,
          class: 'number-' + [i]
        });
console.log(this.number);
      }

      // for (let i = 0; i < this.maxNumber; i++) {
      //   this.number[i] = i + 1;
      // }
    },
    stopNumber: function() {
      let random = Math.floor(Math.random() * this.number.length);
      this.currentNumber = this.number[random];
      this.number.splice(random, 1);
// console.log(this.number);
// console.log(random);
// console.log(this.currentNumber);
      // 残り玉が 0 の場合
      if (this.number.length <= 0) {
        this.numberAllComplete = true;
      }

      // if (Object.keys(this.chosenNumber).length > 0) {
      //   this.maxId = this.chosenNumber.reduce(function (a, b) {
      //     return a > b.id ? a : b.id
      //   }, 0);
      // }
      // console.log(this.maxId);

      this.chosenNumber.push({
        id: this.maxId + 1,
        number: this.currentNumber
      });
      this.maxId++;
      // console.log(this.chosenNumber);
    }
  }
})

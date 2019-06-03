var app = new Vue({
  el: '#app',
  data: {
    // minNumber: 0,
    maxNumber: 0,
    number: [1, 2, 3, 4, 5, 6],
    currentNumber: '',
    numberAllComplete: false,
    chosenNumber: [{}],
    maxId: 0,
  },
  methods: {
    setNumber: function() {
      for (let i = 0; i < this.maxNumber; i++) {
        this.number[i] = i + 1;
      }
// console.log(this.number);
    },
    stopNumber: function() {
      let random = Math.floor(Math.random() * this.number.length);
      this.currentNumber = this.number[random];
      this.number.splice(random, 1);
console.log(this.number);
console.log(random);
console.log(this.currentNumber);
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

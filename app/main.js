var app = new Vue({
  el: '#app',
  data: {
    maxNumber: 50,
    shuffleNumber: 0,
    chosenNumber: [],
    remainNumber: [],
    maxNumberValidationError: false,
    isStartBingo: false,
    isFinishBingo: false,
    isShuffle: false,
  },
  mounted () {
    const maxNumberEl = document.getElementById('max-number');
    maxNumberEl.addEventListener('click', (e) => {
      e.currentTarget.select();
    });
  },
  methods: {
    setNumber: function() {
      // 最大番号セット
      this.maxNumber = Number(this.maxNumber);

      // 番号バリデーション
      if (this.maxNumber < 1 || this.maxNumber > 101) {
        this.maxNumberValidationError = true;
        return;
      } else {
        this.maxNumberValidationError = false;
      }

      // 番号セット完了
      this.isStartBingo = true;

      // 番号管理オブジェクト生成
      for (let i = 0; i < this.maxNumber; i++) {
        this.chosenNumber.push({
          id: Number([i]) + 1,
          isHit: false
        });
      }

      // ルーレット用番号生成
      for (let i = 0; i < this.maxNumber; i++) {
        this.remainNumber[i] = i + 1
      }
      this.startShuffle();
    },
    choiceNumber: function () {
      // 残り番号からランダムに選択
      let random = Math.floor(Math.random() * this.remainNumber.length);
      return this.remainNumber[random];
    },
    startShuffle: function () {
      // ビンゴシャッフル表示
      this.isShuffle = true;
      shuffleTimer = setInterval(function () {
        const random = Math.floor(Math.random() * this.remainNumber.length);
        this.shuffleNumber = this.remainNumber[random];
      }.bind(this), 20);
    },
    stopShuffle: function() {
      // STOPボタン押下時

      // 選択された番号を取得
      const random = this.choiceNumber();

      // 出た玉の情報を更新
      for (let i = 0; i < this.chosenNumber.length; i++) {
        // 過去に選択されているかチェック
        if (this.chosenNumber[i].id === random) {
          if (this.chosenNumber[i].isHit) {
            // もう一度番号を選択する
            this.choiceNumber();
          } else {
            // 選択済みに更新
            this.chosenNumber[i].isHit = true;
          }
        }
      }

      // シャッフル停止
      clearInterval(shuffleTimer);
      this.isShuffle = false;
      for (let i = 0; i < this.remainNumber.length; i++) {
        if (this.remainNumber[i] === random) {
          // 選択されたデカ番号表示
          this.shuffleNumber = this.remainNumber[i]
          // 残り番号配列から削除
          this.remainNumber.splice(i, 1);
        }
      }

      // 残り玉が 0 の場合
      if (this.remainNumber.length <= 0) {
        this.shuffleNumber = 'complete!'
        this.isFinishBingo = true;
      }
    }
  }
})

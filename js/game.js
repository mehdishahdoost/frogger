let gameScene = new Phaser.Scene("Game");

gameScene.init = function() {
    this.playerSpeed = 1.5;
    this.enemySpeed = 2;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
}

gameScene.preload = function () {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
};

gameScene.create = function () {
    let bg = this.add.sprite(0,0, 'background');
    bg.setOrigin(0,0);

     this.player = this.add.sprite(40, this.sys.game.config.height /2 , 'player');
     this.player.setScale(0.5);

     this.treasure = this.add.sprite(this.sys.game.config.width - 80,
         this.sys.game.config.height/2, 'treasure');
     this.treasure.setScale(0.6);

     this.enemies = this.add.group({
         key: 'dragon',
         repeat: 5,
         setXY: {
             x: 110,
             y: 100,
             stepX: 80,
             stepY: 20
         }
     });

     Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

};


gameScene.update = function () {

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        this.gameOver();
    }

}

gameScene.gameOver = function () {
    this.scene.restart();
}

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
}

let game = new Phaser.Game(config);


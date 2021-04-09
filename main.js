let gameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    }
}

let game = new Phaser.Game(gameConfig)

let player = undefined;

let jumpKey;

function preload(){
    this.load.image("snake", "assets/snake.png")
}

function create(){
    player = this.add.sprite(128, 128, "snake")
    this.physics.world.enable(player)
    player.setScale(0.25)
    player.setRotation(4.71239)
    player.body.allowRotation = false;

    // jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
}

function update(){

}

document.addEventListener('keyup', (ev) => {
    if(ev.keyCode === 32){
        jump()
        console.log('1')
    }
})

function jump(){
    player.body.setVelocityY(-200)
}
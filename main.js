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
let platforms = undefined;
let bottomPipes = undefined;
let topPipes = undefined;

let points = 0;

function preload(){
    this.load.image("snake", "assets/snake.png")
    this.load.image("ground", "assets/bottom.png")
}

function create(){
    platforms = this.physics.add.staticGroup();
    this.physics.world.enable(platforms);

    bottomPipes = this.physics.add.staticGroup();
    this.physics.world.enable(bottomPipes);
    topPipes = this.physics.add.staticGroup();
    this.physics.world.enable(topPipes);
    // player
    player = this.add.sprite(128, 128, "snake")
    this.physics.world.enable(player)
    player.setScale(0.25)
    player.setRotation(4.71239)
    player.body.allowRotation = false;
    // constantly move to right
    setInterval(() => {
        player.body.setVelocityX(300)
    }, 100)

    setInterval(() => {
        spawnFloorPart();
    }, 400);

    setInterval(() => {
        spawnTopPipe()
        spawnBottomPipe();
    }, 2000);

    this.cameras.main.startFollow(player)
    this.cameras.main.setFollowOffset(-200, -200)
    this.cameras.main.setZoom(0.5)
    this.cameras.main.setLerp(0.1, 0)
    this.physics.add.collider(player, platforms, gameOver);
    this.physics.add.collider(player, bottomPipes, gameOver);
    this.physics.add.collider(player, topPipes, gameOver);

    setInterval(() => {
        document.getElementById('points').innerText = points++;
    }, 10)
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

function spawnFloorPart(){
    platforms.create(player.x + 200, window.innerHeight + 60, 'ground').setScale(0.25).refreshBody();
}

function spawnBottomPipe(){
    bottomPipes.create(player.x + 1500, window.innerHeight , 'ground').setScale(0.25, randomNumber(2, 4)).refreshBody();
}

function spawnTopPipe(){
    // topPipes.create(player.x + 1500, -1000, 'ground').setScale(0.25, Math.random() * 4).refreshBody();
    topPipes.create(player.x + 1500, -1000, 'ground').setScale(0.25, randomNumber(2, 4)).refreshBody();
}

function gameOver(){
    let p = points;
    window.location.href = 'gameover.html?points=' + p
    game.stop()
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
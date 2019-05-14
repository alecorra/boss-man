var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        noAudio: false
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

}

var game = new Phaser.Game(config)
var enemy1
var enemy2
var enemy3
var firstEnemyTimer
var secondEnemyTimer
var thirdEnemyTimer
var playerLeftSpriteStart = 0
var playerLeftSpriteEnd = 6
var playerRightSpriteStart = 8
var playerRightSpriteEnd = 14
var playerStandingStill = 7
var fireKeyActive = 0


var droneLeftSpriteStart = 1
var droneLeftSpriteEnd = 1
var droneRightSpriteStart = 0
var droneRightSpriteEnd = 0
var droneSitStart = 2
var droneSitEnd = 3

var droneVelocity = 100

var seconds = 0

var droneArray = []

var droneMoveTimer

var music

var gameOver = false


function preload ()
{
    this.load.image('background', './assetsReady/backgroundSprite.png')
    this.load.image('desk', './assetsReady/desk_v_2.png')
    this.load.image('shelf', './assetsReady/shelf_v_2.png')
    this.load.image('enemy', './assetsReady/enemy_v_2.jpg')
    this.load.spritesheet('hero', './assetsReady/playerSpriteSheet.png', { frameWidth: 100, frameHeight: 120})
    this.load.spritesheet('drone', './assetsReady/droneSpriteSheet.png', { frameWidth: 120, frameHeight: 140})
    this.load.spritesheet('drone2', './assetsReady/droneSpriteSheet.png', { frameWidth: 120, frameHeight: 140})
    this.load.spritesheet('drone3', './assetsReady/droneSpriteSheet.png', { frameWidth: 120, frameHeight: 140})
    this.load.spritesheet('drone4', './assetsReady/droneSpriteSheet.png', { frameWidth: 120, frameHeight: 140})
    this.load.spritesheet('drone5', './assetsReady/droneSpriteSheet.png', { frameWidth: 120, frameHeight: 140})
    this.load.image('pizza', './assetsReady/pizzaSprite.png')
    this.load.image('beer', './assetsReady/beerSprite.png')
    this.load.image('coin', './assetsReady/coin_v_1.png')
    this.load.audio('background', './assetsReady/ludemDareOfficeMusic.mp3')
}


var hero
var shelf
var cursors
var aKey
var dKey
var sKey
var spaceKey
var drone1
var drone2
var drone3
var drone4
var drone5
var hearts
var drones
var coin
var cash = 0
var baddySeconds = 0
var playTime = 0

var dronePositions = [
    {
        filled: true,
        x: 80,
        y: 530
    },
    {
        filled: true,
        x: 240,
        y: 530
    },
    {
        filled: true,
        x: 400,
        y: 530
    },
    {
        filled: true,
        x: 560,
        y: 530
    },
    {
        filled: true,
        x: 720,
        y: 530
    }
]

var heartHealth = 100
var healthMax = 1000


function giveHeartToDrone(drone, heart) {
    drone.health += heartHealth
    if (drone.health > healthMax) {
        drone.health = healthMax
    }
    heart.destroy()
}

function heartsDestroy(enemy, heart) {

    heart.destroy()
}

function create() {
    this.add.image(400, 300, 'background')

    drone1 = this.physics.add.sprite(80, 530, 'drone')
    drone1.body.setGravityY(-300)
    drone1.position = 0
    drone1.health = healthMax

    drone2 = this.physics.add.sprite(240, 530, 'drone')
    drone2.body.setGravityY(-300)
    drone2.position = 1
    drone2.health = healthMax

    drone3 = this.physics.add.sprite(400, 530, 'drone')
    drone3.body.setGravityY(-300)
    drone3.position = 2
    drone3.health = healthMax

    drone4 = this.physics.add.sprite(560, 530, 'drone')
    drone4.body.setGravityY(-300)
    drone4.position = 3
    drone4.health = healthMax

    drone5 = this.physics.add.sprite(720, 530, 'drone')
    drone5.body.setGravityY(-300)
    drone5.position = 4
    drone5.health = healthMax

    drones = this.add.group()
    drones.add(drone1)
    drones.add(drone2)
    drones.add(drone3)
    drones.add(drone4)
    drones.add(drone5)

    hearts = this.add.group()


    this.add.image(720, 540, 'desk')
    this.add.image(560, 540, 'desk')
    this.add.image(400, 540, 'desk')
    this.add.image(240, 540, 'desk')
    this.add.image(80, 540, 'desk')


    this.add.image(400, 100, 'shelf')
    firstEnemyTimer = this.time.addEvent({delay: 5000, callback: releaseFirstWave, callbackScope: this, loop: true});
    secondEnemyTimer = this.time.addEvent({delay: 4000, callback: releaseSecondWave, callbackScope: this, loop: true});
    thirdEnemyTimer = this.time.addEvent({delay: 3000, callback: releaseThirdWave, callbackScope: this, loop: true});

    firstEnemyTimer.paused = true
    secondEnemyTimer.paused = true
    thirdEnemyTimer.paused = true


    function releaseFirstWave() {
        if (Phaser.Math.Between(0, 1) > 0.5) {
            enemy1 = this.physics.add.image(950, 180, 'enemy')
            enemy1.body.setGravityY(-300)
            enemy1.setVelocityX(-160)
        } else {
            enemy1 = this.physics.add.image(-150, 180, 'enemy')
            enemy1.body.setGravityY(-300)
            enemy1.setVelocityX(160)
        }
    }

    function releaseSecondWave() {
        if (Phaser.Math.Between(0, 1) > 0.5) {
            enemy2 = this.physics.add.image(950, 300, 'enemy')
            enemy2.body.setGravityY(-300)
            enemy2.setVelocityX(-260)
        } else {
            enemy2 = this.physics.add.image(-150, 300, 'enemy')
            enemy2.body.setGravityY(-300)
            enemy2.setVelocityX(260)
        }
    }

    function releaseThirdWave() {
        if (Phaser.Math.Between(0, 1) > 0.5) {
            enemy3 = this.physics.add.image(950, 420, 'enemy')
            enemy3.body.setGravityY(-300)
            enemy3.setVelocityX(-300);
        } else {
            enemy3 = this.physics.add.image(-150, 420, 'enemy')
            enemy3.body.setGravityY(-300)
            enemy3.setVelocityX(300)
        }
    }

    shelf = this.physics.add.staticGroup()
    shelf.create(400, 100, 'shelf').refreshBody()

    hero = this.physics.add.sprite(400, 50, 'hero')
    hero.setCollideWorldBounds(true)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {start: playerLeftSpriteStart, end: playerLeftSpriteEnd}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'hero', frame: playerStandingStill}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', {start: playerRightSpriteStart, end: playerRightSpriteEnd}),
        frameRate: 10,
        repeat: -1
    });

    // Setting gravity to negative counteracts the gravity: { y: 300 }, in physics in config
    hero.body.setGravityY(-300)
    this.physics.add.collider(hero, shelf)

    // Set up keyboard inpout
    cursors = this.input.keyboard.createCursorKeys()
    aKey = this.input.keyboard.addKey('A')
    dKey = this.input.keyboard.addKey('D')
    sKey = this.input.keyboard.addKey('S')
    spaceKey = this.input.keyboard.addKey('SPACE');

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('drone', {start: droneLeftSpriteStart, end: droneLeftSpriteEnd}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('drone', {start: droneSitStart, end: droneSitEnd}),
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('drone', {start: droneRightSpriteStart, end: droneRightSpriteEnd}),
        frameRate: 10,
        repeat: -1
    });

    // internal timer to visualise the time played (stop to run after 10 seconds)
    var counter = setInterval(timer, 1000);

    function timer() {
        seconds = seconds + 1;
        if (seconds >= 10) {
            clearInterval(counter);
        }
    }

    var scoreText = this.add.text(600, 35, '$0', {font: '70px Arial', fill: '#000000', align: 'center'})

    scoreCounter = this.time.addEvent({delay: 100, callback: checkScore, callbackScope: this, loop: true})

    function checkScore() {
        scoreText.setText('$' + cash)
    }

    var playTimeText = this.add.text(350, 240, '0s', {font: '70px Arial', fill: '#000000', align: 'center'})

    playTimeCounter = this.time.addEvent({delay: 1000, callback: addASecondToPlayTime, callbackScope: this, loop: true})

    function addASecondToPlayTime() {
        if(!gameOver) {
            playTime += 1
            playTimeText.setText(playTime + 's')
        }
    }


    drone1CashTimer = this.time.addEvent({delay: 2000, callback: drone1DropCash, callbackScope: this, loop: true})
    drone2CashTimer = this.time.addEvent({delay: 2000, callback: drone2DropCash, callbackScope: this, loop: true})
    drone3CashTimer = this.time.addEvent({delay: 2000, callback: drone3DropCash, callbackScope: this, loop: true})
    drone4CashTimer = this.time.addEvent({delay: 2000, callback: drone4DropCash, callbackScope: this, loop: true})
    drone5CashTimer = this.time.addEvent({delay: 2000, callback: drone5DropCash, callbackScope: this, loop: true})

    function drone1DropCash() {
        cash += 1
        coin = this.physics.add.group({
            key: 'coin',
            setXY: {x: drone1.x, y: drone1.y}
        })
    }

    function drone2DropCash() {
        cash += 1
        coin = this.physics.add.group({
            key: 'coin',
            setXY: {x: drone2.x, y: drone2.y}
        })
    }

    function drone3DropCash() {
        cash += 1
        coin = this.physics.add.group({
            key: 'coin',
            setXY: {x: drone3.x, y: drone3.y}
        })
    }

    function drone4DropCash() {
        cash += 1
        coin = this.physics.add.group({
            key: 'coin',
            setXY: {x: drone4.x, y: drone4.y}
        })
    }

    function drone5DropCash() {
        cash += 1
        coin = this.physics.add.group({
            key: 'coin',
            setXY: {x: drone5.x, y: drone5.y}
        })
    }

    baddyCount = setInterval(baddyTimer, 1000)

    function baddyTimer() {
        baddySeconds += 1
    }

    droneMoveTimer = setInterval(moveDrones, 1000)

    function moveDrones() {
        dronePositions.forEach(function(position) {
            if(position.filled === false && drones.children.entries.length > 1) {
                var place = Math.floor((Math.random() * drones.children.entries.length))
                drones.children.entries[place].x = position.x
            }
        })
    }

    music = this.sound.add('background', {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    })

    music.play()
}

function update()
{
    if(!gameOver) {
        this.physics.add.overlap(hearts, drones, giveHeartToDrone, null, this)

        // remove the hearts when touching enemies
        this.physics.add.overlap(hearts, enemy1, heartsDestroy)
        this.physics.add.overlap(hearts, enemy2, heartsDestroy)
        this.physics.add.overlap(hearts, enemy3, heartsDestroy)


        if (cursors.left.isDown || aKey.isDown) {
            hero.setVelocityX(-160);

            hero.anims.play('left', true);
        } else if (cursors.right.isDown || dKey.isDown) {
            hero.setVelocityX(160);

            hero.anims.play('right', true);
        } else {
            hero.setVelocityX(0);

            hero.anims.play('turn');
        }

        // creating an item to drop down (heart) starting from hero's position
        // item is created only once per down button's click
        // speed of idem is given by gravity force
        if ((cursors.down.isDown || sKey.isDown || spaceKey.isDown) && fireKeyActive === 0) {
            if(Math.random() > 0.5) {
                hearts = this.physics.add.group({
                    key: 'pizza',
                    setXY: {x: hero.x, y: hero.y}
                })
            } else {
                hearts = this.physics.add.group({
                    key: 'beer',
                    setXY: {x: hero.x, y: hero.y}
                })
            }

            fireKeyActive = 1
        }

        if (!(cursors.down.isDown || sKey.isDown || spaceKey.isDown)) {
            fireKeyActive = 0
        }

        if (drone1.health > -1) {
            drone1.health -= 1
        }
        if (drone2.health > -1) {
            drone2.health -= 1
        }
        if (drone3.health > -1) {
            drone3.health -= 1
        }
        if (drone4.health > -1) {
            drone4.health -= 1
        }
        if (drone5.health > -1) {
            drone5.health -= 1
        }

        if (drone1.health < 0) {
            drone1CashTimer.remove()
            drone1.destroy()
            drones.remove(drone1)
            dronePositions[0].filled = false
        }
        if (drone2.health < 0) {
            drone2CashTimer.remove()
            drone2.destroy()
            drones.remove(drone2)
            dronePositions[1].filled = false
        }
        if (drone3.health < 0) {
            drone3CashTimer.remove()
            drone3.destroy()
            drones.remove(drone3)
            dronePositions[2].filled = false
        }
        if (drone4.health < 0) {
            drone4CashTimer.remove()
            drone4.destroy()
            drones.remove(drone4)
            dronePositions[3].filled = false
        }
        if (drone5.health < 0) {
            drone5CashTimer.remove()
            drone5.destroy()
            drones.remove(drone5)
            dronePositions[4].filled = false
        }

        if (firstEnemyTimer.paused === true && baddySeconds > 30) {
            firstEnemyTimer.paused = false
        }

        if (secondEnemyTimer.paused === true && baddySeconds > 60) {
            secondEnemyTimer.paused = false
        }

        if (thirdEnemyTimer.paused === true && baddySeconds > 120) {
            thirdEnemyTimer.paused = false
        }

        // variable to visualise the baddy timer's count
        // console.log(baddySecnnds)

        if ((enemy1) && (enemy1.x > 1000 || enemy1.x < -150)) {
            enemy1.destroy()
        }
        if ((enemy2) && (enemy2.x > 1000 || enemy2.x < -150)) {
            enemy2.destroy()
        }
        if ((enemy3) && (enemy3.x > 1000 || enemy3.x < -150)) {
            enemy3.destroy()
        }

        if (drones.children.entries.length < 1) {
            gameOver = true
            alert("All your drones are dead, you scored $" + cash + " in " + playTime + " seconds.")
        }
    }
}

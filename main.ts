function simulate (x: number, y: number) {
    ebullet = game.createSprite(x, y)
    for (let index = 0; index < 4; index++) {
        ebullet.change(LedSpriteProperty.Y, 1)
        basic.pause(250)
    }
    ebullet.delete()
}
input.onButtonPressed(Button.A, function () {
    p1.change(LedSpriteProperty.X, -1)
    p1.ifOnEdgeBounce()
    basic.pause(200)
})
function self_simulate (x: number, y: number) {
    bullet = game.createSprite(x, y)
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        basic.pause(250)
    }
    bullet.delete()
}
input.onButtonPressed(Button.AB, function () {
    if (timer > 2000) {
        timer = 0
        radio.sendValue("bset", p1.get(LedSpriteProperty.X))
        self_simulate(p1.get(LedSpriteProperty.X), 4)
    }
})
input.onButtonPressed(Button.B, function () {
    p1.change(LedSpriteProperty.X, 1)
    p1.ifOnEdgeBounce()
    basic.pause(200)
})
radio.onReceivedValue(function (name, value) {
    if (name == "move") {
        p2.set(LedSpriteProperty.X, value)
    }
    if (name == "bset") {
        simulate(value, 0)
    }
})
let bullet: game.LedSprite = null
let ebullet: game.LedSprite = null
let timer = 0
let p2: game.LedSprite = null
let p1: game.LedSprite = null
basic.clearScreen()
p1 = game.createSprite(2, 4)
p2 = game.createSprite(2, 0)
timer = 0
radio.setGroup(196)
basic.forever(function () {
    basic.pause(1000)
    timer += 1000
})
basic.forever(function () {
    radio.sendValue("move", p1.get(LedSpriteProperty.X))
})

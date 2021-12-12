input.onButtonPressed(Button.A, function () {
    p1.change(LedSpriteProperty.X, -1)
    radio.sendValue("move", p1.get(LedSpriteProperty.X))
    p1.ifOnEdgeBounce()
    basic.pause(200)
})
input.onButtonPressed(Button.AB, function () {
    if (timer > 2000) {
        timer = 0
        bullet = game.createSprite(p1.get(LedSpriteProperty.X), 5)
        radio.sendValue("bset", p1.get(LedSpriteProperty.X))
        for (let index = 0; index < 4; index++) {
            bullet.change(LedSpriteProperty.Y, -1)
            radio.sendValue("bmove", -1)
            basic.pause(250)
        }
        bullet.delete()
        radio.sendValue("b", 0)
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "end") {
        basic.showIcon(IconNames.Yes)
    }
})
input.onButtonPressed(Button.B, function () {
    p1.change(LedSpriteProperty.X, 1)
    radio.sendValue("move", p1.get(LedSpriteProperty.X))
    p1.ifOnEdgeBounce()
    basic.pause(200)
})
radio.onReceivedValue(function (name, value) {
    if (name == "move") {
        p2.set(LedSpriteProperty.X, value)
    }
    if (name == "bset") {
        ebullet = game.createSprite(value, 0)
    }
    if (name == "bmove") {
        ebullet.change(LedSpriteProperty.Y, 1)
        if (ebullet.isTouching(p1)) {
            radio.sendString("end")
            basic.showIcon(IconNames.No)
        }
    }
    if (name == "b") {
        ebullet.delete()
    }
})
let ebullet: game.LedSprite = null
let bullet: game.LedSprite = null
let timer = 0
let p2: game.LedSprite = null
let p1: game.LedSprite = null
radio.setGroup(196)
p1 = game.createSprite(2, 4)
p2 = game.createSprite(2, 0)
timer = 0
basic.forever(function () {
    basic.pause(1000)
    timer += 1000
})

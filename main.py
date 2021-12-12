def on_button_pressed_a():
    p1.change(LedSpriteProperty.X, -1)
    radio.send_value("move", -1)
    p1.if_on_edge_bounce()
    basic.pause(200)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global bullet
    bullet = game.create_sprite(p1.get(LedSpriteProperty.X), 5)
    radio.send_value("bset", p1.get(LedSpriteProperty.X))
    for index in range(4):
        bullet.change(LedSpriteProperty.Y, -1)
        radio.send_value("bmove", -1)
        basic.pause(250)
    bullet.delete()
    radio.send_value("b", 0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    if receivedString == "end":
        basic.show_icon(IconNames.YES)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    p1.change(LedSpriteProperty.X, 1)
    radio.send_value("move", 1)
    p1.if_on_edge_bounce()
    basic.pause(200)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global ebullet
    if name == "move":
        if value == 1:
            p2.change(LedSpriteProperty.X, 1)
        if value == -1:
            p2.change(LedSpriteProperty.X, -1)
    if name == "bset":
        ebullet = game.create_sprite(value, 0)
    if name == "bmove":
        ebullet.change(LedSpriteProperty.Y, 1)
        if ebullet.is_touching(p1):
            radio.send_string("end")
            basic.show_icon(IconNames.NO)
    if name == "b":
        ebullet.delete()
radio.on_received_value(on_received_value)

ebullet: game.LedSprite = None
bullet: game.LedSprite = None
p2: game.LedSprite = None
p1: game.LedSprite = None
radio.set_group(196)
p1 = game.create_sprite(2, 4)
p2 = game.create_sprite(2, 0)
import Matter from 'matter-js'

const Physics = (entities, {touches, time}) => {
    let engine = entities.physics.engine
    let plane = entities.plane.body
    touches.filter(touch => touch.type === 'press').forEach(touch => {
        Matter.Body.applyForce(plane, plane.position, { x: 0.0, y: -0.1})
    });

    Matter.Engine.update(engine, time.delta)
    return entities
}

export default Physics
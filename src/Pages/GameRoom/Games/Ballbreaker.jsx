import React, {useEffect} from 'react'
import blueBall from '../../../assets/Game/BallBreaker/blueBall.png'

const Ballbreaker = ({width, height}) => {
    
    function handleCanvasLoad() {

        const canvas = document.getElementById('canvas'); // Access the canvas element

        if (canvas) {
            const ctx = canvas.getContext('2d'); // Get the 2D rendering context

            const ball= {
                x:10,
                y:10,
                w:30,
                h:30,
                speed: 5,
                dx: 2,
                dy: 2,

            }

            const balls = new Image();
            balls.src = blueBall
            // console.log(balls)
            
            balls.onload = () => {

                //ball
                function drawBall() {
                    // console.log(ctx.drawImage(blueBall, 10, 10) + "yoi")
                    // ctx.drawImage(balls, ball.x, ball.y, ball.w, ball.h)
                    ctx.beginPath()
                    ctx.arc(ball.x, ball.y, ball.w / 2 , 0, Math.PI * 2)
                    ctx.fillStyle = 'red'
                    ctx.fill()
                    ctx.closePath()


                }
                function clear() {
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                }

                function update() {
                    clear()
                    drawBall()

                    ball.x += ball.dx;
                    ball.y += ball.dy;

                    // Bounce off the edges
                    if (ball.x + ball.w > canvas.width || ball.x < 0) ball.dx *= -1;
                    if (ball.y + ball.w > canvas.height || ball.y < 0) ball.dy *= -1;

                    requestAnimationFrame(update)
                }
                
                update();
            };
        }
      }

    useEffect(() => {
        handleCanvasLoad(); // Call the function after the component mounts
      }, []);

  return (
    <div>
        <canvas
        id="canvas"
        width={width} // Set canvas width
        height={height} // Set canvas height
        style={{ border: '1px solid black' }} // Optional: Add a border for visibility
      ></canvas>
    </div>
  )
}

export default Ballbreaker
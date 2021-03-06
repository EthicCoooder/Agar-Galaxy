function draw() {

    //Reset the translation back to the default
    context.setTransform(1,0,0,1,0,0);
    
    // Clear the screen out so the old stuff is gone from the last frame
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // console.log(player.locX, player.locY);
 
    // Clamp the camera to the player

   const camX = - player.locX + canvas.width/2;
   const camY = - player.locY + canvas.height/2;
    
   
    // Translate allows us to move the canvas around
    context.translate(camX, camY);
    players.forEach((p) => {
      context.beginPath();
      context.fillStyle = p.color;
      // arg1 & arg2 = x & y of the center of the arc
      // arg3 = radius
      // arg4 = where to start on the circle in radians, 0 = 3:00
      // arg5 = where to stop in radians
      context.arc(p.locX, p.locY, p.radius, 0, Math.PI*2);
      // context.arc(200, 200, 10, 0, Math.PI*2);
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = 'rgb(0,255,0)';
      context.stroke();
    });
  
    // Draw all the players
  
    // Draw all the orbs
    orbs.forEach((orb) => {
      context.beginPath();
      context.fillStyle = orb.color;
      context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI*2);
      context.fill();
    });
  
    stars.forEach((star) => {
        drawStar(star.locX,star.locY,20,star.radius-10,star.radius,context)
    });
  

    requestAnimationFrame(draw);
  }


  canvas.addEventListener('mousemove',(event)=>{
    // console.log(event)
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        // console.log('Mouse is in the lower right quad');
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        // console.log('Mouse is in the lower left quad');
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
      // console.log('Mouse is in the upper left quad');
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        // console.log('Mouse is in the upper right quad');
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }
  
    player.xVector = xVector;
    player.yVector = yVector;
  });

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, ctx) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.fillStyle='skyblue';
    ctx.fill();

}


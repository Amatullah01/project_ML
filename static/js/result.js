$(document).ready(() => {
  let url = new URLSearchParams(window.location.search)
  let colors = url.get("colors")
  let image = url.get("image").replace("%20", " ")
  let themes = url.get("theme")

  $('#box').css('background-image', `url(${image})`);

  colors = colors.split(",")
  let dark = 0
  let light = 0

  colors.forEach(element => {
    let color;
    
    if(tinycolor(`#${element}`).getBrightness() > 127.5) {
      color = "black";
      dark++;
    }else { color = "white"; light++; }

    let width = Math.round(Math.floor(Math.random() * 200) + 50)
    let height = Math.round(Math.floor(Math.random() * 200) + 50)
    let temp = `<li><div style="border: 2px solid white;width: ${width}px;height: ${height}px;background-color: #${element};color: ${color};" class="color"><span>#${element.toUpperCase()}</span></div></li>`
    
    $("#colors").append(temp)
  })

  let bgThemes = (tinycolor(`#${colors[colors.length - 1].toUpperCase()}`).getBrightness() > 127.5) ? 'black' : 'white';
  
  $('#colours').css('background-color', (dark < light) ? 'rgba(0, 0, 0, .5)' : 'rgba(255, 255, 255, .5)');
  $("#counter").text("Result: " + colors.length + " colors")
  $("#bg").css('background-color', `#${colors[colors.length - 1].toUpperCase()}`)

  let texts = ""

  console.log(themes);

  switch (parseInt(themes)) {
    case 0:
      texts = "Pastel"
      break;
      
    case 1:
      texts = "Nature"
      break;
      
    case 2:
      texts = "Dark Matte"
      break;
      
    case 3:
      texts = "Pastel Light"
      break;
      
    case 4:
      texts = "Nature"
      break;
      
    case 5:    
      texts = "Sharp"
      break;
      
    default:  
      texts = (dark < light) ? 'Dark' : 'Light'
      break;
  }
  
  $("#theme").text("Theme: " + texts)

  // $("p").css('color', ``)
  $("h1").css('color', bgThemes)
  $('#bgImg').css('background-image', `url(${image})`)
})

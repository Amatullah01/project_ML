let selectFile = () => {
  $("#imageInput").click();
}

let colorGenerate = () => {
  $("#pageOne").css("display", "none");
  $("#pageThree").css("display", "block");

  $("#container").empty();
  let file = $("#imageInput").prop("files")[0];
  let colors = $('input[name="colors"]:checked').val();
  let form_data = new FormData();

  form_data.append("img", file);
  form_data.append("colors", colors);

  $.ajax({
    type: "POST",
    url: "/generate-pallete",
    data: form_data,
    contentType: false,
    processData: false,
    success: function (response) {
      let colors = response["colors"];
      colors = colors.join(",")

      window.location.href = "/result?colors=" + colors + "&image=" + response["image"] + "&theme=" + response["theme"]

      console.log(colors);
    },
  });
}

let dots = $("#dots");

let animate = (element, className) => {
  element.addClass(className);
  setTimeout(() => {
    element.removeClass(className);
    setTimeout(() => {
      animate(element, className);
    }, 500);
  }, 1000);
}

$(document).ready(() => {
  setTimeout(() => {
    $("#pageTwo").css("display", "none")
    $("#pageOne").css("display", "block")
  }, 2000)


  animate(dots, "dots--animate");
})

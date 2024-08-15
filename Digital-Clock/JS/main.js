let hour = document.getElementById("hour");
let minute = document.getElementById("min");
let second = document.getElementById("sec");
function update() {
  let date = new Date();
  if (date.getHours() < 10) {
    hour.textContent = `0${date.getHours()}`;
  } else {
    hour.textContent = date.getHours();
  }
  if (date.getMinutes() < 10) {
    minute.textContent = `0${date.getMinutes()}`;
  } else {
    minute.textContent = date.getMinutes();
  }
  if (date.getSeconds() < 10) {
    second.textContent = `0${date.getSeconds()}`;
  } else {
    second.textContent = date.getSeconds();
  }
}
update();
setInterval(update, 1000);

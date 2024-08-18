let hour = document.getElementById("hour");
let minute = document.getElementById("min");
let second = document.getElementById("sec");
let amOrPm = document.getElementById("am-or-pm");
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
  if (hour.textContent > 12) {
    hour.textContent -= 12;
    if (hour.textContent < 10) {
      hour.textContent = `0${hour.textContent}`;
    }
  }
  if (date.getHours() < 12) {
    amOrPm.textContent = "AM";
  } else {
    amOrPm.textContent = "PM";
  }
}
update();
setInterval(update, 1000);

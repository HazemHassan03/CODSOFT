let hour = document.getElementById("hour");
let minute = document.getElementById("min");
let second = document.getElementById("sec");
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let amOrPm = document.getElementById("am-or-pm");
let changeTimeFormat = document.getElementById("change");
let changeStyle = document.getElementById("style");
let notSeparators = document.querySelectorAll("[data-type]");
let notSeparatorsType = document.querySelectorAll("div::after");
let separators = document.querySelectorAll(".sep");
let check;
let style;
if (localStorage.getItem("Time Format")) {
  if (localStorage.getItem("Time Format") === "true") {
    check = true;
  } else {
    check = false;
  }
}
if (localStorage.getItem("Style")) {
  if (localStorage.getItem("Style") === "true") {
    style = true;
  } else {
    style = false;
  }
  change();
}
if (localStorage.getItem("Time Format") === "true") {
  changeTimeFormat.textContent = "24-hour Format";
}
function update() {
  let date = new Date();
  if (date.getDate() < 10) {
    day.textContent = `0${date.getDate()}`;
  } else {
    day.textContent = date.getDate();
  }
  if (date.getMonth() < 10) {
    month.textContent = `0${date.getMonth() + 1}`;
  } else {
    month.textContent = date.getMonth() + 1;
  }
  year.textContent = `${
    date.getFullYear().toString()[date.getFullYear().toString().length - 2]
  }${date.getFullYear().toString()[date.getFullYear().toString().length - 1]}`;
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
  if (check) {
    if (date.getHours() > 12) {
      hour.textContent -= 12;
      if (hour.textContent < 10) {
        hour.textContent = `0${hour.textContent}`;
      }
    }
    if (date.getHours() === 0) {
      hour.textContent = "12";
    }
    if (date.getHours() < 12) {
      amOrPm.textContent = "AM";
    } else {
      amOrPm.textContent = "PM";
    }
  } else {
    amOrPm.textContent = "";
  }
}
changeTimeFormat.addEventListener("click", () => {
  if (changeTimeFormat.textContent === "12-hour Format") {
    changeTimeFormat.textContent = "24-hour Format";
    check = true;
    localStorage.setItem("Time Format", check);
  } else {
    changeTimeFormat.textContent = "12-hour Format";
    check = false;
    localStorage.setItem("Time Format", check);
  }
});
function change() {
  if (style) {
    separators.forEach((sep) => {
      sep.style.cssText = `
      opacity: 1;
      `;
      document.querySelector(".date").style.cssText = `
      gap: 0;
      background-color: var(--color1);
      `;
      document.querySelector(".time").style.cssText = `
      gap: 0;
      background-color: var(--color1);
      `;
      notSeparators.forEach((e) => {
        e.style.cssText += `background: none;`;
      });
      document.documentElement.style.cssText = '--content: ""';
    });
    localStorage.setItem("Style", style);
  } else {
    separators.forEach((sep) => {
      sep.style.cssText = `
      opacity: 0;
      `;
      document.querySelector(".date").style.cssText = `
      gap: 5px;
      `;
      document.querySelector(".time").style.cssText = `
      gap: 5px;
      `;
      notSeparators.forEach((e) => {
        e.style.cssText += `background-color: var(--color1);`;
      });
      document.documentElement.style.cssText = "--content: attr(data-type)";
    });
    localStorage.setItem("Style", style);
  }
}
changeStyle.addEventListener("click", () => {
  if (style) {
    style = false;
  } else {
    style = true;
  }
  change();
});
update();
setInterval(update, 1000);

const date = new Date();

const renderCalendar = async () => {
  date.setDate(1);
  var year =  date.getFullYear();
  var month = date.getMonth() +1

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(),date.getMonth() + 1, 0 ).getDate();

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1,0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) 
      {
        days += `<div class="today" id = "${year +"-" + ('0'+ month).slice(-2) + "-"+ ('0'+i).slice(-2)}">${i}</div>`;
      } 
      else {
        days += `<div id = "${year +"-" + ('0'+ month).slice(-2) + "-" + ('0'+i).slice(-2)}">${i}</div>`;
      }
  }
  try {
    for (let j = 1; j <= nextDays; j++) 
    {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  } catch (error) {
    console.log(error)
}

}



async function prevMonthHandler(){
  try {
    document.querySelector(".prev").addEventListener("click", () => {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
    });
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener("load", () => {
  renderCalendar()
  nextMonthHandler()
  prevMonthHandler()
})


async function nextMonthHandler() {
  try {
    document.querySelector(".next").addEventListener("click", () => {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
    });
  } catch (error) {
    console.log(error)
  }
}







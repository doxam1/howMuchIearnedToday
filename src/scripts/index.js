import "../styles/style.css";

const submitBtn = document.querySelector(".submitBtn");

submitBtn.onclick = () => {
  const jobsAmount = document.querySelector("#jobsAmount");
  const hours = document.querySelector("#hours");
  let km = document.querySelector("#km");
  const outputDiv = document.querySelector(".outputDiv");
  let total = "";
  const vehicle = document.querySelector('[name="vehicle"]:checked');

  if (vehicle == null) {
    outputDiv.style.color = "red";
    outputDiv.textContent = "אנא בחר כלי רכב";
    setTimeout(() => {
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (jobsAmount.value == '' || Number.isNaN(parseInt(jobsAmount.value)) == true) {
    outputDiv.style.color = "red";
    outputDiv.textContent = " כמה משלוחים עשית? ";
    setTimeout(() => {
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (hours.value == '' || Number.isNaN(parseInt(hours.value)) == true) {
    outputDiv.style.color = "red";
    outputDiv.textContent = "כמה שעות עבדת?";
    setTimeout(() => {
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (km.value == '' || Number.isNaN(parseInt(km.value)) == true) {
    outputDiv.style.color = "red";
    outputDiv.textContent = 'כמה ק"מ נסעת?';
    setTimeout(() => {
      outputDiv.textContent = "";
    }, 1500);
    return;
  }


  if (vehicle.value == "bicycle") {
    km = km.value * 0.5;
  } else if (vehicle.value == "motorbike") {
    km = km.value * 1.5;
  }

  if (jobsAmount.value / hours.value >= 2) {
    total = +(20 * jobsAmount.value + km)
  } else if (jobsAmount.value / hours.value < 2) {
    total = +((32.3 * hours.value) + km)
  }

  outputDiv.textContent = `שכר המשמרת לפי הנתונים הנ"ל הינו: ${total.toFixed(2)} ש"ח`;
};


import "../styles/style.css";

const submitBtn = document.querySelector(".submitBtn");
const saturday = document.querySelector("#shabat");
const saturdayNight = document.querySelector("#saturdayNight");
const fieldset = document.querySelector("fieldset");

const ios = () => {
  if (typeof window === `undefined` || typeof navigator === `undefined`)
    return false;

  // eslint-disable-next-line no-undef
  return /iPhone|iPad|iPod/i.test(
    navigator.userAgent ||
      navigator.vendor ||
      (window.opera && opera.toString() === `[object Opera]`)
  );
};

saturday.onchange = () => {
  const shabesJobs = document.createElement("div");
  const shabesHours = document.createElement("div");
  if (saturday.checked == true) {
    shabesJobs.innerHTML = `
  <label for="shabesJobsAmount">  כמה משלוחים נעשו בשבת? </label>
  <input type="tel" id="shabesJobsAmount" name="shabesJobsAmount" placeholder='מ16:00 ועד מוצאי שבת'/>
  `;
    shabesJobs.classList.add("inputDiv", "shabesJobs");
    shabesHours.innerHTML = `
  <label for="shabesHours"> כמה שעות עבדת בשבת? </label>
  <input type="tel" id="shabesHours" name="shabesHours" placeholder='כניסת השבת ועד מוצאי שבת'/>
  `;
    shabesHours.classList.add("inputDiv", "shabesHours");
    fieldset.insertBefore(
      shabesHours,
      document.querySelector(".inputDiv.submitBtnDiv")
    );
    fieldset.insertBefore(
      shabesJobs,
      document.querySelector(".inputDiv.submitBtnDiv")
    );
    if (ios() == true) {
      const telInputs = document.querySelectorAll("input[type='tel']");
      telInputs.forEach((input) => {
        input.setAttribute("type", "number");
        input.setAttribute("inputmode", "decimel");
      });
      console.log(telInputs);
    }
  } else if (saturday.checked == false) {
    fieldset.removeChild(document.querySelector(".shabesHours"));
    fieldset.removeChild(document.querySelector(".shabesJobs"));
  }
};

saturdayNight.onchange = () => {
  const saturdayNightJobs = document.createElement("div");
  if (saturdayNight.checked == true) {
    saturdayNightJobs.classList.add("inputDiv", "saturdayNightJobs");
    saturdayNightJobs.innerHTML = `
    <label for="saturdayNightJobsAmount">  כמה משלוחים נעשו<b> בצאת</b> שבת? </label>
    <input type="tel" id="saturdayNightJobsAmount" name="saturdayNightJobsAmount" placeholder='צאת שבת(20:00 בקיץ) עד הסוף'/>
    `;
    fieldset.insertBefore(
      saturdayNightJobs,
      document.querySelector(".inputDiv.submitBtnDiv")
    );
    if (ios() == true) {
      const telInputs = document.querySelectorAll("input[type='tel']");
      telInputs.forEach((input) => {
        input.setAttribute("type", "number");
        input.setAttribute("inputmode", "decimel");
      });
      console.log(telInputs);
    }
  } else if (saturdayNight.checked == false) {
    fieldset.removeChild(document.querySelector(".saturdayNightJobs"));
  }
};

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
      outputDiv.style = "";
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (
    jobsAmount.value == "" ||
    Number.isNaN(parseInt(jobsAmount.value)) == true
  ) {
    outputDiv.style.color = "red";
    outputDiv.textContent = " כמה משלוחים עשית? ";
    setTimeout(() => {
      outputDiv.style = "";
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (hours.value == "" || Number.isNaN(parseInt(hours.value)) == true) {
    outputDiv.style.color = "red";
    outputDiv.textContent = "כמה שעות עבדת?";
    setTimeout(() => {
      outputDiv.style = "";
      outputDiv.textContent = "";
    }, 1500);
    return;
  }

  if (km.value == "" || Number.isNaN(parseInt(km.value)) == true) {
    outputDiv.style.color = "red";
    outputDiv.textContent = 'כמה ק"מ נסעת?';
    setTimeout(() => {
      outputDiv.style = "";
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
    // let shabesHoursMoneyWise = 0;
    let shabesJobsAmountMoneyWise = 0;
    let saturdayNightJobsMoneyWise = 0;
    if (saturday.checked == true) {
      let shabesHoursAmountTotal = document.querySelector("#shabesHours").value;
      if (
        shabesHoursAmountTotal == "" ||
        Number.isNaN(parseInt(shabesHoursAmountTotal)) == true ||
        parseInt(shabesHoursAmountTotal) > parseInt(hours.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent =
          "כמה שעות עבדת בשבת? - כניסת שבת ועד צאת שבת בלבד";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 1500);
        return;
      }
      // shabesHoursMoneyWise = shabesHoursAmountTotal * 16.15;

      let shabesJobsAmountTotal =
        document.querySelector("#shabesJobsAmount").value;
      if (
        shabesJobsAmountTotal == "" ||
        Number.isNaN(parseInt(shabesJobsAmountTotal)) == true ||
        parseInt(shabesJobsAmountTotal) > parseInt(jobsAmount.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent = "כמה משלוחים נעשו בשבת?";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 1500);
        return;
      }
      if (saturdayNight.checked == true && saturday.checked == true) {
        if (
          parseInt(shabesJobsAmountTotal) +
          parseInt(
            document.querySelector("#saturdayNightJobsAmount").value >
              parseInt(jobsAmount.value)
          )
        ) {
          outputDiv.style.color = "red";
          outputDiv.textContent =
            "כמות המשלוחים בשבת ומוצאי שבת גדולה מכמות המשלוחים הכללית, אנא בדוק שנית";
          setTimeout(() => {
            outputDiv.style = "";
            outputDiv.textContent = "";
          }, 2500);
          return;
        }
      }
      shabesJobsAmountMoneyWise = shabesJobsAmountTotal * 20;
    }
    if (saturdayNight.checked == true) {
      let saturdayNightJobsAmount = document.querySelector(
        "#saturdayNightJobsAmount"
      ).value;
      if (
        saturdayNightJobsAmount == "" ||
        Number.isNaN(parseInt(saturdayNightJobsAmount)) == true ||
        parseInt(saturdayNightJobsAmount) > parseInt(jobsAmount.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent = "כמה משלוחים נעשו במוצאי שבת?";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 2500);
        return;
      }
      if (saturdayNight.checked == true && saturday.checked == true) {
        if (
          parseInt(saturdayNightJobsAmount) +
            parseInt(document.querySelector("#shabesJobsAmount").value) >
          parseInt(jobsAmount.value)
        ) {
          outputDiv.style.color = "red";
          outputDiv.textContent =
            "כמות המשלוחים בשבת ומוצאי שבת גדולה מכמות המשלוחים הכללית, אנא בדוק שנית";
          setTimeout(() => {
            outputDiv.style = "";
            outputDiv.textContent = "";
          }, 1500);
          return;
        }
      }
      saturdayNightJobsMoneyWise = saturdayNightJobsAmount * 10;
    }
    total = +(
      20 * jobsAmount.value +
      km +
      shabesJobsAmountMoneyWise +
      saturdayNightJobsMoneyWise
    );
    if (
      saturday.checked == true &&
      document.querySelector("#shabesHours").value * 16.15 +
        hours.value * 32.3 >
        total - km
    ) {
      total = +(
        document.querySelector("#shabesHours").value * 16.15 +
        hours.value * 32.3 +
        km
      );
    }
  } else if (jobsAmount.value / hours.value < 2) {
    let shabesHoursMoneyWise = 0;
    if (saturdayNight.checked == true && saturday.checked == true) {
      if (
        parseInt(document.querySelector("#saturdayNightJobsAmount").value) +
          parseInt(document.querySelector("#shabesJobsAmount").value) >
        parseInt(jobsAmount.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent =
          "כמות המשלוחים בשבת ומוצאי שבת גדולה מכמות המשלוחים הכללית, אנא בדוק שנית";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 1500);
        return;
      }
    }
    if (saturday.checked == true) {
      let shabesJobsAmountTotal =
        document.querySelector("#shabesJobsAmount").value;
      if (
        shabesJobsAmountTotal == "" ||
        Number.isNaN(parseInt(shabesJobsAmountTotal)) == true ||
        parseInt(shabesJobsAmountTotal) > parseInt(jobsAmount.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent = "כמה משלוחים נעשו בשבת?";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 1500);
        return;
      }
      let shabesHoursAmountTotal = document.querySelector("#shabesHours").value;
      if (
        shabesHoursAmountTotal == "" ||
        Number.isNaN(parseInt(shabesHoursAmountTotal)) == true ||
        parseInt(shabesHoursAmountTotal) > parseInt(hours.value)
      ) {
        outputDiv.style.color = "red";
        outputDiv.textContent =
          "כמה שעות עבדת בשבת? - כניסת שבת ועד צאת שבת בלבד";
        setTimeout(() => {
          outputDiv.style = "";
          outputDiv.textContent = "";
        }, 1500);
        return;
      }
      shabesHoursMoneyWise = shabesHoursAmountTotal * 16.15;
    }
    total = +(32.3 * hours.value + km + shabesHoursMoneyWise);

    if (saturday.checked == true && saturdayNight.checked == false) {
      if (
        total - km <
        document.querySelector("#shabesJobsAmount").value * 20 +
          jobsAmount.value * 20
      ) {
        total =
          document.querySelector("#shabesJobsAmount").value * 40 +
          (jobsAmount.value -
            document.querySelector("#shabesJobsAmount").value) *
            20 +
          km;
      }
    } else if (saturday.checked == false && saturdayNight.checked == true) {
      if (
        total - km <
        document.querySelector("#saturdayNightJobsAmount").value * 10 +
          jobsAmount.value * 20
      ) {
        total =
          document.querySelector("#saturdayNightJobsAmount").value * 30 +
          (jobsAmount.value -
            document.querySelector("#saturdayNightJobsAmount").value) *
            20 +
          km;
      }
    } else if (saturday.checked == true && saturdayNight.checked == true) {
      if (
        total - km <
        document.querySelector("#shabesJobsAmount").value * 20 +
          document.querySelector("#saturdayNightJobsAmount").value * 10 +
          jobsAmount.value * 20
      ) {
        total =
          document.querySelector("#shabesJobsAmount").value * 40 +
          document.querySelector("#saturdayNightJobsAmount").value * 30 +
          (jobsAmount.value -
            document.querySelector("#shabesJobsAmount").value -
            document.querySelector("#saturdayNightJobsAmount").value) *
            20 +
          km;
      }
    }
  }
  outputDiv.style.border = "1px solid blue";
  outputDiv.style.color = "black";
  outputDiv.style.padding = "1rem";
  outputDiv.textContent = `שכר המשמרת לפי הנתונים הנ"ל הינו: \r\n ${total.toFixed(
    2
  )} ש"ח / ${(total / parseInt(hours.value)).toFixed(2)} לשעה`;
};

if (ios() == true) {
  const telInputs = document.querySelectorAll("input[type='tel']");
  telInputs.forEach((input) => {
    input.setAttribute("type", "number");
    input.setAttribute("inputmode", "decimel");
  });
}

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculate = document.getElementById("calculate");
const resultEl = document.getElementById("result");
const historyTable = document.getElementById("history-table");
const historyBody = document.getElementById("history-body");
const averageBmiEl = document.getElementById("average");
const clear = document.getElementById("clear");

let history = JSON.parse(localStorage.getItem("history")) || [];
let lastBmi;

calculate.addEventListener("click", calculateBmi);
clear.addEventListener("click", clearHistory);

renderHistory();

function calculateBmi() {
  const height = heightInput.value;
  const weight = weightInput.value;
  const bmi = (weight / (height / 100) ** 2).toFixed(2);

  if (lastBmi) {
    if (bmi > lastBmi) {
      resultEl.innerHTML = `Twoje BMI wzrosło i wynosi: ${bmi}`;
    } else if (bmi < lastBmi) {
      resultEl.innerHTML = `Twoje BMI spadło i wynosi: ${bmi}`;
    } else {
      resultEl.innerHTML = `Twoje BMI pozostaje bez zmian i wynosi: ${bmi}`;
    }
  } else {
    resultEl.innerHTML = `Twoje BMI wynosi: ${bmi}`;
  }

  lastBmi = bmi;

  if (weight < 40 || weight > 200) {
    alert("Wartość jest niepoprawna. Wprowadź wartość z zakresu 40-200.");
    return;
  }
  if (height < 120 || height > 240) {
    alert("Wartość jest niepoprawna. Wprowadź wartość z zakresu 120-240.");
    return;
  }
  
  // dodanie pomiaru do historii
  const comparision = {
    height: height,
    weight: weight,
    bmi: bmi,
    date: new Date()
  };

  history.unshift(comparision);
  localStorage.setItem("history", JSON.stringify(history)); 
 
  
  renderHistory(); 

  heightInput.value = "";
  weightInput.value = "";
}

// zapis historii do localstorage

function renderHistory() {
  historyBody.innerHTML = "";
  let totalBmi = 0;

  for (const comparision of history) {
    const date = comparision.date.toLocaleDateString();
    const time = comparision.date.toLocaleTimeString();
    totalBmi += comparision.bmi;

    historyBody.innerHTML += `
      <tr>
        <td>${comparision.height} cm</td>
        <td>${comparision.weight} kg</td>
        <td>${comparision.bmi}</td>
        <td>${date} ${time}</td>
      </tr>
    `;
  }

}
// nie działa

// let average = (totalBmi / history.length).toFixed(2);  
// document.getElementById("average").innerHTML = "Średnie BMI: " + average;

// wyrzuca błąd NaN po drugim rekordzie

  if (history.length > 0) {
    const average = (totalBmi / history.length).toFixed(2);
    averageBmiEl.innerHTML = `Średnie BMI: ${average}`;
  } else {
    averageBmiEl.innerHTML = "";
  }

function clearHistory() {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
}
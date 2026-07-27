async function generatePlan() {
  const subject = document.getElementById('subject').value;
  const goal = document.getElementById('goal').value;
  const days = document.getElementById('days').value;
  const resultDiv = document.getElementById('result');

  if(!subject ||!goal ||!days) { alert("3no fields bharna zaroori hai!"); return; }

  resultDiv.innerText = "⏳ AI plan bana raha hai... 10 sec ruko";
  resultDiv.style.display = 'block';

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ subject, goal, days })
    });

    const data = await res.json();
    resultDiv.innerText = data.plan;
  } catch(e) {
    resultDiv.innerText = "Error: " + e.message + "\nKey check karo";
  }
}

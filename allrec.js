const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://prison-backend-production.up.railway.app";

async function fetchAllRecords() {
    console.log('Fetching all records...');

    try {
        const response = await fetch(`${BASE_URL}/allrecord`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        // Get the table body elements
        const prisonerTableBody = document.getElementById("prisonerTable").getElementsByTagName('tbody')[0];
        const staffTableBody = document.getElementById("staffTable").getElementsByTagName('tbody')[0];
        const crimeTableBody = document.getElementById("crimeTable").getElementsByTagName('tbody')[0];
        const cellTableBody = document.getElementById("cellTable").getElementsByTagName('tbody')[0];
        const rehabTableBody = document.getElementById("rehabTable").getElementsByTagName('tbody')[0];
        const paroleTableBody = document.getElementById("paroleTable").getElementsByTagName('tbody')[0];
        const visitTableBody = document.getElementById("visitTable").getElementsByTagName('tbody')[0];

        // Clear previous rows
        prisonerTableBody.innerHTML = '';
        staffTableBody.innerHTML = '';
        crimeTableBody.innerHTML = '';
        cellTableBody.innerHTML = '';
        rehabTableBody.innerHTML = '';
        paroleTableBody.innerHTML = '';
        visitTableBody.innerHTML = '';

        // Populate prisoner records
        data.prisoners.forEach(prisoner => {
            const row = prisonerTableBody.insertRow();
            row.insertCell(0).textContent = prisoner.Prisoner_ID;
            row.insertCell(1).textContent = prisoner.Name;
            row.insertCell(2).textContent = prisoner.DOB;
            row.insertCell(3).textContent = prisoner.Gender;
            row.insertCell(4).textContent = prisoner.Address;
            row.insertCell(5).textContent = prisoner.Sentence_Duration;
            row.insertCell(6).textContent = prisoner.Supervisor_ID;
        });

        // Populate staff records
        data.staff.forEach(staff => {
            const row = staffTableBody.insertRow();
            row.insertCell(0).textContent = staff.Staff_ID;
            row.insertCell(1).textContent = staff.Name;
            row.insertCell(2).textContent = staff.Contact_No;
            row.insertCell(3).textContent = staff.Hire_Date;
            row.insertCell(4).textContent = staff.Gender;
            row.insertCell(5).textContent = staff.Salary;
            row.insertCell(6).textContent = staff.Address;
        });

        // Populate crime records
        data.crimes.forEach(crime => {
            const row = crimeTableBody.insertRow();
            row.insertCell(0).textContent = crime.Prisoner_ID;
            row.insertCell(1).textContent = crime.Crime_ID;
            row.insertCell(2).textContent = crime.Crime_Type;
            row.insertCell(3).textContent = crime.Description;
            row.insertCell(4).textContent = crime.Date_Committed;
        });

        // Populate cell assignments
        data.cells.forEach(cell => {
            const row = cellTableBody.insertRow();
            row.insertCell(0).textContent = cell.Prisoner_ID;
            row.insertCell(1).textContent = cell.Cell_ID;
            row.insertCell(2).textContent = cell.Block_ID;
            row.insertCell(3).textContent = cell.Capacity;
        });

        // Populate rehabilitation programs
        data.rehab.forEach(program => {
            const row = rehabTableBody.insertRow();
            row.insertCell(0).textContent = program.Prisoner_ID;
            row.insertCell(1).textContent = program.Rehab_ID;
            row.insertCell(2).textContent = program.Program_Name;
            row.insertCell(3).textContent = program.Start_Date;
            row.insertCell(4).textContent = program.End_Date;
        });

        // Populate parole requests
        data.parole.forEach(parole => {
            const row = paroleTableBody.insertRow();
            row.insertCell(0).textContent = parole.request_id;
            row.insertCell(1).textContent = parole.prisoner_id;
            row.insertCell(2).textContent = parole.details;
            row.insertCell(3).textContent = parole.approve;
            row.insertCell(4).textContent = parole.hearing_date;
        });

        // Populate visit records
        data.visits.forEach(visit => {
            const row = visitTableBody.insertRow();
            row.insertCell(0).textContent = visit.Prisoner_ID;
            row.insertCell(1).textContent = visit.Vis_ID;
            row.insertCell(2).textContent = visit.Visitor_Name;
            row.insertCell(3).textContent = visit.Relationship;
            row.insertCell(4).textContent = visit.Contact_No;
            row.insertCell(5).textContent = visit.Date;
            row.insertCell(6).textContent = visit.Status;
        });

    } catch (error) {
        console.error('Error fetching records:', error);
        alert('Failed to fetch records.');
    }
}

// Fetch all records when the page is loaded
document.addEventListener('DOMContentLoaded', fetchAllRecords);

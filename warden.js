// Function to search prisoners by ID
async function searchPrisoner() {
    const id = document.getElementById("searchInput").value.trim();
    
    if (id === "") {
        alert("Please enter a Prisoner ID to search.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/prisoners/search?id=${id}`);
        const data = await response.json();

        if (response.ok) {
            displayResults(data, "searchResults", "searchTableContainer");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error searching prisoner:", error);
        alert("Failed to fetch search results");
    }
}

// Function to fetch all prisoner records
async function fetchAllRecords() {
    try {
        const response = await fetch("http://localhost:5000/prisoners/all");
        const data = await response.json();

        if (response.ok) {
            displayResults(data, "allRecordsSection", "allRecordsTableContainer");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error fetching all records:", error);
        alert("Failed to fetch all prisoner records");
    }
}

// Function to fetch all prisoners for enrollment
async function showEnrollInmate() {
    try {
        const response = await fetch("http://localhost:5000/prisoners/all");
        const data = await response.json();

        if (response.ok) {
            displayResults(data, "enrollSection", "enrollTableContainer");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error fetching prisoners for enrollment:", error);
        alert("Failed to fetch enrollment data");
    }
}

// Function to display prisoner data in a table with toggle feature
function displayResults(records, sectionId, containerId) {
    const section = document.getElementById(sectionId);
    const tableContainer = document.getElementById(containerId);

    // Toggle visibility: If already visible, hide it; otherwise, show it
    if (section.style.display === "block") {
        section.style.display = "none";
        return;
    }

    // Hide all other sections before showing the new one
    hideAllSections();
    
    // Show section and clear old results
    section.style.display = "block";
    tableContainer.innerHTML = "";    

    if (records.length === 0) {
        tableContainer.innerHTML = "<p>No records found.</p>";
        return;
    }

    let tableHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Prisoner ID</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Sentence Duration</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach(prisoner => {
        tableHTML += `
            <tr>
                <td>${prisoner.Prisoner_ID}</td>
                <td>${prisoner.Name}</td>
                <td>${prisoner.DOB}</td>
                <td>${prisoner.Gender}</td>
                <td>${prisoner.Address}</td>
                <td>${prisoner.Sentence_Duration}</td>
            </tr>
        `;
    });

    tableHTML += "</tbody></table>";
    tableContainer.innerHTML = tableHTML;
}

// Function to hide all sections
function hideAllSections() {
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("allRecordsSection").style.display = "none";
    document.getElementById("enrollSection").style.display = "none";
}

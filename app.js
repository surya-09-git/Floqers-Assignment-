window.fetch("year_data.json")
    .then((response) => response.json())
    .then((res) => {
        let years = [];
        let totalJobs = [];
        let avgSalaries = [];
        
        let tablebody = document.querySelector(".tablebody");

        res.forEach((ele) => {
            years.push(ele.Year);
            totalJobs.push(ele.total_jobs);
            avgSalaries.push(ele.average_salary);

            // Create main table rows
            let row = `<tr data-year="${ele.Year}">
                <td>${ele.Year}</td>
                <td>${ele.total_jobs}</td>
                <td>${ele.average_salary}</td>
            </tr>`;
            tablebody.innerHTML += row;
        });

        // Create the line graph using Chart.js
        let ctx = document.getElementById('lineGraph').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Total Jobs',
                    data: totalJobs,
                    borderColor: 'blue',
                    fill: false
                }, {
                    label: 'Average Salary (USD)',
                    data: avgSalaries,
                    borderColor: 'green',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Add click event to each row
        document.querySelectorAll('tr[data-year]').forEach(row => {
            row.addEventListener('click', () => {
                let selectedYear = row.getAttribute('data-year');
                displayJobDetails(selectedYear, res);
            });
        });
    });

    // Function to display job titles and counts for a specific year
    function displayJobDetails(selectedYear, data) {
        const jobDetailsTable = document.getElementById("jobDetailsTable");
        const jobDetailsBody = document.querySelector(".jobDetailsBody");
        jobDetailsBody.innerHTML = ''; // Clear the previous data

        const yearData = data.find(item => item.Year === selectedYear);
        if (yearData) {
            for (let [jobTitle, count] of Object.entries(yearData.job_titles)) {
                let row = `<tr>
                    <td>${jobTitle}</td>
                    <td>${count}</td>
                </tr>`;
                jobDetailsBody.innerHTML += row;
            }
            jobDetailsTable.style.display = "table"; // Show the table
        }
    }
import csv
import json

file_path = r"salaries.csv"
json_file_path = r"year_data.json"

year_data = {}
output_data = []

with open(file_path, 'r') as f:
    reader = csv.DictReader(f)
    
    for row in reader:
        year = row['work_year']
        salary_usd = int(row['salary_in_usd'])
        job_title = row['job_title']
        
        if year not in year_data:
            year_data[year] = {
                'total_jobs': 0,
                'total_salary': 0,
                'job_titles': {}
            }
        
        year_data[year]['total_jobs'] += 1
        year_data[year]['total_salary'] += salary_usd
        
        if job_title in year_data[year]['job_titles']:
            year_data[year]['job_titles'][job_title] += 1
        else:
            year_data[year]['job_titles'][job_title] = 1

# Prepare the output data
for year, data in year_data.items():
    average_salary = data['total_salary'] / data['total_jobs']
    output_data.append({
        'Year': year,
        'total_jobs': data['total_jobs'],
        'average_salary': f"{average_salary:.2f}",
        'job_titles': data['job_titles']  # Add job titles for each year
    })

with open(json_file_path, 'w') as json_file:
    json.dump(output_data, json_file, indent=2)

# print(output_data)

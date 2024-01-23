const ViewAllEmployees = `
SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name,
    role.title,
    role.salary,
    department.name as department,
    employee.manager_id
FROM employee
INNER JOIN (
    role INNER JOIN department ON role.department_id = department.id
)
    ON employee.role_id = role.id
ORDER BY employee.id;
`;

const ViewAllDepartments = `
SELECT * FROM department ORDER BY department.id;
`

document.addEventListener('DOMContentLoaded', () => {
  const studentTableBody = document.querySelector('#student-table tbody');
  const form = document.getElementById('student-form');
  const ApiButton = document.getElementById('show-api-data');

  
  function createStudentRow(student) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.id}</td>
      <td>${student.level}</td>
      <td>
        <button class="update">Update</button>
        <button class="delete">Delete</button>
      </td>
    `;
  const updateButton = tr.querySelector('.update');
  const deleteButton = tr.querySelector('.delete');

  updateButton.style.backgroundColor = '#007bff'; 
  updateButton.style.color = 'white';

  deleteButton.style.backgroundColor = '#dc3545'; 
  deleteButton.style.color = 'white';
    
    tr.querySelector('.update').addEventListener('click', () => {
      document.getElementById('name').value = student.name;
      document.getElementById('email').value = student.email;
      document.getElementById('studentId').value = student.id;
      document.getElementById('level').value = student.level;
      studentTableBody.removeChild(tr);
    });

    
    tr.querySelector('.delete').addEventListener('click', () => {
      studentTableBody.removeChild(tr);
    });

    return tr;
  }

  
  form.addEventListener('submit', event => {
    event.preventDefault();

    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const level = document.getElementById('level').value.trim();

    
    if (!name || !email || !studentId || !level) {
      alert('Please fill in all fields.');
      return;
    }

    
    const newStudent = {
      name,
      email,
      id: studentId,
      level
    };

  
    const newRow = createStudentRow(newStudent);
    studentTableBody.appendChild(newRow);

    
    form.reset();
  });

  
  ApiButton.addEventListener('click', () => {

    studentTableBody.innerHTML = '';

    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data.forEach(user => {
          const student = {
            name: user.name,
            email: user.email,
            id: user.id,
            level: 'N/A' 
          };
          const row = createStudentRow(student);
          studentTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
});


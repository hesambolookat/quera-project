const dateTimeDisplay = document.getElementById('date-time');

function updateDateTime() {
    const now = new Date();
    dateTimeDisplay.textContent = now.toLocaleString('fa-IR');
}

setInterval(updateDateTime, 1000);
updateDateTime();

function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let main = document.getElementById("main");
    let openBtn = document.getElementById("openBtn");
    if (sidebar.style.right === "-250px") {
        sidebar.style.right = "0";
    } else {
        sidebar.style.right = "-250px";
    }
}

document.getElementById("tagButton").addEventListener("click", function() {
    var tagMenu = document.getElementById("tagMenu");
    if (tagMenu.style.display === "none") {
        tagMenu.style.display = "block";
    } else {
        tagMenu.style.display = "none";
    }
});

document.getElementById("add-task-button").addEventListener("click", function() {
    document.getElementById("popUpForm").classList.remove("hidden");
});

document.getElementById("closeFormBtn").addEventListener("click", function() {
    document.getElementById("popUpForm").classList.add("hidden");
});

let selectedImportance = '';

document.querySelectorAll('.importanceButton').forEach(button => {
    button.addEventListener('click', function() {
        selectedImportance = this.getAttribute('data-importance');
        document.querySelectorAll('.importanceButton').forEach(btn => btn.style.backgroundColor = '');
        this.style.backgroundColor = 'lightgray';
    });
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    const toDoTitleInput = document.getElementById('toDoTitleInput');
    const toDoDescriptionInput = document.getElementById('toDoDescriptionInput');
    const toDoTitle = toDoTitleInput.value;
    const toDoDescription = toDoDescriptionInput.value;

    if (toDoTitle === '' || toDoDescription === '') {
        alert('لطفاً عنوان و توضیحات وظیفه را وارد کنید.');
        return;
    }

    if (selectedImportance === '') {
        alert('لطفاً سطح اهمیت وظیفه را انتخاب کنید.');
        return;
    }

    const newListItem = createTaskItem(toDoTitle, toDoDescription, selectedImportance, false);
    document.getElementById('toDoList').appendChild(newListItem);

    toDoTitleInput.value = '';
    toDoDescriptionInput.value = '';
    selectedImportance = '';
    document.querySelectorAll('.importanceButton').forEach(btn => btn.style.backgroundColor = '');

    saveTasks();
});

function createTaskItem(title, description, importance, completed) {
    const newListItem = document.createElement('li');
    newListItem.className = `flex border-2 w-full rounded-md p-2 ${importance}`;
    newListItem.dataset.title = title;
    newListItem.dataset.description = description;
    newListItem.dataset.importance = importance;
    newListItem.dataset.completed = completed;

    newListItem.innerHTML = `
        <div class="flex flex-col p-2 w-full relative" id="taskItem">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <input type="checkbox" class="completionCheckbox" ${completed ? 'checked' : ''} />
                    <h2 id="taskTitle">${title}</h2>
                    <span class="${importance}-bg px-2 rounded-md">${importance === 'low' ? 'پایین' : (importance === 'medium' ? 'متوسط' : 'بالا')}</span>
                </div>
                <button class="toggleOptionsButton">
                    <img src="./asset/Frame 1000005552.png" class="w-1 h-4" alt="option" />
                </button>
                <div class="actions hidden absolute left-6 top-1">
                    <div class="flex border rounded-lg gap-2 p-2">
                        <span><img src="./asset/trash.png" class="removeButton" alt="trash" /></span>
                        <span><img class="editButton" src="./asset/tabler_edit.png" alt="edit" /></span>
                    </div>
                </div>
            </div>
            <p id="takDesc">${description}</p> 
        </div>
    `;newListItem.querySelector('.completionCheckbox').addEventListener('change', function() {
      const completedList = document.getElementById('completedList');
      const toDoList = document.getElementById('toDoList');
      const completedCount = document.getElementById('completedCount');

      if (this.checked) {
          newListItem.classList.add('completed');
          completedList.appendChild(newListItem);
          newListItem.querySelector('#taskTitle').style.textDecoration = 'line-through';
          newListItem.querySelector('#takDesc').style.textDecoration = 'line-through';

          newListItem.querySelector('.editButton').remove();
          this.disabled = true;
      } else {
          newListItem.classList.remove('completed');
          toDoList.appendChild(newListItem);
      }

      newListItem.dataset.completed = this.checked;
      completedCount.textContent =` تعداد تسک‌های انجام شده: ${completedList.children.length}`;

      saveTasks();
  });

  newListItem.querySelector('.editButton').addEventListener('click', function() {
      const textDiv = newListItem.querySelector('#taskItem');
      const currentTitle = textDiv.querySelector('#taskTitle').textContent;
      const currentDescription = textDiv.querySelector('#takDesc').textContent;

      document.getElementById('editFormContainer').classList.remove('hidden');
      document.getElementById('editTitleInput').value = currentTitle;
      document.getElementById('editDescriptionInput').value = currentDescription;

      document.getElementById('saveEditButton').onclick = function() {
          const newTitle = document.getElementById('editTitleInput').value;
          const newDescription = document.getElementById('editDescriptionInput').value;

          if (newTitle !== '' && newDescription !== '') {
              textDiv.querySelector('#taskTitle').textContent = newTitle;
              textDiv.querySelector('#takDesc').textContent = newDescription;

              newListItem.dataset.title = newTitle;
              newListItem.dataset.description = newDescription;

              document.getElementById('editFormContainer').classList.add('hidden');

              saveTasks();
          }
      };

      document.getElementById('cancelEditButton').onclick = function() {
          document.getElementById('editFormContainer').classList.add('hidden');
      };
  });

  newListItem.querySelector('.removeButton').addEventListener('click', function() {
      newListItem.remove();
      const completedCount = document.getElementById('completedCount');
      const completedList = document.getElementById('completedList');
      completedCount.textContent = `تعداد تسک‌های انجام شده: ${completedList.children.length}`;
      saveTasks();
  });

  newListItem.querySelector('.toggleOptionsButton').addEventListener('click', function() {
      const actionsDiv = newListItem.querySelector('.actions');
      actionsDiv.classList.toggle('hidden');
  });

  return newListItem;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#toDoList li, #completedList li').forEach(taskItem => {
      tasks.push({
          title: taskItem.dataset.title,
          description: taskItem.dataset.description,
          importance: taskItem.dataset.importance,
          completed: taskItem.dataset.completed === 'true'
      });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
      const newListItem = createTaskItem(task.title, task.description, task.importance, task.completed);
      if (task.completed) {
          document.getElementById('completedList').appendChild(newListItem);
      } else {
          document.getElementById('toDoList').appendChild(newListItem);
      }
  });

  const completedCount = document.getElementById('completedCount');
  const completedList = document.getElementById('completedList');
  completedCount.textContent = `تعداد تسک‌های انجام شده: ${completedList.children.length}`;
}

function setLightMode() {
  document.documentElement.classList.remove('dark');
  document.getElementById('container').classList.remove('bg-black', 'text-white');
  document.getElementById('container').classList.add('bg-white', 'text-black');
  localStorage.setItem('theme', 'light');
}

function setDarkMode() {
  document.documentElement.classList.add('dark');
  document.getElementById('container').classList.remove('bg-white', 'text-black');
  document.getElementById('container').classList.add('bg-black', 'text-white');
  localStorage.setItem('theme', 'dark');
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
      setDarkMode();
  } else {
      setLightMode();
  }
}

applyStoredTheme();
loadTasks();
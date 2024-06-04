function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let main = document.getElementById("main");
    let openBtn=document.getElementById("openBtn")
    if (sidebar.style.right === "-250px") {
        sidebar.style.right = "0";        
    } else {
        sidebar.style.right = "-250px";
    }
}
document.getElementById("addTask").addEventListener("click", function() {
    document.getElementById("popUpForm").classList.remove("hidden");
});

document.getElementById("closeFormBtn").addEventListener("click", function() {
    document.getElementById("popUpForm").classList.add("hidden");
});

// submit of form
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

    const newListItem = document.createElement('li');
    newListItem.className = selectedImportance;
    newListItem.innerHTML = `
        <div dir="rtl" class="flex flex-col p-2 w-full relative">
            <div class="flex justify-between items-center">
                <div class="flex gap-2">
                    <input type="checkbox" class="completionCheckbox" />
                    <strong>${toDoTitle}</strong>
                    <p>${toDoDescription}</p> 
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
        </div>
    `;

    newListItem.querySelector('.completionCheckbox').addEventListener('change', function() {
        const completedList = document.getElementById('completedList');
        const toDoList = document.getElementById('toDoList');
        const completedCount = document.getElementById('completedCount');

        if (this.checked) {
            newListItem.classList.add('completed');
            completedList.appendChild(newListItem);
            newListItem.querySelector('strong').style.textDecoration = 'line-through';
            newListItem.querySelector('p').style.textDecoration = 'line-through';

            // حذف دکمه ویرایش و جلوگیری از برگشت تسک
            newListItem.querySelector('.editButton').remove();
            this.disabled = true;
        } else {
            newListItem.classList.remove('completed');
            toDoList.appendChild(newListItem);
        }

        // به‌روزرسانی تعداد تسک‌های انجام شده
        completedCount.textContent = `تعداد تسک‌های انجام شده: ${completedList.children.length}`;
    });

    newListItem.querySelector('.editButton').addEventListener('click', function() {
        const textDiv = newListItem.querySelector('.flex.gap-2');
        const currentTitle = textDiv.querySelector('strong').textContent;
        const currentDescription = textDiv.querySelector('p').textContent;

        // نمایش فرم ویرایش
        document.getElementById('editFormContainer').classList.remove('hidden');
        document.getElementById('editTitleInput').value = currentTitle;
        document.getElementById('editDescriptionInput').value = currentDescription;

        // ذخیره تغییرات
        document.getElementById('saveEditButton').onclick = function() {
            const newTitle = document.getElementById('editTitleInput').value;
            const newDescription = document.getElementById('editDescriptionInput').value;

            if (newTitle !== '' &&newDescription !== '') {
                textDiv.querySelector('strong').textContent = newTitle;
                textDiv.querySelector('p').textContent = newDescription;
                document.getElementById('editFormContainer').classList.add('hidden');
            }
        };

        // انصراف از ویرایش
        document.getElementById('cancelEditButton').onclick = function() {
            document.getElementById('editFormContainer').classList.add('hidden');
        };
    });

    newListItem.querySelector('.removeButton').addEventListener('click', function() {
        newListItem.remove();

        // به‌روزرسانی تعداد تسک‌های انجام شده
        const completedCount = document.getElementById('completedCount');
        const completedList = document.getElementById('completedList');
        completedCount.textContent = `تعداد تسک‌های انجام شده: ${completedList.children.length}`;
    });

    newListItem.querySelector('.toggleOptionsButton').addEventListener('click', function() {
        const actionsDiv = newListItem.querySelector('.actions');
        actionsDiv.classList.toggle('hidden');
    });

    document.getElementById('toDoList').appendChild(newListItem);

    // پاک کردن مقادیر ورودی فرم و بازنشانی اهمیت
    toDoTitleInput.value = '';
    toDoDescriptionInput.value = '';
    selectedImportance = '';
    document.querySelectorAll('.importanceButton').forEach(btn => btn.style.backgroundColor = '');
});


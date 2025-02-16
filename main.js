// 1. Получаем все строки таблицы с классом 'user-row' (как и раньше)
const userRows = document.querySelectorAll('.user-row');

// 2. Создаем массив users (как и раньше)
const users = [];

// 3. Перебираем все строки таблицы и заполняем массив users
//  (как и раньше)
userRows.forEach(row => {
  const userId = parseInt(row.dataset.id);
  const userName = row.dataset.name;
  const userRating = parseInt(row.dataset.rating);

  const user = {
    id: userId,
    name: userName,
    rating: userRating
  };

  users.push(user);
});

// 4. Получаем элемент select для сортировки
const sortSelect = document.getElementById('sort');

// 5. Функция для сортировки и отображения пользователей
function sortAndDisplayUsers(sortBy) {
  // Создаем копию массива users, чтобы не изменять исходный массив
  const sortedUsers = [...users];

  if (sortBy === 'rating') {
    sortedUsers.sort((a, b) => b.rating - a.rating); // Сортировка
    //  по убыванию рейтинга
  } else if (sortBy === 'name') {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name)); // Сортировка
    //  по имени
  }

  displayUsers(sortedUsers); // Вызываем функцию отображения с
  //  отсортированным списком
}

// 6. Функция для отображения пользователей в таблице (улучшенная)
function displayUsers(userList) {
  const scoreboard = document.getElementById('scoreboard').getElementsByTagName('tbody')[0];
  scoreboard.innerHTML = ''; // Очищаем таблицу перед заполнением

  userList.forEach((user, index) => {
    const row = scoreboard.insertRow();
    row.insertCell().textContent = index + 1; // Номер в списке
    row.insertCell().textContent = user.name;  // Имя
    row.insertCell().textContent = user.rating; // Рейтинг
    // Вставляем ссылку на профиль пользователя.  Обратите внимание на кавычки!
    row.insertCell().innerHTML ="Профиль" ;
  });
}

// 7. Добавляем обработчик события change на элемент select
sortSelect.addEventListener('change', (event) => {
  const selectedValue = event.target.value; // Получаем выбранное
  //  значение (rating или name)
  sortAndDisplayUsers(selectedValue); // Вызываем функцию сортировки
  //  и отображения
});

// 8. Инициализация: отображаем список пользователей по умолчанию
//  (например, по рейтингу) при загрузке страницы
sortAndDisplayUsers('rating');
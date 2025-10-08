// Основной скрипт для Квеста Верстальщика
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    initQuest();
    
    // Обработчики событий
    setupEventListeners();
    
    // Запуск анимаций
    startAnimations();
});

function initQuest() {
    console.log('Квест Верстальщика инициализирован!');
    
    // Загрузка прогресса из localStorage (если есть)
    loadProgress();
    
    // Показ приветственного сообщения
    showWelcomeMessage();
}

function setupEventListeners() {
    // Обработчик для кнопки начала квеста
    const startButton = document.getElementById('startQuest');
    if (startButton) {
        startButton.addEventListener('click', startQuest);
    }
    
    // Обработчики для карточек уровней
    const levelItems = document.querySelectorAll('.level-item');
    levelItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectLevel(index + 1);
        });
    });
    
    // Обработчики для карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            startProject(index);
        });
    });
}

function startAnimations() {
    // Анимация прогресс-бара
    animateProgressBar();
    
    // Добавление анимаций появления элементов
    const animatedElements = document.querySelectorAll('.level-item, .project-card, .magic-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    // Имитация прогресса обучения
    setTimeout(() => {
        progressFill.style.width = '50%';
        progressFill.textContent = '50%';
        updateStats(2, 3, 2, 4); // Обновляем статистику
    }, 2000);
    
    // Дальнейшая анимация прогресса
    setTimeout(() => {
        progressFill.style.width = '75%';
        progressFill.textContent = '75%';
        updateStats(3, 4, 3, 6);
    }, 4000);
}

function showWelcomeMessage() {
    const welcomeMessages = [
        "Добро пожаловать в мир Вебландии!",
        "Готовы стать магом-верстальщиком?",
        "Ваше приключение начинается сейчас!"
    ];
    
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    // Создаем и показываем всплывающее сообщение
    const welcomeElement = document.createElement('div');
    welcomeElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(58, 213, 159, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
    `;
    welcomeElement.textContent = randomMessage;
    
    document.body.appendChild(welcomeElement);
    
    // Анимация появления
    setTimeout(() => {
        welcomeElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        welcomeElement.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(welcomeElement);
        }, 500);
    }, 3000);
}

function startQuest() {
    // Эффект для кнопки начала
    const button = document.getElementById('startQuest');
    button.classList.add('pulse');
    
    // Показ сообщения о начале квеста
    alert('Квест начинается! Первый уровень: Основы HTML. Создайте свою первую веб-страницу!');
    
    // Сохранение начала квеста
    saveProgress('questStarted', true);
    
    // Убираем анимацию через 2 секунды
    setTimeout(() => {
        button.classList.remove('pulse');
    }, 2000);
}

function selectLevel(levelNumber) {
    const levelNames = [
        "Основы HTML",
        "Введение в CSS", 
        "Работа с макетом",
        "Адаптивный дизайн",
        "Продвинутые техники"
    ];
    
    const levelName = levelNames[levelNumber - 1] || `Уровень ${levelNumber}`;
    
    // Эффект выделения выбранного уровня
    const levelItems = document.querySelectorAll('.level-item');
    levelItems.forEach(item => item.style.background = 'rgba(255, 255, 255, 0.1)');
    levelItems[levelNumber - 1].style.background = 'rgba(58, 213, 159, 0.3)';
    
    // Показ информации об уровне
    console.log(`Выбран уровень: ${levelName}`);
    
    // Здесь можно добавить переход на страницу уровня
    // window.location.href = `level-${levelNumber}.html`;
}

function startProject(projectIndex) {
    const projectNames = [
        "Личная визитка",
        "Галерея изображений",
        "Адаптивный лендинг", 
        "Интерактивный сайт"
    ];
    
    const projectName = projectNames[projectIndex] || `Проект ${projectIndex + 1}`;
    
    // Эффект для карточки проекта
    const projectCard = document.querySelectorAll('.project-card')[projectIndex];
    projectCard.style.animation = 'pulse 0.5s';
    
    setTimeout(() => {
        projectCard.style.animation = '';
    }, 500);
    
    // Показ сообщения о начале проекта
    alert(`Начинаем проект: ${projectName}! Приготовьтесь к битве с этим боссом!`);
    
    // Сохранение прогресса проекта
    saveProgress(`project_${projectIndex}`, 'started');
}

function updateStats(topics, levels, bosses, achievements) {
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 4) {
        statValues[0].textContent = topics;
        statValues[1].textContent = levels;
        statValues[2].textContent = bosses;
        statValues[3].textContent = achievements;
    }
}

function saveProgress(key, value) {
    // Сохранение в localStorage
    try {
        localStorage.setItem(`quest_${key}`, JSON.stringify(value));
    } catch (e) {
        console.log('Не удалось сохранить прогресс:', e);
    }
}

function loadProgress() {
    // Загрузка из localStorage
    try {
        const questStarted = localStorage.getItem('quest_started');
        if (questStarted) {
            console.log('Продолжаем предыдущий квест...');
        }
    } catch (e) {
        console.log('Не удалось загрузить прогресс:', e);
    }
}

// Дополнительные утилиты
function getRandomColor() {
    const colors = ['#3ad59f', '#f8ff00', '#e34c26', '#2965f1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Экспорт функций для использования в других модулях (если нужно)
window.QuestGame = {
    startQuest,
    selectLevel,
    startProject,
    updateStats
};

// Основной скрипт игры "Квест Верстальщика"

class QuestGame {
    constructor() {
        this.player = {
            level: 1,
            html: 25,
            css: 20,
            experience: 0,
            completedLevels: [1, 2],
            currentLevel: 3,
            completedProjects: [1, 2],
            currentProject: 3
        };

        this.levels = {
            1: {
                title: "Основы HTML",
                description: "Создайте свою первую веб-страницу",
                requirements: ["h1", "p", "img"],
                reward: { html: 10 },
                code: {
                    html: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Добро пожаловать!</h1>
    <p>Это моя первая веб-страница.</p>
    <img src="https://via.placeholder.com/150" alt="Пример изображения">
</body>
</html>`,
                    css: `body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}`
                }
            },
            2: {
                title: "Введение в CSS",
                description: "Добавьте стили вашей странице",
                requirements: ["color", "font-size", "margin"],
                reward: { css: 8 },
                code: {
                    html: `<!DOCTYPE html>
<html>
<head>
    <title>Стилизованная страница</title>
</head>
<body>
    <header>
        <h1>Мой сайт</h1>
        <nav>
            <a href="#">Главная</a>
            <a href="#">О нас</a>
            <a href="#">Контакты</a>
        </nav>
    </header>
    <main>
        <p>Это стилизованная веб-страница.</p>
    </main>
</body>
</html>`,
                    css: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem;
}

h1 {
    color: #e74c3c;
    font-size: 2.5rem;
}`
                }
            },
            3: {
                title: "Работа с макетом",
                description: "Flexbox и позиционирование элементов",
                requirements: ["display: flex", "justify-content", "flex-direction"],
                reward: { html: 15, css: 12 },
                code: {
                    html: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox макет</title>
</head>
<body>
    <div class="container">
        <header class="header">Шапка</header>
        <main class="main-content">
            <aside class="sidebar">Боковая панель</aside>
            <section class="content">Основной контент</section>
        </main>
        <footer class="footer">Подвал</footer>
    </div>
</body>
</html>`,
                    css: `.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    display: flex;
    flex: 1;
}

.header, .footer {
    background: #34495e;
    color: white;
    padding: 1rem;
}

.sidebar {
    background: #ecf0f1;
    padding: 1rem;
    width: 200px;
}

.content {
    flex: 1;
    padding: 1rem;
}`
                }
            }
        };

        this.currentScreen = 'mainMenu';
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.setupEventListeners();
        this.loadGameProgress();
        this.updateUI();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.showScreen('mainMenu');
                }, 500);
            }
        }, 2000);
    }

    setupEventListeners() {
        // Обработчики вкладок редактора
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchEditorTab(e.target.dataset.tab);
            });
        });

        // Обработчики кнопок редактора
        const runBtn = document.querySelector('.run-btn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }

        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCode());
        }

        // Обработчики для требований заданий
        const requirements = document.querySelectorAll('[data-requirement]');
        requirements.forEach(req => {
            req.addEventListener('click', (e) => {
                this.showRequirementHelp(e.target.dataset.requirement);
            });
        });
    }

    showScreen(screenName) {
        // Скрыть все экраны
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Показать нужный экран
        const targetScreen = document.getElementById(screenName + 'Screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }

        this.updateUI();
    }

    showMainMenu() {
        this.showScreen('mainMenu');
    }

    showLevels() {
        this.showScreen('levels');
    }

    showProjects() {
        this.showScreen('projects');
    }

    showAbout() {
        this.showScreen('about');
    }

    startGame() {
        this.showScreen('game');
        this.loadLevel(this.player.currentLevel);
    }

    startLevel(levelNumber) {
        if (this.canStartLevel(levelNumber)) {
            this.player.currentLevel = levelNumber;
            this.showScreen('game');
            this.loadLevel(levelNumber);
        } else {
            this.showMessage('Недостаточно навыков для этого уровня!', 'error');
        }
    }

    startProject(projectNumber) {
        if (this.canStartProject(projectNumber)) {
            this.player.currentProject = projectNumber;
            this.showScreen('game');
            this.loadProject(projectNumber);
        } else {
            this.showMessage('Сначала завершите предыдущие проекты!', 'error');
        }
    }

    canStartLevel(levelNumber) {
        const level = this.levels[levelNumber];
        if (!level) return false;

        if (levelNumber === 4) return this.player.html >= 40 && this.player.css >= 35;
        if (levelNumber === 5) return this.player.html >= 60 && this.player.css >= 55;
        
        return true;
    }

    canStartProject(projectNumber) {
        return this.player.completedLevels.length >= projectNumber;
    }

    loadLevel(levelNumber) {
        const level = this.levels[levelNumber];
        if (!level) return;

        // Обновляем интерфейс задания
        const taskDescription = document.getElementById('taskDescription');
        const taskRequirements = document.getElementById('taskRequirements');
        
        if (taskDescription) {
            taskDescription.textContent = level.description;
        }

        if (taskRequirements) {
            const requirementsList = taskRequirements.querySelector('ul');
            requirementsList.innerHTML = '';
            
            level.requirements.forEach(req => {
                const li = document.createElement('li');
                li.textContent = this.getRequirementDescription(req);
                li.dataset.requirement = req;
                requirementsList.appendChild(li);
            });
        }

        // Загружаем начальный код
        const htmlEditor = document.getElementById('htmlEditor');
        const cssEditor = document.getElementById('cssEditor');
        
        if (htmlEditor && cssEditor) {
            htmlEditor.value = level.code.html;
            cssEditor.value = level.code.css;
        }

        this.runCode();
        this.updateProgress();
    }

    loadProject(projectNumber) {
        // Здесь будет код для загрузки проектов
        const taskDescription = document.getElementById('taskDescription');
        if (taskDescription) {
            taskDescription.textContent = `Проект ${projectNumber}: Создание полноценного веб-сайта`;
        }
        
        this.runCode();
    }

    switchEditorTab(tabName) {
        // Переключаем активные вкладки
        const tabs = document.querySelectorAll('.tab');
        const codeAreas = document.querySelectorAll('.code-area');
        
        tabs.forEach(tab => tab.classList.remove('active'));
        codeAreas.forEach(area => area.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName + 'Editor').classList.add('active');
    }

    runCode() {
        const htmlEditor = document.getElementById('htmlEditor');
        const cssEditor = document.getElementById('cssEditor');
        const previewFrame = document.getElementById('previewFrame');
        
        if (!htmlEditor || !cssEditor || !previewFrame) return;

        const htmlCode = htmlEditor.value;
        const cssCode = `<style>${cssEditor.value}</style>`;
        
        const fullCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${cssCode}
            </head>
            <body>
                ${htmlCode.replace(/<!DOCTYPE html>|<\/?html>|<\/?head>|<\/?body>/gi, '')}
            </body>
            </html>
        `;

        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(fullCode);
        previewDoc.close();

        this.checkRequirements();
    }

    resetCode() {
        const currentLevel = this.levels[this.player.currentLevel];
        if (currentLevel) {
            const htmlEditor = document.getElementById('htmlEditor');
            const cssEditor = document.getElementById('cssEditor');
            
            if (htmlEditor && cssEditor) {
                htmlEditor.value = currentLevel.code.html;
                cssEditor.value = currentLevel.code.css;
                this.runCode();
            }
        }
    }

    checkRequirements() {
        const level = this.levels[this.player.currentLevel];
        if (!level) return;

        const htmlCode = document.getElementById('htmlEditor').value;
        const cssCode = document.getElementById('cssEditor').value;
        const requirements = document.querySelectorAll('[data-requirement]');
        
        let completedRequirements = 0;

        requirements.forEach(reqElement => {
            const requirement = reqElement.dataset.requirement;
            let isMet = false;

            switch(requirement) {
                case 'h1':
                    isMet = /<h1[^>]*>.*<\/h1>/i.test(htmlCode);
                    break;
                case 'p':
                    isMet = /<p[^>]*>.*<\/p>/i.test(htmlCode);
                    break;
                case 'img':
                    isMet = /<img[^>]*>/i.test(htmlCode);
                    break;
                case 'color':
                    isMet = /color\s*:/i.test(cssCode);
                    break;
                case 'font-size':
                    isMet = /font-size\s*:/i.test(cssCode);
                    break;
                case 'margin':
                    isMet = /margin\s*:/i.test(cssCode);
                    break;
                case 'display: flex':
                    isMet = /display\s*:\s*flex/i.test(cssCode);
                    break;
                case 'justify-content':
                    isMet = /justify-content\s*:/i.test(cssCode);
                    break;
                case 'flex-direction':
                    isMet = /flex-direction\s*:/i.test(cssCode);
                    break;
            }

            if (isMet) {
                reqElement.classList.add('requirement-met');
                completedRequirements++;
            } else {
                reqElement.classList.remove('requirement-met');
            }
        });

        const progress = (completedRequirements / level.requirements.length) * 100;
        this.updateProgressBar(progress);

        if (completedRequirements === level.requirements.length) {
            this.completeLevel();
        }
    }

    completeLevel() {
        const level = this.levels[this.player.currentLevel];
        if (!level || this.player.completedLevels.includes(this.player.currentLevel)) return;

        // Награждаем игрока
        if (level.reward.html) {
            this.player.html += level.reward.html;
        }
        if (level.reward.css) {
            this.player.css += level.reward.css;
        }

        this.player.completedLevels.push(this.player.currentLevel);
        this.player.currentLevel++;
        this.player.experience += 10;

        this.showMessage(`Уровень ${this.player.currentLevel - 1} завершен!`, 'success');
        this.saveGameProgress();
        this.updateUI();

        // Автоматический переход к следующему уровню через 2 секунды
        setTimeout(() => {
            if (this.player.currentLevel <= Object.keys(this.levels).length) {
                this.loadLevel(this.player.currentLevel);
            }
        }, 2000);
    }

    updateProgressBar(progress) {
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressPercent) {
            progressPercent.textContent = Math.round(progress) + '%';
        }
    }

    updateProgress() {
        this.updateProgressBar(0);
        const requirements = document.querySelectorAll('[data-requirement]');
        requirements.forEach(req => {
            req.classList.remove('requirement-met');
        });
    }

    updateUI() {
        // Обновляем статистику игрока
        document.getElementById('htmlValue').textContent = this.player.html;
        document.getElementById('cssValue').textContent = this.player.css;
        document.getElementById('playerLevel').textContent = this.player.level;

        // Обновляем прогресс в главном меню
        const htmlStat = document.querySelector('.html-stat');
        const cssStat = document.querySelector('.css-stat');
        
        if (htmlStat) {
            htmlStat.style.width = Math.min(this.player.html, 100) + '%';
        }
        if (cssStat) {
            cssStat.style.width = Math.min(this.player.css, 100) + '%';
        }

        // Обновляем статусы уровней
        this.updateLevelsUI();
    }

    updateLevelsUI() {
        const levelCards = document.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            const levelNumber = parseInt(card.dataset.level);
            card.className = 'level-card';
            
            if (this.player.completedLevels.includes(levelNumber)) {
                card.classList.add('completed');
            } else if (this.player.currentLevel === levelNumber) {
                card.classList.add('current');
            } else if (!this.canStartLevel(levelNumber)) {
                card.classList.add('locked');
            }
        });
    }

    getRequirementDescription(requirement) {
        const descriptions = {
            'h1': 'Заголовок первого уровня (<h1>)',
            'p': 'Абзац текста (<p>)',
            'img': 'Изображение (<img>)',
            'color': 'Использование свойства color',
            'font-size': 'Использование свойства font-size',
            'margin': 'Использование свойства margin',
            'display: flex': 'Использование display: flex',
            'justify-content': 'Использование justify-content',
            'flex-direction': 'Использование flex-direction'
        };
        
        return descriptions[requirement] || requirement;
    }

    showRequirementHelp(requirement) {
        const helpMessages = {
            'h1': 'Используйте тег <h1>Ваш текст</h1> для создания заголовка',
            'p': 'Используйте тег <p>Ваш текст</p> для создания абзаца',
            'img': 'Используйте тег <img src="url" alt="описание"> для вставки изображения',
            'color': 'Используйте свойство CSS: color: red;',
            'font-size': 'Используйте свойство CSS: font-size: 16px;',
            'margin': 'Используйте свойство CSS: margin: 10px;',
            'display: flex': 'Используйте свойство CSS: display: flex;',
            'justify-content': 'Используйте свойство CSS: justify-content: center;',
            'flex-direction': 'Используйте свойство CSS: flex-direction: column;'
        };
        
        this.showMessage(helpMessages[requirement] || 'Помощь по этому требованию пока недоступна', 'info');
    }

    showMessage(message, type = 'info') {
        // Создаем элемент сообщения
        const messageElement = document.createElement('div');
        messageElement.className = `game-message game-message-${type}`;
        messageElement.textContent = message;
        
        // Стили для сообщения
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(messageElement);
        
        // Анимация появления
        setTimeout(() => {
            messageElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            messageElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 300);
        }, 3000);
    }

    saveGameProgress() {
        try {
            localStorage.setItem('questGameProgress', JSON.stringify(this.player));
        } catch (e) {
            console.log('Не удалось сохранить прогресс:', e);
        }
    }

    loadGameProgress() {
        try {
            const savedProgress = localStorage.getItem('questGameProgress');
            if (savedProgress) {
                this.player = { ...this.player, ...JSON.parse(savedProgress) };
            }
        } catch (e) {
            console.log('Не удалось загрузить прогресс:', e);
        }
    }
}

// Глобальные функции для вызова из HTML
function startGame() {
    window.gameInstance.startGame();
}

function showLevels() {
    window.gameInstance.showLevels();
}

function showProjects() {
    window.gameInstance.showProjects();
}

function showAbout() {
    window.gameInstance.showAbout();
}

function showMainMenu() {
    window.gameInstance.showMainMenu();
}

function startLevel(levelNumber) {
    window.gameInstance.startLevel(levelNumber);
}

function startProject(projectNumber) {
    window.gameInstance.startProject(projectNumber);
}

function runCode() {
    window.gameInstance.runCode();
}

function resetCode() {
    window.gameInstance.resetCode();
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    window.gameInstance = new QuestGame();
});

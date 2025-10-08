/* Базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
    color: #fff;
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Экран загрузки */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a2a6c, #b21f1f);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader {
    text-align: center;
}

.magic-orb {
    width: 80px;
    height: 80px;
    border: 4px solid #3ad59f;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Общие стили экранов */
.screen {
    display: none;
    min-height: 100vh;
}

.screen.active {
    display: block;
}

/* Заголовки игры */
.game-header {
    text-align: center;
    padding: 30px 0;
}

.game-title {
    font-size: 3.5rem;
    margin-bottom: 15px;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to right, #f8ff00, #3ad59f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
    from {
        text-shadow: 0 0 20px #f8ff00;
    }
    to {
        text-shadow: 0 0 30px #3ad59f, 0 0 40px #3ad59f;
    }
}

.game-subtitle {
    font-size: 1.4rem;
    color: #e0e0e0;
    max-width: 800px;
    margin: 0 auto;
}

/* Кнопки меню */
.menu-navigation {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 40px auto;
}

.menu-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.menu-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #3ad59f;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.btn-icon {
    font-size: 1.5rem;
}

.start-btn { background: linear-gradient(135deg, #3ad59f, #2196f3); }
.levels-btn { background: linear-gradient(135deg, #ff9800, #f44336); }
.projects-btn { background: linear-gradient(135deg, #9c27b0, #673ab7); }
.about-btn { background: linear-gradient(135deg, #607d8b, #455a64); }

/* Карточка персонажа */
.character-card {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    padding: 25px;
    margin: 30px auto;
    max-width: 500px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.character-avatar {
    position: relative;
}

.avatar {
    font-size: 4rem;
    background: linear-gradient(135deg, #3ad59f, #2196f3);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #fff;
}

.level-badge {
    position: absolute;
    bottom: -5px;
    right: -5px;
    background: #f8ff00;
    color: #000;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: bold;
}

.character-info h3 {
    color: #3ad59f;
    margin-bottom: 15px;
    font-size: 1.4rem;
}

.stats {
    width: 100%;
}

.stat {
    margin-bottom: 10px;
}

.stat-name {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.stat-bar {
    height: 10px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    overflow: hidden;
}

.stat-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease;
}

.html-stat {
    background: linear-gradient(to right, #e34c26, #f06529);
}

.css-stat {
    background: linear-gradient(to right, #2965f1, #2aa9ff);
}

/* Заголовки экранов */
.screen-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.back-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.screen-header h2 {
    color: #3ad59f;
    font-size: 2.2rem;
}

/* Адаптивность */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .game-title {
        font-size: 2.5rem;
    }
    
    .game-subtitle {
        font-size: 1.1rem;
    }
    
    .character-card {
        flex-direction: column;
        text-align: center;
    }
    
    .menu-btn {
        padding: 15px 20px;
        font-size: 1rem;
    }
    
    .screen-header {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}

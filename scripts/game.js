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

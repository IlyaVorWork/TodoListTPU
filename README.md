# Firebase TodoList
**Выполнил Воронцов Илья**

### Инструкция по запуску

1. Создать ```.env``` файл в корне проекта со следующими переменными:

```
VITE_FIREBASE_API_KEY=example
VITE_FIREBASE_AUTH_DOMAIN=example
VITE_FIREBASE_PROJECT_ID=example
VITE_FIREBASE_STORAGE_BUCKET=example
VITE_FIREBASE_MESSAGING_SENDER_ID=example
VITE_FIREBASE_APP_ID=example
```

2. Выполнить команды для сборки и запуска Docker-образа приложения:

```
docker build -t iav-todolist-app .
docker run -p 8080:80 iav-todolist-app
```

3. Открыть запущенное приложение по адресу ```localhost:8080```



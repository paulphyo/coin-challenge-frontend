Sure! Here's the same README with some friendly emojis added:

---

# 🚀 Build and Run React + Nginx Docker Image

### 🛠️ Build the Docker image

```bash
docker build --build-arg VITE_API_URL=http://13.229.179.213:8080 -t react-nginx-app .
```

---

### 🐳 Run the container

```bash
docker run -p 80:80 react-nginx-app
```

---

### 🌐 Access the app

Open your browser and go to:
`http://localhost`

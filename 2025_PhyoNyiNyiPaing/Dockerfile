# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY react-frontend/package.json react-frontend/package-lock.json ./
RUN npm ci

COPY react-frontend/ .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Clear default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

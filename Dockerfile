FROM node:22.3.0 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install -g npm@10.8.1
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM --platform=linux/amd64 openjdk:22 AS backend-build

WORKDIR /backend

COPY --from=frontend-build /frontend/dist /static/

ADD backend/target/ChatApp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
EXPOSE 5173

CMD ["java", "-jar", "app.jar"]
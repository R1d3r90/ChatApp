FROM --platform=linux/amd64 openjdk:22 AS backend-build

ADD backend/target/ChatApp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
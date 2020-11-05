FROM node:12.14.1-alpine3.11 AS build

# Getting App ready for installs and builds
WORKDIR /app
COPY . .

# Building and installing
RUN npm i -g typescript
RUN npm i -C ./backend
RUN npm i -C ./frontend
RUN npm run build -C ./backend
RUN npm run build -C ./frontend

FROM node:12.14.1-alpine3.11

WORKDIR /app
COPY /backend/package*.json ./
COPY --from=build /app/backend/dist ./
COPY --from=build /app/backend/.env* ./
RUN npm install --production
# Starts command
CMD node index.js
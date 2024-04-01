FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build 


FROM node:18-alpine AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/package*.json .

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
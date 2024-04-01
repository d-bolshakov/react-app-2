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

RUN npm install serve -g

EXPOSE 5000

CMD ["serve", "-p", "5000", "-s", "dist"]
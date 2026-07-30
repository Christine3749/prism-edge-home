FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY server.mjs ./

EXPOSE 8080
CMD ["node", "server.mjs"]

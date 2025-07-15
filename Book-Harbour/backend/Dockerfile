# 1) Install dependencies and build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# copy only package files first for better cache
COPY package*.json ./
RUN npm ci --omit=dev

# copy source & install any remaining tools
COPY . .
# (no build step for pure JS backend)

# 2) Run
FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

EXPOSE 5000
CMD ["npm", "start"]

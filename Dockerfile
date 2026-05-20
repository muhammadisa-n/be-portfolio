FROM node:22-slim AS base

# Install timezone data
RUN apt-get update && apt-get install -y tzdata openssl

# Set timezone
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Generate key (sesuaikan dengan perintahmu)
RUN node craft key:generate

# Build project (jika ada)
RUN node craft build


# Build stage untuk copy hasil build
FROM base AS build

# Nothing extra, base sudah berisi semua

# Production image
FROM node:22-slim AS production

RUN apt-get update && apt-get install -y openssl tzdata \
  && rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env ./

EXPOSE 18000

CMD ["node", "build/main.js"]

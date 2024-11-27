FROM node:18-alpine AS nextjs-app
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1
CMD ["npm", "run", "start"]

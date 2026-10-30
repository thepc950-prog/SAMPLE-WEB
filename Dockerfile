FROM node:20
COPY . .
CMD ["node", "server.js"]

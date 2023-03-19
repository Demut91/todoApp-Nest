FROM node:18-alpine

WORKDIR /opt
COPY . .
 
RUN npm ci --omit=dev 
 
CMD ["npm", "run", "start"]
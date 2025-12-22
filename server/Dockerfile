FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose port
EXPOSE 8000

# Run the server
CMD ["node", "dist/server.js"]
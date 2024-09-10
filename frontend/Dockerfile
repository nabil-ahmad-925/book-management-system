FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

EXPOSE 3000

# Start the project
CMD ["npm", "run", "dev"]

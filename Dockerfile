# Use official Node.js image as base
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the Next.js app in development mode
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

FROM node:18

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Define the command to start the application
CMD ["npm", "start"]

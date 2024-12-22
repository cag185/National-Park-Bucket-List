# Use a Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of your app’s code
COPY . .

# Expose the default port Expo uses
EXPOSE 19000 19001 19002

# Command to run the Expo server
CMD ["yarn", "start"]

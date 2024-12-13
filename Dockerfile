# Step 1: Use the Node.js image to build the React app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the React app
FROM nginx:alpine

# Copy the built React app from the previous step to the Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

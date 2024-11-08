# Use the official Node.js image as the base for building the app
FROM node:20.3-alpine3.17 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json  ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx image to serve the built app
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 5122

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

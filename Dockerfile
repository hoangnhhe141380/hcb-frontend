# Use an official Node runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install


EXPOSE 5173

# Define environment variable for development
#ENV NODE_ENV=development

# Run npm run dev when the container launches
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]

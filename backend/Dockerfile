# using lightweight nodejs image from alpine 
FROM node:20-alpine

# working dir inside container
WORKDIR /app

# Copying package files to our work dir
COPY package.json package-lock.json* ./

# ci -> clean install(use package-lock.json not package.json) & install production dependencies(not devdependencies)
RUN npm ci --omit=dev

# Copy the rest of your code to work dir
COPY . .

# Expose the port your app listens on (informational only, it doesnt actually expose port —> we still need to use -p to expose port)
EXPOSE 5000

# Command to start the app(this cmd runs right after container is created)
CMD ["npm ", "server.js"]


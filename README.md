## Containerising MERN Property Listing APP:

### single-container method:

We are implementing **this exact final system**:

```
VM (AWS EC2)
├── Nginx (Nginx installed on host, Not using container)
│    ├── Serves React static files
│    └── /api → forwards to backend container
│
└── Docker
     └── Backend container (Node + Express)
          └── MongoDB Atlas
```

Only **ONE container** exists.

**Change we make:**

Backend must listen on `0.0.0.0`

Inside your server file:

Current setup(Before docker):
`app.listen(5000, ()=>{});`

Changed to 

```jsx
app.listen(5000, "0.0.0.0", () => {});
```

Why:

Each Docker container has its own isolated network.
Using `0.0.0.0` avoids issues where the app might bind only to localhost(only accept req from inside the container) inside the container, which can break communication with the host or reverse proxy. 
So that when req is made to this process inside the container, it is accepted w/o problem.

**NOTE:**

To restrict to localhost, use `app.listen(5000, '127.0.0.1')`

Now, only the req from same machine(localhost) are accepted by the app.

Test it yourself: try accessing from another machine on the network. 

**Write Dockerfile, then we build image using this dockerfile:**

**`docker build -t backend-api:latest .`**

Create `backend/Dockerfile`:

```docker
# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to start the app
CMD ["npm", "start"]
# If you use "node server.js" directly, use: CMD ["node", "server.js"]
```

If you’re using TypeScript:

```docker
RUN npm run build
CMD ["node", "dist/index.js"]
```

**NOTE:** 
Copying the `package.json` (and `package-lock.json`) file first in a Dockerfile is **a performance optimization technique that leverages Docker's layer caching mechanism**. 

This ensures that the time-consuming `npm install` command only runs when your project's dependencies actually change, not every time your application code changes. 

Example:

- **Scenario 1: You only change your code (e.g., a .js file).**
    - Docker sees that package.json hasn't changed.
    - It reuses the cached layer for npm install from a previous build. **It doesn't reinstall all your dependencies!** This saves a lot of time.
    - Only the later layers (where you copy your actual code) need to be rebuilt.
- **Scenario 2: You add or remove a dependency (you change package.json).**
    - Docker sees that package.json *has* changed.
    - It invalidates the cache for the npm install layer and rebuilds it (reinstalling dependencies).
    - This is correct behavior, as your dependencies genuinely need to be updated.

What this container does:

- Runs Node
- Runs Express
- Nothing else
- **docker build**
This is the main Docker command to **create a new image** by following the instructions in your Dockerfile.
- **-t backend-api:latest** means **tag** (name + version).
    - backend-api = the name you give to your image (you can choose any name, like myapp, arjun-backend, etc.)
    - :latest = the version/tag (optional but very common; "latest" is just a label, not magic).
    Result: Your image will be called backend-api:latest and appear when you run docker images.
- **.** (the dot)
This tells Docker: **"Use the current directory as the build context"**.
    - Docker looks for a file named Dockerfile right here.
    - It also sends all files in this directory (except those in .dockerignore) to the Docker daemon during build.
    - That's why you need to be in your project folder when running this command.

### Install Docker on Ubuntu EC2

SSH into your instance first:
Then,
`sudo apt update` // Update the system packages

`sudo apt install [docker.io](http://docker.io/) -y` // install docker from ubunto repo (We;re not installiong from docker officail repo bcoz its little lenthy but its better to use official one)

`sudo usermod -aG docker ubuntu`  // so that ubuntu user also can use docker commands(only root user can use by default)

`sudo systemctl start docker` //start docker
`sudo systemctl enable docker` // auto run docker on machine start up

### nstall Nginx on Ubuntu (host-level)

```bash
sudo apt update
sudo apt install nginx -y
```

### Start Nginx

```bash
sudo systemctl start nginx
```

### Enable Nginx on boot

```bash
sudo systemctl enable nginx
```

## STEP 5 — Copy frontend build to EC2

Copy build to ec2 so that Nginx can serve them,

On EC2:

```bash
# Create the folder where Nginx will serve files
sudo mkdir -p /var/www/frontend

# Give your user (ubuntu) ownership so you can easily copy files into it later
sudo chown -R ubuntu:ubuntu /var/www/frontend
```

Now copy the **contents** of that build folder to EC2:

Bash

```bash
# Replace:
# - /path/to/your/frontend/build/  → actual path to your build folder
# - your-ec2-public-ip              → from AWS console (Public IPv4 address)
# - /home/your-key.pem              → path to your .pem file

scp -i /home/your-key.pem -r /path/to/your/frontend/build/* ubuntu@your-ec2-public-ip:/var/www/frontend/
```

- r = recursive (copies whole folder structure)
- = copies **contents** (not the build/ folder itself)
- Result on EC2: files appear directly in /var/www/frontend/index.html, /var/www/frontend/static/js/..., etc.

**Secure Copy Protocol**

- Like `cp`, but **over the internet**
- Uses **SSH (port 22)**

### `i /home/your-key.pem`

**Identity file (SSH key)**

- This is your **EC2 private key**

## STEP 6 — Nginx config (THIS is the heart)

Here we’re **configuring Nginx as a reverse proxy and static file server on the host (EC2).**

Create config: `/etc` is for config files, 

```bash
sudo nano /etc/nginx/conf.d/app.conf
```

Paste this:

```json
server {  
	listen 80;
	server_name _;  
	
	root /var/www/frontend;
	index index.html;
	
	location / {
	try_files $uri /index.html;
	    }
	
	location /api {
	proxy_pass http://127.0.0.1:5000;
	proxy_http_version 1.1;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	    }
}
```

Then:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

What this does:

- `/` → static frontend
- `/api` → backend container on localhost

**Explanation of nginx.conf file:**

`server {`

- Defines a new **server block** (virtual server / site).

`listen 80;`

- Tells Nginx to **listen for incoming HTTP requests on port 80** (standard HTTP port).
- This is the port browsers use by default when you type http://your-domain.com or http://your-ec2-ip.

`server_name _;`

used to create a **"catch-all" or default server block** that processes requests which do not match any other explicitly defined `server_name` in your configuration. 

Used when you don't have a domain name yet

`root /var/www/frontend;`

- Sets the **document root** — the folder where Nginx will look for static files.
- All requests for static files (HTML, JS, CSS, images…) will be served from **/var/www/frontend/**.

`index index.html;`

**directive that specifies the default file to serve when a directory is requested**. 

```json
location / {
	try_files $uri /index.html;
}
```

`location / {`

- Matches **all requests** that start with / (i.e. literally everything).

`try_files $uri /index.html;`

- **try_files** checks for files **in this order**:
    1. First tries to find the **exact file** the user requested ($uri)
        - Example: /about → looks for /var/www/frontend/about
    2. If the file **does NOT exist**, it **falls back to serving /index.html**
- Why?
→ In SPAs, **all client-side routes** (/about, /profile/123, /listings/new) are handled by **React Router**, not by the server.
→ So we always need to return index.html for any non-asset request → React can then render the correct page.

```toml
location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
```

This block **forwards all API requests** to your **Node.js backend container**.

nginx

`location /api {`

- Matches any request that starts with /api
Examples: /api/properties, /api/auth/login, /api/users/me

`proxy_pass http://127.0.0.1:5000;`

- The **heart of the reverse proxy**!
- Forwards every request that matches /api to **http://127.0.0.1:5000**
→ 127.0.0.1 = localhost (the EC2 host itself)
→ 5000 = the port your **backend container** is exposing
- Nginx is running on the **host**, and your backend container is publishing port 5000 to the host's 5000 → so 127.0.0.1:5000 reaches the container perfectly.

`proxy_http_version 1.1;`

- Tells Nginx to use **HTTP/1.1** when talking to the backend.
- Enables **keep-alive** connections (better performance) and is required for some modern features (like chunked transfer encoding).

`proxy_set_header Host $host;`

- Forwards the **original Host header** (yourdomain.com) to the backend.
- Very important when your backend needs to know the original domain (e.g. for CORS, etc.).

`proxy_set_header Host $host;` tells NGINX to make sure the application **knows the original website name** the customer typed in, bcoz the server app need to know req from which domain should be allowed(eg, for CORS)

`proxy_set_header X-Real-IP $remote_addr;`

- Forwards the **real client IP address** to your backend.
- Without this, your Node.js app would see all requests coming from 127.0.0.1 (Nginx), and you would lose the real visitor's IP (important for logging, rate limiting, geo-location, etc.).

`sudo nginx -t`
# Tests the configuration for syntax errors

`sudo systemctl reload nginx`
# Applies the new config without stopping Nginx (zero-downtime)

If nginx -t says **"syntax is ok"** and **"test is successful"** → you're good!

## STEP 7 — Run the backend container

Clone the github repo to ec2:
To get only the backend/ folder from a specific branch (not the default one, e.g., main or master), you can use the `git clone` with `sparse-checkout` method.

After that, 

On EC2, inside backend folder:

```bash
docker build -t backend-img .

```

This builds the Docker image `backend-img`.

Now create a .env file and paste the contents(mongodb atlas url, …)

Run the image(craetes a container):

Run it:

```bash
docker run -d \
  --name backend-cont \
  -p 127.0.0.1:5000:5000 \
  --env-file .env \
  backend-img
```

**This command is telling Docker to start a new container based on an image, with specific configurations.**

`\` means this command is continued on the next line.

### What each part does (quick explanation)

| Part | Meaning | Why it's important |
| --- | --- | --- |
| -d | Run in **detached mode** (background) | So your terminal doesn't get blocked |
| --name backend-cont | Give the container a nice name: backend-cont | Easier to manage later (docker stop backend-cont, docker logs backend-cont) |
| -p 127.0.0.1:5000:5000 | Publishes (maps) a container's port to a specific host port. | **Security!** Only Nginx on the same EC2 can reach it, not the whole internet |
| --env-file .env | Load environment variables from your .env file (MongoDB URI, JWT_SECRET, etc.) | Your app needs these secrets to connect to MongoDB Atlas |
| backend-img | The image you just built | Tells Docker what to run |

Now, Do `docker ps` to see the container.

`docker logs backend-cont` to see the logs, 
It’ll show: connected to atlas & listinging on port ….(the console logs of the express server)

**Remove the nginx default site so that our frontend is served by nginx by default.**

## What is running RIGHT NOW (final truth)

On EC2:

```
nginx (host process)
docker
└── backend container
```

Frontend:

- Files on disk
- Served by Nginx
- No container
- No Node

Backend:

- One container
- Node + Express
- Private

Database:

- MongoDB Atlas
- External

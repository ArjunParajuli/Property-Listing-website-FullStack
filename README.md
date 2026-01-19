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

**Write Dockerfile, then we build image using this dockerfile:
`docker build -t backend-api:latest .`**

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

- This is your **EC2 priv**

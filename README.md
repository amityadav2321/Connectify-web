# 💻 Connectify – Frontend

**Connectify** is a full-stack social platform where developers can connect, collaborate, and grow together.  
This is the **frontend** of the application, built using **React.js**, **Redux Toolkit**, and **Tailwind CSS**, featuring a fully responsive UI, real-time chat, and protected routes.

🔗 Live Site: [https://lnkd.in/gPHW6j7K](https://lnkd.in/gPHW6j7K)  
🖥️ Backend Repo: [GitHub Link](https://lnkd.in/giBWPYPp)

---

## 🛠️ Tech Stack

- **React.js** with functional components & hooks
- **Redux Toolkit** for state management
- **React Router** for routing
- **Tailwind CSS** + **DaisyUI** for styling
- **Socket.IO Client** for real-time chat
- **Axios** for API requests

---

## 🎯 Features

- 🔐 **Authentication** (Signup/Login) with JWT
- ✨ **Editable Profile** (name, age, gender, skills, profile photo)
- 🔄 **Browse & Shuffle Users** (excludes self/rejected)
- 🤝 **Send, Accept, Reject Connections**
- 💬 **In-App Chat** using WebSockets
- 🔓 **Protected Routes**, **Change Password**, **Logout**
- 📨 **Email Alerts** on signup/login
- 🦴 **Skeleton Loaders** for improved UX during data loading

---
















































# Connectify-notes 
- Create a vite + React application
- Remove unwanted files and create a Hello World app
- Install tailwind css
- Install daisy UI
- Add NavBar component to app.jsx
- create a component file 
- install react-router-dom
- create browserRouter > Routes > Route =/ body >RouteChildren
- Create Footer
- create login page
- install axios
- CORS- install cors in backend => add middlewares to with configurations: orgin ,credentials:true
-  whenever you are making api call so pass axios=>{withCredentials:true}

- install redux toolkit- https://redux-toolkit.js.org/tutotials/quick-start

- install react redus+toolkit =>configureStore => Provider to application=> createSlice =>add reducer to store

- Add redux deVtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user Logs In
- Refactor our code to add constants file + create components folder
- you should not be access to other routes without login
- if token is not present ,redirect user to login page
- Logout feature
- got the feed and add the feed in the store
- build the user card on feed
- edit pofile feature and toast message when saving profile
-  new page - see all connetion request
- new page - see all my connections request
- accept / reject connection request
- send and ignored the user from feed
- signup new user
- 













Body
    NavBar
    Route=/   =>feed
    Route=/Login   =>Login
    Route=/Connections   =>Connections
    Route=/profile  =>profile
    


# Deployment

- Signup on AWS
- Launch instance in E2C
- chmod 400 <secret>.pem
- connect to machine with ssh cmd
- install node version present locally
- git clone
- Frontend
      - npm install -> dependencies install
      - npm run build
      - sudo apt update
      - sudo apt install nginx
      - sudo systemctl start nginx
      - copy code from dist(build files) to /var/www/html/
      - sudo scp -r dist/* /var/wwww/html/
      - enable port :80 on your instance
- Backend
      - allowed ec2 instance public IP on mongo server 
      - installed  npm install pm2 -g
      - pm2 start npm --name "Connectify-backend" -- start
      - pm2 logs to check what happen
      - pm2 flush,pm2 list, pm2 stop npm , pm2 delete npm
      - config nginx - /etc/nginx/sites-available/default
      -restart nginx - sudo systemctl restart nginx
- modify BASE_URL in frontend project to "/api"






Frontend: http://13.126.221.130/
Backend: http://13.126.221.130:3000/


- nginx config:

server_name 13.126.221.130;
 location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }


# Realtime chat using Websocket(Socket.io)

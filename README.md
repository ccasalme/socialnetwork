# **Social Network API**  

## **Description**  
The **Social Network API** is a backend application that provides a RESTful API for managing users, thoughts, reactions, and friendships in a social network. This API allows users to create, update, and delete their profiles, post thoughts, react to others' thoughts, and manage friendships.  

The application is built using **Node.js, Express.js, TypeScript, and MongoDB (Mongoose)** for data persistence.  

---

## **Features**  
✔ **User Management:** Create, update, and delete user profiles.  
✔ **Thoughts & Posts:** Users can create, edit, and delete thoughts.  
✔ **Reactions:** Users can react to thoughts with quick responses.  
✔ **Friendships:** Users can add or remove friends from their social circle.  
✔ **MongoDB Database:** Stores all data efficiently with Mongoose.  
✔ **CRUD Functionality:** Supports Create, Read, Update, and Delete operations for all entities.  
✔ **RESTful API:** Follows REST principles, making it easy to integrate with frontend applications.  

---

## **Examples**  
📌 **API Routes in Postman**  
_(Fetching User Info, Adding Thoughts, Managing Reactions & Friends)_  

🔹 **Example: Creating a New User**  

![newuser](https://github.com/user-attachments/assets/97ab5ea3-fd5f-48c8-a4a2-b352c2b266e9)

![newuserexample2](https://github.com/user-attachments/assets/080a318c-b019-49f7-9225-a6fc16867842)

![newuserexample3](https://github.com/user-attachments/assets/1aab56f6-c475-4c6f-a90f-a8d58722e127)




🔹 **Example: Creating a New Thought**  

![newthought](https://github.com/user-attachments/assets/cf4e2716-e4a0-4c78-a46e-e55c7eabb3d2)




🔹 **Example: Adding a Reaction to a Thought**  

![newReaction](https://github.com/user-attachments/assets/4649e33b-c32a-44fb-b2f0-f351f1516181)

![reactionthread](https://github.com/user-attachments/assets/97100447-b735-4f68-b271-795eceed96e5)



🔹 **Quick Video Example in Postman**  
  

https://github.com/user-attachments/assets/68e0b7de-3bc6-4eba-929e-ce121d16b955


🔹 **Quick Video Example in Mongoose if you forgot the ids**



https://github.com/user-attachments/assets/a3f0a77c-8da0-49e6-9f99-041193927b8f



**This ReadMe has very detailed instructions in how to create, update, and delete. Please refer to this ReadMe if you forgot what the endpoints are and the interface.**

---

## **Table of Contents**  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [Tests](#tests)  
- [License](#license)  

---

## **Installation**  
To run this API locally, you must have **Node.js** and **MongoDB** installed on your machine.  

### **Steps to Install:**  
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/your-username/social-network-api.git
   cd social-network-api
   ```  
2. **Install Dependencies**  
   ```sh
   npm install
   ```  
3. **Setup Your Environment Variables**  
   - Create a `.env` file in the root directory.  
   - Add the following line and replace `<your_database_uri>` with your actual MongoDB connection string:  
     ```env
     MONGODB_URI=<your_database_uri>
     ```  
   - Ensure `.env` is **added to your `.gitignore` file** to prevent accidental exposure.  

4. **Start the Server**  
   ```sh
   npm run dev
   ```  

---

## **Usage**  
1. Start the API server using:  
   ```sh
   npm run dev
   ```  
2. Use **Postman** or **Insomnia** to test API endpoints.  
3. Use the following **CRUD API endpoints** to interact with the database.  

---

## **API Endpoints**  

### **🔹 User Routes**  
| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| GET    | `/api/users`          | Get all users                   |
| GET    | `/api/users/:id`      | Get a single user by ID         |
| POST   | `/api/users`          | Create a new user               |
| PUT    | `/api/users/:id`      | Update a user                   |
| DELETE | `/api/users/:id`      | Delete a user                   |

### **🔹 Thought Routes**  
| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| GET    | `/api/thoughts`       | Get all thoughts                |
| GET    | `/api/thoughts/:id`   | Get a single thought by ID      |
| POST   | `/api/thoughts`       | Create a new thought            |
| PUT    | `/api/thoughts/:id`   | Update a thought                |
| DELETE | `/api/thoughts/:id`   | Delete a thought                |

### **🔹 Reaction Routes**  
| Method | Endpoint                                      | Description                          |
|--------|-----------------------------------------------|--------------------------------------|
| POST   | `/api/thoughts/:thoughtId/reactions`        | Add a reaction to a thought         |
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction from a thought |

### **🔹 Friend Routes**  
| Method | Endpoint                                     | Description                      |
|--------|---------------------------------------------|----------------------------------|
| POST   | `/api/users/:userId/friends/:friendId`     | Add a friend to a user           |
| DELETE | `/api/users/:userId/friends/:friendId`     | Remove a friend from a user      |

---
### ✅ Create (Post Requests) example
New User

📌 Endpoint:POST http://localhost:3001/api/users
```
{
    "username": "spidey_no_sense",
    "email": "nomoney2gohome@email.com"
}
```
New Thought

📌 Endpoint:POST http://localhost:3001/api/thoughts
```
{
    "thoughtText": "Spidey no way home. Spidey no money. Spidey no parents. Why is life?!",
    "username": "spidey_no_sense",
    "userId": "67b6828671561dec517a3d5d"
}
```
New Reaction
```
📌 Endpoint:POST http://localhost:3001/api/thoughts/{thoughtId}/reactions

{
    "reactionBody": "Feels bad, son. Have you tried being rich?",
    "username": "Im_Iron_Man"
}
```
New Friend

📌 Endpoint:POST http://localhost:3001/api/users/{userId}/friends/{friendId}

No request body needed

---
### 🔄 Update (PUT Requests) example

Update a User

📌 Endpoint:PUT http://localhost:3001/api/users/{userId}
```
{
    "username": "ash_catch_em_all",
    "email": "electic_yellow_mouse@email.com"
}
```
Update a Thought

📌 Endpoint:PUT http://localhost:3001/api/thoughts/{thoughtId}
```
{
    "thoughtText": "New thought text: If you can't lift, you can't catch 'em all. Pidgeotto is at least 66lbs..."
}
```

---

## **Contributing**  
We welcome contributions! Follow these steps:  
1. **Fork** the repository  
2. **Create a feature branch** (`git checkout -b new-feature`)  
3. **Commit changes** (`git commit -m 'Added new feature'`)  
4. **Push** to the branch (`git push origin new-feature`)  
5. **Submit a Pull Request**  

---

## **Tests**  
🛠️ You can test the API using **Postman** or **Insomnia** by following the endpoints provided.  

💡 Run the following command to seed the database before testing:  
```sh
npx ts-node src/seeds.ts
```  

---

## **License**  
📜 This project is licensed under the **MIT License**. See the `LICENSE` file for more details.  

---

### **💡 Notes:**  
- Make sure MongoDB is running before starting the server.  
- If you're using **MongoDB Atlas**, ensure your **network access** allows connections from your IP.  
- Always **test API calls in Postman/Insomnia** before integrating with a frontend.  


### **🚀 Ready to Build Your Own Social Network?**  
Start experimenting with the API and add your own features! 💡🔥  

---

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

## **Example Screenshots**  
📌 **API Routes in Postman**  
_(Fetching User Info, Adding Thoughts, Managing Reactions & Friends)_  

🔹 **Example: Creating a New Thought**  


https://github.com/user-attachments/assets/3e4d3ca9-d4f1-45e1-9060-2674e09995ba



🔹 **Example: Adding a Reaction to a Thought**  
![New Reaction API Call](path-to-your-screenshot.png)  

🔹 **Example: Deleting a Friend**  
![Delete Friend API Call](path-to-your-screenshot.png)  

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

---

### **🚀 Ready to Build Your Own Social Network?**  
Start experimenting with the API and add your own features! 💡🔥  

---

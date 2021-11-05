### Image Upload API

A RESTful API to run CRUD operations on images using multer and cloudinary.

In a nutshell, what happens is, your image gets uploaded to the cloudinary server, and then mapped to a public_id for easy access.

---


**Environments**
- Node version - v14.17.0


**Technologies:**
- NodeJS
- ExpressJS
- Multer
- Cloudinary

---

## To run the app manually
*note*: `run all commands in the application's root directory`

**Install all dependencies**

```
npm install
```

**Database Setup**
```
- get a mongodb uri
- create a .env file [Recommended: Just rename the .env.example file I created in the root directory.]
- set the connection uri as MONGODB_URI in the .env file (i.e MONGODB_URI=<connection uri>)
```

**API Configuration**

Create a [cloudinary](https://cloudinary.com/) account;
```
- You will get a <cloud_name>, <api_key>, and <api_secret>
- In the .env file created above, populate the corresponding field for your cloud name, api key, and api secret
```



**Start Application**

```
npm run server
```


**API Endpoints**

```
GET: api/v1/user/
Sample request to get the list of users [including their names and avatars]
```

```
POST: api/v1/user/
Sample request to create a new user [name + avatar]
```

```
DELETE: api/v1/user/:id
Sample request to delete a specific user from the database.
```

```
PUT: api/v1/user/:id
Sample request to update/replace a specific user.
```



---

**Author:** 
- Giwa Jossy
---
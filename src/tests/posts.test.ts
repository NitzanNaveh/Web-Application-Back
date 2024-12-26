import request from "supertest";
import initApp from "../server";
import  Post  from "../models/posts_model";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/users_model";


let app: Express;
type UserTemplate = {
    email: string,
    name: string,
    password: string,
    id?: string,
    token?: string
}
const userInfo: UserTemplate = {
    email: "ofek@gmail.com",
    name: "Ofek",
    password: "12345678"
}

beforeAll(async () => {
    console.log("init app");
    app = await initApp();
    console.log("app initialized");
    await Post.deleteMany({});
    console.log("Delete all posts before testing");
    await User.deleteMany({});

    await request(app).post("/auth/register").send(userInfo);
    const res = await request(app).post("/auth/login").send(userInfo);
    userInfo.token = res.body.token;
    userInfo.id = res.body.id;
    expect(userInfo.token).toBeDefined();
});

let postID= "";

const testPost1 = {
    title: "Post 1",
    content: "Content of post 1", 
    owner: "Ofek Amirav"
};

const UpdatePost = {
    title: "Post Updated",
    content: "Content of post 2", 
    owner: "Ofek Amirav"
};

const invalidPost = {
    title: "Post 3",
    content: "Content of post 3"
};

describe("Posts Tests",()=>{
    test("Get All Posts test", async () => {
        const response = await request(app).get("/post");
        console.log(response.body);//print all posts
        expect(response.statusCode).toBe(200);//expecting for 200 Ok
    });

    test("Create Post test", async () => {
        const response = await request(app).post("/post")
        .set({ authorization: "JWT " + userInfo.token }) // Add the user's token to authorization header
        .send({ // send the request body
            title: "Post 1",
            content: "Content of post 1",
            owner: "nitzan naveh"
        });
        expect(response.statusCode).toBe(201);//expecting for 201 Created
        expect(response.body.title).toBe("Post 1");
        expect(response.body.content).toBe("Content of post 1");
        postID = response.body._id;
    });

    test("Create Post test number 2", async () => {
        const response = await (request(app).post("/post"))
        .set({ authorization: "JWT " + userInfo.token })
        .send({
            title: "Post 2",
            content: "Content of post 2", 
            owner: "Nitzan Naveh"
        });
        expect(response.statusCode).toBe(201); 
        expect(response.body.title).toBe("Post 2");
        expect(response.body.content).toBe("Content of post 2");
        postID = response.body._id;
    });


    test("Test Create Invalid Post", async () => {
        const response = await request(app).post("/post")
        .set({ authorization: "JWT " + userInfo.token })
        .send({
            content: "Content of invalid post",
        }
        );
        expect(response.statusCode).toBe(400); //expecting for 400 Bad Request
    });

    test("Get Post by ID test", async () => {
        const response = await request(app).get("/post/"+postID);
        console.log(response.body);//print the post that was found
        expect(response.statusCode).toBe(200);//expecting for 200 Ok
    });

    test("Update Post test", async () => {
        const response = await request(app).put("/post/"+postID)
        .set({ authorization: "JWT " + userInfo.token })
        .send(UpdatePost);
        console.log(response.body);//print the post that was updated
        expect(response.statusCode).toBe(200);//expecting for 200 Ok
    });

    test("Get Post By Owner test", async () => {
        const response = await request(app).get("/post?owner="+ userInfo.id);
        console.log(response.body);//print the post that was found by owner
        expect(response.statusCode).toBe(200);//expecting for 200 Ok
    });

    test("Delete Post test", async () => {
        const response = await request(app).delete("/post/" + postID)
        .set({ authorization: "JWT " + userInfo.token })
        expect(response.statusCode).toBe(200);

        const response2 = await request(app).get("/post/" + postID);
        expect(response2.statusCode).toBe(404); 
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});


const express = require('express');
const app = express();
app.use(express.json());

const posts = [{ id: 1, title: "First Post", content: "This is the first post.", comments: ["comment1", "comment2"] },{ id: 2, title: "Second Post", content: "This is the second post.", comments: ["comment1", "comment2"] }];

app.post('/posts', (req, res) => {
   const post ={
        id: req.body['id'],
        title: req.body['title'],
        content: req.body['content'],
        comments:[]
   }
   console.log(post);
   posts.push(post);
   res.status(201).json(post);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.delete('/posts/:id', (req, res) => {
    if (!posts[req.params.id - 1]) {
        res.status(404).send({error: "Post not found"});
        return;
    }
    console.log("Deleting post " + req.params.id);
    posts.splice(req.params.id - 1, 1);
    res.status(204).send();
    res.end();
});

app.put('/posts/:id', (req, res) => {
    if (!posts[req.params.id - 1]) {
        res.status(404).send({error: "Post not found"});
        return;
    }
    const updatedPost = {
        id: req.params.id,
        title: req.body['title'],   
        content: req.body['content'],
        comments: posts[req.params.id - 1].comments
    }
    console.log("Updating post " + req.params.id);
    posts[req.params.id - 1] = updatedPost;
    res.json(updatedPost);
});

app.post('/posts/:id/comments', (req, res) => {
    if (!posts[req.params.id - 1]) {
        res.status(404).send({error: "Post not found"});
        return;
    }
    const comment = req.body['comment'];
    console.log("Adding comment to post " + req.params.id);
    posts[req.params.id - 1].comments.push(comment);
    res.status(201).json({comment: comment});
});

app.get('/posts/:id/comments', (req, res) => {
    if (!posts[req.params.id - 1]) {
        res.status(404).send({error: "Post not found"});
        return;
    }
    res.json(posts[req.params.id - 1].comments);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


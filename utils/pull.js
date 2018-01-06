import { getPosts } from './read';

export function getAllPosts() {
    var postVals = [];
    return getPosts().then((posts) => {
        posts.forEach((post) => {
          postVals.push(post.val());
        });
        return postVals;
    });
}
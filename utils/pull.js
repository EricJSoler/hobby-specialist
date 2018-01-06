import { getPosts, getSectionById } from './read';

export function getAllPosts() {
    var postVals = {};
    return getPosts().then((posts) => {
        posts.forEach((post) => {
          postVals[post.key] = post.val();
        });
        return postVals;
    });
}

export function getAllSections(post) {
    var sectionVals = {};
    var promises = [];
    post.sectionLookupIdList.forEach(function(sectionId) {
      promises.push(getSectionById(sectionId));
    });
    return Promise.all(promises).then((values) => {
      values.forEach((value) => {
        sectionVals[value.key] = value.val();
      });
      return sectionVals;
    });
}
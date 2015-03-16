Posts = new Mongo.Collection('posts');

//Posts.allow({
//  insert: function(userId, doc) {
//    // 只允许登录用户添加帖子
//    return !! userId;
//  }
//});

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function (post) {
    var errors = {};
    if (!post.title)
        errors.title = "请填写标题";
    if (!post.url)
        errors.url =  "请填写 URL";
    return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

      var errors = validatePost(postAttributes);
      if (errors.title || errors.url)
          throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");

     var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date(),
        commentsCount: 0
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
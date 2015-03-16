Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        Posts.update(currentPostId, {$set: postProperties}, function(error) {
            if (error) {
                // 向用户显示错误信息
                alert(error.reason);
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },

    'click .delete': function(e){
        var currentPostId = this._id;
        Posts.remove(currentPostId);

        Router.go('postsList');
    }
});
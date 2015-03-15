Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    // post._id = Posts.insert(post);
    // Router.go('postPage', post);
     Meteor.call('postInsert', post, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return alert(error.reason);

    	// 显示结果，跳转页面
      if (result.postExists)
        alert('This link has already been posted（该链接已经存在）');
      Router.go('postPage', {_id: result._id});  
    });
  }
});
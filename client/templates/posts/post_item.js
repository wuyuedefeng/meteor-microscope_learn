Template.postItem.helpers({
    ownPost: function(){
        return this.userId === Meteor.userId();
    },
	domain: 'baidu.com'
});
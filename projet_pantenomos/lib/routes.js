FlowRouter.route('/', {
    name: 'homePage',
    action(){
        BlazeLayout.render('homePage');
    }
});

FlowRouter.route('/nouveauprojet', {
    name: 'newProject',
    action(){
        BlazeLayout.render('newProject');
    }
});

FlowRouter.route('/votation', {
    name: 'votation',
    action(){
        BlazeLayout.render('votation');
    }
});
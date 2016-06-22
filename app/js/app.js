miniQuery.ready(function(){
    getTeachers();
    console.log(teachers);
    window.addEventListener('hashchange', function(){
        if (!location.toString().match(/\#/)){
            miniQuery('#content').show();
            miniQuery('#badges').hide();
        } else {
            miniQuery('#content').hide();
            miniQuery('#badges').show();
            // var teacher_id = ('a')
        teacherBadges();
        }
    })
});

var printTeachers = function(data){
    displayAllTeachers('teacher-list', data);
}

var printBadges = function(data){
    displayBadge('teacher-badge', data)
}
var displayAllTeachers = function(type, data){
    var source = miniQuery("#teacher-list").innerHTML;
    var template = Handlebars.compile(source);
    var context = { teachers: data};
    var template = template(context);
    miniQuery('#content').append(template);
}

var displayBadge = function(type, data){
    var source = miniQuery("#teacher-badge").innerHTML;
    var template = Handlebars.compile(source);
    var context = { badges: data};
    var template = template(context);
    miniQuery('#badges').append(template);
}

var getTeachers = function() {
    miniQuery.ajax({
        type: 'GET',
        url: 'http://spa-badge-api.herokuapp.com/teachers/'
    }).then(function(data) {
        var teachers = JSON.parse(data);
        console.log(teachers);
        printTeachers(teachers);
    });
}

var teacherBadges = function() {
    miniQuery.ajax({
        type: 'GET',
        url: 'http://spa-badge-api.herokuapp.com/teachers/' + teacher_id
    }).then(function(response) {
        var badges = JSON.parse(response);
        printBadges(badges);
    });
}

// var individual = function() {
//     miniQuery('a').on('click', function(event){
//         event.preventDefault();
//         var name = this.getAttribute("href")
//         console.log(name);
//         miniQuery.ajax({
//             type: 'GET',
//             url: name
//         }).then(function() {
//             console.log("Success");
//         })
//     })
// }

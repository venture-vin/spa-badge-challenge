miniQuery.ready(function(){
    teachers();
    // individual();
    // teacherBadges();
});

var printTeachers = function(data){
    displayAllTeachers('teacher-list', data);
}

var displayAllTeachers = function(type, data){
    var source = miniQuery("#teacher-list").innerHTML;
    var template = Handlebars.compile(source);
    var context = { teachers: data};
    var template = template(context);
    miniQuery('#content').append(template);
}
var teachers = function() {
    miniQuery.ajax({
        type: 'GET',
        url: 'http://spa-badge-api.herokuapp.com/teachers/'
    }).then(function(data) {
        var teachers = JSON.parse(data);
        printTeachers(teachers);
    });
}
// var teacherBadges = function() {
//     miniQuery.ajax({
//         type: 'GET',
//         url: 'http://spa-badge-api.herokuapp.com/teachers/' + teacher_id
//     }).then(function(response) {
//         var badges = JSON.parse(response)
//     });
// }

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

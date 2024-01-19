function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Django'];
    var member = {
        name: 'John',
        age: 22,
        skills: skills,
        showSkills: function() {
            for (var i = 0; i < this.skills.length; i++) {
                console.log(this.skills[i]);
            }
        }
    };
    return member;
}
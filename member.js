function skillsMember() {
    return {
        name: 'skillsMember',
        restrict: 'E',
        templateUrl: 'app/components/skills/skills-member.html',
        controller: SkillsMember,
        controllerAs: 'vm',
        bindToController: true
    };
}

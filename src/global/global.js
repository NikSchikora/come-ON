var counter = 0;
var counterText;

function create () {
    counterText = this.add.text(16, 16, 'Studenten: 0', { fontSize: '32px', fill: '#000' });
}

function foundStudents (player, students)
{
    student.disableBody(true, true);

    score += 1;
    scoreText.setText('Studenten: ' + score);
}
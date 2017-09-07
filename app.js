var words = [
  'rouge',
  'parallèle',
  'onde électromagnétique',
  'verrerie',
  'slime',
  'dioxygène',
  '207'
];

var inputCreator = function(index, word) {
  return {
    $type: 'div',
    id: 'word' + index + '-container',
    class: 'form-group',
    $components: [
      {
        $type: 'label',
        for: 'word' + index,
        $text: 'Mot n°' + index
      },
      {
        $type: 'input',
        id: 'word' + index + '-input',
        class: 'form-control',
        style: "padding: 5px;"
      }
    ]
  };
};

var validateInput = function(input, container, word) {
  var inputValue = input.value;
  input.disabled = true;
  if (input.value === word) {
    container.classList.add('has-success');
    return 100;
  }

  container.classList.add('has-warning');
  return 0;
};

var startDate = new Date();
var startTime;

var el = {
  $cell: true,
  id: 'container',
  $components: [
    {
      $type: 'form',
      $components: [],
      $init: function() {
        var index = 1;

        var components = this.$components;

        var startMinutes = startDate.getMinutes();
        var startHours = startDate.getHours();
        startTime = startHours * 60 + startMinutes;

        components.push({
          $type: 'h2',
          $text: 'Le jeu a commencé à ' + startHours + 'h' + startMinutes + '.'
        });

        _(words)
          .each(function(word) {
            components.push(inputCreator(index++, word));
          });

        components.push({
          $type: 'div',
          id: 'result',
          class: 'hidden'
        });

        components.push({
          $type: 'button',
          class: 'btn btn-primary',
          $text: 'Valider',
          onclick: function(event) {
            event.preventDefault();
            event.stopPropagation();

            var index = 0;
            var score = _.reduce(words, function(currentScore, word) {
              var container = document.querySelector('#word' + ++index + '-container');
              var input = document.querySelector('#word' + index + '-input');

              return currentScore + validateInput(input, container, word);
            }, 0);

            this.classList.add('hidden');
            result.classList.remove('hidden');

            var endDate = new Date();
            var endMinutes = endDate.getMinutes();
            var endHours = endDate.getHours();
            var endTime = endHours * 60 + endMinutes;

            var timeTaken = endTime - startTime;
            var bonus = 0;
            if (timeTaken < 30) {
              bonus = 500;

            } else if (timeTaken < 40) {
              bonus = 250;

            } else if (timeTaken < 50) {
              bonus = 100;

            } else if (timeTaken < 60) {
              bonus = 50;

            } else if (timeTaken < 70) {
              bonus = 10;

            }

            var firstSentence = 'Vous avez marqué ' + score + ' points pour vos réponses plus ' + bonus + ' de temps.';
            var secondSentence = 'Votre score final est de ' + (score + bonus) + ' points.';

            result.innerHTML = '<p>' + _.join([firstSentence, secondSentence], '</p><p>') + '</p>';
          }
        });
      }
    }
  ]
};

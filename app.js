var words = [
  'densité',
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

var el = {
  $cell: true,
  id: 'container',
  $components: [
    {
      $type: 'form',
      $init: function() {
        var index = 1;
        var wordInputs = _(words)
          .map(function(word) {
            return inputCreator(index++, word);
          })
          .value();
        this.$components = wordInputs;

        this.$components.push({
          $type: 'div',
          id: 'result',
          class: 'hidden'
        });

        this.$components.push({
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
            result.innerHTML = 'Vous avez marqué: ' + score + ' points!';
          }
        });
      }
    }
  ]
};

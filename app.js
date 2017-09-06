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

var validateInput = function(input, word) {
  var inputValue = input.value;
  input.disabled = true;
  if (input.value === word) {
    input.classList.add('ok');
    return 100;
  }

  input.classList.add('ko');
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
          $type: 'button',
          type: 'submit',
          class: 'btn btn-default',
          $text: 'Valider',
          onclick: function() {
            var index = 1;
            var score = _.reduce(words, function(currentScore, value) {
              var input = document.querySelector('#word' + index++ + '-input');

              return currentScore + validateInput(input, word);
            }, 0);

            console.log(score);
          }
        });
      }
    }
  ]
};

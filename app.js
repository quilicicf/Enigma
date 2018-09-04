document.onkeydown = function (event) {
  if (event.key === 'F5' || (event.key.toLowerCase() === 'r' && event.ctrlKey)) {
    console.log('Nope, cheater!');
    return false;  // disable F5 key and ctrl-r
  }

  if (event.altKey && event.ctrlKey && event.key === 'n') {
    location.reload();
    return false;
  }
};

var computeScore = function (score, bonusMultiplier) {
  return _.round(score * bonusMultiplier);
};

var MAX_WORD_SCORE = 100;
var MAX_BONUS_MULTIPLIER = 2;
var WORDS = [
  {
    value: 'rouge',
    validate: function (proposition) {
      return proposition === 'rouge' ? 100 : 0;
    }
  },
  {
    value: 'parallèle',
    validate: function (proposition) {
      if (proposition === 'parallèle') {
        return 100;
      }
      return proposition === 'parallele' ? 80 : 0;
    }
  },
  {
    value: 'onde électro-magnétique',
    validate: function (proposition) {
      if (proposition === 'onde électro-magnétique') {
        return 100;
      }

      if ([ 'onde electro-magnetique', 'onde électromagnétique' ].includes(proposition)) {
        return 80;
      }

      return proposition === 'onde electromagnetique' ? 60 : 0;
    }
  },
  {
    value: 'verrerie',
    validate: function (proposition) {
      return proposition === 'verrerie' ? 100 : 0;
    }
  },
  {
    value: 'slime',
    validate: function (proposition) {
      return proposition === 'slime' ? 100 : 0;
    }
  },
  {
    value: 'dioxygène',
    validate: function (proposition) {
      if (proposition === 'dioxygène') {
        return 100;
      }
      return proposition === 'dioxygene' ? 80 : 0;
    }
  },
  {
    value: '207',
    validate: function (proposition) {
      return proposition === '207' ? 100 : 0;
    }
  },
  {
    value: 'solide',
    validate: function (proposition) {
      return proposition === 'solide' ? 100 : 0;
    }
  },
  {
    value: 'réfraction',
    validate: function (proposition) {
      if (proposition === 'réfraction') {
        return 100;
      }
      return proposition === 'refraction' ? 80 : 0;
    }
  }
];

var MAX_WORDS_SCORE = _.size(WORDS) * MAX_WORD_SCORE;
var MAX_TOTAL_SCORE = computeScore(MAX_WORDS_SCORE, MAX_BONUS_MULTIPLIER);


var inputCreator = function (index) {
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

var getBonusMultiplier = function (timeTaken) {
  if (timeTaken < 30) {
    return 2;
  }

  if (timeTaken >= 80) {
    return 0;
  }

  return 1 + ((80 - timeTaken) / 50);
};

var processWord = function (word) {
  var trimmed = _.trim(word);
  return _.toLower(trimmed);
};

var validateInput = function (input, container, word) {
  input.disabled = true;
  var score = word.validate(processWord(input.value));
  if (score === 100) {
    container.classList.add('has-success');

  } else if (score === 0) {
    container.classList.add('has-error');

  } else {
    container.classList.add('has-warning');

  }

  return score;
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
      autocomplete: 'off',
      $init: function () {
        var index = 1;

        var components = this.$components;

        var startMinutes = startDate.getMinutes();
        var startHours = startDate.getHours();
        startTime = startHours * 60 + startMinutes;

        components.push({
          $type: 'h2',
          $text: 'Le jeu a commencé à ' + _.padStart(startHours, 2, 0) + 'h' + _.padStart(startMinutes, 2, 0) + '.'
        });

        _(WORDS)
          .each(function (word) {
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
          onclick: function (event) {
            event.preventDefault();
            event.stopPropagation();

            var index = 0;
            var score = _.reduce(WORDS, function (currentScore, word) {
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
            var bonusMultiplier = getBonusMultiplier(timeTaken);
            var finalScore = _.round(score * bonusMultiplier);

            var firstSentence = 'Vous avez marqué ' + score + ' points pour vos réponses avec un bonus de temps de x' + bonusMultiplier + '.';
            var secondSentence = 'Votre score final est de ' + finalScore + ' points (maximum possible de ' + MAX_TOTAL_SCORE + ').';

            result.innerHTML = '<p>' + _.join([ firstSentence, secondSentence ], '</p><p>') + '</p>';
          }
        });
      }
    }
  ]
};

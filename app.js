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
        class: 'form-control',
        style: "padding: 5px;"
      }
    ]
  };
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
          });
        this.$components = wordInputs;

        this.$components.push({
          $type: 'button',
          type: 'submit',
          class: 'btn btn-default',
          $text: 'Valider'
        });
      }
    }
  ]
};


Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "elements": [
        {
            "type": "sortablelist",
            "name": "lifepriority",
            "title": "Life Priorities ",
            "isRequired": true,
            "choices": ["family", "work", "pets", "travels", "games"]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});
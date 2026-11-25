$(function () {
  var words = [
    { word: "apple", answer: "яблуко" },
    { word: "house", answer: "будинок" },
    { word: "water", answer: "вода" },
    { word: "book", answer: "книга" },
    { word: "friend", answer: "друг" },
    { word: "school", answer: "школа" },
    { word: "sun", answer: "сонце" },
    { word: "cat", answer: "кіт" },
    { word: "window", answer: "вікно" },
    { word: "table", answer: "стіл" },
    { word: "morning", answer: "ранок" },
    { word: "garden", answer: "сад" },
    { word: "river", answer: "річка" },
    { word: "family", answer: "родина" },
    { word: "teacher", answer: "вчитель" },
    { word: "station", answer: "станція" },
    { word: "journey", answer: "подорож" },
    { word: "knowledge", answer: "знання" },
    { word: "weather", answer: "погода" },
    { word: "library", answer: "бібліотека" }
  ];

  var questions = [];
  var current = 0;
  var correct = 0;
  var wrong = 0;
  var checked = false;

  function shuffle(array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
  }

  function startQuiz() {
    var counts = { easy: 10, medium: 15, hard: 20 };
    var level = $("#level").val();

    questions = shuffle(words.slice()).slice(0, counts[level]);
    current = 0;
    correct = 0;
    wrong = 0;
    checked = false;

    $("#correctCount").text(correct);
    $("#wrongCount").text(wrong);
    $(".quiz").removeAttr("hidden");
    $("#start").text("Почати заново");
    showWord();
  }

  function showWord() {
    checked = false;
    $("#progress").text("Крок " + (current + 1) + " з " + questions.length);
    $("#word").text(questions[current].word);
    $("#answer").val("").removeClass("valid invalid").focus();
    $("#message").text("");
    $("#check").text("Перевірити");
  }

  function checkAnswer() {
    if (checked) {
      nextWord();
      return;
    }

    var userAnswer = $("#answer").val().trim().toLowerCase();

    if (userAnswer === "") {
      $("#message").text("Введіть переклад!");
      $("#answer").addClass("invalid").focus();
      return;
    }

    var rightAnswer = questions[current].answer;

    if (userAnswer === rightAnswer) {
      correct++;
      $("#answer").addClass("valid").removeClass("invalid");
      $("#message").text("Правильно!");
    } else {
      wrong++;
      $("#answer").addClass("invalid").removeClass("valid");
      $("#message").text("Неправильно. Правильна відповідь: " + rightAnswer);
    }

    $("#correctCount").text(correct);
    $("#wrongCount").text(wrong);
    checked = true;
    $("#check").text("Наступне слово");
  }

  function nextWord() {
    current++;

    if (current < questions.length) {
      showWord();
    } else {
      showResult();
    }
  }

  function showResult() {
    var percent = Math.round(correct / questions.length * 100);
    var knowledge = "";

    if (percent >= 80) {
      knowledge = "Високий рівень знань";
    } else if (percent >= 50) {
      knowledge = "Середній рівень знань";
    } else {
      knowledge = "Початковий рівень знань";
    }

    $("#resultText").text(
      "Правильно: " + correct + " з " + questions.length +
      " (" + percent + "%)"
    );
    $("#knowledgeLevel").text(knowledge);
    $("#resultModal").removeAttr("hidden");
  }

  $("#start").on("click", startQuiz);
  $("#check").on("click", checkAnswer);

  $("#card").on("click", function (event) {
    if (!$(event.target).is("#answer")) {
      checkAnswer();
    }
  });

  $("#card").on("keypress", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

  $("#restart").on("click", function () {
    $("#resultModal").attr("hidden", true);
    startQuiz();
  });
});
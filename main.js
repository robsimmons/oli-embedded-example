const harness = require("@calculemus/oli-embedded-harness");

function categorize (s) {
    switch(s.toLowerCase()) {
        case "dr. chris martens": return "chris";
        case "doc martens": return "chris";
        case "chris martens": return "chris";
        case "dr. martens": return "chris";

        case "mr. rob simmons": return "rob";
        case "rob simmons": return "rob";
        case "dr. simmons": return "rob";
        case "professor simmons": return "rob";

        case "dr. iliano cervesato": return "iliano";
        case "iliano cervesato": return "iliano";
        case "professor cervesato": return "iliano";
        case "mr. cervesato": return "iliano";

        case "professor moore": return "steven";
        case "mr. moore": return "steven";
        case "steven moore": return "steven";
        case "engineer moore": return "steven";

        default: return s.toLowerCase();
    }
}

module.exports = harness.simple({
    render: function (data) {
        $("#prompt").text(data.prompt);
        $("#blank0").val(data.parts[0].response);
        $("#blank1").val(data.parts[1].response);
        $("#blank2").val(data.parts[2].response);

        let feedback = $("<div/>", {
            id: "feedback"
        });
        let correct = true;
        let hasFeedback = false;
        data.parts.map(part => {
            if (part.analysis) {
                hasFeedback = true;
                correct = correct && part.analysis.correct;
                $(feedback).append(part.analysis.feedback);
                $(feedback).append($("<br/>"));
            }
        });

        if (hasFeedback) {
            if (correct) {
                $(feedback).css({
                    background: "#ddffdd",
                    borderColor: "#33aa33",
                    display: "block"
                });
            } else {
                $(feedback).css({
                    background: "#f4c4c9",
                    borderColor: "#e75d36",
                    display: "block"
                });
            }
        }

        $("#feedback").replaceWith(feedback);
    },

    read: function () {
        return [
            $(document.body).find("#blank0").val(),
            $(document.body).find("#blank1").val(),
            $(document.body).find("#blank2").val(),
        ];
    },

    parse: categorize
});

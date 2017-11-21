const harness = require("@calculemus/oli-embedded-harness");

module.exports = harness.simple({
    render: function (data) {
        $("#blank0").val(data[0]);
        $("#blank1").val(data[1]);
        $("#blank2").val(data[2]);
    },

    read: function () {
        return [
            $(document.body).find("#blank0").text(),
            $(document.body).find("#blank1").text(),
            $(document.body).find("#blank2").text(),
        ];
    },

    process: function (input) {
        return input.toLowerCase();
    }
});

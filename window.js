// event initialzing
$(() => {
  const doSomethingBtn = $("#do-something");
  const toggleFeaturePanelBtn = $("#toggle-feature-panel");
  
  const backButton = $("#back");
  const md5Input = $("#md5-input");

  doSomethingBtn.on("click", doSomething);
  toggleFeaturePanelBtn.on("click", toggleFeaturePanel);
  backButton.on("click", toggleFeaturePanel);
  md5Input.on("input", testMD5);
});

// most crappiest function ever made... just wanted to try command execution on electron
// and indeed it works. electron seems amazing for now.
function doSomething() {
  const command = "whoami";

  var child_process = require("child_process");

  var cmd = child_process.spawn(command);

  cmd.stdout.on("data", function (output) {
    document.write(`Hi ${output.toString()}! I'm gonna kill myself in 5 seconds, hehe`);

    setTimeout(() => {
        const remote = require('electron').remote;
        let w = remote.getCurrentWindow();
        w.close();
    }, 5000);
  });

  cmd.on("close", function () {
    console.log("what did you expected here?");
  });

  cmd.stderr.on("data", function (err) {
    document.write(err);
  });
}

// "real-time" md5 hashing with a crappy function name
function testMD5() {
  const md5 = require("md5");

  const userInput = $("#md5-input").val();

  const result = md5(userInput);

  $("#md5-result").text(result);
}

// a little jQuerying with the divs
function toggleFeaturePanel() {
  const mainPanelDiv = $("#main");
  const featurePanelDiv = $("#feature-panel");

  if (mainPanelDiv.hasClass("shown")) {
    mainPanelDiv.removeClass("shown");
    mainPanelDiv.hide();

    featurePanelDiv.addClass("shown");
    featurePanelDiv.show();
  } else {
    featurePanelDiv.removeClass("shown");
    featurePanelDiv.hide();

    mainPanelDiv.addClass("shown");
    mainPanelDiv.show();
  }
}

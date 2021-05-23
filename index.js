let parameterBox = document.getElementById("parameterBox");

console.log(parameterBox);

parameterBox.style.display = "none";

let paramRadio = document.getElementById("params");
paramRadio.addEventListener("click", () => {
  document.getElementById("jsonBox").style.display = "none";
  parameterBox.style.display = "block";
});

let json = document.getElementById("json");
json.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("jsonBox").style.display = "block";
});

// function to get element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

let addedParams = 0;
// adding parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let paramss = document.getElementById("paramss");
  let string = `<div class="form-group row my-3">
    <label for="url" class="col-sm-2 col-form-label">Paramter ${
      addedParams + 2
    }</label>
    <div class="col-sm-8 myFlex">
      <input type="text" class="form-control" id="paramKey${
        addedParams + 2
      }" placeholder="Enter parameter ${addedParams + 2} key">
      <input type="text" class="form-control mx-4" id="paramValue${
        addedParams + 2
      }" placeholder="Enter parameter ${addedParams + 2} value">
      <button type="button" class="btn btn-primary deleteParam" > - </button>
    </div>
  </div>
</div>`;
  let paramElement = getElementFromString(string);
  console.log(paramElement);
  parameterBox.appendChild(paramElement);

  // deleting parameter
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove(); // very very important
    });
  }
  console.log(deleteParam);
  addedParams++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseJsonText").value =
    "please wait..... fetching response";
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  let data = {};
  if (contentType == "params") {
    for (let i = 0; i < addedParams + 1; i++) {
      if (document.getElementById(`paramKey${i + 1}`) != undefined) {
        let key = document.getElementById(`paramKey${i + 1}`).value;

        let value = document.getElementById(`paramValue${i + 1}`).value;
        data[key] = value;
        console.log(typeof data);
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonRequestText").value;
  }
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        document.getElementById("responseJsonText").rows = "6";
        console.log(document.getElementById("responseJsonText"));
        document.getElementById("responseJsonText").value = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data, // we have taken the data above
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) =>{
        document.getElementById("responseJsonText").value = text
        console.log(text);
      } );
  }
});

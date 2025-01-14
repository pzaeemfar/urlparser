const urlField = document.querySelector("#urlField");
const errorMessage = document.querySelector("#errorMessage");
const outputTable = document.querySelector("#outputTable");

const nativeKeys = ["toString", "toJSON"];
const blockedKeys = [
  ...nativeKeys,
  "origin",
  "hostname",
  "searchParams",
  "href",
];

const keyMapping = {
  pathname: "path",
  search: "QS (Query String)",
  hash: "Fragment",
};

const createRow = (key, value) => {
  const row = document.createElement("tr");
  const heading = document.createElement("th");
  heading.textContent = keyMapping[key] || key;

  const data = document.createElement("td");
  data.textContent = decodeURIComponent(value);

  row.append(heading, data);
  return row;
};

urlField.addEventListener("change", () => {
  try {
    const parsedUrl = new URL(urlField.value);
    errorMessage.hidden = true;
    outputTable.replaceChildren();

    for (const key in parsedUrl) {
      if (!blockedKeys.includes(key)) {
        outputTable.appendChild(createRow(key, parsedUrl[key]));
      }
    }
  } catch {
    errorMessage.textContent = "Invalid URL";
    errorMessage.hidden = false;
  }
});

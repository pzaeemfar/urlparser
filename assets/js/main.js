const urlField = document.querySelector("#urlField");
const errorMessage = document.querySelector("#errorMessage");
const outputTable = document.querySelector("#outputTable");

urlField.addEventListener("change", function () {
  try {
    const parsedUrl = new URL(this.value);
    errorMessage.hidden = true;

    outputTable.replaceChildren();

    const nativeKeys = ["toString", "toJSON"];
    const blockedKeys = [
      ...nativeKeys,
      "origin",
      "hostname",
      "searchParams",
      "href",
    ];

    for (const key in parsedUrl) {
      if (blockedKeys.includes(key)) {
        continue;
      }

      const row = document.createElement("tr");

      const heading = document.createElement("th");
      heading.textContent = key;

      const data = document.createElement("td");
      data.textContent = decodeURIComponent(parsedUrl[key]);
      row.append(heading, data);

      outputTable.appendChild(row);
    }
  } catch (e) {
    errorMessage.textContent = "Invalid URL";
    errorMessage.hidden = false;
  }
});

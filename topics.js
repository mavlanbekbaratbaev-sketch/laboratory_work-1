
(function () {
  "use strict";

  const STORAGE_KEY = "gamenews:topics";

  const form = document.getElementById("new-topic-form");
  const list = document.getElementById("topic-list");
  if (!form || !list) return;

  const authorInput = document.getElementById("topic-author");
  const titleInput = document.getElementById("topic-title");
  const textInput = document.getElementById("topic-text");


  const style = document.createElement("style");
  style.textContent = `
    #new-topic-form { display: flex; flex-direction: column; gap: 10px; max-width: 600px; margin-bottom: 20px; }
    #new-topic-form input, #new-topic-form textarea {
      padding: 10px; border: 1px solid #444; border-radius: 4px;
      background: #262626; color: white; font: inherit;
    }
    #new-topic-form textarea { min-height: 110px; resize: vertical; }
    #new-topic-form .btn { align-self: flex-start; border: 0; cursor: pointer; font: inherit; font-weight: bold; }
    .topic-item { background: #262626; border-radius: 5px; padding: 12px 15px; margin-bottom: 10px; }
    .topic-item a { color: white; font-weight: bold; text-decoration: none; }
    .topic-item span { display: block; color: #aaa; font-size: 14px; margin-top: 4px; }
    .topic-item p { margin: 8px 0 0; color: #ddd; overflow-wrap: anywhere; }
    .topic-new { animation: topic-in .5s ease both; }
    @keyframes topic-in { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: none; } }
  `;
  document.head.appendChild(style);


  function loadTopics() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveTopics(topics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch (error) {
    }
  }


  function createTopicElement(topic, animate) {
    const item = document.createElement("div");
    item.className = "topic-item" + (animate ? " topic-new" : "");

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = topic.title;

    const author = document.createElement("span");
    author.textContent = "Автор: " + topic.author;

    const text = document.createElement("p");
    text.textContent = topic.text;

    item.append(link, author, text);
    return item;
  }


  const topics = loadTopics();
  topics.forEach((topic) => list.prepend(createTopicElement(topic, false)));


  form.addEventListener("submit", (event) => {
    event.preventDefault();                     

    const topic = {
      author: authorInput.value.trim(),
      title: titleInput.value.trim(),
      text: textInput.value.trim(),
    };
    if (!topic.author || !topic.title || !topic.text) return;

    topics.push(topic);
    saveTopics(topics);
    list.prepend(createTopicElement(topic, true));

    form.reset();
    titleInput.focus();
  });
})();

import testIdeas from '../data/testIdeas.json';

function delay(timeout = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function getIdeas() {
  return delay().then(() => {
    return { data: { ideas: [...testIdeas] } };
  });
}

export function addIdeas() {
  return delay().then(() => {
    return { data: {
      // assuming a real api would make sure id is unique on the backend
      id: Math.floor(Math.random() * Math.floor(10000000)),
      created_date: (new Date()).toLocaleDateString("en-US"),
    } };
  });
}

export function deleteIdeas(id) {
  return delay().then(() => {
    return {
      data: { id },
      status: 202
    };
  });
}

export function updateIdeaTitle(title, id) {
  return delay().then(() => {
    return {
      data: { id, title },
      status: 202
    };
  });
}

export function updateIdeaText(bodyText, id) {
  return delay().then(() => {
    return {
      data: { id, body: bodyText },
      status: 202
    };
  });
}
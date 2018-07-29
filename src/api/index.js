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
      id: Math.floor(Math.random() * Math.floor(10000000)),
      created_date: (new Date()).toLocaleDateString("en-US"),
    } };
  });
}

export function deleteIdeas(id) {
  return delay().then(() => {
    return {
      data: { id: id },
      status: 202
    };
  });
}
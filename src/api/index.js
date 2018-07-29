import testIdeas from '../data/testIdeas.json';

function delay(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function getIdeas() {
  return delay().then(() => {
    return { data: [...testIdeas] };
  });
}

export function deleteIdeas() {
  return delay().then(() => {
    return { status: 202 };
  });
}
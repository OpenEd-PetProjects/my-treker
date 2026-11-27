const readline = require('node:readline');

async function main() {
  const habits = [];
  const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  const menu = '\n1 — Добавить привычку\n2 — Список привычек\n0 — Выход';
  let awaitingName = false;

  console.log(menu);
  for await (const line of input) {
    const value = line.trim();

    if (awaitingName) {
      if (!value) {
        console.log('Название не должно быть пустым. Введите название:');
        continue;
      }
      habits.push(value);
      awaitingName = false;
      console.log('Привычка добавлена.');
    } else if (value === '1') {
      awaitingName = true;
      console.log('Введите название привычки:');
      continue;
    } else if (value === '2') {
      console.log('Список привычек:');
      if (habits.length === 0) console.log('Список привычек пуст.');
      habits.forEach((name, index) => console.log(`${index + 1}. ${name}`));
    } else if (value === '0') {
      break;
    } else {
      console.log('Выберите 1, 2 или 0.');
    }

    console.log(menu);
  }
  input.close();
}

main();

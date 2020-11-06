import { getDominantColor } from '../getDominantColor';

test('kanko-dori image test', async () => {
  const color = await getDominantColor(
    'https://cdn.discordapp.com/attachments/742006049158070462/774303232910426163/kankodori.png'
  );
  expect(color).toBe(0xecb444);
});

test('red image test', async () => {
  const color = await getDominantColor(
    'https://cdn.discordapp.com/attachments/742006049158070462/774302218915545128/red.png'
  );
  expect(color).toBe(0xfa0606);
});

test('tokyo-tower image test', async () => {
  const color = await getDominantColor(
    'https://cdn.discordapp.com/attachments/742006049158070462/774301804564578334/tokyo-tower.jpg'
  );
  expect(color).toBe(0x141c25);
});

test('mountain image test', async () => {
  const color = await getDominantColor(
    'https://cdn.discordapp.com/attachments/742006049158070462/774302557622632498/moutain.jpg'
  );
  expect(color).toBe(0x96b4cb);
});

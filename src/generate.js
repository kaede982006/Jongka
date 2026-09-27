const glyphs = '㍰⣿█';

export function generateJongka(total, source) {
  if (!Number.isInteger(total) || total < 20 || total > 120) {
    throw new Error('길이는 20 이상 120 이하로 입력하세요.');
  }

  // Windows 원본은 UTF-16 문자 4095개와 비어 있지 않은 줄 64개까지만 읽는다.
  const strings = source.slice(0, 4095).split(/\r\n|\r|\n/).filter(Boolean).slice(0, 64);
  const insertedLength = strings.reduce((sum, string) => sum + string.length, 0);
  if (insertedLength > Math.floor(total / 2)) {
    throw new Error('삽입할 문자열의 총 길이가 전체 길이의 절반을 넘습니다.');
  }

  const output = [];
  let previous = -1;
  let run = 0;
  for (let i = 0; i < total; i++) {
    let value;
    do {
      value = Math.floor(Math.random() * glyphs.length);
    } while (value === previous && run >= 10);
    run = value === previous ? run + 1 : 1;
    previous = value;
    output.push(glyphs[value]);
  }

  let slack = total - insertedLength;
  let cursor = 0;
  for (const string of strings) {
    const gap = Math.floor(Math.random() * (slack + 1));
    slack -= gap;
    cursor += gap;
    for (let i = 0; i < string.length; i++) output[cursor + i] = string[i];
    cursor += string.length;
  }
  return { text: output.join(''), count: strings.length };
}

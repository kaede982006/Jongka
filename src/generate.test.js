import assert from 'node:assert/strict';
import test from 'node:test';
import { generateJongka } from './generate.js';

test('종카 생성 규칙', () => {
  for (let i = 0; i < 100; i++) {
    const plain = generateJongka(120, '').text;
    assert.equal(plain.length, 120);
    assert.doesNotMatch(plain, /(㍰{11}|⣿{11}|█{11})/);

    const made = generateJongka(60, '첫째\n\n둘째');
    assert.equal(made.text.length, 60);
    assert.equal(made.count, 2);
    assert.ok(made.text.indexOf('첫째') < made.text.indexOf('둘째'));
  }
  assert.equal(generateJongka(20, '').text.length, 20);
  assert.throws(() => generateJongka(19, ''), /20 이상 120 이하/);
  assert.throws(() => generateJongka(20, '12345678901'), /절반/);
});

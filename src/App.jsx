import { useRef, useState } from 'react';
import { generateJongka } from './generate.js';

export default function App() {
  const [length, setLength] = useState('60');
  const [source, setSource] = useState('');
  const [made, setMade] = useState(null);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const resultRef = useRef(null);

  function make(event) {
    event.preventDefault();
    setCopyStatus('');
    try {
      setMade(generateJongka(Number(length), source));
      setError('');
    } catch (cause) {
      setError(cause.message);
    }
  }

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(made.text);
      } else {
        resultRef.current.select();
        if (!document.execCommand('copy')) throw new Error('복사 실패');
      }
      setCopyStatus('클립보드에 복사했어요.');
    } catch {
      setCopyStatus('복사할 수 없어요. 결과를 선택해 직접 복사해 주세요.');
    }
  }

  return <>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="종카 메이커 처음으로">
          <span className="brand-mark" aria-hidden="true">㍰</span>
          <span className="brand-name">JONGKA<span>STUDIO</span></span>
        </a>
        <span className="header-note">TEXT PLAYGROUND <span aria-hidden="true">/</span> 001</span>
      </div>
    </header>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> 문자 조합 실험실</p>
            <h1 id="hero-title">글자를 심고,<br /><em>패턴을 완성하세요.</em></h1>
            <p className="hero-description">원하는 문장을 ㍰ ⣿ █ 사이에 쏙. 몇 번이고 새롭게 조합되는 나만의 종카 문자열을 만들어 보세요.</p>
            <a className="hero-link" href="#maker">바로 만들기 <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <span className="art-glyph glyph-one">㍰</span>
            <span className="art-glyph glyph-two">⣿</span>
            <span className="art-glyph glyph-three">█</span>
            <span className="art-caption">MIX · MAKE · REPEAT</span>
          </div>
        </div>
        <div className="hero-bottom"><span>THREE GLYPHS. ENDLESS COMBINATIONS.</span><span>㍰ &nbsp; ⣿ &nbsp; █</span></div>
      </section>

      <section className="workspace" id="maker" aria-label="종카 만들기">
        <div className="section-heading">
          <div><span className="section-kicker">THE MAKER</span><h2>이제 만들어볼까요?</h2></div>
          <p>길이를 정하고 문장을 넣으면, 나머지는 종카가 채웁니다.</p>
        </div>

        <div className="workspace-grid">
          <form className="card input-card" onSubmit={make} noValidate>
            <div className="card-heading"><span className="step">01</span><div><h3>재료 넣기</h3><p>조합할 문장을 준비해 주세요.</p></div></div>
            <div className="field">
              <label htmlFor="length">전체 길이 <span className="field-hint">20–120자</span></label>
              <div className="length-row"><input id="length" name="length" type="number" min="20" max="120" step="1" value={length} onChange={event => setLength(event.target.value)} required inputMode="numeric" /><span className="input-unit">글자</span></div>
              <div className="range-labels"><span>짧게 <strong>20</strong></span><span>길게 <strong>120</strong></span></div>
            </div>
            <div className="field">
              <label htmlFor="source">삽입할 문자열 <span className="field-hint">한 줄에 하나씩</span></label>
              <textarea id="source" name="source" maxLength="4095" rows="6" value={source} onChange={event => setSource(event.target.value)} placeholder={'여기에 문장을 입력하세요\n여러 문장은 줄을 바꿔 입력하세요'} spellCheck={false} />
              <p className="field-help">빈 줄은 건너뛰어요. 입력한 순서대로 들어갑니다.</p>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="generate-button" type="submit">종카 생성하기 <span aria-hidden="true">↗</span></button>
          </form>

          <section className="card result-card" aria-labelledby="result-title">
            <div className="card-heading result-heading"><span className="step">02</span><div><h3 id="result-title">완성된 종카</h3><p>생성할 때마다 새로운 패턴이 나옵니다.</p></div></div>
            <div className="result-surface">
              {made ? <textarea id="result" ref={resultRef} aria-label="생성된 종카 문자열" value={made.text} readOnly spellCheck={false} /> :
                <div className="empty-state"><span className="empty-glyph" aria-hidden="true">㍰</span><strong>아직 만들어진 종카가 없어요.</strong><span>왼쪽에서 재료를 넣고 생성해 보세요.</span></div>}
            </div>
            <div className="result-footer"><div className="result-stats"><span>길이 <strong>{made?.text.length ?? '—'}</strong></span><span>삽입 <strong>{made ? `${made.count}개` : '—'}</strong></span></div><button className="copy-button" type="button" onClick={copy} disabled={!made}>결과 복사 <span aria-hidden="true">↗</span></button></div>
            <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
          </section>
        </div>
        <p className="workspace-note"><span aria-hidden="true">✳</span> 삽입할 문자열의 총 길이는 전체 길이의 절반 이하여야 합니다.</p>
      </section>
    </main>

    <footer className="site-footer"><div><span>JONGKA STUDIO</span><span>MAKE SOMETHING UNEXPECTED. &nbsp;㍰ ⣿ █</span></div></footer>
  </>;
}

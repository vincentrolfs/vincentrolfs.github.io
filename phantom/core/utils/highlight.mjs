const Prism = (await import("prismjs")).default;
const loadLanguages = (await import("prismjs/components/index.js")).default;

loadLanguages(["ts"]);

export async function highlight(src, lang = "js") {
  src = await src;
  const p = Prism.highlight(src, Prism.languages[lang], lang);
  return `<pre class="language-${lang}"><code class="language-${lang}">${p}</code></pre>`;
}

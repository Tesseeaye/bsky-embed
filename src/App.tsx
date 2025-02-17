import type { Component } from 'solid-js';
import BskyEmbed from './BskyEmbed';
import './globals.css'

// planned options - username, limit, theme, debug (show generic vs real error)
const App: Component = () => {
  const options = {
    username: "vincentwill.com",
    feed: "at://did:plc:jcoy7v3a2t4rcfdh6i4kza25/app.bsky.feed.generator/astro",
    mode: "",
    limit: 10,
  }

  return (
    <main class={options.mode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}>
      <div class="">
        <BskyEmbed
          username={options.username}
          // feed={options.feed}
          limit={options.limit}
          mode={options.mode}
        />
      </div>
    </main>
  );
};

export default App;

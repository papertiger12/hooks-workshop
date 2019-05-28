const el = Calendar();
commit(el) // build dom and send to browser to render
// state change
const newEl = Calendar();
const diff = compare(el, newEl); // usually fast enough, can be expensive
commit(diff) // fast, b/c of diff

- just because react calls component, doesn't equate a performance issue

in Dashboard.js

- useMemo on calculateWeeks / dont calculate unless we must
- memo / diff props, before diff new and old el
- useCallback

- useMemo on calculateWeeks.js
  - console.time it
  - console.log when it memos
- Go to the feed
- Show how the profiler works
- React.memo on FeedPost and show how it saves on renders
- show that post={post} is new each time, causing
  - spread the props instead, fixed (but ehhhhh)
- Go to the calendar
  - make it huge (don't forget the CSS for the height)
  - start memoing everything
  - useCallback (just a useMemo shortcut for functions)

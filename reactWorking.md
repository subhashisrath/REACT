# react-under-the-hood.md

# 1️⃣ How a React app starts (execution flow)

## 1. index.html loads first  
- Browser reads HTML  
- Finds:  
    ```js
    <div id="root"></div>  
    ```  
- This div is just an empty container  

## 2.main.jsx runs  
- Browser executes JavaScript  
- React is introduced for the first time  

## 3.createRoot(rootElement)  
- React sets up its internal system
- Prepares Fiber architecture
- Prepares Scheduler
- Prepares Update queues
- ⚠️ No UI is rendered yet  

## 4. .render(<App />)  
- This is when React actually starts working  
- Rendering process begins  

👉 Until render() is called, React hasn’t built anything.

---

# 2️⃣ JSX → React Elements (build-time, not runtime)

When you write JSX:
```js 
<a href="https://google.com">Click</a> 
```

Babel converts it (before browser runs it) into:
```js
React.createElement("a", { href: "https://google.com" }, "Click")
```
    
This returns a **React Element**.
- Plain JavaScript object  
- Immutable  
- Describes what UI should look like  
- ❌ Not DOM  
- ❌ Not Virtual DOM  

React Elements are **temporary descriptions**.

---

# 3️⃣ Your custom React example (why it was important)

Your custom renderer:
```js
    function customRender(reactElement, container) {
      const dom = document.createElement(reactElement.type)
      dom.innerHTML = reactElement.children
      for (const prop in reactElement.props) {
        dom.setAttribute(prop, reactElement.props[prop])
      }
      container.appendChild(dom)
    }
```
## What this proved:

- JSX → object → DOM is a valid idea  
- React Elements are just data  
- Rendering means converting description → real DOM  

## What it lacked (on purpose):

- No memory  
- No updates  
- No comparison  
- No performance control  

This example was conceptually correct but architecturally incomplete.

---

# 4️⃣ Why React does NOT render like your custom renderer

Your renderer does this:
    `Element → DOM (immediately)`
React cannot do this because:

- DOM operations are slow  
- UI would freeze on large apps  
- No way to update efficiently  

So React introduces an intermediate layer.

---

# 5️⃣ Fiber: the real “Virtual DOM”

Modern React does not use the old Virtual DOM idea.  
Instead it uses Fiber.

## Fiber is:
- A persistent data structure
- A unit of work
- One Fiber = one component / element

Each Fiber stores:

- `type` – Component type or HTML element
- `props` – Component properties
- `state` – Current state values
- `reference to DOM node` – Link to actual DOM element
- `links to parent / child / sibling` – Fiber tree connections
- `link to previous version (alternate)` – Reference to old Fiber for comparison


👉 Fiber Tree = what people casually call “Virtual DOM”

---

# 6️⃣ When Fiber is created

## First render  

- React creates a Fiber node for every element  
- Builds the Fiber tree  
- Commits DOM  

## Subsequent renders  

- React creates a work-in-progress Fiber tree  
- Links each new Fiber to the old one  
- Reuses as much as possible  

⚠️ Fibers are created or reused during render, not once forever.

---

# 7️⃣ Two trees always exist (this is critical)

React always keeps:

## 1.Current Fiber Tree  
Represents what’s on screen  

## 2.Work-in-Progress Fiber Tree  
Represents next UI state  

React compares:`Old Fiber Tree ↔ New Fiber Tree`

⚠️ React never compares Fiber with DOM

---

# 8️⃣ Reconciliation (what actually gets compared)

## Reconciliation means:

- Compare old Fiber vs new Fiber  

- Decide:
    - reuse DOM?  
    - update props?  
    - update text?  
    - remove node?  
    - insert node?  

Result of reconciliation:

- A list of effects (what needs to change)

Still ❌ no DOM updates yet.

---

# 9️⃣ Commit phase (only now DOM is touched)

After reconciliation:

- React applies effects  
- Updates only what changed  
- Reuses DOM nodes whenever possible  

This is the only time React touches the DOM.

This is why:

**Re-render ≠ DOM update**

---

# 🔟 Why Fiber replaced old React (historical context)

## Before Fiber (React ≤15)

- Recursive rendering  
- Synchronous  
- Blocking  
- No pause  
- No priorities  

Once rendering started → browser was stuck.

## After Fiber (React 16+)
- Work split into small units
- Rendering can pause & resume
- Browser stays responsive
- Future features become possible

Fiber didn’t make React faster  
Fiber made React controllable

---

# 1️⃣1️⃣ Why createRoot exists today

Old API : ` ReactDOM.render()`

New API: `createRoot().render()`

**createRoot:**

- Enables Fiber scheduling
- Enables concurrent features
- Enables transitions & suspense

Without it, React cannot use its modern architecture fully.

---

# 1️⃣2️⃣ Why React can re-run components freely

React can safely re-run your component functions because:

- They return descriptions, not DOM
- Fiber remembers previous state
- DOM updates are minimized
- Rendering is cheap
- Commit is optimized 

This is the core reason React scales.

---

# 1️⃣3️⃣ Final mental model (keep this forever)

```js

    index.html
       ↓
    main.jsx
       ↓
    createRoot (setup)
       ↓
    render()
       ↓
    React Elements (descriptions)
       ↓
    Fiber Tree (memory + structure)
       ↓
    Reconciliation (Fiber vs Fiber)
       ↓
    Commit Phase
       ↓
    Minimal DOM updates

```
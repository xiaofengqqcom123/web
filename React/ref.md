## CreateRef vs useRef
doc: [A complete guide to React refs](https://blog.logrocket.com/complete-guide-react-refs/#creating-refs)

When working with class-based components in the past, we used createRef() to create a ref. However, now that React recommends functional components and general practice is to follow the Hooks way of doing things, we don’t need to use createRef(). Instead, we use useRef(null) to create refs in functional components.

```
import React, { useRef } from "react";

const ActionButton = ({ label, action }) => {
  const buttonRef = useRef(null);
  return (
    <button onClick={action} ref={buttonRef}>
      {label}
    </button>
  );
};
export default ActionButton;
```

### Differences between useRef and createRef
1. createRef is typically used when creating a ref in a class component while useRef is used in function components.
2. createRef returns a new ref object each time it is called . useRef returns the same ref object on every render
3. createRef doesn’t accept an initial value, so the current property of the ref will be initially set to null.  useRef can accept an initial value and the current property of the ref will be set to that value.